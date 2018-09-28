import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import { AppContext } from '../App/Context.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';
import ListItem from '../ListItem/ListItem.jsx';

import style from './searchbar.scss';

// TODO: Implement dividers

class SearchBar extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      isEmpty: true,
      status: 'inactive'
    };
  }

  render = () => {
    const { className } = this.props;
    const { status } = this.state;
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className={cx(
            'react-chat__filter',
            `react-chat__filter--${context.theme}`,
            className,
            style['chat-filter'],
            style[`chat-filter--${status}`]
          )}>
            {this.getInputBar(context)}
            {this.getResultsPane(context)}
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  /* Subviews */

  getInputBar = (context) => {
    const { status } = this.state;
    const { layout, theme } = context;
    return (
      <div className={cx(
        'react-chat__filter-input-bar',
        `react-chat__filter-input-bar--${theme}`,
        style['chat-filter__input-bar'],
        style[`chat-filter__input-bar--${layout}`],
        style[`chat-filter__input-bar--${status}`]
      )}>
        {this.getDismissButton(context)}
        {this.getTextField(context)}
        {this.getActionButton(context)}
      </div>
    );
  };

  getTextField = (context) => {
    const { hint, liveSearch } = this.props;
    const { status } = this.state;
    return (
      <input
        className={cx(
          'react-chat__filter-input',
          `react-chat__filter-input--${context.theme}`,
          style['chat-filter__input'],
          style[`chat-filter__input--${status}`]
        )}
        onBlur={this.blurSearch}
        onFocus={this.focusSearch}
        onInput={liveSearch ? this.liveSearch : this.updateSearch}
        onKeyDown={(event) => event.keyCode === 13 && this.executeSearch(event)}
        placeholder={hint}
        ref={(element) => this.inputField = element}
      />
    );
  };

  getActionButton = (context) => {
    const { liveSearch } = this.props;
    const { isEmpty, status } = this.state;
    const { theme } = context;
    const mode = liveSearch || status === 'fetch' ? 'cross' : 'search';
    const action = mode === 'search' ? this.executeSearch : this.clearSearch;
    return status === 'inactive' || isEmpty ? null : (
      <button
        className={cx(
          'react-chat__filter-input-button',
          `react-chat__filter-input-button--${theme}`,
          style['chat-filter__input-button--action'],
          style['chat-filter__input-button']
        )}
        onClick={action}
      >
        <LazyImage
          label={mode}
          loader='icon'
          placeholder={mode} />
      </button>
    );
  };

  getDismissButton = (context) => {
    const { status } = this.state;
    const { theme } = context;
    return status === 'inactive' ? null : (
      <button
        className={cx(
          'react-chat__filter-input-button',
          `react-chat__filter-input-button--${theme}`,
          style['chat-filter__input-button--dismiss'],
          style['chat-filter__input-button']
        )}
        onClick={this.dismissSearch}
      >
        <LazyImage
          label='back'
          loader='icon'
          placeholder='back' />
      </button>
    );
  };

  getResultsPane = (context) => {
    const { status } = this.state;
    const { theme } = context;
    return status === 'inactive' ? null : (
      <div className={cx(
        'react-chat__filter-results-pane',
        `react-chat__filter-results-pane--${theme}`,
        style['chat-filter__results-pane']
      )}>
        {this.getResultsList(context)}
      </div>
    );
  };

  getResultsList = (context) => {
    const { results } = this.props;
    const { status } = this.state;
    const { layout, theme } = context;
    if (status === 'inactive') {
      return null;
    }
    if (!results || !results.length) {
      return this.getPlaceholder(context);
    }
    const dividers = this.getDividers(context);
    const searchResults = results.map(this.getResultItem(context));
    const items = searchResults.concat(dividers);
    items.sort((first, second) => first.date - second.date);
    const elements = items.map((item) => item.element);
    return (
      <div className={cx(
        'react-chat__filter-results-list',
        `react-chat__filter-results-list--${theme}`,
        style['chat-filter__results-list'],
        style[`chat-filter__results-list--${layout}`]
      )}>
        {elements}
      </div>
    );
  };

  getResultItem = (context) => (result) => {
    const { avatar, description, id, name, timeStamp } = result;
    const { layout, theme } = context;
    const date = new Date(timeStamp);
    const element = (
      <ListItem
        avatar={avatar}
        className={cx(
          'react-chat__filter-results-item',
          `react-chat__filter-results-item--${theme}`,
          style['chat-filter__results-item'],
          style[`chat-filter__results-item--${layout}`]
        )}
        description={description}
        hideChevron
        itemId={id}
        key={id}
        label={name}
        onItem={(event) => this.selectResultItem(id, event)}
        timeStamp={timeStamp}
        timeStampAsSubtitle
        title={name}
      />
    );
    return { date, element };
  };

  getPlaceholder = (context) => {
    const { placeholder } = this.props;
    const { theme } = context;
    return placeholder ? placeholder : (
      <div className={cx(
        'react-chat__filter-results-placeholder',
        `react-chat__filter-results-placeholder--${theme}`,
        style['chat-filter__results-placeholder']
      )}>
        <span className={cx(style['chat-filter__results-placeholder-title'])}>
          No Results Found
        </span>
        <span className={cx(style['chat-filter__results-placeholder-subtitle'])}>
          There are no items that matches your query.
        </span>
      </div>
    );
  };

  getDividers = () => [];

  getDivider = () => null;

  /* Event Handlers */

  focusSearch = (event) => {
    const { onEnter } = this.props;
    const { status } = this.state;
    this.setState({
      status: 'focus'
    });
    if (status === 'inactive') {
      onEnter && onEnter(event);
    }
  };

  blurSearch = () => {
    const { status } = this.state;
    if (status === 'focus') {
      this.setState({
        status: 'active'
      });
    }
  };

  updateSearch = (event) => {
    const { onInput } = this.props;
    const { isEmpty } = this.state;
    if (event && event.target) {
      const value = event.target.value;
      if (!isEmpty && (!value || !value.length)) {
        this.setState({
          isEmpty: true
        });
      }
      if (isEmpty && (value && value.length)) {
        this.setState({
          isEmpty: false
        });
      }
      onInput && onInput(value, event);
    }
  };

  executeSearch = (event, isLive = false) => {
    const { onSearch } = this.props;
    const { isEmpty, status } = this.state;
    if (!isEmpty || isLive) {
      if (status !== 'fetch') {
        this.setState({
          status: 'fetch'
        });
      }
      onSearch && onSearch(this.inputField.value, event);
    }
  };

  liveSearch = (event) => {
    this.updateSearch(event);
    this.executeSearch(event, this.inputField && this.inputField.value);
  };

  clearSearch = (shouldFocus = true) => {
    const { onSearch } = this.props;
    if (this.inputField) {
      this.inputField.value = '';
      this.setState({
        isEmpty: true
      });
      onSearch && onSearch('');
      if (shouldFocus) {
        this.inputField.focus();
      }
    }
  };

  dismissSearch = (event) => {
    const { onExit } = this.props;
    const { status } = this.state;
    if (status !== 'inactive') {
      this.clearSearch(false);
      this.setState({
        status: 'inactive'
      });
      onExit && onExit(event);
    }
  };

  selectResultItem = (id, event) => {
    const { onSelect } = this.props;
    this.dismissSearch(event);
    onSelect && onSelect(id, event);
  };

}

SearchBar.propTypes = {
  className: PropTypes.string,
  hint: PropTypes.string,
  liveSearch: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onInput: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.element,
  results: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    timeStamp: PropTypes.string
  }))
};

SearchBar.defaultProps = {
  className: null,
  hint: 'Search',
  liveSearch: false,
  onEnter: null,
  onExit: null,
  onInput: null,
  onSelect: null,
  placeholder: null,
  results: []
};

export default SearchBar;
