import { createClient } from "@segment/analytics-react-native";
import type { SegmentClient } from "@segment/analytics-react-native/lib/typescript/src/analytics";
import type { EventSender, JsonMap } from "./EventSender";

export class SegmentEventSender implements EventSender {
  private client: SegmentClient;

  constructor(writeKey: string) {
    this.client = createClient({
      writeKey,
      trackAppLifecycleEvents: true,
      flushAt: 10,
    });
  }

  track(name: string, properties?: JsonMap) {
    if (!this.client) return;

    this.client.track(name, properties);
  }

  identify(userId: string, traits?: JsonMap) {
    this.client.identify(userId, traits);
  }
}
