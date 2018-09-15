import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AppProvider from '../App/Context.jsx';
import styles from './ChatRoom.scss';

class ChatRoom extends React.Component {

  /*
    Lifecycle
  */

  constructor (props) {
    super(props);
    this.state = {
      isRefreshing: false
    };
  }

  componentDidMount = () => {
    // TODO: Client-side rendering init (detect media query)
    // TODO: Add listeners
  };

  shouldComponentUpdate = (nextProps) => {
    // TODO: Update logic
  };

  render = () => {
    const { layout, sizing, theme } = this.props;
    const stylingContext = { layout, sizing, theme };
    return (
      <AppProvider {...stylingContext}>
        {/* Subviews as children */}
      </AppProvider>
    );
  };

  componentWillUnmount = () => {
    // TODO: Remove and destroy listeners
  };

  /*
    Subviews
  */

  getTitleBar = () => {
    const { onReturn, onInfo } = this.props;
    const { roomAvatar, roomId, roomName } = this.props;
    const { users, userId } = this.props;
    return null;
  };

  getSearchBar = () => {
    const { onFilter } = this.props;
    return null;
  };

  getDividers = () => {
    const { messages } = this.props;
    return null;
  };

  getDivider = (date) => {
    return null;
  };

  getMessages = () => {
    const { messages, users } = this.props;
    return null;
  };

  getMessage = (message, sender) => {
    const { actions, userId } = this.props;
    return null;
  };

  getInputGroup = () => {
    const { onSend } = this.props;
    return null;
  };

  getRefresh = () => {
    const { onRefresh } = this.props;
    const { isRefreshing } = this.state;
    return null;
  };

}

ChatRoom.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
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
  layout: PropTypes.oneOf([
    'aligned',
    'staggered'
  ]),
  messages: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shapeOf({
      galleryId: PropTypes.string,
      source: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'audio',
        'file',
        'gif',
        'image',
        'location',
        'markdown',
        'pdf',
        'video'
      ]).isRequired
    }),
    isDelivered: PropTypes.bool,
    isRead: PropTypes.bool,
    messageId: PropTypes.string.isRequired,
    text: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'event',
      'media',
      'system',
      'text'
    ]).isRequired,
    senderId: PropTypes.string
  })).isRequired,
  onInfo: PropTypes.func,
  onFilter: PropTypes.func,
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
  actions: [],
  layout: 'staggered',
  onFilter: null,
  onInfo: null,
  onRefresh: null,
  onReturn: null,
  onSend: null,
  roomAvatar: null,
  roomName: 'Messages',
  sizing: 'desktop',
  theme: 'light'
};

export default ChatRoom;
