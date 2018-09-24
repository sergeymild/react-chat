import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DOMPurify from 'dompurify';

import { AppContext } from '../App/Context.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './inputgroup.scss';

class InputGroup extends React.Component {

  /* Lifecycle */

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      isAttachMenuOpen: false,
      isInputGroupExpanded: false,
      touchMoved: false
    };
    this.attachButton = React.createRef();
    this.attachMenu = React.createRef();
  }

  componentDidMount = () => {
    if (document) {
      document.addEventListener('mousedown', this.checkTouchOutsideMenu);
      document.addEventListener('touchstart', this.resetTouch);
      document.addEventListener('touchmove', this.invalidateTouch);
      document.addEventListener('touchend', this.checkTouchOutsideMenu);
    }
  };

  componentWillUnmount = () => {
    if (document) {
      document.removeEventListener('mousedown', this.checkTouchOutsideMenu);
      document.addEventListener('touchstart', this.resetTouch);
      document.addEventListener('touchmove', this.invalidateTouch);
      document.removeEventListener('touchend', this.checkTouchOutsideMenu);
    }
  };

  componentDidUpdate = () => {
    if (this.textField && this.props.value !== this.textField.innerHTML.toString()) {
      const { value } = this.props;
      this.textField.innerHTML = this.convertStringToHTML(value);
    }
    if (navigator && !navigator.userAgent.match(/(iP(hone|[ao]d))|(android)|(webOS)/i)) {
      this.replaceCaret(this.textField);
    }
  };

  render = () => {
    const { className } = this.props;
    const { isInputGroupExpanded } = this.state;
    return (
      <AppContext.Consumer>
        {(context) => (
          <React.Fragment>
            <div
              className={cx(
                `chat-input-group--${context.theme}`,
                className,
                isInputGroupExpanded && style['chat-input-group--expanded'],
                style['chat-input-group'],
                style[`chat-input-group--${context.layout}`],
                style[`chat-input-group--${context.sizing}`]
              )}
              ref={(element) => this.self = element}
            >
              {this.getInputRow(context)}
              {this.getActionRow(context)}
            </div>
            {this.getAttachModal(context)}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  };

  /* Main Fragments */

  getActionRow = (context) => {
    const { layout, sizing } = context;
    const isAlignedLayout = layout === 'aligned';
    const hasSendButton = isAlignedLayout && sizing !== 'desktop';
    return (
      <div className={cx(
        style['chat-input-group__row'],
        style['chat-input-group__row--action']
      )}>
        {isAlignedLayout && this.getActionSet(context)}
        {hasSendButton && this.getSendButton(context)}
      </div>
    );
  };

  getAttachModal = (context) => {
    const { isAttachMenuOpen } = this.state;
    if (!isAttachMenuOpen) {
      return null;
    }
    return (
      <div
        className={cx(style['chat-input-group__modal'])}
        ref={this.attachMenu}
      >
        <span className={cx(style['chat-input-group__modal-title'])}>
          Choose an attachment type:
        </span>
        {this.getAttachMenu(context)}
      </div>
    );
  };

  getInputRow = (context) => {
    const { layout, sizing } = context;
    const isStaggeredLayout = layout === 'staggered';
    const hasSendButton = isStaggeredLayout || sizing === 'desktop';
    return (
      <div className={cx(
        style['chat-input-group__row'],
        style['chat-input-group__row--textarea']
      )}>
        {isStaggeredLayout && this.getAttachButton(context)}
        {this.getInputField(context)}
        {hasSendButton ? this.getSendButton(context) : this.getExpandCollapseButton(context)}
      </div>
    );
  };

  /* Subviews */

  getAttachButton = (context) => {
    const { attachOptions, onAttach } = this.props;
    if (!onAttach && (!attachOptions || !attachOptions.length)) {
      return null;
    }
    const iconName = 'attach';
    return this.getGenericButton(context, iconName, this.toggleAttachment, iconName);
  };

  getAttachMenu = (context) => {
    const { attachOptions } = this.props;
    if (!attachOptions || !attachOptions.length) {
      return null;
    }
    const actions = attachOptions.map((option) => {
      const { action, icon, label, type } = option;
      return (
        <div
          className={cx(
            style['chat-input-group__attach-menu-item'],
            style[`chat-input-group__attach-menu-item--${context.sizing}`]
          )}
          key={label}
        >
          {this.getGenericButton(
            context,
            label,
            this.executeAction(action, type, true),
            type,
            false,
            icon
          )}
          <span>{label}</span>
        </div>
      );
    });
    return (
      <div className={cx(
        `chat-input-group__attach-menu--${context.theme}`,
        style['chat-input-group__attach-menu']
      )}>
        {actions}
      </div>
    );
  };

  getActionSet = (context) => {
    const { attachOptions } = this.props;
    if (!attachOptions || !attachOptions.length) {
      return null;
    }
    const actions = attachOptions.map((option) => {
      const { action, icon, label, type } = option;
      return this.getGenericButton(
        context,
        label,
        this.executeAction(action, type, false),
        type,
        false,
        icon
      );
    });
    return (
      <div className={cx(style['chat-input-group__action-set'])}>
        {actions}
      </div>
    );
  };

  getExpandCollapseButton = (context) => {
    const { isInputGroupExpanded } = this.state;
    const iconName = isInputGroupExpanded ? 'collapse' : 'expand';
    return this.getGenericButton(context, iconName, this.toggleExpansion, iconName);
  };

  getGenericButton = (context, label, onClick, placeholder = null, isDisabled = false, source = null) => (
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
      ref={label === 'attach' ? this.attachButton : null}
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

  getInputField = (context) => {
    const { layout, sizing, theme } = context;
    const { placeholder } = this.props;
    return (
      <div className={cx(
        `chat-input-group__textarea-container--${theme}`,
        style['chat-input-group__textarea-container'],
        style[`chat-input-group__textarea-container--${layout}`],
        style[`chat-input-group__textarea-container--${sizing}`]
      )}>
        <div
          className={cx(style['chat-input-group__textarea'])}
          contentEditable
          onInput={this.updateInputChanges}
          placeholder={placeholder}
          ref={(element) => this.textField = element}
        />
      </div>
    );
  };

  getSendButton = (context) => {
    const { layout, sizing } = context;
    const { input } = this.state;
    const iconName = 'send';
    const placeholder = layout === 'staggered' && sizing !== 'desktop' ? iconName : null;
    const isDisabled = !this.isSubmittableAsText(input);
    return this.getGenericButton(context, iconName, this.submitInput, placeholder, isDisabled);
  };

  /* Input Handling */

  convertHTMLtoString = (rawHtml) => {
    let htmlString = rawHtml.toString();
    htmlString = DOMPurify.sanitize(htmlString);
    return htmlString;
  };

  convertStringToHTML = (rawString) => {
    const htmlString = DOMPurify.sanitize(rawString);
    const htmlObject = new DOMParser().parseFromString(htmlString, 'text/html');
    return htmlObject.body.innerHTML;
  };

  findLastNode = (node) => {
    const children = node.childNodes;
    if (!children || !children.length) {
      return node;
    }
    for (let index = children.length - 1; index >= 0; index--) {
      const lastNode = this.findLastNode(children[index]);
      if (lastNode) {
        return lastNode;
      }
    }
    return null;
  };

  getHeight = () => this.self && this.self.getBoundingClientRect ? this.self.getBoundingClientRect().height : 0;

  isSubmittableAsText = (input) => {
    if (!input || typeof input !== 'string' || input.trim() === '') {
      return false;
    }
    const tempHtml = new DOMParser().parseFromString(input, 'text/html');
    if (!tempHtml || !tempHtml.body || !tempHtml.body.textContent) {
      return false;
    }
    const body = tempHtml.body;
    return body.textContent.trim() !== '';
  };

  replaceCaret = (element) => {
    const target = this.findLastNode(element);
    if (!target || !target.nodeValue) {
      return;
    }
    const previousRange = document.createRange();
    const reference = window.getSelection().getRangeAt(0);
    previousRange.selectNodeContents(element);
    previousRange.setStart(reference.endContainer, reference.endOffset);
    const previousContent = previousRange.cloneContents();
    const range = document.createRange();
    const selection= window.getSelection();
    range.setStart(target, target.nodeValue.length);
    range.collapse(true);
    selection.removeAllRanges();
    if (previousContent && previousContent.textContent.length > 0) {
      previousRange.setEnd(reference.endContainer, reference.endOffset);
      selection.addRange(previousRange);
    } else {
      range.setEnd(range.endContainer, target.nodeValue.length);
      selection.addRange(range);
    }
    if (element instanceof HTMLElement) {
      element.focus();
    }
  };

  /* Event Handlers */

  checkTouchOutsideMenu = (event) => {
    const { touchMoved } = this.state;
    if (this.attachButton
        && this.attachButton.current
        && this.attachButton.current.contains(event.target)) {
      return false;
    }
    if (!touchMoved
        && this.attachMenu
        && this.attachMenu.current
        && !this.attachMenu.current.contains(event.target)) {
      this.setState({
        isAttachMenuOpen: false
      });
      return true;
    }
    return false;
  };

  executeAction = (action, type, isAttachAction) => (event) => {
    if (isAttachAction) {
      this.setState({
        isAttachMenuOpen: false
      });
    }
    return action(type, event);
  };

  invalidateTouch = () => this.setState({
    touchMoved: true
  });

  resetTouch = () => this.setState({
    touchMoved: false
  });

  submitInput = (event) => {
    const { onSend } = this.props;
    const { input } = this.state;
    this.setState({
      input: ''
    });
    return onSend(input, event);
  };

  toggleAttachment = (event) => {
    const { onAttach } = this.props;
    const { isAttachMenuOpen } = this.state;
    this.setState({
      isAttachMenuOpen: !isAttachMenuOpen
    });
    return onAttach(event);
  };

  toggleExpansion = (event) => {
    const { onExpand, onCollapse } = this.props;
    const { isInputGroupExpanded } = this.state;
    this.setState({
      isInputGroupExpanded: !isInputGroupExpanded
    });
    return isInputGroupExpanded ? onCollapse && onCollapse(event) : onExpand && onExpand(event);
  };

  updateInputChanges = (event) => {
    const { onChange } = this.props;
    let input = event.target.innerHTML;
    input = this.convertHTMLtoString(input);
    this.setState({ input });
    return onChange(input);
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
