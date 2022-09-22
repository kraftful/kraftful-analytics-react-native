# Kraftful Analytics for React Native

## Setup

Add the package as a dependency using your package manager of choice:

```
yarn add kraftful-analytics-react-native@^2.0.3 \
  @react-native-async-storage/async-storage \
  @segment/analytics-react-native@2.3.1 \
  @segment/sovran-react-native@0.2.8 \
  --save
```

Run `pod install` to properly link the native modules:

```
npx pod-install
```

Import `KraftfulAnalytics` in your module files:

```typescript
import KraftfulAnalytics from "kraftful-analytics-react-native";
```

## Usage

The KraftfulAnalytics API exposes the following methods:

### `initialize(apiKey: string)`

Add the initialize call to the root of your App module. This is typically done right above your App component definition.

You can find your API key by logging into your Kraftful analytics account at [https://analytics.kraftful.com/settings/api-keys](https://analytics.kraftful.com/settings/api-keys).

```typescript
KraftfulAnalytics.initialize("YOUR-API-KEY");

const App = () => <View style={styles.container}>...</View>;
```

### `trackSignInStart()` and `trackSignInSuccess(userId?: string)`

Add the `trackSignIn(...)` calls to your login and registration flows. Typically the start call happens when your login/register screen loads and the success call happens when the user successfully logs in/registers.

```typescript
function SignInScreen() {
  React.useEffect(() => {
    // Call trackSignInStart when this page is appears
    KraftfulAnalytics.trackSignInStart();
  });

  const handleSignIn = React.useCallback(async () => {
    const result = await doSignIn(username, password);

    if (result.success) {
      // Call trackSignInSuccess when the user is authenticated
      KraftfulAnalytics.trackSignInSuccess(result.userId);
    }
  }, [username, password]);

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      ...
      <Button onPress={handleSignIn}>
        <Text>Sign In</Text>
      </Button>
    </View>
  );
}
```

### `trackConnectionStart()` and `trackConnectionSuccess()`

Add the `trackConnection(...)` calls to your device connection flows. Similar to the sign in tracking, these are typically added when the first screen in your device connection flow loads and then is successfully connected.

```typescript
function ConnectionScreen() {
  React.useEffect(() => {
    // Call trackConnectionStart when this page is appears
    KraftfulAnalytics.trackConnectionStart();
  });

  const handleConnection = React.useCallback(async () => {
    const result = await doConnection(token);

    if (result.success) {
      // Call trackConnectionSuccess when the device is connected
      KraftfulAnalytics.trackConnectionSuccess();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text>Connect Device</Text>
      ...
      <Button onPress={handleConnection}>
        <Text>Connect</Text>
      </Button>
    </View>
  );
}
```

### `trackFeatureUse(feature: string)`

Add `trackFeatureUse(...)` calls to the features you want to track. Here we're adding the calls to some Button presses.

```typescript
function HomeScreen() {
  const handleChangeTemp = React.useCallback(async (amount: number) => {
    // Track when changing the temperature
    KraftfulAnalytics.trackFeatureUse("Change Temperature");
    await changeTemperature(amount);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Change Temperature</Text>

      <Button onPress={() => handleChangeTemp(-1)}>
        <Text>-</Text>
      </Button>

      <Button onPress={() => handleChangeTemp(1)}>
        <Text>+</Text>
      </Button>
    </View>
  );
}
```

### `trackAppReturn(userId?: string)`

Add `trackAppReturn(...)` calls when your app is foregrounded. This should be done where you rehydrate your user information so you can pass the logged in userId if they are already logged in.

The following `useAppState` hook example can be used to run code when your app is foregrounded.

```typescript
import { useState, useEffect, useCallback } from "react";
import { AppState, AppStateStatus } from "react-native";

// As per https://facebook.github.io/react-native/docs/appstate#app-states
// just remember that only iOS has the 'inactive' state
// so we should usually just detect on 'active' and 'background'

export const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  const onChangeAppState = useCallback((newAppState: AppStateStatus) => {
    setAppState(newAppState);
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", onChangeAppState);
    return () => {
      AppState.removeEventListener("change", onChangeAppState);
    };
  }, [onChangeAppState]);

  return appState;
};
```

Here's an example of using the hook in your App component:

```typescript
export default function App() {
  const appState = useAppState();

  useEffect(() => {
    if (appState === "active") {
      // Track return with the logged in userId (if you have one)
      KraftfulAnalytics.trackAppReturn(authData?.loggedInUserId);
    }
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
    </View>
  );
}
```

## License

```
MIT License

Copyright (c) 2022 Kraftful

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
