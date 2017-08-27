/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { mount } from 'enzyme';
import withOfflineState from '../src/offline';

class WrappedComponent extends Component {
  method = () => 'method';

  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}

const Offline = withOfflineState(WrappedComponent);

describe('Offline HOC', () => {
  test('Adds online and offline event listeners', () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    global.addEventListener = mockAddEventListener;
    global.removeEventListener = mockRemoveEventListener;

    const offline = mount(
      <Offline />,
    );

    const [
      scrollRegistration,
      [onlineRegistrationEvt],
      [offlineRegistrationEvt],
    ] = mockAddEventListener.mock.calls;
    expect(scrollRegistration).toBeDefined();
    expect(onlineRegistrationEvt).toBe('online');
    expect(offlineRegistrationEvt).toBe('offline');

    offline.unmount();

    const [
      [onlineDeregistrationEvt],
      [offlineDeregistrationEvt],
    ] = mockRemoveEventListener.mock.calls;
    expect(onlineDeregistrationEvt).toBe('online');
    expect(offlineDeregistrationEvt).toBe('offline');
  });

  test('Sets a ref to the wrapped component', () => {
    const offline = mount(
      <Offline />,
    );

    expect(offline.instance().component).toBeDefined();
    expect(offline.instance().component.method()).toBe('method');
  });

  test('Changes isOnline prop based on network connectivity state', () => {
    const mockAddEventListener = jest.fn();
    global.addEventListener = mockAddEventListener;

    const offline = mount(
      <Offline />,
    );

    const [
      [onlineRegistrationEvt, setOnline],
      [offlineRegistrationEvt, setOffline],
    ] = mockAddEventListener.mock.calls;

    expect(onlineRegistrationEvt).toBeDefined();
    expect(offlineRegistrationEvt).toBeDefined();

    expect(offline.find(WrappedComponent).props().isOnline).toBe(true);
    setOffline();
    expect(offline.find(WrappedComponent).props().isOnline).toBe(false);
    setOnline();
    expect(offline.find(WrappedComponent).props().isOnline).toBe(true);
  });

  test('Proxies all props', () => {
    const offline = mount(
      <Offline text="some text" />,
    );

    expect(offline.find('div').text()).toBe('some text');
  });
});
