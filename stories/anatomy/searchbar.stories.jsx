import React from 'react';

import { action } from '@storybook/addon-actions';

import { throttle } from '../utils/helper.js';
import AppProvider from '../../src/components/App/Context.jsx';
import SearchBar from '../../src/components/SearchBar/SearchBar.jsx';

class SearchBarPage extends React.Component {

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
      isLiveSearch: false,
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
    const { isLiveSearch, ...context } = this.state;
    return (
      <div className='storybook__segment storybook__segment--row storybook__segment--full'>
        <div className='storybook__segment storybook__segment--column'>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Search
            </span>
            <span className='storybook__text'>
              The search bar provides a handle to the search logic in the container view when interacted with.
            </span>
          </div>
          <div className='storybook__container'>
            <span className='storybook__text storybook__title'>
              Context Toggles
            </span>
            <span className='storybook__text'>
              Search bar will appear differently depending on the layout and the intended search mode.
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
                {'Live Search: '}
                <code>{isLiveSearch.toString()}</code>
              </span>
              <br/>
              <button
                className='storybook__button'
                onClick={() => this.setState({
                  isLiveSearch: !isLiveSearch
                })}
              >
                <span>Toggle Search Mode</span>
              </button>
            </div>
          </div>
        </div>
        <div className='storybook__container'>
          <span className='storybook__text storybook__title'>
            Example
          </span>
          <span className='storybook__text'>
            Here you can test out the behaviours of the search bar, along with its results pane.
            Should the interaction appear sluggish, its likely due to the logging of the storybook actions
            having included the synthetic event arguments.
            Try to clear the action logger to see if the sluggishness persists.
          </span>
          <div className='storybook__segment storybook__segment--column storybook__scroll-column story-search-bar__preview'>
            <AppProvider {...this.state}>
              <SearchBar
                onInput={action('Input Changed')}
                onSearch={action('Search Query Submitted')}
                liveSearch={isLiveSearch}
                onEnter={action('Search Init Triggered')}
                onExit={action('Search Exit Triggered')}
                onSelect={action('Result Clicked')}
                results={[
                  {
                    description: 'Owww~! Charlie bit my finger!',
                    id: '123',
                    timeStamp: '2018-09-25T17:12:48Z',
                    name: 'Harry'
                  },
                  {
                    description: 'Owww~! Harry bit my finger!',
                    id: '124',
                    timeStamp: '2018-09-25T17:12:48Z',
                    name: 'Charlie'
                  },
                  {
                    description: 'Owww~! Larry bit my finger!',
                    id: '125',
                    timeStamp: '2018-09-25T17:12:48Z',
                    name: 'Mommy'
                  }
                ]}
              />
            </AppProvider>
          </div>
        </div>
      </div>
    );
  };

}

export default SearchBarPage;
