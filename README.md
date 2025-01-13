# Expo Storage Benchmark

This is a benchmark app to compare popular storage solutions for Expo (React Native).

It's running Expo 52, React Native 0.76, with New Architecture enabled.

The Benchmark consists of calling a _get_ operation (retrieve one value from the database) a thousand times.

Here are the results (average of 5 runs), ranked from fastest to slowest:

1. [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv): **2ms** 👑
2. [realm-js](https://github.com/realm/realm-js): **4ms**
3. [async-storage](https://github.com/react-native-async-storage/async-storage): **50ms**
4. [expo-sqlite](https://github.com/expo/expo/tree/master/packages/expo-sqlite): **197ms**
5. [react-native-keychain](https://github.com/oblador/react-native-keychain): **263ms**
6. [expo-secure-store](https://github.com/expo/expo/tree/master/packages/expo-secure-store): **290ms**

I would like to add [react-native-nitro-sqlite](https://github.com/mrousavy/react-native-nitro-sqlite) to the benchmark. If someone wants to help me set up nitro modules with expo, ping me, or make a PR, I'd be very grateful!

<div align="center">
  <img src="./images/chart-device-release.png" align="center" />
</div>

<div align="center">
  <img src="./images/chart-device-debug.png" align="center" />
</div>

<div align="center">
  <img src="./images/chart-simulator-debug.png" align="center" />
</div>


## Run it

1. Clone the repo and navigate to it.
2. Run `bun install`.
3. Run `bun prebuild` to generate local native folders, or you can use EAS to build the app.
4. Run `bun dev` and start the app from Xcode or Android Studio.

### Hardware

The above results were tested on a device iPhone 15 Pro (both debug and release mode) and a simulator iPhone 16 Pro (debug mode). Results may differ on different iPhones or Android Phones. Feel free to test on your own device, and report back your results in a GH issue.

### Operations

The above results were tested using _get_ operations for a single string key (value: `'hello'`). Results may differ when using other operations, such as _set_, _delete_, _update_, and more.
