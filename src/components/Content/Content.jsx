import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './Content.scss';

class Content extends React.Component {

  /* Lifecycle */

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
        className,
        style['message-content-container'],
        style[`message-content-container--${variant}`]
      )}>
        {isLoading ? this.getLoadingPlaceholder() : content}
        {children}
      </div>
    );
  };

  /* Callbacks */

  onContext = (action, messageId) => (event) => {
    if (event && event.cancelable) {
      event.preventDefault();
    }
    action(messageId, event, event.target);
    return false;
  };

  setHoldAction = (action, messageId) => action && ((event) => {
    if (event) {
      event.persist();
    }
    this.onHoldTimer = setTimeout(() => {
      action(messageId, event, event.target);
    }, 1000);
  });

  unsetHoldAction = (event) => {
    if (event && event.cancelable) {
      event.preventDefault();
    }
    this.onHoldTimer && clearTimeout(this.onHoldTimer);
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
          style[`message-content--${position}`],
          style[`message-content--${type}`],
          style[position !== 'full' && `message-content--${variant}`],
          style['message-content']
        )}
        onContextMenu={isDesktop ? this.onContext(onHold, messageId) : null}
        onTouchStart={this.setHoldAction(onHold, messageId)}
        onTouchEnd={this.unsetHoldAction}
        onClick={onPress}
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
          `message-content--${eventName}`,
          style['message-content--event'],
          style['message-content']
        )}
        onContextMenu={isDesktop ? this.onContext(onHold, messageId) : null}
        onTouchStart={this.setHoldAction(onHold, messageId)}
        onTouchEnd={this.unsetHoldAction}
        onClick={onPress}
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
      <div className={cx(style['message-content__footer'])}>
        {receipts}
        {timeStamp}
      </div>
    );
  };

  getLoadingPlaceholder = () => (
    <LazyImage
      className={cx(style['message-content__loader'])}
      label='loading-placeholder'
      loader='message'
      placeholder='square'
      pureLoading
    />
  );

  // TODO: Create media preview and downloader views

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
    <div className={cx(style['message-content__name'])}>
      <span>{name}</span>
    </div>
  ) : null;

  getReceipts = (isDelivered, isRead) => (
    <div className={cx(style['message-content__receipts'])}>
      {isRead && (
        <LazyImage
          className={cx(
            style['message-content__receipt'],
            style['message-content__receipt--read']
          )}
          label='receipt--read'
          loader='icon'
          placeholder='check'
        />
      )}
      {isDelivered && (
        <LazyImage
          className={cx(
            style['message-content__receipt'],
            style['message-content__receipt--delivered']
          )}
          label='receipt--delivered'
          loader='icon'
          placeholder='check'
        />
      )}
    </div>
  );

  getText = (text) => text ? (
    <div className={cx(style['message-content__text'])}>
      <span>{text}</span>
    </div>
  ) : null;

  getTimestamp = (dateTime) => {
    const date = new Date(dateTime);
    if (!date) {
      return null;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const timestamp = `${date.getDate()}/${date.getMonth() + 1} ${hours}:${minutes} ${ampm}`;
    return (
      <div className={cx(style['message-content__timestamp'])}>
        {timestamp}
      </div>
    );
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
