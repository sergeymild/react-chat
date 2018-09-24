import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import ChatRoom from '../../src/components/ChatRoom/ChatRoom.jsx';

const attachOptionsStub = [
  {
    action: action('Audio Clicked'),
    label: 'audio',
    type: 'audio'
  },
  {
    action: action('File Clicked'),
    label: 'file',
    type: 'file'
  },
  {
    action: action('GIF Clicked'),
    label: 'gif',
    type: 'gif'
  },
  {
    action: action('Image Clicked'),
    label: 'image',
    type: 'image'
  },
  {
    action: action('Link Clicked'),
    label: 'link',
    type: 'link'
  },
  {
    action: action('Location Clicked'),
    label: 'location',
    type: 'location'
  },
  {
    action: action('Markdown Clicked'),
    label: 'markdown',
    type: 'markdown'
  },
  {
    action: action('PDF Clicked'),
    label: 'pdf',
    type: 'pdf'
  },
  {
    action: action('Video Clicked'),
    label: 'video',
    type: 'video'
  }
];

const menuActionsStub = [
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
  {
    messageId: '000',
    text: 'Nick Fury created \'Avengers Assemble\'. \n This is the beginning of the conversation.',
    timeStamp: '2018-09-23T12:55:21Z',
    type: 'system'
  },
  {
    isDelivered: true,
    isRead: true,
    messageId: '001',
    senderId: '6',
    text: 'Okay y\'all own time own target carry on ah!',
    timeStamp: '2018-09-23T12:56:06Z',
    type: 'text'
  },
  {
    isDelivered: true,
    messageId: '002',
    senderId: '1',
    text: 'Don\'t waste time liao. Anyone in for prata?',
    timeStamp: '2018-09-23T12:56:43Z',
    type: 'text'
  },
  {
    isDelivered: true,
    messageId: '003',
    senderId: '2',
    text: 'I free 6pm. Ai mai?',
    timeStamp: '2018-09-23T13:03:28Z',
    type: 'text'
  },
  {
    isDelivered: true,
    messageId: '004',
    senderId: '2',
    text: 'Wait maybe 7pm leh...',
    timeStamp: '2018-09-23T13:03:47Z',
    type: 'text'
  },
  {
    isDelivered: true,
    messageId: '005',
    senderId: '3',
    text: 'Eh I coming in from Tuas.',
    timeStamp: '2018-09-23T13:11:57Z',
    type: 'text'
  },
  {
    isDelivered: true,
    messageId: '006',
    senderId: '3',
    text: 'Might late and scared MRT breakdown =/',
    timeStamp: '2018-09-23T13:12:20Z',
    type: 'text'
  },
  {
    messageId: '007',
    senderId: '3',
    text: 'Maybe will join arnd 8 lor.',
    timeStamp: '2018-09-23T13:13:04Z',
    type: 'text'
  },
];

const usersStub = {
  '1': {
    id: '1',
    name: 'Tony Stark'
  },
  '2': {
    id: '2',
    name: 'Steve Rogers'
  },
  '3': {
    id: '3',
    name: 'Thor'
  },
  '4': {
    id: '4',
    name: 'Natasha Romanoff'
  },
  '5': {
    id: '5',
    name: 'Bruce Banner'
  },
  '6': {
    id: '6',
    name: 'Nick Fury'
  }
};

class ChatRoomPage extends React.Component {

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
      filter: '',
      input: '',
      layout: 'staggered',
      offset: 0,
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

  render = () => {
    const { input, ...context } = this.state;
    return (
      <div className='storybook__segment storybook__segment--row storybook__segment--full'>
        <div className='storybook__segment storybook__segment--column'>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Chat Room
            </span>
            <span className='storybook__text'>
              An input group will feature multiple input actions, with text as the main input.
            </span>
            <span className='storybook__text'>
              The text area will resize according to the text length, as well as the state of expansion of the text view.
            </span>
            <span className='storybook__text'>
              Similar to the message view, the input group also requires an <code>AppContext</code> provider,
              without which it will not be able to operate.
            </span>
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Style Dependent Layout
            </span>
            <span className='storybook__text'>
              The input group layout will also depend on the overall chat layout specified.
            </span>
            <span className='storybook__text'>
              Media and attachments are not fully supported yet.
            </span>
            <div className='storybook__segment storybook__segment--column'>
              <br/>
              <span>
                {'Current layout: '}
                <code>{context.layout}</code>
              </span>
              <br/>
              <button
                className='storybook__button'
                onClick={() => this.setState({
                  layout: context.layout === 'staggered' ? 'aligned' : 'staggered'
                })}
              >
                <span>Toggle Layout</span>
              </button>
            </div>
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Controlled Input
            </span>
            <span className='storybook__text'>
              Input value can be affected through the key <code>value</code> and is intercepted using <code>onChange</code>.
            </span>
            <span className='storybook__text'>
              The value will be a stringified representation of inner HTML. Since the value will be set into inner HTML,
              it is critical to sanitize the value before updating the <code>value</code> props.
            </span>
            <span className='storybook__text'>
              Sanitization is performed using <code>DOMPurify</code>.
            </span>
            <div className='storybook__segment storybook__segment--column'>
              <br/>
              <span>
                {'Input Intercepted: '}
              </span>
              <br/>
              <div className='storybook__code-preview'>
                <span className='storybook__code-preview-text'>
                  {input}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='storybook__segment storybook__segment--column storybook__scroll-column story-chat-room__preview'>
          <div className='storybook__container storybook__segment--full'>
            <ChatRoom
              attachOptions={attachOptionsStub}
              inputHint='Type here...'
              inputValue={input}
              layout={context.layout}
              menuActions={menuActionsStub}
              messages={messagesStub}
              onAttach={action('Attach Clicked')}
              onAvatar={action('Avatar Clicked')}
              onContent={action('Content Clicked')}
              onFilter={this.updateFilter}
              onInfo={action('Info Clicked')}
              onInput={this.updateInput}
              onMenu={action('Menu Clicked')}
              onRefresh={this.updateMessages}
              onReturn={action('Return Clicked')}
              onSend={this.sendMessage}
              roomId='123'
              roomName='Avengers Assemble'
              sizing={context.sizing}
              theme={context.theme}
              userId='1'
              users={usersStub}
            />
          </div>
        </div>
      </div>
    );
  };

  /* Events */

  updateFilter = (nextInput) => {
    action('Filter Changed')(nextInput);
    this.setState({
      filter: nextInput
    });
  };

  updateInput = (nextInput) => {
    action('Input Changed')(nextInput);
    this.setState({
      input: nextInput
    });
  };

  updateMessages = () => {
    // TODO: Mock refresh logic...
    action('Messages Changed')();
  };

  sendMessage = (input) => {
    action('Input Submitted')(input);
    this.setState({
      input: ''
    });
  };

}

export default ChatRoomPage;
