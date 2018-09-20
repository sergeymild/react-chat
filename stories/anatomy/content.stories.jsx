import React from 'react';

import { action } from '@storybook/addon-actions';

import Content from '../../src/components/Content/Content.jsx';

const loadingContentStub = {
  isLoading: true,
  messageId: '2',
  timeStamp: '2018-09-11T08:56:00Z',
  type: 'text'
};

const systemContentStub = {
  messageId: '3',
  text: 'This is the start of your conversation with Mickey.',
  timeStamp: '2018-09-15T16:18:00Z',
  type: 'system'
};

const eventBanner = (
  <div className='story-content__event-banner'>
    <span><b>❤️ FRIENDAVERSARY ❤️</b></span>
  </div>
);

const eventContentStub = {
  eventContent: eventBanner,
  eventName: 'friendaversary',
  messageId: '1',
  onHold: action('Long-Pressed Event'),
  onPress: action('Clicked Event'),
  text: 'Today is your 5th friendaversary with Goosey Loosey!',
  timeStamp: '2018-09-17T21:04:00Z',
  type: 'event'
};

const textContentStub = {
  isDelivered: true,
  isRead: true,
  messageId: '5',
  onHold: action('Long-Pressed Text'),
  onPress: action('Clicked Text'),
  senderName: 'Happy Quack',
  text: 'I love to swim! Quack quack!',
  timeStamp: '2018-09-18T13:00:00Z',
  type: 'text'
};

const ContentPage = () => (
  <React.Fragment>
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Loading Animation</span>
      <span className='storybook__text'>
        Content will display a loading animation when <code>isLoading</code> is set.
      </span>
      <div className='storybook__segment storybook__segment--row'>
        <Content {...loadingContentStub} />
      </div>
    </div>
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>System Information</span>
      <span className='storybook__text'>
        System-related information can be styled by setting <code>{'type=\'system\''}</code>.
      </span>
      <span className='storybook__text'>
        System content are simplified content views that are meant to appear without an associated sender.
      </span>
      <div className='storybook__segment storybook__segment--row'>
        <Content {...systemContentStub} />
      </div>
    </div>
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Customizable Event Banners</span>
      <span className='storybook__text'>
        To show special events associated to a chat room, set <code>{'type=\'event\''}</code>.
      </span>
      <span className='storybook__text'>
        Doing so allows you to display customized banners or views along with text.
        Custom views can be assigned using <code>eventContent</code>.
      </span>
      <div className='storybook__segment storybook__segment--row'>
        <Content {...eventContentStub} />
      </div>
    </div>
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Message Content</span>
      <span className='storybook__text'>
        Currently, only text-based message content is supported using <code>{'type=\'text\''}</code>.
      </span>
      <span className='storybook__text'>
        Text content typically appears with timestamp and read or deliver receipts.
      </span>
      <div className='storybook__segment storybook__segment--row'>
        <Content {...textContentStub} />
      </div>
      <div className='storybook__segment storybook__segment--row'>
        <Content
          {...textContentStub}
          variant='right'
        />
      </div>
      <div className='storybook__segment storybook__segment--row'>
        <Content
          {...textContentStub}
          variant='full'
        />
      </div>
    </div>
    <div className='storybook__container'>
      <span className='storybook__text storybook__title'>Border Styles</span>
      <span className='storybook__text'>
        Borders are styled according to ownership of the message chunks.
      </span>
      <div className='storybook__segment storybook__segment--column'>
        <Content
          {...textContentStub}
          position='isolated'
          variant='left'
        />
        <Content
          {...textContentStub}
          position='top'
          variant='right'
        />
        <Content
          {...textContentStub}
          senderName={null}
          position='bottom'
          variant='right'
        />
        <Content
          {...textContentStub}
          position='top'
          variant='left'
        />
        <Content
          {...textContentStub}
          senderName={null}
          position='middle'
          variant='left'
        />
        <Content
          {...textContentStub}
          senderName={null}
          position='bottom'
          variant='left'
        />
      </div>
    </div>
  </React.Fragment>
);

export default ContentPage;
