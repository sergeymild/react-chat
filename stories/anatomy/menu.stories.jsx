import React from 'react';

import { action } from '@storybook/addon-actions';

import Menu from '../../src/components/Menu/Menu.jsx';

const actionsStub = [
  {
    action: action('Copy Clicked'),
    label: 'Copy',
    type: 'copy'
  },
  {
    action: action('Delete Clicked'),
    label: 'Delete',
    type: 'delete'
  },
  {
    action: action('Forward Clicked'),
    label: 'Forward',
    type: 'forward'
  },
  {
    action: action('Info Clicked'),
    label: 'Info',
    type: 'info'
  },
  {
    action: action('Pin Clicked'),
    label: 'Pin',
    type: 'pin'
  },
  {
    action: action('Reply Clicked'),
    label: 'Reply',
    type: 'reply'
  },
];

const commonProps = {
  actions: actionsStub,
  messageId: '1',
  userId: '1'
};

const dockMenuStub = {
  type: 'dock',
  ...commonProps
};

const listMenuStub = {
  type: 'list',
  ...commonProps
};

const modalMenuStub = {
  type: 'modal',
  ...commonProps
};

const rowMenuStub = {
  type: 'row',
  ...commonProps
};

class MenuPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      shouldShowModal: false
    };
  }

  render = () => (
    <React.Fragment>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          Dock Menu
        </span>
        <span className='storybook__text'>
          This menu style is most suited for full width message items.
        </span>
        <div className='storybook__segment storybook__segment--row'>
          <Menu {...dockMenuStub} />
        </div>
      </div>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          List Menu
        </span>
        <span className='storybook__text'>
          This menu is versatile across both desktop and mobile interfaces.
        </span>
        <div className='storybook__segment storybook__segment--row'>
          <Menu
            className='story-menu__list-menu'
            {...listMenuStub}
          />
        </div>
      </div>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          Modal Menu
        </span>
        <span className='storybook__text'>
          This menu will centralise in the entire width of the screen, making it more interruptive.
        </span>
        <div className='storybook__segment storybook__segment--row'>
          <button
            className='storybook__button'
            onClick={() => this.setState({ shouldShowModal: !this.state.shouldShowModal })}
          >
            {this.state.shouldShowModal ? 'Close Menu' : 'Show Menu'}
          </button>
          {this.state.shouldShowModal && (
            <Menu {...modalMenuStub} />
          )}
        </div>
      </div>
      <div className='storybook__container'>
        <span className='storybook__text storybook__title'>
          Row Menu
        </span>
        <span className='storybook__text'>
          This menu is more suited for staggered messages and mobile interfaces.
        </span>
        <div className='storybook__segment storybook__segment--row'>
          <Menu {...rowMenuStub} />
        </div>
      </div>
    </React.Fragment>
  );

}

export default MenuPage;
