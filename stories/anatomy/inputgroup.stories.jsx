import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import InputGroup from '../../src/components/InputGroup/InputGroup.jsx';

const actionsStub = [
  {
    action: action('Copy Clicked'),
    label: 'audio',
    type: 'audio'
  },
  {
    action: action('Delete Clicked'),
    label: 'file',
    type: 'file'
  },
  {
    action: action('Forward Clicked'),
    label: 'gif',
    type: 'gif'
  },
  {
    action: action('Info Clicked'),
    label: 'image',
    type: 'image'
  },
  {
    action: action('Pin Clicked'),
    label: 'link',
    type: 'link'
  },
  {
    action: action('Reply Clicked'),
    label: 'location',
    type: 'location'
  },
  {
    action: action('Reply Clicked'),
    label: 'markdown',
    type: 'markdown'
  },
  {
    action: action('Reply Clicked'),
    label: 'pdf',
    type: 'pdf'
  },
  {
    action: action('Reply Clicked'),
    label: 'video',
    type: 'video'
  }
];

class InputGroupPage extends React.Component {

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
      theme: 'light',
      input: ''
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
      <React.Fragment>
        <div className='storybook__container'>
          <span className='storybook__text storybook__title'>
            Textarea Auto Resize
          </span>
          <span className='storybook__text'>
            An InputGroup will feature multiple input actions, with text as the main input.
          </span>
          <span className='storybook__text'>
            The textarea will resize according to the text length, as well as the state of expansion of the text view.
          </span>
          <span className='storybook__text'>
            Similar to the Message view, the InputGroup view also requires an AppContext provider,
            without which it will not be able to operate.
          </span>
          <div className='storybook__segment storybook__segment--full'>
            <AppProvider {...context}>
              <InputGroup
                attachOptions={actionsStub}
                onAttach={action('Attach Pressed')}
                onChange={this.updateInput}
                onCollapse={action('Input Collapsed')}
                onExpand={action('Input Expanded')}
                onSend={this.sendMessage}
                placeholder='Type here...'
                value={input}
              />
            </AppProvider>
          </div>
        </div>
      </React.Fragment>
    );
  };

  /* Events */

  updateInput = (nextInput) => {
    action('Input Changed')(nextInput);
    this.setState({
      input: nextInput
    });
  };

  sendMessage = (input) => {
    action('Input Submitted')(input);
    this.setState({
      input: ''
    });
  }

}

export default InputGroupPage;
