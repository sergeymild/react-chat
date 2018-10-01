// CREDIT: Web URL Regex (regex-weburl.js by dperini)
// GITHUB GIST: https://gist.github.com/dperini/729294

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './content.scss';

// TODO: Create media preview and downloader views

class Content extends React.PureComponent {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      didLongPress: false
    };
  }

  componentWillUnmount = () => {
    this.unsetHoldAction();
    this.onHoldTimer = null;
  };

  render = () => {
    // eslint-disable-next-line react/prop-types
    const { children, className, isLoading, type, variant } = this.props;
    let content = null;
    switch (type) {
    case 'event':
      content = this.getEventContent();
      break;
    case 'media', 'text':
      content = this.getDynamicContent();
      break;
    case 'system':
      content = this.getSystemContent();
      break;
    default:
      break;
    }
    return (
      <div className={cx(
        'react-chat__message-content-container',
        className,
        style['message-content-container'],
        style[`message-content-container--${variant}`],
        type.match(/^(event|system)$/) && style['message-content-container--full']
      )}>
        {isLoading ? this.getLoadingPlaceholder() : content}
        {children}
      </div>
    );
  };

  /* Layouts */

  getDynamicContent = () => {
    const { senderName, data, text } = this.props;
    const { type, variant, position } = this.props;
    const { isDelivered, isDesktop, isRead, timeStamp } = this.props;
    const { messageId, onHold, onPress } = this.props;
    return (
      <div
        className={cx(
          'react-chat__message-content--dynamic',
          style['message-content'],
          style[`message-content--${position}`],
          style[`message-content--${type}`],
          style[position !== 'full' && `message-content--${variant}`]
        )}
        onClick={onPress}
        onContextMenu={isDesktop ? this.onContext(onHold, messageId) : null}
        onTouchEnd={this.unsetHoldAction}
        onTouchMove={this.unsetHoldAction}
        onTouchStart={this.setHoldAction(onHold, messageId)}
      >
        {this.getName(senderName)}
        {this.getMedia(data)}
        {this.getText(text)}
        {this.getFooter(timeStamp, isDelivered, isRead)}
      </div>
    );
  };

  getEventContent = () => {
    const { eventContent, eventName, isDesktop, messageId, onHold, onPress, text } = this.props;
    return (
      <div
        className={cx(
          'react-chat__message-content--event',
          `react-chat__message-content--${eventName}`,
          style['message-content--event'],
          style['message-content']
        )}
        onClick={onPress}
        onContextMenu={isDesktop ? this.onContext(onHold, messageId) : null}
        onTouchEnd={this.unsetHoldAction}
        onTouchMove={this.unsetHoldAction}
        onTouchStart={this.setHoldAction(onHold, messageId)}
      >
        {eventContent}
        {this.getText(text)}
      </div>
    );
  };

  getSystemContent = () => {
    const { text, timeStamp } = this.props;
    return (
      <div
        className={cx(
          'react-chat__message-content--system',
          style['message-content--system'],
          style['message-content']
        )}
      >
        {this.getTimestamp(timeStamp)}
        {this.getText(text)}
      </div>
    );
  };

  /* Subviews */

  getFooter = (dateTime, isDelivered = false, isRead = false) => {
    const receipts = this.getReceipts(isDelivered, isRead);
    const timeStamp = this.getTimestamp(dateTime);
    return (
      <div className={cx(
        'react-chat__message-content-footer',
        style['message-content__footer'])
      }>
        {receipts}
        {timeStamp}
      </div>
    );
  };

  getLoadingPlaceholder = () => (
    <LazyImage
      className={cx(
        'react-chat__message-content-loader',
        style['message-content__loader']
      )}
      label='loading-placeholder'
      loader='message'
      placeholder='square'
      pureLoading
    />
  );

  getMedia = (data) => {
    if (!data) {
      return null;
    }
    const mediaView = null;
    switch (data.type) {
    case 'audio':
      // KIV: Set download-prompter-wrapped lazy audio with metadata
      break;
    case 'file':
      // KIV: Set download-prompter-wrapped lazy file with metadata
      break;
    case 'gif':
      // KIV: Set download-prompter-wrapped lazy gif with metadata
      break;
    case 'image':
      // KIV: Set download-prompter-wrapped lazy image with metadata
      break;
    case 'link':
      // KIV: Set link previewer
      break;
    case 'location':
      // KIV: Set svg map viewer
      break;
    case 'markdown':
      // KIV: Set markdown viewer
      break;
    case 'pdf':
      // KIV: Set download-prompter-wrapped lazy pdf with metadata
      break;
    case 'video':
      // KIV: Set download-prompter-wrapped lazy video with metadata
      break;
    default:
      // KIV: Set unsupported placeholder
      break;
    }
    return mediaView;
  };

  getName = (name) => name ? (
    <div className={cx(
      'react-chat__message-content-name',
      style['message-content__name']
    )}>
      <span>{name}</span>
    </div>
  ) : null;

  getReceipts = (isDelivered, isRead) => (
    <div className={cx(
      'react-chat__message-content-receipts',
      style['message-content__receipts'])
    }>
      {isRead && (
        <LazyImage
          className={cx(
            style['message-content__receipt--read'],
            style['message-content__receipt']
          )}
          label='receipt--read'
          loader='icon'
          placeholder='check'
        />
      )}
      {isDelivered && (
        <LazyImage
          className={cx(
            style['message-content__receipt--delivered'],
            style['message-content__receipt']
          )}
          label='receipt--delivered'
          loader='icon'
          placeholder='check'
        />
      )}
    </div>
  );

  getText = (text) => {
    if (!text) {
      return null;
    }
    const urlRegexString = '((?:(?:https?|ftp)://)' +
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    ')' +
    '(?::\\d{2,5})?' +
    '(?:[/?#](?:\\S*[^\\s!"\'()*,-.:;<>?\\[\\]_`{|}~]|))?)';
    const emailRegexString = '([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+))';
    const emailRegex = new RegExp(emailRegexString, 'gi');
    const combinedRegex = new RegExp(`${urlRegexString}|${emailRegexString}`, 'gi');
    let markedText = text.split(combinedRegex);
    markedText = markedText.filter((x) => x);
    for (let index = 1; index < markedText.length; index += 2) {
      if (!markedText[index] || !markedText[index].length) {
        markedText[index] = null;
        continue;
      }
      const isEmail = markedText[index].match(emailRegex);
      const modifier = isEmail ? 'email' : 'link';
      const link = isEmail ? `mailto:${markedText[index]}` : markedText[index];
      markedText[index] = (
        <a
          href={link}
          key={`${modifier}-${index}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {markedText[index]}
        </a>
      );
    }
    return (
      <div className={cx(
        'react-chat__message-content-text',
        style['message-content__text']
      )}>
        {markedText}
      </div>
    );
  };

  getTimestamp = (dateTime) => {
    const date = new Date(dateTime);
    if (!date) {
      return null;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const timestamp = `${date.getDate()}/${date.getMonth() + 1} ${hours}:${minutes} ${ampm}`;
    return (
      <div className={cx(
        'react-chat__message-content-timestamp',
        style['message-content__timestamp']
      )}>
        {timestamp}
      </div>
    );
  };

  /* Event Handlers */

  onContext = (action, messageId) => (event) => {
    if (action && event && event.cancelable && !event.type.match(/^(touchmove|scroll)$/)) {
      event.preventDefault();
    }
    action && action(messageId, event, event.target);
    return !action;
  };

  setHoldAction = (action, messageId) => action && ((event) => {
    if (event) {
      event.persist();
    }
    this.onHoldTimer = setTimeout(() => {
      this.setState({
        didLongPress: true
      });
      action(messageId, event, event.target);
    }, 600);
  });

  unsetHoldAction = (event) => {
    const { didLongPress } = this.state;
    if (didLongPress && event && event.cancelable && !event.type.match(/^(touchmove|scroll)$/)) {
      event.preventDefault();
    }
    this.setState({
      didLongPress: false
    });
    this.onHoldTimer && clearTimeout(this.onHoldTimer);
  };

}

Content.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string
    }),
    galleryId: PropTypes.string,
    markdown: PropTypes.string,
    metadata: PropTypes.object,
    source: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'audio',
      'file',
      'gif',
      'image',
      'link',
      'location',
      'markdown',
      'pdf',
      'video'
    ]).isRequired
  }),
  eventContent: PropTypes.element,
  eventName: PropTypes.string,
  isDelivered: PropTypes.bool,
  isDesktop: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRead: PropTypes.bool,
  messageId: PropTypes.string.isRequired,
  onHold: PropTypes.func,
  onPress: PropTypes.func,
  position: PropTypes.oneOf([
    'bottom',
    'isolated',
    'middle',
    'top'
  ]),
  senderName: PropTypes.string,
  text: PropTypes.string,
  timeStamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'event',
    'media',
    'system',
    'text'
  ]).isRequired,
  variant: PropTypes.oneOf([
    'full',
    'left',
    'right'
  ])
};

Content.defaultProps = {
  className: null,
  data: null,
  eventContent: null,
  eventName: null,
  isDelivered: false,
  isDesktop: true,
  isLoading: false,
  isRead: false,
  onHold: null,
  onPress: null,
  position: 'isolated',
  senderName: null,
  text: null,
  variant: 'left'
};

export default Content;
