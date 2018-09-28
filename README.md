# React Chat

[![Build Status](https://travis-ci.com/hliejun/react-chat.svg?branch=master)](https://travis-ci.com/hliejun/react-chat)

*React Chat is presently in alpha and is not meant to be a viable substitute to delicate native chat frameworks.*

*React Chat currently does not support pagination of messages or rooms, hence might have performance issues when loading huge volume of chat data. Handles for pagination such as scroll pagination will be added soon.*

## Intro

React Chat is an extensible set of presentational chat components for mobile-first ReactJS web applications.
It facilitates simple messaging interactions on-the-go.

React Chat is inspired by the designs at [GiftedChat](https://github.com/FaridSafi/react-native-gifted-chat), [Slack](https://slack.com/), [WhatsApp](https://web.whatsapp.com/) and [Telegram](https://web.telegram.org/).

Besides this [README](https://hliejun.github.io/react-chat/), you may find documentation of the design and behaviours of components in [Storybook](https://hliejun.github.io/react-chat/docs).

> Examples and demos will be provided through Storybook and the [Examples](https://hliejun.github.io/react-chat/examples) page in the future. This is a work in progress.

## Getting Started

React Chat requires at least `React 16.3.0` as a peer dependency.

To install using `npm`:

```
npm install @hliejun/react-chat
```

To install using `yarn`:

```
yarn add @hliejun/react-chat
```

To opt-in to alpha versions, please explicitly state the version. <br>
For the current version (as of 28 Sep 2018), replace `react-chat` with `react-chat@0.0.1-alpha.3`.

## Usage

React Chat comprises of:

- `ChatList`

- `ChatRoom`

### `ChatList`

`ChatList` is a component used for interacting with a list of chat rooms or message groups. As a presentational component, it exposes the handles for various tasks such as displaying chat rooms, refreshing the view, filtering the list and more.

For instance, you can invoke `ChatList` with the following:

```jsx
import { ChatList } from '@hliejun/react-chat';

class MyContainer extends React.Component {

  // ...

  render = () => {
    //...
    const { rooms } = this.state;
    //...
    return (
      <ChatList
        onItem={this.segueToChatRoom}
        rooms={this.parseRooms(rooms)}
        title='Chats'
      />
    );
  };

  // ...

  parseRooms = (rooms) => {
    // Fetch and parse data into shape of room objects
  };

  segueToChatRoom = (id) => {
    // Navigate to chat room of id when room is selected
  };

}
```

The following table indicates the `props` that ChatList accepts.

Name                 | Type                             | Description
---                  | ---                              | ---
`className`          | `string`                         | Style classes passed down from container component
`hideAvatar`         | `bool`                           | Flag to opt out from showing `Avatar` in `ListItem`
`hideChevron`        | `bool`                           | Flag to opt out from showing chevron indicator as affordance to segueing
`hideTitleBar`       | `bool`                           | Flag to opt out from showing the `TitleBar`
`isLoading`          | `bool`                           | Flag to display loading animations while the `ChatList` is not readily populated
`layout`             | *see [AppContext](#appcontext)*  | Styling enumeration to match `ChatRoom` layout
`liveSearch`         | `bool`                           | Flag to indicate the intended search behaviour
`menuActions`        | *see [Actions](#actions)*        | Action handlers and metadata to populate chat `ListItem` menu
`onAvatar`           | `func`                           | Handler for interaction with the `Avatar` in a `ListItem`
`onInfo`             | `func`                           | Handler for interaction with the identity `Avatar` in `TitleBar`
`onItem`             | `func`                           | Handler for selecting a `ListItem` of a specific room
`onMenu`             | `func`                           | Handler for prompting the `ListItem` menu of a specific room
`onRefresh`          | `func`                           | Handler for initiating a fetch or reload to repopulate the `ChatList`
`onResult`           | `func`                           | Handler for selecting a search `ListItem` in the search results pane
`onSearch`           | `func`                           | Handler for search or filter logic to fetch or reload `searchResults`
`Placeholder`        | `React element`                  | Component to fill the body when `rooms` is empty
`rooms`              | *see [Rooms](#rooms)*            | Collection of objects specifying the metadata of a room
`searchHint`         | `string`                         | Placeholder for empty search field
`searchPlaceholder`  | `React element`                  | Placeholder for empty search results body
`searchResults`      | *see [Search](#search)*          | Collection of objects describing the outcome of `onSearch`
`sizing`             | *see [AppContext](#appcontext)*  | Device and sizing enumeration for layout responsiveness
`subtitle`           | `string`                         | Subtitle to display on `TitleBar`
`theme`              | *see [AppContext](#appcontext)*  | Theme enumeration for styling constituent components
`title`              | `string`                         | Title to display on `TitleBar`
`user`               | *see [Users](#users)*            | Object containing metadata of a user or a user profile

### `ChatRoom`

`ChatRoom` is a component used for interacting with a chat group, room, conversation, etc. Regardless of the room size, it offers generic handles for various messaging tasks such as typing, sending, searching, deleting, copying and more.

You can use `ChatRoom` this way:

```jsx
import { ChatRoom } from '@hliejun/react-chat';

class MyContainer extends React.Component {

  // ...

  render = () => {
    //...
    const { input, messages, room, userId, users } = this.state;
    const { id, name } = room;
    //...
    return (
      <ChatRoom
        inputValue={input}
        messages={this.parseMessages(messages)}
        onInput={this.parseInput}
        onSend={this.sendMessage}
        roomId={id}
        roomName={name}
        userId={userId}
        users={users}
      />
    );
  };

  // ...

  parseMessages = (messages) => {
    // Fetch and parse data into shape of message objects
  };

  parseInput = (nextInput) => {
    // Input control to parse HTML string into desirable values
    // ...
    // When done parsing, reload ChatRoom with new input state
    // Pure components will not reload if unaffected by input
    this.setState({
      input: parsedInput
    });
  };

  sendMessage = (input) => {
    // Call API to submit message
  };

}
```

The following table indicates the `props` that ChatRoom accepts.

Name                 | Type                             | Description
---                  | ---                              | ---
`attachOptions`      | *see [Media](#media)*            | Action handlers for media attachments
`className`          | `string`                         | Style classes passed down from container component
`hideAvatar`         | `bool`                           | Flag to opt out from showing `Avatar` in `Message` item
`inputData`          | *see [Media](#media)*            | Object describing attached media due for posting
`inputHint`          | `string`                         | Placeholder for input field
`inputValue`         | `string`                         | HTML-formatted string for rendering into input field
`layout`             | *see [AppContext](#appcontext)*  | Styling enumeration describing layout of messages
`liveSearch`         | `bool`                           | Flag to indicate the intended search behaviour
`menuActions`        | *see [Actions](#actions)*        | Action handlers and metadata to populate chat `Message` menu
`messages`           | *see [Messages](#messages)*      | Collection of objects representing `Message` content
`onAttach`           | `func`                           | Handler for attaching media to input
`onAvatar`           | `func`                           | Handler for interaction with the `Avatar` in a `Message`
`onContent`          | `func`                           | Handler for selecting a message `Content`
`onInfo`             | `func`                           | Handler for interaction with the identity `Avatar` in `TitleBar`
`onInput`            | `func`                           | Handler for intercepting and updating input field value
`onMenu`             | `func`                           | Handler for prompting the content `Menu` of a specific message
`onRefresh`          | `func`                           | Handler for initiating a fetch or reload to repopulate the `Message` list
`onResult`           | `func`                           | Handler for selecting a search `ListItem` in the search results pane
`onReturn`           | `func`                           | Handler for interacting with the return button to perform a segue
`onSearch`           | `func`                           | Handler for search or filter logic to fetch or reload `searchResults`
`onSend`             | `func`                           | Handler for submitting input value
`roomAvatar`         | `string`                         | Link to room avatar image
`roomId`             | `string`                         | Unique identifier of the room for actions contextual to the room
`roomName`           | `string`                         | Name or title of the chat room
`searchHint`         | `string`                         | Placeholder for empty search field
`searchPlaceholder`  | `React element`                  | Placeholder for empty search results body
`searchResults`      | *see [Search](#search)*           | Collection of objects describing the outcome of `onSearch`
`sizing`             | *see [AppContext](#appcontext)*  | Device and sizing enumeration for layout responsiveness
`subtitle`           | `string`                         | Subtitle to display on `TitleBar`
`theme`              | *see [AppContext](#appcontext)*  | Theme enumeration for styling constituent components
`userId`             | `string`                         | Unique identifier of the current user
`users`              | *see [Users](#users)*            | Indexed collection of objects containing metadata of all users involved in the chat room

### Actions

(WIP) Here are the PropTypes declaration for menu actions for the respective components.

```jsx

{/* ListItem Menu Actions */}

menuActions: PropTypes.arrayOf(PropTypes.shape({
  action: PropTypes.func.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'archive',
    'delete',
    'info',
    'pin',
    'star',
    'unread'
  ]).isRequired
}))

{/* Message Menu Actions */}

menuActions: PropTypes.arrayOf(PropTypes.shape({
  action: PropTypes.func.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'copy',
    'delete',
    'forward',
    'info',
    'pin',
    'reply'
  ]).isRequired
})),

```

### AppContext

(WIP) Here are the PropTypes declaration for app context options.

```jsx

{/* Layout */}

layout: PropTypes.oneOf([
  'aligned',
  'staggered'
])

{/* Sizing */}

sizing: PropTypes.oneOf([
  'desktop',
  'mobile',
  'tablet'
])

{/* Theme */}

theme: PropTypes.oneOf([
  'dark',
  'light'
])

```

### Messages

(WIP) Here are the PropTypes declaration for messages.

```jsx

{/* Messages */}

messages: PropTypes.arrayOf(PropTypes.shape({
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
  isLoading: PropTypes.bool,
  isRead: PropTypes.bool,
  messageId: PropTypes.string.isRequired,
  senderId: PropTypes.string,
  text: PropTypes.string,
  timeStamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'event',
    'media',
    'system',
    'text'
  ]).isRequired
})).isRequired

```

### Media

(WIP) Here are the PropTypes declaration for media-related objects.

```jsx

{/* Attach Options */}

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
}))

{/* Input Data */}

inputData: PropTypes.shape({
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
})

```

### Rooms

(WIP) Here are the PropTypes declaration for rooms.

```jsx

{/* Rooms */}

rooms: PropTypes.arrayOf(PropTypes.shape({
  avatar: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'archive',
    'pin',
    'star',
    'new'
  ]),
  subtitle: PropTypes.string,
  timeStamp: PropTypes.string
})).isRequired

```

### Search

(WIP) Here are the PropTypes declaration for search results.

```jsx

{/* Search Results */}

PropTypes.arrayOf(PropTypes.shape({
  avatar: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timeStamp: PropTypes.string
}))

```

### Users

(WIP) Here are the PropTypes declaration for user(s).

```jsx

{/* User */}

user: PropTypes.shape({
  avatar: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  website: PropTypes.string
})

{/* Users */}

users: PropTypes.objectOf(PropTypes.shape({
  avatar: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  website: PropTypes.string
})).isRequired

```

### Style Classes

(WIP) Formats and variants off CSS classes.

## Development

(WIP) Code Design, Linters, Storybook, RollUp, AppContext, Classnames. DOMPurify.

## TODOs

Summary of upcoming TODOs:

__Features__
- [ ] Animations
- [ ] Children buttons in TitleBar
- [ ] Dividers
- [ ] Expose child components for use
- [ ] Media preview
- [ ] Message markdown
- [ ] Message replies
- [ ] Refresh
- [ ] Scroll pagination
- [ ] Themes and abstract colors usage

__Performance__
- [ ] Recycle views
- [ ] Reduce bundle size with UglifyJS
- [ ] Split bundles for selective import
- [ ] Switch to PureComponent(s)
- [ ] Trim style classes

__Code Quality__
- [ ] Add Jest tests
- [ ] Refactor all stories
- [ ] Switch to SCSS for stories

__Documentation__
- [ ] Add example screenshots
- [ ] Complete README
- [ ] Complete Storybook
- [ ] Examples with ChatKit

__Maintenance__
- [ ] Setup issues

## Credits and Licenses

This project is licensed under the MIT License. See [LICENSE](https://github.com/hliejun/react-chat/blob/master/LICENSE) for copyright credits to the respective sources. The following people and resources have helped this project greatly in one way or another:

__Throttling without Lodash__ <br>
Author: [Jhey Tompkins](https://www.jheytompkins.com/) <br>
Web: [Throttling and Debouncing in Javascript](https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf)

__Default to Polymer SVG Icons__ <br>
Author: [PolymerElements](https://www.webcomponents.org/author/PolymerElements) and [David Francisco](https://david.tools/) <br>
Repo (polymerelements): https://github.com/PolymerElements/iron-icons <br>
Repo (dmfrancisco): https://github.com/dmfrancisco/react-icons

__Web URL Regex__ <br>
Author: [Diego Perini](https://github.com/dperini) <br>
Gist: https://gist.github.com/dperini/729294

__SASS Mixins__ <br>
Authors: [Richard Torres](https://github.com/richardtorres314) and [Engage Interactive](https://github.com/engageinteractive) <br>
Repo (engageinteractive): https://github.com/engageinteractive/core <br>
Gist (richardtorres314): https://gist.github.com/richardtorres314/26b18e12958ba418bb37993fdcbfc1bd

__SASS Material Colors__ <br>
Author: [minusfive](https://github.com/minusfive) <br>
Repo: https://github.com/minusfive/sass-material-colors <br>

## Support

(WIP) Issues and contact.
