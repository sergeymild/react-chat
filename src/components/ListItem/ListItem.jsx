import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import { AppContext } from '../App/Context.jsx';
import Avatar from '../Avatar/Avatar.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './listitem.scss';

class ListItem extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.itemMenu = React.createRef();
    this.state = {
      isMenuOpen: false,
      touchInitiated: false,
      touchMoved: false
    };
  }

  componentDidMount = () => {
    if (document) {
      document.addEventListener('click', this.checkTouch);
      document.addEventListener('touchstart', this.beginTouch);
      document.addEventListener('touchmove', this.endTouch);
      document.addEventListener('touchend', this.checkTouch);
    }
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('click', this.checkTouch);
      document.removeEventListener('touchstart', this.beginTouch);
      document.removeEventListener('touchmove', this.endTouch);
      document.removeEventListener('touchend', this.checkTouch);
    }
    this.endLongPress();
    this.longPressTimer = null;
  };

  render = () => {
    const { className } = this.props;
    return (
      <AppContext.Consumer>
        {(context) => (
          <div
            className={cx(
              'react-chat__list-item',
              `react-chat__list-item--${context.theme}`,
              className,
              style['chat-list-item']
            )}
          >
            <div className={cx(style['chat-list-item__row'])}>
              {this.getAvatar(context)}
              {this.getContent(context)}
            </div>
            {this.getMenu(context)}
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  /* Subviews */

  getAvatar = (context) => {
    const { avatar, hideAvatar, label, onAvatar } = this.props;
    const { layout, theme } = context;
    return (
      <Avatar
        className={cx(
          'react-chat__list-item-avatar',
          `react-chat__list-item-avatar--${theme}`,
          style['chat-list-item__avatar'],
          style[`chat-list-item__avatar--${layout}`]
        )}
        hidden={hideAvatar}
        name={label}
        onClick={onAvatar}
        shape={layout === 'staggered' ? 'circle' : 'square'}
        source={avatar}
      />
    );
  };

  getContent = (context) => {
    const { itemId, onItem, title, subtitle, description, hideChevron, timeStampAsSubtitle } = this.props;
    const { isMenuOpen } = this.state;
    const { theme } = context;
    const timeStamp = this.getTimeStamp();
    const status = this.getStatus();
    return (
      <div
        className={cx(
          'react-chat__list-item-content',
          `react-chat__list-item-content--${theme}`,
          style['chat-list-item__content']
        )}
        onContextMenu={context.sizing === 'desktop' ? this.beginRightClick(this.showMenu, itemId) : null}
        onTouchStart={this.beginLongPress(this.showMenu, itemId)}
        onTouchMove={this.endLongPress}
        onTouchEnd={this.endLongPress}
        onClick={(event) => !isMenuOpen && onItem(itemId, event)}
      >
        <div className={cx(style['chat-list-item__column'])}>
          <div className={cx(style['chat-list-item__row'])}>
            <span className={cx(
              'react-chat__list-item-title',
              style['chat-list-item__title']
            )}>
              {title}
            </span>
            {!timeStampAsSubtitle && timeStamp}
          </div>
          <div className={cx(style['chat-list-item__row'])}>
            <span className={cx(
              'react-chat__list-item-subtitle',
              style['chat-list-item__subtitle']
            )}>
              {timeStampAsSubtitle ? timeStamp : subtitle}
            </span>
            {status}
          </div>
          <div className={cx(style['chat-list-item__row'])}>
            <span className={cx(
              'react-chat__list-item-description',
              style['chat-list-item__description']
            )}>
              {description}
            </span>
          </div>
        </div>
        <div className={cx(style['chat-list-item__chevron'])}>
          {!hideChevron && this.getIcon('chevron', 'next')}
        </div>
      </div>
    );
  };

  getTimeStamp = () => {
    const { timeStamp } = this.props;
    const date = new Date(timeStamp);
    if (!date) {
      return null;
    }
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0);
    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);
    let dateString = null;
    if (baseDate.toDateString() === today.toDateString()) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'AM' : 'PM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      dateString = `${hours}:${minutes} ${ampm}`;
    } else if (baseDate.toDateString() === yesterday.toDateString()) {
      dateString = 'Yesterday';
    } else if (date - weekAgo > 0) {
      const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      dateString = day[date.getDay()];
    } else if (date.getFullYear === now.getFullYear) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateString = `${date.getDate()} ${months[date.getMonth()]}`;
    } else {
      dateString = [date.getDate(), date.getMonth() + 1, date.getFullYear].join('/');
    }
    return (
      <span className={cx(
        'react-chat__list-item-timestamp',
        style['chat-list-item__timestamp']
      )}>
        {dateString}
      </span>
    );
  };

  getStatus = () => {
    const { status } = this.props;
    if (!status) {
      return null;
    }
    return (
      <div className={cx(
        'react-chat__list-item-status',
        style['chat-list-item__status'],
        style[`chat-list-item__status--${status}`]
      )}>
        {this.getIcon(status, status)}
      </div>
    );
  };

  getMenu = (context) => {
    const { contextOptions } = this.props;
    const { isMenuOpen } = this.state;
    const { theme } = context;
    if (!contextOptions || !isMenuOpen) {
      return null;
    }
    const actions = contextOptions.map(this.getAction).filter((x) => x);
    return (
      <div
        className={cx(
          'react-chat__list-item-menu',
          `react-chat__list-item-menu--${theme}`,
          style['chat-list-item__menu']
        )}
        ref={this.itemMenu}
      >
        {actions}
      </div>
    );
  };

  getAction = (item) => {
    const { itemId } = this.props;
    const { action, icon, label, type } = item;
    if (!action) {
      return null;
    }
    return (
      <div
        className={cx(
          'react-chat__list-item-action',
          style['chat-list-item__action'],
          style[`chat-list-item__action--${label}`]
        )}
        key={type}
        onClick={(event) => {
          this.setState({
            isMenuOpen: false
          });
          action(itemId, event);
        }}
      >
        {this.getIcon(label, type, icon)}
      </div>
    );
  };

  getIcon = (label, key, source = null) => (
    <LazyImage
      className={cx(
        'react-chat__list-item-icon',
        `react-chat__list-item-icon--${key}`,
        style['chat-list-item__icon'],
        style[`chat-list-item__icon--${key}`]
      )}
      key={key}
      label={label}
      loader='icon'
      placeholder={key}
      source={source}
    />
  );

  /* Events */

  beginTouch = () => this.setState({
    touchInitiated: true,
    touchMoved: false
  });

  endTouch = () => this.setState({
    touchMoved: true
  });

  checkTouch = (event) => {
    const { touchInitiated, touchMoved } = this.state;
    if (event.type === 'click' || (touchInitiated && !touchMoved)) {
      this.setState({
        touchInitiated: false
      });
      this.hideMenu(event);
    }
  };

  beginLongPress = (action, id) => action && ((event) => {
    if (event) {
      event.persist();
    }
    this.longPressTimer = setTimeout(() => {
      this.setState({
        touchInitiated: false
      });
      action(id, event, event.target);
    }, 700);
  });

  endLongPress = (event) => {
    const { isMenuOpen } = this.state;
    if (isMenuOpen && event && event.cancelable && !event.type.match(/^(touchmove|scroll)$/)) {
      event.preventDefault();
    }
    this.longPressTimer && clearTimeout(this.longPressTimer);
  };

  beginRightClick = (action, id) => (event) => {
    if (event && event.cancelable && !event.type.match(/^(touchmove|scroll)$/)) {
      event.preventDefault();
    }
    action(id, event, event.target);
    return false;
  };

  showMenu = (id, event, target) => {
    const { contextOptions, onContext } = this.props;
    const { isMenuOpen } = this.state;
    if (contextOptions) {
      this.setState({
        isMenuOpen: !isMenuOpen
      });
    }
    if (!isMenuOpen) {
      onContext && onContext(id, event, target);
    }
  };

  hideMenu = (event) => {
    if (this.itemMenu && this.itemMenu.current && !this.itemMenu.current.contains(event.target)) {
      this.setState({
        isMenuOpen: false
      });
    }
  };

}

ListItem.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  contextOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'archive',
      'delete',
      'info',
      'pin',
      'star',
      'unread'
    ]).isRequired
  })),
  description: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  hideAvatar: PropTypes.bool,
  hideChevron: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onAvatar: PropTypes.func,
  onContext: PropTypes.func,
  onItem: PropTypes.func,
  status: PropTypes.oneOf([
    'archive',
    'pin',
    'star',
    'new'
  ]),
  subtitle: PropTypes.string,
  timeStamp: PropTypes.string.isRequired,
  timeStampAsSubtitle: PropTypes.bool,
  title: PropTypes.string.isRequired
};

ListItem.defaultProps = {
  avatar: null,
  className: null,
  contextOptions: null,
  description: null,
  hideAvatar: false,
  hideChevron: false,
  onAvatar: null,
  onContext: null,
  onItem: null,
  status: null,
  subtitle: null,
  timeStampAsSubtitle: false
};

export default ListItem;
