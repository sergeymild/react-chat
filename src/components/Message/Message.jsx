import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import { AppContext } from '../App/Context.jsx';
import Avatar from '../Avatar/Avatar.jsx';
import Content from '../Content/Content.jsx';
import Menu from '../Menu/Menu.jsx';

import style from './message.scss';

class Message extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      menuPosition: {
        relativeX: 0,
        relativeY: 0
      },
      shouldDisplayMenu: false
    };
    this.self = React.createRef();
  }

  render = () => {
    const { shouldDisplayMenu } = this.state;
    const { className, hideAvatar, menuActions, position, sender, type, userId } = this.props;
    const haveContext = type.match(/^(event|media|text)$/);
    const haveOwnership = type.match(/^(media|text)$/);
    return (
      <AppContext.Consumer>
        {(context) => (
          <div
            className={cx(
              'react-chat__message',
              `react-chat__message--${context.theme}`,
              className,
              position && style[`chat-message--${position}`],
              style['chat-message'],
              style[`chat-message--${context.theme}`],
              !sender
                ? style['chat-message--center']
                : context.layout === 'aligned'
                  ? style['chat-message--full']
                  : userId === sender.id
                    ? style['chat-message--right']
                    : style['chat-message--left']
            )}
            ref={this.self}
          >
            {haveOwnership && sender && !hideAvatar && this.getAvatar(context)}
            {this.getContent(
              context,
              haveContext && menuActions && shouldDisplayMenu && this.getMenu(context)
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  /* Subviews */

  getAvatar = (context) => {
    const { layout, sizing, theme } = context;
    const { isLoading, onTouchAvatar, position, sender, userId } = this.props;
    if (!sender) {
      return null;
    }
    if (!sender || layout === 'staggered' && (sizing === 'mobile' || sender.id === userId)) {
      return null;
    }
    let source = null;
    let action = null;
    const shouldShowAvatar = position && position.match(/^(top|isolated)$/);
    if (shouldShowAvatar) {
      source = sender.avatar;
      action = onTouchAvatar ? onTouchAvatar.bind(null, sender.id) : null;
    }
    return (
      <Avatar
        className={cx(
          'react-chat__message-avatar',
          `react-chat__message-avatar--${theme}`,
          style['chat-message__avatar']
        )}
        hidden={!shouldShowAvatar}
        isLoading={isLoading}
        name={sender.name || ''}
        onClick={action}
        shape={layout === 'staggered' ? 'circle' : 'square'}
        source={source}
      />
    );
  };

  getContent = (context, menu) => {
    const { layout, sizing, theme } = context;
    const { content, isLoading, menuActions, messageId, position, sender, type, userId } = this.props;
    const { onTouchContent, onHoldContent } = this.props;
    const { shouldDisplayMenu } = this.state;
    const id = sender ? sender.id : null;
    const name = sender ? sender.name : null;
    const isSender = id === userId;
    const isReady = !isLoading  && content && Object.keys(content).length > 0;
    const shouldHideName = (layout === 'staggered' && isSender) || !position || position.match(/^(middle|bottom)$/);
    const senderName = !shouldHideName ? name : null;
    const touchAction = onTouchContent ? (event) => !shouldDisplayMenu && onTouchContent(messageId, event) : null;
    return (
      <Content
        {...content}
        className={cx(
          'react-chat__message-content',
          `react-chat__message-content--${theme}`,
          shouldDisplayMenu && layout === 'staggered' && style['chat-message__content--float']
        )}
        isDesktop={sizing === 'desktop'}
        isLoading={!isReady}
        messageId={messageId}
        onHold={this.holdAction(menuActions, onHoldContent)}
        onPress={touchAction}
        position={position}
        senderName={senderName}
        type={type}
        variant={layout === 'aligned' ? 'full' : isSender ? 'right' : 'left'}
      >
        {menu}
      </Content>
    );
  };

  getMenu = (context) => {
    const { layout, sizing, theme } = context;
    const { menuActions, messageId, userId, sender, type } = this.props;
    const { menuPosition, shouldDisplayMenu } = this.state;
    if (!shouldDisplayMenu) {
      return null;
    }
    const filteredActions = type === 'event'
      ? menuActions.filter((item) => item.type !== 'reply')
      : menuActions;
    const boundActions = filteredActions.map((item) => {
      const { action, ...rest } = item;
      return {
        action: () => {
          this.dismissActionMenu();
          action(messageId, sender ? sender.id : null);
        },
        ...rest
      };
    });
    const menuType = layout === 'staggered'
      ? sizing === 'desktop' ? 'list' : 'row'
      : 'dock';
    return (
      <Menu
        {...menuPosition}
        actions={boundActions}
        className={cx(
          'react-chat__message-menu',
          `react-chat__message-menu--${theme}`
        )}
        isRightSided={layout === 'staggered' && sender && sender.id === userId}
        messageId={messageId}
        onDismiss={this.dismissActionMenu}
        type={menuType}
        userId={userId} />
    );
  };

  /* Event Handlers */

  dismissActionMenu = () => this.setState({
    shouldDisplayMenu: false
  });

  holdAction = (menuActions, onHoldContent) => (messageId, event, target) => {
    if (event && target && menuActions && Object.keys(menuActions).length > 0) {
      const rect = target.getBoundingClientRect();
      const relativeX = (event.clientX || event.touches[0].clientX) - rect.left;
      const relativeY = (event.clientY || event.touches[0].clientY) - rect.top;
      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate(20);
      }
      this.setState({
        menuPosition: { relativeX, relativeY },
        shouldDisplayMenu: true
      });
    }
    onHoldContent(messageId, event);
  };

  /* Ref Accessors */

  scrollIntoView = (params) => {
    const element = this.self;
    if (element && element.current) {
      element.current.scrollIntoView(params);
    }
  };

}

Message.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    data: PropTypes.shape({
      coordinates: PropTypes.shape({
        lat: PropTypes.string,
        lng: PropTypes.string
      }),
      galleryId: PropTypes.string,
      markdown: PropTypes.string,
      metadata: PropTypes.object,
      source: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'audio',
        'file',
        'gif',
        'image',
        'link',
        'location',
        'markdown',
        'pdf',
        'video'
      ]).isRequired
    }),
    eventContent: PropTypes.element,
    eventName: PropTypes.string,
    isDelivered: PropTypes.bool,
    isRead: PropTypes.bool,
    text: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
  }).isRequired,
  hideAvatar: PropTypes.bool,
  isLoading: PropTypes.bool,
  menuActions: PropTypes.arrayOf(PropTypes.shape({
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
  messageId: PropTypes.string,
  onHoldContent: PropTypes.func,
  onTouchAvatar: PropTypes.func,
  onTouchContent: PropTypes.func,
  position: PropTypes.oneOf([
    'bottom',
    'isolated',
    'middle',
    'top'
  ]),
  sender: PropTypes.shape({
    avatar: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  type: PropTypes.oneOf([
    'event',
    'media',
    'system',
    'text'
  ]).isRequired,
  userId: PropTypes.string.isRequired
};

Message.defaultProps = {
  className: null,
  hideAvatar: false,
  isLoading: false,
  menuActions: null,
  messageId: null,
  onHoldContent: null,
  onTouchAvatar: null,
  onTouchContent: null,
  position: 'isolated',
  sender: null
};

export default Message;
