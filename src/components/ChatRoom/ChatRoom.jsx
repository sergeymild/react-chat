import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AppProvider from '../App/Context.jsx';
import InputGroup from '../InputGroup/InputGroup.jsx';
import Message from '../Message/Message.jsx';
import TitleBar from '../TitleBar/TitleBar.jsx';

import style from './ChatRoom.scss';

class ChatRoom extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      isRefreshing: false
    };
  }

  render = () => {
    const { className, layout, sizing, theme } = this.props;
    const stylingContext = { layout, sizing, theme };
    const messages = this.getMessages();
    const dividers = this.getDividers();
    const content = messages.concat(dividers);
    content.sort((first, second) => first.date - second.date);
    const elements = content.map((item) => item.element);
    return (
      <AppProvider {...stylingContext}>
        <div
          className={cx(
            `chat-room--${theme}`,
            className,
            style['chat-room']
          )}
        >
          {this.getTitleBar()}
          {this.getSearchBar()}
          <div className={cx(style['chat-room__body'])}>
            {elements}
          </div>
          {this.getInputGroup()}
        </div>
      </AppProvider>
    );
  };

  /* Subviews */

  getTitleBar = () => {
    const { onReturn, onInfo } = this.props;
    const { roomAvatar, roomId, roomName } = this.props;
    const { users } = this.props;
    const usersCount = Object.keys(users).length;
    return (
      <TitleBar
        avatar={roomAvatar}
        onInfo={onInfo}
        onReturn={onReturn}
        ref={(element) => this.titleBar = element}
        roomId={roomId}
        subtitle={usersCount > 2 ? `${usersCount} members` : null}
        title={roomName}
      />
    );
  };

  getSearchBar = () => {
    const { onFilter } = this.props;

    // TODO: Implement search bar

    return null;
  };

  getDividers = () => {
    const { messages } = this.props;
    const dates = new Set();
    const dividers = [];
    messages.map((message) => {
      const date = new Date(message.timeStamp);
      if (!date) {
        return;
      }
      const dateString = [date.getDate(), date.getMonth() + 1, date.getFullYear].join('-');
      dates.add(dateString);
    });
    dates.forEach((value) => {
      const [day, month, year] = value.split('-');
      const uniqueDate = new Date(year, month - 1, day);
      const element = this.getDivider(uniqueDate);
      dividers.push({
        date: uniqueDate,
        element
      });
    });
    return dividers;
  };

  getDivider = (date) => {

    // TODO: Implement dividers

    return null;
  };

  getMessages = () => {
    const { messages, users } = this.props;
    return messages.map((message, index, all) => {
      const sender = users[message.senderId];
      const timeStamp = message.timeStamp;
      const date = new Date(timeStamp);
      let element = null;
      if (sender) {
        const prevMessage = index - 1 >= 0 ? all[index - 1] : null;
        const nextMessage = index + 1 < messages.length ? all[index + 1] : null;
        const isStartOfBlock = !prevMessage || !prevMessage.senderId || prevMessage.senderId !== sender.id;
        const isEndOfBlock = !nextMessage || !nextMessage.senderId || nextMessage.senderId !== sender.id;
        let position = 'middle';
        if (isStartOfBlock && isEndOfBlock) {
          position = 'isolated';
        } else if (isStartOfBlock) {
          position = 'top';
        } else if (isEndOfBlock) {
          position = 'bottom';
        }
        element = this.getMessage(message, sender, position);
      } else {
        element = this.getMessage(message);
      }
      return { date, element };
    });
  };

  getMessage = (message, sender = null, position = null) => {
    const { menuActions, hideAvatar, onAvatar, onMenu, onContent, userId } = this.props;
    const { messageId, type, ...content } = message;
    return (
      <Message
        content={content}
        hideAvatar={hideAvatar}
        key={messageId}
        menuActions={menuActions}
        messageId={messageId}
        onHoldContent={onMenu}
        onTouchAvatar={onAvatar}
        onTouchContent={onContent}
        position={position}
        sender={sender}
        type={type}
        userId={userId}
      />
    );
  };

  getInputGroup = () => {
    const { attachOptions, inputHint, inputData, inputValue, onAttach, onInput, onSend } = this.props;
    return (
      <InputGroup
        attachOptions={attachOptions}
        data={inputData}
        onAttach={onAttach}
        onChange={onInput}
        onSend={onSend}
        placeholder={inputHint}
        ref={(element) => this.inputGroup = element}
        value={inputValue}
      />
    );
  };

  getRefresh = () => {
    const { onRefresh } = this.props;
    const { isRefreshing } = this.state;

    // TODO: Implement refresh

    return null;
  };

}

ChatRoom.propTypes = {
  attachOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
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
  })),
  className: PropTypes.string,
  hideAvatar: PropTypes.bool,
  inputData: PropTypes.shape({
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
  inputHint: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  layout: PropTypes.oneOf([
    'aligned',
    'staggered'
  ]),
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
  messages: PropTypes.arrayOf(PropTypes.shape({
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
    isLoading: PropTypes.bool,
    isRead: PropTypes.bool,
    messageId: PropTypes.string.isRequired,
    senderId: PropTypes.string,
    text: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'event',
      'media',
      'system',
      'text'
    ]).isRequired
  })).isRequired,
  onAttach: PropTypes.func,
  onAvatar: PropTypes.func,
  onContent: PropTypes.func,
  onFilter: PropTypes.func,
  onInfo: PropTypes.func,
  onInput: PropTypes.func,
  onMenu: PropTypes.func,
  onRefresh: PropTypes.func,
  onReturn: PropTypes.func,
  onSend: PropTypes.func,
  roomAvatar: PropTypes.string,
  roomId: PropTypes.string.isRequired,
  roomName: PropTypes.string,
  sizing: PropTypes.oneOf([
    'desktop',
    'mobile',
    'tablet'
  ]),
  theme: PropTypes.oneOf([
    'dark',
    'light'
  ]),
  userId: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    website: PropTypes.string
  })).isRequired
};

ChatRoom.defaultProps = {
  attachOptions: null,
  className: null,
  hideAvatar: false,
  inputData: null,
  inputHint: null,
  layout: 'staggered',
  menuActions: null,
  onAttach: null,
  onAvatar: null,
  onContent: null,
  onFilter: null,
  onInfo: null,
  onInput: null,
  onMenu: null,
  onRefresh: null,
  onReturn: null,
  onSend: null,
  roomAvatar: null,
  roomName: 'Messages',
  sizing: 'desktop',
  theme: 'light'
};

export default ChatRoom;
