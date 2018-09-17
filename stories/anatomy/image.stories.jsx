import React from 'react';

import LazyImage from '../../src/components/LazyImage/LazyImage.jsx';
import { placeholderKeys } from '../../src/components/LazyImage/Svg.jsx';

const ImagePage = () => {
  const icons = placeholderKeys.map((key) => (
    <LazyImage
      className='story-image__icon'
      key={key}
      label={`image--${key}`}
      loader='icon'
      placeholder={key} />
  ));
  return (
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Icons as Placeholder</span>
      <span className='storybook__text'>
        Polymer SVG icons are populated using the <code>placeholder</code> key,
        and they can be scaled and styled using custom CSS classes.
      </span>
      <span className='storybook__text'>
        Image elements without source or encountered error while loading
        will fallback to these placeholders.
      </span>
      <span className='storybook__text'>
        They can also be used purely as icons.
      </span>
      <div className='storybook__row'>
        {icons}
      </div>
      <hr/>
      <span className='storybook__text storybook__title'>Animated Placeholders</span>
      <span className='storybook__text'>
        SVG loading animations can be assigned using the <code>loader</code> key,
        and they can take the place of the image element when the source is being loaded.
      </span>
      <span className='storybook__text'>
        These animations can also be made perpetual by turning the <code>pureLoading</code> flag on.
      </span>
      <div className='storybook__row'>
        <LazyImage
          className='story-image__loader story-image__loader--small-square'
          label='loader--icon'
          loader='icon'
          placeholder='send'
          pureLoading
        />
        <LazyImage
          className='story-image__loader story-image__loader--square'
          label='loader--avatar'
          loader='avatarRound'
          placeholder='profile'
          pureLoading
        />
        <LazyImage
          className='story-image__loader story-image__loader--square'
          label='loader--avatar'
          loader='avatarSquare'
          placeholder='profile'
          pureLoading
        />
        <LazyImage
          className='story-image__loader story-image__loader--rect'
          label='loader--media'
          loader='media'
          placeholder='image'
          pureLoading
        />
        <LazyImage
          className='story-image__loader story-image__loader--long-rect'
          label='loader--message'
          loader='message'
          placeholder='circle'
          pureLoading
        />
      </div>
    </div>
  );
};

export default ImagePage;
