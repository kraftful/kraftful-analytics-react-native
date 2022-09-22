import { createClient } from "../segment/client";

import type { KraftfulSegmentClient } from "../segment/analytics";
import type { EventSender, JsonMap } from "./EventSender";

const KRAFTFUL_INGESTION_URL = "https://analytics-ingestion.kraftful.com/b";

// These are default settings returned from the segment cdnHost as 9/20/2022
const DEFAULT_SEGMENT_SETTINGS = {
  unbundledIntegrations: [],
  addBundledMetadata: true,
  maybeBundledConfigIds: {},
  versionSettings: {
    version: "4.4.7",
    componentTypes: ["browser"],
  },
};

export class SegmentEventSender implements EventSender {
  private client: KraftfulSegmentClient;

  constructor(
    apiKey: string,
    {
      debug,
    }: {
      debug?: boolean;
    }
  ) {
    this.client = createClient({
      defaultSettings: {
        // @ts-ignore Segment defaultSettings type is bugged, you only pass the integrations part
        "Segment.io": {
          apiKey,
          apiHost: KRAFTFUL_INGESTION_URL,
          ...DEFAULT_SEGMENT_SETTINGS,
        },
      },
      writeKey: apiKey,
      trackAppLifecycleEvents: true,
      flushAt: 10,
      proxy: KRAFTFUL_INGESTION_URL,
      debug,
    });
  }

  track(name: string, properties?: JsonMap) {
    this.client.track(name, properties);
  }

  identify(userId: string, traits?: JsonMap) {
    this.client.identify(userId, traits);
  }
}
