import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { AppContext } from '../App/Context.jsx';
import Avatar from '../Avatar/Avatar.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './TitleBar.scss';

const TitleBar = (props) => {
  const { avatar, className, roomId, subtitle, title } = props;
  const { onInfo, onReturn } = props;
  return (
    <AppContext.Consumer>
      {(context) => (
        <div className={cx(
          `chat-title-bar--${context.theme}`,
          className,
          style['chat-title-bar']
        )}>
          {getBackButton(onReturn, roomId)}
          {getHeading(title, subtitle)}
          {getInfoButton(avatar, title, onInfo, roomId)}
        </div>
      )}
    </AppContext.Consumer>
  );
};

const getBackButton = (onReturn, roomId) => onReturn ? (
  <button
    className={cx(style['chat-title-bar__back-button'])}
    onClick={onReturn.bind(null, roomId)}
  >
    <LazyImage
      label='back'
      loader='icon'
      placeholder='back'
    />
  </button>
) : null;

const getHeading = (title, subtitle) => (
  <div className={cx(style['chat-title-bar__heading'])}>
    <span className={cx(style['chat-title-bar__title'])}>
      {title}
    </span>
    {subtitle && (
      <span className={cx(style['chat-title-bar__subtitle'])}>
        {subtitle}
      </span>
    )}
  </div>
);

const getInfoButton = (avatar, title, onInfo, roomId) => onInfo ? (
  <Avatar
    className={cx(style['chat-title-bar__avatar-button'])}
    name={title}
    onClick={onInfo.bind(null, roomId)}
    source={avatar}
  />
) : null;

TitleBar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  onInfo: PropTypes.func,
  onReturn: PropTypes.func,
  roomId: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

TitleBar.defaultProps = {
  avatar: null,
  className: null,
  onInfo: null,
  onReturn: null,
  subtitle: null,
  title: 'Messages'
};

export default TitleBar;
