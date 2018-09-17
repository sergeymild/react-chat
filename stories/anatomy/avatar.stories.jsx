import React from 'react';

import { action } from '@storybook/addon-actions';

import Avatar from '../../src/components/Avatar/Avatar.jsx';

const AvatarPage = () => {
  const avatarSquare = (
    <Avatar
      className='storybook__avatar'
      link='http://reactjs.org'
      name='Huang Lie Jun'
      onClick={action('avatar-click')}
      shape='square'
    />
  );
  const avatarRound = (
    <Avatar
      className='storybook__avatar'
      link='http://reactjs.org'
      name='Lie Jun'
      onClick={action('avatar-click')}
      shape='circle'
    />
  );
  return (
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Avatar Initials</span>
      <span className='storybook__text'>
        Avatars are images with special properties.
      </span>
      <span className='storybook__text'>
        Besides inheriting the loading properties of an image,
        avatars also feature a fallback initials overlay when no images are available.
      </span>
      <span className='storybook__text'>
        They also allow for <code>onClick</code> actions and href <code>link</code>.
      </span>
      <span className='storybook__text'>
        Additionally, they can be made circular or squarish through setting the <code>shape</code>.
      </span>
      <div className='storybook__row'>
        {avatarSquare}
        {avatarRound}
      </div>
    </div>
  );
};

export default AvatarPage;
