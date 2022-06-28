export interface JsonList extends Array<JsonValue> {}

export declare type JsonValue =
  | boolean
  | number
  | string
  | null
  | JsonList
  | JsonMap
  | undefined;

export interface JsonMap {
  [key: string]: JsonValue;
  [index: number]: JsonValue;
}

export interface EventSender {
  track(name: string, properties?: JsonMap): void;
  identify(userId: string, traits?: JsonMap): void;
}
