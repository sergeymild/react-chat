import React from 'react';

import { storiesOf } from '@storybook/react';

import InstructionsPage from './overview/instructions.stories.jsx';
import IntroductionPage from './overview/introduction.stories.jsx';

import AvatarPage from './anatomy/avatar.stories.jsx';
import ImagePage from './anatomy/image.stories.jsx';
import ListItemPage from './anatomy/listitem.stories.jsx';
import SearchBarPage from './anatomy/searchbar.stories.jsx';
import TitleBarPage from './anatomy/titlebar.stories.jsx';

import ChatListPage from './anatomy/chatlist.stories.jsx';

import ChatRoomPage from './anatomy/chatroom.stories.jsx';
import ContentPage from './anatomy/content.stories.jsx';
import InputGroupPage from './anatomy/inputgroup.stories.jsx';
import MenuPage from './anatomy/menu.stories.jsx';
import MessagePage from './anatomy/message.stories.jsx';

import LayoutPage from './examples/layout.stories.jsx';
import SizingPage from './examples/sizing.stories.jsx';
import ThemingPage from './examples/theming.stories.jsx';

import './index.css';

storiesOf('Overview', module)
  .add('Introduction', () => <IntroductionPage />)
  .add('How To Use', () => <InstructionsPage />);

storiesOf('Anatomy/Chat List', module)
  .add('General', () => <ChatListPage />);

storiesOf('Anatomy/Chat Room', module)
  .add('General', () => <ChatRoomPage />)
  .add('Content', () => <ContentPage />)
  .add('Menu', () => <MenuPage />)
  .add('Message', () => <MessagePage />)
  .add('Input Group', () => <InputGroupPage />);

storiesOf('Anatomy/Shared', module)
  .add('Avatar', () => <AvatarPage />)
  .add('Image', () => <ImagePage />)
  .add('Title Bar', () => <TitleBarPage />)
  .add('List Item', () => <ListItemPage />)
  .add('Search Bar', () => <SearchBarPage />);

storiesOf('Examples', module)
  .add('Sizing', () => <SizingPage />)
  .add('Layout', () => <LayoutPage />)
  .add('Theming', () => <ThemingPage />);
