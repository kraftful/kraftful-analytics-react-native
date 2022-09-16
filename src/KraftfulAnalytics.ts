import type { EventSender } from "./core/EventSender";
import { SegmentEventSender } from "./core/SegmentEventSender";

/**
 * The KraftfulAnalytics singleton
 */
export class KraftfulAnalytics {
  private static sender?: EventSender = undefined;

  constructor() {
    throw new Error("KraftfulAnalytics should be instantiated");
  }

  /**
   * Initializes the KraftfulAnalytics library using the supplied API key.
   * @param apiKey The API key from your Kraftful analytics account.
   */
  public static initialize(apiKey: string) {
    if (!KraftfulAnalytics.sender) return;
    KraftfulAnalytics.sender = new SegmentEventSender(apiKey);
  }

  /**
   * Initializes the KraftfulAnalytics library with a customized sender instance (like for testing)
   * @param sender A sender to use
   */
  public static initializeWith(sender: EventSender) {
    KraftfulAnalytics.sender = sender;
  }

  /**
   * Tracks a single feature use event.
   * @param feature Name of the feature to track use of
   */
  public static trackFeatureUse(feature: string) {
    if (!KraftfulAnalytics.sender) return;

    KraftfulAnalytics.sender.track(feature);
  }

  /**
   * Tracks the sign in start event.
   */
  public static trackSignInStart() {
    if (!KraftfulAnalytics.sender) return;

    KraftfulAnalytics.sender.track("Sign In Start");
  }

  /**
   * Tracks the sign in success event. Pass the userId to associate the events with a user.
   */
  public static trackSignInSuccess(userId?: string) {
    if (!KraftfulAnalytics.sender) return;

    if (userId) KraftfulAnalytics.sender.identify(userId);
    KraftfulAnalytics.sender.track("Sign In Success");
  }

  /**
   * Tracks the connection start event.
   */
  public static trackConnectionStart() {
    if (!KraftfulAnalytics.sender) return;

    KraftfulAnalytics.sender.track("Connection Start");
  }

  /**
   * Tracks the connection success event.
   */
  public static trackConnectionSuccess() {
    if (!KraftfulAnalytics.sender) return;

    KraftfulAnalytics.sender.track("Connection Success");
  }

  /**
   * Tracks the return event and associates a user.
   */
  public static trackAppReturn(userId?: string) {
    if (!KraftfulAnalytics.sender) return;

    if (userId) KraftfulAnalytics.sender.identify(userId);
    KraftfulAnalytics.sender.track("Return");
  }
}
