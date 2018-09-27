import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import AppProvider from '../App/Context.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';
import ListItem from '../ListItem/ListItem.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TitleBar from '../TitleBar/TitleBar.jsx';

import style from './chatlist.scss';

class ChatList extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      highlightId: null,
      isRefreshing: false,
      isSearchActive: false
    };
    this.self = React.createRef();
  }

  componentWillUnmount = () => {
    this.onClearHighlight && clearTimeout(this.onClearHighlight);
  };

  render = () => {
    const { className, layout, sizing, theme } = this.props;
    const stylingContext = { layout, sizing, theme };
    return (
      <AppProvider {...stylingContext}>
        <div
          className={cx(
            'react-chat__list',
            `react-chat__list--${theme}`,
            className,
            style['chat-list']
          )}
          ref={this.self}
        >
          {this.getTitleBar()}
          <div className={cx(style['chat-list__body'])}>
            {this.getSearchBar()}
            {this.getRooms()}
          </div>
        </div>
      </AppProvider>
    );
  };

  /* Subviews */

  // TODO: Allow children buttons on title bar
  getTitleBar = () => {
    const { hideTitleBar, title, subtitle, user, onInfo } = this.props;
    if (hideTitleBar || (!user && !title)) {
      return null;
    }
    const { avatar, id, name } = user;
    return (
      <TitleBar
        avatar={avatar}
        className={style['chat-list__title-bar']}
        id={id}
        label={name}
        onInfo={onInfo}
        ref={(element) => this.titleBar = element}
        subtitle={subtitle}
        title={title}
      />
    );
  };

  getSearchBar= () => {
    const { liveSearch, onSearch, onResult, searchHint, searchPlaceholder, searchResults } = this.props;
    return onSearch ? (
      <SearchBar
        className={cx(style['chat-list__search-bar'])}
        hint={searchHint}
        liveSearch={liveSearch}
        onEnter={this.enterSearch}
        onExit={this.exitSearch}
        onSearch={onSearch}
        onSelect={onResult || this.highlightItem}
        placeholder={searchPlaceholder}
        results={searchResults}
      />
    ) : null;
  };

  getRooms = () => {
    const { isLoading, rooms } = this.props;
    const { isSearchActive } = this.state;
    if (isLoading) {
      return this.getLoader();
    }
    if (!rooms || !rooms.length) {
      return this.getPlaceholder();
    }
    const items = rooms.map(this.getRoom);
    return (
      <div className={cx(
        style['chat-list__rooms'],
        isSearchActive && style['chat-list__rooms--background']
      )}>
        {items}
      </div>
    );
  };

  getRoom = (room) => {
    const { hideAvatar, hideChevron, menuActions, onAvatar, onItem, onMenu } = this.props;
    const { highlightId } = this.state;
    const { avatar, description, id, name, status, subtitle, timeStamp } = room;
    return (
      <ListItem
        avatar={avatar}
        className={cx(
          style['chat-list__room-item'],
          id === highlightId && style['chat-list__room-item--highlighted']
        )}
        contextOptions={menuActions}
        description={description}
        hideAvatar={hideAvatar}
        hideChevron={hideChevron}
        itemId={id}
        key={id}
        label={name}
        onAvatar={onAvatar.bind(null, id)}
        onContext={onMenu.bind(null, id)}
        onItem={onItem.bind(null, id)}
        ref={(element) => this[`room${id}`] = element}
        status={status}
        subtitle={subtitle}
        timeStamp={timeStamp}
        title={name}
      />
    );
  };

  getLoader = () => {
    const { isLoading } = this.props;
    if (!isLoading) {
      return null;
    }
    if (!this.self || !this.self.current) {
      return null;
    }
    const height = this.self.current.getBoundingClientRect().height;
    const offset = this.titleBar ? this.titleBar.getHeight() : 0;
    const minFill = height - offset;
    const loaderCount = Math.ceil(minFill / 70);
    const loaders = Array(...{
      length: loaderCount
    }).map((item, index) => (
      <div
        className={cx(style['chat-list__room-loader'])}
        key={index}
      >
        <LazyImage
          label='room'
          loader='room'
          placeholder='circle'
          pureLoading
        />
      </div>
    ));
    return (
      <div className={cx(style['chat-list__rooms'])}>
        {loaders}
      </div>
    );
  };

  getPlaceholder = () => {
    const { placeholder } = this.props;
    return placeholder ? placeholder : (
      <div className={cx(style['chat-list__placeholder'])}>
        <span className={cx(style['chat-list__placeholder-title'])}>
          No Chats Available
        </span>
        <span className={cx(style['chat-list__placeholder-subtitle'])}>
          You do not have any chats yet.
        </span>
      </div>
    );
  };

  getRefresh = () => {
    const { onRefresh } = this.props;
    const { isRefreshing } = this.state;

    // TODO: Add refresh view

    return null;
  };

  /* Events */

  highlightItem = (id) => {
    const element = this[`room${id}`];
    if (element) {
      element.scrollIntoView({block: 'end'});
      this.setState({
        highlightId: id
      }, () => this.onClearHighlight = setTimeout(this.clearHighlight, 5000));
    }
  };

  clearHighlight = () => this.setState({
    highlightId: null
  });

  enterSearch = () => this.setState({
    isSearchActive: true
  });

  exitSearch = () => this.setState({
    isSearchActive: false
  });

}

ChatList.propTypes = {
  className: PropTypes.string,
  hideAvatar: PropTypes.bool,
  hideChevron: PropTypes.bool,
  hideTitleBar: PropTypes.bool,
  isLoading: PropTypes.bool,
  layout: PropTypes.oneOf([
    'aligned',
    'staggered'
  ]),
  liveSearch: PropTypes.bool,
  menuActions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'archive',
      'delete',
      'info',
      'pin',
      'star',
      'unread'
    ]).isRequired
  })),
  onAvatar: PropTypes.func,
  onInfo: PropTypes.func,
  onItem: PropTypes.func,
  onMenu: PropTypes.func,
  onRefresh: PropTypes.func,
  onResult: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.element,
  rooms: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
      'archive',
      'pin',
      'star',
      'new'
    ]),
    subtitle: PropTypes.string,
    timeStamp: PropTypes.string
  })).isRequired,
  searchHint: PropTypes.string,
  searchPlaceholder: PropTypes.element,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    timeStamp: PropTypes.string
  })),
  sizing: PropTypes.oneOf([
    'desktop',
    'mobile',
    'tablet'
  ]),
  subtitle: PropTypes.string,
  theme: PropTypes.oneOf([
    'dark',
    'light'
  ]),
  title: PropTypes.string,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    website: PropTypes.string
  })
};

ChatList.defaultProps = {
  className: null,
  hideAvatar: false,
  hideChevron: false,
  hideTitleBar: false,
  isLoading: false,
  liveSearch: false,
  layout: 'staggered',
  menuActions: null,
  onAvatar: null,
  onInfo: null,
  onItem: null,
  onMenu: null,
  onRefresh: null,
  onResult: null,
  onSearch: null,
  placeholder: null,
  searchHint: 'Search',
  searchPlaceholder: null,
  searchResults: [],
  sizing: 'desktop',
  subtitle: null,
  theme: 'light',
  title: null,
  user: null
};

export default ChatList;
