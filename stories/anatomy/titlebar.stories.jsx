import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import TitleBar from '../../src/components/TitleBar/TitleBar.jsx';

class TitleBarPage extends React.Component {

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
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>
        Return and Info
      </span>
      <span className='storybook__text'>
        A title bar can have actions such as returning to a previous page,
        or opening an info panel that describes the chat room.
      </span>
      <span className='storybook__text'>
        While the views for either case are not included,
        the means to access them are provided via interactions with the <code>back</code> button
        and the <code>info</code> or <code>avatar</code> button.
      </span>
      <span className='storybook__text'>
        Again, note that title bar also requires the explicit declaration of <code>AppContext</code>.
      </span>
      <br/>
      <div className='storybook__segment storybook__segment--row'>
        <AppProvider {...this.state}>
          <TitleBar
            id='1'
            onInfo={action('Info Pressed')}
            onReturn={action('Back Pressed')}
            subtitle='9 members available'
            title='Friday Standup Group And Along With 4 Other Random Strangers'
          />
        </AppProvider>
      </div>
    </div>
  );

}

export default TitleBarPage;
