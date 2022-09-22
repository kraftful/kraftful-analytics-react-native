import type { Config } from "@segment/analytics-react-native/src/types";
import { createLogger } from "@segment/analytics-react-native/src/logger";
import { SovranStorage } from "@segment/analytics-react-native/src/storage/sovranStorage";
import { KraftfulSegmentClient } from "./analytics";

const defaultConfig: Config = {
  writeKey: "",
  flushAt: 20,
  flushInterval: 30,
  maxBatchSize: 1000,
  trackDeepLinks: false,
  trackAppLifecycleEvents: false,
  autoAddSegmentDestination: true,
};

export const createClient = (config: Config) => {
  const logger = createLogger();
  if (typeof config?.debug === "boolean") {
    if (config.debug) {
      logger.enable();
    } else {
      logger.disable();
    }
  }
  const clientConfig = { ...defaultConfig, ...config };

  const segmentStore = new SovranStorage({
    storeId: config.writeKey,
    storePersistor: config.storePersistor,
  });

  // Use the KraftfulSegmentClient to prevent fetching settings
  const client = new KraftfulSegmentClient({
    config: clientConfig,
    logger,
    store: segmentStore,
  });

  client.init();

  return client;
};
