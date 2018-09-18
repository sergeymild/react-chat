import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './LazyImage.scss';

import { getInlineSvg, loaderKeys, placeholderKeys } from './Svg.jsx';

class LazyImage extends React.Component {

  /*
    Lifecycle
  */

  constructor (props) {
    super(props);
    this.state = {
      loadState: 'unloaded'
    };
  }

  componentDidMount = () => {
    if (document && String(document.readyState).match(/^(complete|interactive)$/)) {
      this.onPageLoad();
      return;
    }
    if (window) {
      window.addEventListener('load', this.onPageLoad);
      return;
    }
  };

  componentWillUnmount = () => {
    this.stopLoading();
    window.removeEventListener('load', this.onPageLoad);
  };

  shouldComponentUpdate = (nextProps) => {
    const { source } = this.props;
    if (source !== nextProps.source) {
      this.stopLoading();
      this.startLoading(nextProps.source);
    }
    return true;
  };

  render = () => {
    let image = null;
    const { label, pureLoading } = this.props;
    const { loadState } = this.state;
    switch (loadState) {
    case 'loading':
      image = this.getLoadingPlaceholder();
      break;
    case 'loaded':
      image = this.getImage();
      break;
    default:
      image = this.getStaticPlaceholder();
      break;
    }
    if (pureLoading) {
      image = this.getLoadingPlaceholder();
    }
    return (
      <div className={cx(
        style['image__container'],
        style[`image__container--${label}`]
      )}>
        {image}
      </div>
    );
  };

  /* Subviews */

  getImage = () => {
    const { label, className, source } = this.props;
    return (
      <img
        alt={label}
        className={cx(
          className,
          style['image__content'],
          style[`image__content--${label}`]
        )}
        src={source}
      />
    );
  };

  getStaticPlaceholder = () => {
    const { className, label, placeholder } = this.props;
    const classNames = cx(
      className,
      style['image__placeholder'],
      style[`image__placeholder--${label}`]
    );
    return getInlineSvg(placeholder, classNames);
  };

  getLoadingPlaceholder = () => {
    const { className, label, loader } = this.props;
    const classNames = cx(
      className,
      style['image__loader'],
      style[`image__loader--${label}`]
    );
    return getInlineSvg(loader, classNames);
  };

  /* Load Events */

  onPageLoad = () => {
    const { source } = this.props;
    this.stopLoading();
    this.startLoading(source);
  };

  onLoadError = () => {
    const { onError } = this.props;
    this.setState({
      loadState: 'error'
    });
    onError && onError();
  };

  onLoadSuccess = () => {
    const { onSuccess } = this.props;
    this.setState({
      loadState: 'loaded'
    });
    onSuccess && onSuccess();
  };

  startLoading = (source) => {
    const { onStart } = this.props;
    if (!source) {
      this.onLoadError();
      return;
    }
    this.setState({
      loadState: 'loading'
    });
    this.image = new Image();
    this.image.onerror = this.onLoadError;
    this.image.onload = this.onLoadSuccess;
    this.image.src = source;
    onStart && onStart();
  };

  stopLoading = () => {
    this.setState({
      loadState: 'unloaded'
    });
    if (!this.image) {
      return;
    }
    this.image.onerror = null;
    this.image.onload = null;
    this.image.src = '';
    this.image = null;
  };

}

LazyImage.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  loader: PropTypes.oneOf(loaderKeys).isRequired,
  onError: PropTypes.func,
  onStart: PropTypes.func,
  onSuccess: PropTypes.func,
  placeholder: PropTypes.oneOf(placeholderKeys).isRequired,
  pureLoading: PropTypes.bool,
  source: PropTypes.string
};

LazyImage.defaultProps = {
  className: '',
  onError: null,
  onStart: null,
  onSuccess: null,
  pureLoading: false,
  source: null
};

export default LazyImage;
