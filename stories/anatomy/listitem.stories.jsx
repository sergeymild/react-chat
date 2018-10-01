import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import ListItem from '../../src/components/ListItem/ListItem.jsx';

const chatListItemStub = {
  contextOptions: [
    {
      action: action('Archive Clicked'),
      label: 'archive',
      type: 'archive'
    },
    {
      action: action('Delete Clicked'),
      label: 'delete',
      type: 'delete'
    },
    {
      action: action('Info Clicked'),
      label: 'info',
      type: 'info'
    },
    {
      action: action('Pin Clicked'),
      label: 'pin',
      type: 'pin'
    },
    {
      action: action('Star Clicked'),
      label: 'star',
      type: 'star'
    },
    {
      action: action('Mark Unread Clicked'),
      label: 'unread',
      type: 'unread'
    }
  ],
  description: 'Hey long time no see guys. Want to meet up for coffee?',
  itemId: '123',
  label: 'Gathering',
  onAvatar: action('Avatar Clicked'),
  onContext: action('Context Triggered'),
  onItem: action('Item Clicked'),
  status: 'new',
  subtitle: 'Insurance Agent:',
  timeStamp: '2018-09-24T15:56:19Z',
  title: 'Gathering'
};

const searchListItemStub = {
  hideChevron: true,
  description: 'Owww~! Charlie bit my finger!',
  itemId: '123',
  label: 'Harry',
  onItem: action('Item Clicked'),
  timeStamp: '2018-09-25T17:12:48Z',
  timeStampAsSubtitle: true,
  title: 'Harry'
};

class ListItemPage extends React.Component {

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

  render = () => {
    const { ...context } = this.state;
    return (
      <AppProvider {...context}>
        <div className='storybook__container storybook__container--unselectable'>
          <span className='storybook__text storybook__title'>Chat List Item</span>
          <span className='storybook__text'>
            List item can be used to display chat groups and rooms in a chat list.
          </span>
          <div className='storybook__segment storybook__segment--row'>
            <ListItem {...chatListItemStub} isSelected />
          </div>
        </div>
        <div className='storybook__container storybook__container--unselectable'>
          <span className='storybook__text storybook__title'>Search List Item</span>
          <span className='storybook__text'>
            They can also be used to display search results in a search list.
          </span>
          <div className='storybook__segment storybook__segment--row'>
            <ListItem {...searchListItemStub} />
          </div>
        </div>
      </AppProvider>
    );
  };

}

export default ListItemPage;
