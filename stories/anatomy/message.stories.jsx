import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import Message from '../../src/components/Message/Message.jsx';

const actionsStub = [
  {
    action: action('Copy Clicked'),
    label: 'Copy',
    type: 'copy'
  },
  {
    action: action('Delete Clicked'),
    label: 'Delete',
    type: 'delete'
  },
  {
    action: action('Forward Clicked'),
    label: 'Forward',
    type: 'forward'
  },
  {
    action: action('Info Clicked'),
    label: 'Info',
    type: 'info'
  },
  {
    action: action('Pin Clicked'),
    label: 'Pin',
    type: 'pin'
  },
  {
    action: action('Reply Clicked'),
    label: 'Reply',
    type: 'reply'
  }
];

const messagesStub = [
  null,
  {
    text: 'Squeak squeak!',
    timeStamp: '2018-08-09T12:53:00Z'
  },
  {
    text: 'I\'m tiny and white!',
    timeStamp: '2018-08-09T12:54:00Z'
  },
  {
    text: 'Hey Stuart! Have you seen Minnie?',
    timeStamp: '2018-08-09T12:54:00Z'
  },
  {
    text: 'I\'ve looked everywhere...',
    timeStamp: '2018-08-09T12:55:00Z'
  },
  {
    text: 'but I cannot find her... =(',
    timeStamp: '2018-08-09T12:55:00Z'
  }
];

const mickey = {
  id: '1',
  name: 'Mickey Mouse'
};

const stuart = {
  id: '2',
  name: 'Stuart'
};

const messageProps = {
  menuActions: actionsStub,
  onHoldContent: action('Long-Pressed / Right-Clicked Content'),
  onTouchAvatar: action('Clicked Avatar'),
  onTouchContent: action('Clicked Content'),
  sender: stuart,
  type: 'text',
  userId: '1'
};

class MessagePage extends React.Component {

  /* Event Listener */

  handleWindowResize = throttle(200, () => {
    if (window && navigator) {
      this.setState({
        sizing: window.innerWidth < 640 || /iPhone|iPod|Android/i.test(navigator.userAgent)
          ? 'mobile'
          : window.innerWidth < 1024 || /iPad|Tablet/i.test(navigator.userAgent)
            ? 'tablet'
            : 'desktop'
      });
    }
  });

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      layout: 'staggered',
      sizing: 'desktop',
      theme: 'light'
    };
  }

  componentDidMount = () => {
    if (window) {
      window.addEventListener('resize', this.handleWindowResize);
      this.handleWindowResize();
    }
  };

  componentWillUnmount = () => {
    if (window) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  };

  render = () => (
    <React.Fragment>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          Message
        </span>
        <span className='storybook__text'>
          A message view is a combination of avatar, content and menu.
        </span>
        <span className='storybook__text'>
          It implicitly styles its subviews based on the ownership of the content,
          as well as the layout, device and theme in context.
        </span>
        <span className='storybook__text'>
          As such, a message requires an <code>AppContext</code> provider,
          without which it will not be able to operate.
        </span>
        <div className='storybook__segment storybook__segment--column'>
          <AppProvider {...this.state}>
            <Message
              {...messageProps}
              content={messagesStub[1]}
              messageId='1'
              position='top'
            />
            <Message
              {...messageProps}
              content={messagesStub[2]}
              messageId='2'
              position='bottom'
            />
            <Message
              {...messageProps}
              content={messagesStub[3]}
              messageId='3'
              position='top'
              sender={mickey}
            />
            <Message
              {...messageProps}
              content={messagesStub[4]}
              messageId='4'
              position='middle'
              sender={mickey}
            />
            <Message
              {...messageProps}
              content={messagesStub[5]}
              messageId='5'
              position='bottom'
              sender={mickey}
            />
          </AppProvider>
        </div>
      </div>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          Aligned Mode
        </span>
        <span className='storybook__text'>
          Messages can be arranged in an flushed fashion.
        </span>
        <span className='storybook__text'>
          In this style, the behaviours of the message view differs from that of the staggered style.
        </span>
        <div className='storybook__segment storybook__segment--column'>
          <AppProvider
            {...this.state}
            layout='aligned'
          >
            <Message
              {...messageProps}
              content={messagesStub[1]}
              messageId='1'
              position='top'
            />
            <Message
              {...messageProps}
              content={messagesStub[2]}
              messageId='2'
              position='bottom'
            />
            <Message
              {...messageProps}
              content={messagesStub[3]}
              messageId='3'
              position='top'
              sender={mickey}
            />
            <Message
              {...messageProps}
              content={messagesStub[4]}
              messageId='4'
              position='middle'
              sender={mickey}
            />
            <Message
              {...messageProps}
              content={messagesStub[5]}
              messageId='5'
              position='bottom'
              sender={mickey}
            />
          </AppProvider>
        </div>
      </div>
    </React.Fragment>
  );

}

export default MessagePage;
