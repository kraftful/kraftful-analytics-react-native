import { createClient } from "@segment/analytics-react-native";
import type { SegmentClient } from "@segment/analytics-react-native/lib/typescript/src/analytics";
import type { EventSender, JsonMap } from "./EventSender";

const KRAFTFUL_INGESTION_URL = "https://analytics-ingestion.kraftful.com/b";

export class SegmentEventSender implements EventSender {
  private client: SegmentClient;

  constructor(apiKey: string) {
    this.client = createClient({
      writeKey: apiKey,
      trackAppLifecycleEvents: true,
      flushAt: 10,
      proxy: KRAFTFUL_INGESTION_URL,
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
