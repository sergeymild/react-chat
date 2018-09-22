import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { AppContext } from '../App/Context.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './InputGroup.scss';

class InputGroup extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      isAttachMenuOpen: false,
      isTextFieldExpanded: false
    };
  }

  componentDidUpdate = () => {
    if (this.textField && this.props.value !== this.textField.innerHTML.toString()) {
      this.textField.innerHTML = this.convertStringToHTML();
    }
    this.replaceCaret(this.textField);
  };

  render = () => {
    const { className } = this.props;
    const { isTextFieldExpanded } = this.state;
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className={cx(
            `chat-input-group--${context.theme}`,
            className,
            isTextFieldExpanded && style['chat-input-group--expanded'],
            style['chat-input-group'],
            style[`chat-input-group--${context.layout}`],
            style[`chat-input-group--${context.sizing}`]
          )}>
            <div className={cx(
              style['chat-input-group__row'],
              style['chat-input-group__row--textarea']
            )}>
              {context.layout === 'staggered' && this.getAttachButton(context)}
              {this.getTextField(context)}
              {context.layout === 'staggered' || context.sizing === 'desktop'
                ? this.getSendButton(context)
                : this.getExpandCollapseButton(context)
              }
            </div>
            <div className={cx(
              style['chat-input-group__row'],
              style['chat-input-group__row--action']
            )}>
              {context.layout === 'aligned' && this.getActionRow(context)}
              {context.layout === 'aligned' && context.sizing !== 'desktop' && this.getSendButton(context)}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  /* Subviews */

  getTextField = (context) => {
    const { layout, sizing, theme } = context;
    const { onChange, placeholder } = this.props;
    return (
      <div className={cx(
        `chat-input-group__textarea-container--${theme}`,
        style['chat-input-group__textarea-container'],
        style[`chat-input-group__textarea-container--${layout}`],
        style[`chat-input-group__textarea-container--${sizing}`]
      )}>

        {/* Add and render attached media previews here... */}

        <div
          className={cx(style['chat-input-group__textarea'])}
          contentEditable
          onInput={(event) => {
            let input = event.target.innerHTML;
            input = this.convertHTMLtoString(input);
            onChange(input);
            this.setState({ input });
          }}
          placeholder={placeholder}
          ref={(e) => this.textField = e}
        />
      </div>
    );
  };

  getIcon = (context, label, onClick, placeholder = null, isDisabled = false, source = null) => (
    <button
      className={cx(
        !placeholder && style['chat-input-group__button--text'],
        `chat-input-group__button--${context.theme}`,
        style['chat-input-group__button'],
        style[`chat-input-group__button--${context.layout}`],
        style[`chat-input-group__button--${label}`]
      )}
      disabled={isDisabled}
      key={placeholder}
      onClick={onClick}
      type='button'
    >
      {placeholder ? (
        <LazyImage
          className={cx(style['chat-input-group__button-image'])}
          label={label}
          loader={'icon'}
          placeholder={placeholder}
          source={source}
        />
      ) : (
        <span className={cx(style['chat-input-group__button-label'])}>
          {label}
        </span>
      )}
    </button>
  );

  getExpandCollapseButton = (context) => {
    const { onExpand, onCollapse } = this.props;
    const { isTextFieldExpanded } = this.state;
    const iconName = isTextFieldExpanded ? 'collapse' : 'expand';
    const onClick = (event) => {
      this.setState({
        isTextFieldExpanded: !isTextFieldExpanded
      });
      return isTextFieldExpanded ? onCollapse(event) : onExpand(event);
    };
    return this.getIcon(context, iconName, onClick, iconName);
  };

  getSendButton = (context) => {
    const { onSend } = this.props;
    const { input } = this.state;
    const iconName = 'send';
    const onClick = (event) => {
      onSend(input, event);
      this.setState({
        input: ''
      });
    };
    const placeholder = context.layout === 'aligned' || context.sizing === 'desktop'
      ? null
      : iconName;
    const isDisabled = !input || input === '';
    return this.getIcon(context, iconName, onClick, placeholder, isDisabled);
  };

  getAttachButton = (context) => {
    const { attachOptions, onAttach } = this.props;
    if (!onAttach && (!attachOptions || !attachOptions.length)) {
      return null;
    }
    const iconName = 'attach';
    const onClick = (event) => {
      this.setState({
        isAttachMenuOpen: true
      });
      onAttach(event);
    };
    return this.getIcon(context, iconName, onClick, iconName);
  };

  getActionRow = (context) => {
    const { attachOptions } = this.props;
    if (!attachOptions || !attachOptions.length) {
      return null;
    }
    const actions = attachOptions.map((option) => {
      const { action, icon, label, type } = option;
      const onClick = (event) => action(type, event);
      return this.getIcon(context, label, onClick, type, false, icon);
    });
    return (
      <div className={cx(style['chat-input-group__action-set'])}>
        {actions}
      </div>
    );
  };

  getAttachMenu = (context) => {
    // TODO: Grid of attachment options
  };

  getMediaPreview = (context) => {
    // TODO: Add support for rich media attachment/preview
  };

  /* Input Handling */

  convertHTMLtoString = (input) => {
    let htmlString = input.toString();
    // TODO: Safely sanitize HTML input to string and ensure all disallowed symbols are removed (e.g. html tags)
    return htmlString;
  };

  convertStringToHTML = () => {
    const { value } = this.props;
    let htmlObject = new DOMParser().parseFromString(value, 'text/html');
    // TODO: Safely revert string into HTML
    return htmlObject.body.innerHTML;
  };

  replaceCaret = (element) => {
    const target = this.findLastNode(element);
    if (target && target.nodeValue) {
      const previousRange = document.createRange();
      const reference = window.getSelection().getRangeAt(0);
      previousRange.selectNodeContents(element);
      previousRange.setStart(reference.endContainer, reference.endOffset);
      const textAfterPreviousCaret = previousRange.cloneContents();

      const range = document.createRange();
      const selection= window.getSelection();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      selection.removeAllRanges();

      if (textAfterPreviousCaret && textAfterPreviousCaret.textContent.length > 0) {
        previousRange.setEnd(reference.endContainer, reference.endOffset);
        selection.addRange(previousRange);
      } else {
        range.setEnd(range.endContainer, target.nodeValue.length);
        selection.addRange(range);
      }
      if (element instanceof HTMLElement) {
        element.focus();
      }
    }
  };

  findLastNode = (node) => {
    const children = node.childNodes;
    if (!children || !children.length) {
      return node;
    }
    for (let i = children.length - 1; i >= 0; i--) {
      const lastNode = this.findLastNode(children[i]);
      if (lastNode) {
        return lastNode;
      }
    }
    return null;
  };

}

InputGroup.propTypes = {
  attachOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
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
  })),
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
  onAttach: PropTypes.func,
  onChange: PropTypes.func,
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
  onSend: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  attachOptions: null,
  className: null,
  data: null,
  onAttach: null,
  onChange: null,
  onCollapse: null,
  onExpand: null,
  placeholder: '',
  value: ''
};

export default InputGroup;
