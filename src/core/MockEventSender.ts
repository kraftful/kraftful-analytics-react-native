import type { EventSender, JsonMap } from "./EventSender";

export class MockEventSender implements EventSender {
  public callCount = 0;

  track(_name: string, _properties?: JsonMap) {
    this.callCount += 1;
  }

  identify(_userId: string, _traits?: JsonMap) {
    this.callCount += 1;
  }
}
