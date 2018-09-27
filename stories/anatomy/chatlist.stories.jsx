import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import ChatList from '../../src/components/ChatList/ChatList.jsx';

const menuActionsStub = [
  {
    action: action('Archive Clicked'),
    label: 'archive',
    type: 'archive'
  },
  {
    action: action('Delete Clicked'),
    label: 'Delete',
    type: 'delete'
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
    action: action('Star Clicked'),
    label: 'Star',
    type: 'star'
  },
  {
    action: action('Unread Clicked'),
    label: 'Unread',
    type: 'unread'
  }
];

const roomsStub = [
  {
    description: 'That monkeyface boss, I really cannot take it...',
    id: '222',
    name: 'Office',
    status: 'pin',
    subtitle: 'Mark Lee:',
    timeStamp: '2018-09-21T18:43:23Z'
  },
  {
    // avatar
    description: 'Aiyo, you got hear what she said in the market not?',
    id: '111',
    name: 'Gossip Aunties',
    status: 'new',
    subtitle: 'Cecilia Neo:',
    timeStamp: '2018-09-23T12:00:43Z'
  },
  {
    description: 'Last warning ah. Don\'t make me say again.',
    id: '333',
    name: 'Family',
    status: 'star',
    subtitle: 'Sis:',
    timeStamp: '2018-08-22T14:57:09Z'
  },
  {
    description: 'Bro can borrow money? Lol.',
    id: '444',
    name: 'Brian',
    subtitle: '',
    timeStamp: '2018-08-20T12:11:39Z'
  },
  {
    description: 'Anyone got the ans for a5q2?',
    id: '555',
    name: 'I <3 Discrete Math',
    status: 'archive',
    subtitle: 'Larry:',
    timeStamp: '2018-08-15T23:59:59Z'
  }
];

const userStub = {
  id: '1',
  name: 'Larry'
};

class ChatListPage extends React.Component {

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
      isLoading: false,
      layout: 'staggered',
      liveSearch: false,
      searchResults: [],
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
    const { searchResults, liveSearch, isLoading, ...context } = this.state;
    const searchDescriptors = searchResults.map(this.parseSearchResult);
    return (
      <div className='storybook__segment storybook__segment--row storybook__segment--full'>
        <div className='storybook__segment storybook__segment--column'>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Embedding
            </span>
            <span className='storybook__text'>
              Like chat rooms, chat lists can be portable.
            </span>
            <span className='storybook__text'>
              It is important to ensure that the width and height are fixed to give chat list the context for sizing.
              Chat list is styled using <code>rem</code> unit, hence it will comply and scale with your root font size.
            </span>
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Supplying Context
            </span>
            <span className='storybook__text'>
              Since chat list is a HOC, it will not be consuming any context.
              Instead, you can supply it with the settings for themes, layout and sizing using props.
              These values will be provided as context to render the subviews that it comprises.
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
              <br/>
              <span>
                {'Current theme: '}
                <code>{context.theme}</code>
              </span>
              <br/>
              <button
                className='storybook__button'
                onClick={() => this.setState({
                  theme: context.theme === 'light' ? 'dark' : 'light'
                })}
              >
                <span>Toggle Theme</span>
              </button>
              <br/>
              <span>
                {'Current load state: '}
                <code>{isLoading.toString()}</code>
              </span>
              <br/>
              <button
                className='storybook__button'
                onClick={() => this.setState({
                  isLoading: !isLoading
                })}
              >
                <span>Toggle Load State</span>
              </button>
              <br/>
              <span>
                {'Live Search: '}
                <code>{liveSearch.toString()}</code>
              </span>
              <br/>
              <button
                className='storybook__button'
                onClick={() => this.setState({
                  liveSearch: !liveSearch
                })}
              >
                <span>Toggle Search Mode</span>
              </button>
            </div>
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Example
            </span>
            <span className='storybook__text'>
              The following frame is an example of the chat list within a container that has been set to
              <code>width: 100%;</code> and <code>height: 20rem;</code>. Do try to resize your browser to
              test the responses to changes in height and width. Note that chat list items have a max width constraint
              to prevent sparse grouping of view elements, hence it would be better to deploy chat list as a side pane
              for desktop screens.
            </span>
          </div>
        </div>
        <div className='storybook__segment storybook__segment--column storybook__scroll-column story-chat-list__preview'>
          <div className='storybook__container storybook__segment--full storybook__segment--full-height'>
            <ChatList
              isLoading={isLoading}
              layout={context.layout}
              liveSearch={liveSearch}
              menuActions={menuActionsStub}
              onAvatar={action('Avatar Clicked')}
              onSearch={this.updateFilter}
              onInfo={action('Info Clicked')}
              onItem={action('Item Clicked')}
              onMenu={action('Context Triggered')}
              onRefresh={this.updateRooms}
              placeholder={null}
              rooms={roomsStub}
              searchResults={searchDescriptors}
              sizing={context.sizing}
              theme={context.theme}
              title='Chats'
              user={userStub}
            />
          </div>
        </div>
      </div>
    );
  };

  /* Events */

  updateFilter = (nextInput) => {
    action('Filter Changed')(nextInput);
    const searchResults = nextInput && nextInput.length ? roomsStub.filter(
      (room) => room.name.toLowerCase().includes(nextInput.toLowerCase())
    ) : [];
    this.setState({
      filter: nextInput,
      searchResults
    });
  };

  updateRooms = () => {
    // TODO: Mock refresh logic...
    action('Rooms Changed')();
  };

  parseSearchResult = (result) => ({
    description: result.description,
    id: result.id,
    timeStamp: result.timeStamp,
    name: result.name
  });

}

export default ChatListPage;
