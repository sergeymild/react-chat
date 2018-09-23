import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { AppContext } from '../App/Context.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './TitleBar.scss';

class TitleBar extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount = () => {

  };

  componentWillUnmount = () => {

  };

  componentDidUpdate = () => {

  };

  render = () => {
    const { className } = this.props;
    return (
      <AppContext.Consumer>
        {(context) => (

        )}
      </AppContext.Consumer>
    );
  };

}

TitleBar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  onInfo: PropTypes.func,
  onReturn: PropTypes.func,
  subtitle: PropTypes.string,
  title: Proptypes.string
};

TitleBar.defaultProps = {
  avatar: null,
  className: null,
  onInfo: null,
  onReturn: null,
  subtitle: null,
  title: 'Messages'
};

export default TitleBar;
