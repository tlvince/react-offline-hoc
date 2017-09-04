# react-offline-hoc

[![npm version](https://badge.fury.io/js/react-offline-hoc.svg)](https://badge.fury.io/js/react-offline-hoc)
[![Build Status](https://travis-ci.org/LINKIWI/react-offline-hoc.svg?branch=master)](https://travis-ci.org/LINKIWI/react-offline-hoc)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/react-offline-hoc/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/react-offline-hoc?branch=master)

`react-offline-hoc` is a React higher-order component factory to enhance your existing components
with an `isOnline` prop that indicates the online/offline status of the application.

This HOC uses the browser's native `window.navigator.onLine` property and its `online`/`offline`
events to determine the current offline state.

## API

#### `this.props.isOnline`

A `true` value for the `isOnline` prop indicates that the client has an active connection to the
network. Disconnecting from the network (desktop) or enabling airplane mode (mobile) will change
`isOnline` to `false`.

```javascript
import React from 'react';
import withOfflineState from 'react-offline-hoc';

const MyComponent = ({ isOnline }) => (
  <div>
    Connectivity is currently: {isOnline ? 'online' : 'offline'}
  </div>
);

export default withOfflineState(MyComponent);
```

#### Accessing the wrapped component

The wrapped component's ref is available via a class property `component` on the HOC instance.

```javascript
import React, { Component } from 'react';
import withOfflineState from 'react-offline-hoc';

class MyComponent extends Component {
  method() {
    ...
  }

  render() {
    ...
  }
}

const wrapped = withOfflineState(MyComponent);
wrapped.component.method();
```

## Example

A simple application that uses `react-offline-hoc` is provided in the `example/` directory.
To run it:

```bash
$ cd example/
$ npm install
$ npm run start
# Local server available at localhost:8080
```

Try connecting and disconnecting from the network and observe the resulting behavior.
