import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './avatar.scss';

class Avatar extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      showInitialsOverlay: false
    };
  }

  render = () => {
    const { className, hidden, isLoading, link, name, onClick, shape, source } = this.props;
    const initialsOverlay = this.getInitialsOverlay(name);
    return (
      <button
        className={cx(
          className,
          hidden && style['chat-avatar--hidden'],
          style['chat-avatar'],
          style[`chat-avatar--${shape}`]
        )}
        onClick={onClick}
        type='button'
      >
        <a
          className={cx(style['chat-avatar__link'])}
          href={link}
        >
          <LazyImage
            className={cx(style['chat-avatar__image'])}
            label={name}
            loader={shape === 'square' ? 'avatarSquare' : 'avatarRound'}
            onError={this.showInitialsOverlay}
            onLoad={this.hideInitialsOverlay}
            onSuccess={this.hideInitialsOverlay}
            placeholder={shape}
            source={source}
            pureLoading={isLoading}
          />
        </a>
        {initialsOverlay}
      </button>
    );
  };

  /* Subviews */

  getInitialsOverlay = (name) => {
    const { showInitialsOverlay } = this.state;
    if (!showInitialsOverlay || !name) {
      return null;
    }
    const initials = this.getInitials(name);
    return <span className={cx(style['chat-avatar__initials'])}>{initials}</span>;
  };

  /* Auxillary Functions */

  getInitials = (name) => {
    if (!name) {
      return null;
    }
    const names = name.split(' ', 3);
    if (names.length === 1) {
      return names[0].substring(0, 3).toUpperCase();
    }
    const initials = names.map((name) => name.substring(0, 1));
    return initials.join('').toUpperCase();
  };

  hideInitialsOverlay = () => this.setState({
    showInitialsOverlay: false
  });

  showInitialsOverlay = () => this.setState({
    showInitialsOverlay: true
  });

}

Avatar.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  shape: PropTypes.oneOf([
    'circle',
    'square'
  ]),
  source: PropTypes.string
};

Avatar.defaultProps = {
  className: null,
  hidden: false,
  isLoading: false,
  link: null,
  onClick: null,
  shape: 'circle',
  source: null
};

export default Avatar;
