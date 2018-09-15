import React from 'react';
import PropTypes from 'prop-types';

export const ChatRoomContext = React.createContext();

const ChatRoomProvider = (props) => {
  const { children, ...rest } = props;
  return (
    <ChatRoomContext.Provider value={rest}>
      {children}
    </ChatRoomContext.Provider>
  );
};

ChatRoomProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  layout: PropTypes.oneOf([
    'aligned',
    'staggered'
  ]),
  sizing: PropTypes.oneOf([
    'desktop',
    'mobile',
    'tablet'
  ]),
  theme: PropTypes.oneOf([
    'dark',
    'light'
  ])
};

ChatRoomProvider.defaultProps = {
  children: [],
  layout: 'staggered',
  sizing: 'desktop',
  theme: 'light'
};

export default ChatRoomProvider;
