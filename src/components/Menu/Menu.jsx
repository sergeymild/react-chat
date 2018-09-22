// Positioning and Animation

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './Menu.scss';

class Menu extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.actionMenu = React.createRef();
    this.state = {
      touchInitiated: false,
      touchMoved: false
    };
  }

  componentDidMount = () => {
    if (document) {
      document.addEventListener('mousedown', this.checkTouchOutsideMenu);
      document.addEventListener('touchstart', this.resetTouch);
      document.addEventListener('touchmove', this.invalidateTouch);
      document.addEventListener('touchend', this.checkTouchOutsideMenu);
    }
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('mousedown', this.checkTouchOutsideMenu);
      document.addEventListener('touchstart', this.resetTouch);
      document.addEventListener('touchmove', this.invalidateTouch);
      document.removeEventListener('touchend', this.checkTouchOutsideMenu);
    }
  };

  render = () => {
    const { actions, className, messageId, type, userId } = this.props;
    const { relativeX, relativeY, isRightSided } = this.props;
    const overridePosition = !!relativeX && !!relativeY && !isNaN(relativeX) && !isNaN(relativeY);
    let elementStyle = null;
    switch (type) {
    case 'list':
      elementStyle = overridePosition ? {
        left: `${relativeX}px`,
        position: 'absolute',
        top: `${relativeY}px`
      } : null;
      if (overridePosition && isRightSided) {
        elementStyle.transform = 'translate(-100%, 0)';
      }
      break;

    case 'row':
      elementStyle = overridePosition ? {
        bottom: '0',
        transform: 'translate(0, 100%)',
        position: 'absolute'
      } : null;
      if (overridePosition && isRightSided) {
        elementStyle.right = '0';
      } else if (overridePosition) {
        elementStyle.left = '0';
      }
      break;

    default:
      break;
    }
    return (
      <div
        className={cx(
          className,
          style['chat-menu'],
          style[`chat-menu--${type}`]
        )}
        ref={this.actionMenu}
        style={elementStyle}
      >
        {this.getActions(actions, messageId, userId)}
      </div>
    );
  };

  /* Event Callback */

  resetTouch = () => this.setState({
    touchInitiated: true,
    touchMoved: false
  });

  invalidateTouch = () => this.setState({
    touchMoved: true
  });

  checkTouchOutsideMenu = (event) => {
    const { onDismiss } = this.props;
    const { touchInitiated, touchMoved } = this.state;
    if (touchInitiated
        && !touchMoved
        && this.actionMenu
        && this.actionMenu.current
        && !this.actionMenu.current.contains(event.target)) {
      this.setState({
        touchInitiated: false
      });
      onDismiss && onDismiss();
      return true;
    }
    return false;
  };

  /* Subviews */

  getActions = (actions) => {
    if (!actions || !actions.length) {
      return null;
    }
    return actions.map((item) => (
      <div
        className={cx(style['chat-menu-item'])}
        key={item.type}
        onClick={item.action}
      >
        <LazyImage
          className={cx(style['chat-menu-item__icon'])}
          label='menu-icon'
          loader='icon'
          placeholder={item.type}
          source={item.icon}
        />
        <label className={cx(style['chat-menu-item__label'])}>{item.label}</label>
      </div>
    ));
  };

}

Menu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'copy',
      'delete',
      'forward',
      'info',
      'pin',
      'reply'
    ]).isRequired
  })),
  className: PropTypes.string,
  isRightSided: PropTypes.bool,
  messageId: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'dock',
    'list',
    'modal',
    'row'
  ]),
  onDismiss: PropTypes.func,
  relativeX: PropTypes.number,
  relativeY: PropTypes.number,
  userId: PropTypes.string.isRequired
};

Menu.defaultProps = {
  className: null,
  isRightSided: false,
  onDismiss: null,
  relativeX: null,
  relativeY: null,
  type: 'row'
};

export default Menu;
