import * as React from "react";

import { StyleSheet, View, Text } from "react-native";
import KraftfulAnalytics from "kraftful-analytics-react-native";

KraftfulAnalytics.initialize("MY-WRITE-KEY");

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
