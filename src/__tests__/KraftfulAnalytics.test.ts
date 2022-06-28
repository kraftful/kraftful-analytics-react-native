import { KraftfulAnalytics } from "../KraftfulAnalytics";

import type { EventSender } from "../core/EventSender";

class MockEventSender implements EventSender {
  track = jest.fn();

  identify = jest.fn();
}

const TEST_USER_ID = "test-user-id";

let sender: MockEventSender;

beforeEach(() => {
  sender = new MockEventSender();
  KraftfulAnalytics.initializeWith(sender);
});

it("tracks Sign In events", () => {
  KraftfulAnalytics.trackSignInStart();

  expect(sender.track.mock.calls.length).toBe(1);
  expect(sender.track.mock.calls[0][0]).toBe("Sign In Start");

  KraftfulAnalytics.trackSignInSuccess(TEST_USER_ID);

  expect(sender.track.mock.calls.length).toBe(2);
  expect(sender.track.mock.calls[1][0]).toBe("Sign In Success");

  expect(sender.identify.mock.calls.length).toBe(1);
  expect(sender.identify.mock.calls[0][0]).toBe(TEST_USER_ID);
});

it("tracks Connection events", () => {
  KraftfulAnalytics.trackConnectionStart();

  expect(sender.track.mock.calls.length).toBe(1);
  expect(sender.track.mock.calls[0][0]).toBe("Connection Start");

  KraftfulAnalytics.trackConnectionSuccess();

  expect(sender.track.mock.calls.length).toBe(2);
  expect(sender.track.mock.calls[1][0]).toBe("Connection Success");
});

it("tracks feature use events", () => {
  KraftfulAnalytics.trackFeatureUse("Test Feature");

  expect(sender.track.mock.calls.length).toBe(1);
  expect(sender.track.mock.calls[0][0]).toBe("Test Feature");
});

it("tracks app return events", () => {
  KraftfulAnalytics.trackAppReturn(TEST_USER_ID);

  expect(sender.track.mock.calls.length).toBe(1);
  expect(sender.track.mock.calls[0][0]).toBe("Return");

  expect(sender.identify.mock.calls.length).toBe(1);
  expect(sender.identify.mock.calls[0][0]).toBe(TEST_USER_ID);
});
