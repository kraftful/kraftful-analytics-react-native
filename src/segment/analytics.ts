import { SegmentClient } from "@segment/analytics-react-native/src/analytics";

export class KraftfulSegmentClient extends SegmentClient {
  // Override the fetchSettings method to apply defaultSettings directly
  async fetchSettings(): Promise<void> {
    // @ts-ignore private fields should be accessible by inheriting classes
    if (this.config.defaultSettings) {
      // @ts-ignore private fields should be accessible by inheriting classes
      this.store.settings.set(this.config.defaultSettings);
    }
  }
}
