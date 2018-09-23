import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import InputGroup from '../../src/components/InputGroup/InputGroup.jsx';

const actionsStub = [
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
    this.setState({
      offset: this.inputGroup ? this.inputGroup.getHeight() : 0
    });
  };

  componentDidUpdate = () => {
    if (this.inputGroup && this.inputGroup.getHeight() !== this.state.offset) {
      this.setState({
        offset: this.inputGroup.getHeight()
      });
    }
  };

  componentWillUnmount = () => {
    if (window) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  };

  render = () => {
    const { input, offset, ...context } = this.state;
    return (
      <React.Fragment>
        <div
          className='storybook__scroll-column'
          style={{ paddingBottom: `${Math.max(0, offset - 30)}px` }}
        >
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
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Style Dependent Layout
            </span>
            <span className='storybook__text'>
              The InputGroup layout will also depend on the overall chat layout specified.
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
              The value will be a stringified representation of innerHTML. Since the value will be set into innerHTML,
              it is critical to sanitize the value before updating the <code>value</code> props.
            </span>
            <span className='storybook__text'>
              Sanitization is performed using DOMPurify.
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
        <div
          className='storybook__container'
          style={{ padding: '0' }}
        >
          <div className='storybook__segment storybook__segment--row'>
            <AppProvider {...context}>
              <InputGroup
                attachOptions={actionsStub}
                onAttach={action('Attach Pressed')}
                onChange={this.updateInput}
                onCollapse={action('Input Collapsed')}
                onExpand={action('Input Expanded')}
                onSend={this.sendMessage}
                placeholder='Type here...'
                ref={(element) => this.inputGroup = element}
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
