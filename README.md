# Expo Storage Benchmark

This is a benchmark app to compare popular storage solutions for Expo (React Native).

It's running Expo 52, React Native 0.76, with New Architecture enabled.

The Benchmark consists of calling a _get_ operation (retrieve one value from the database) a thousand times.

Here are the results, ranked from fastest to slowest:

1. [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv): **12ms** 👑
2. [WatermelonDB](https://github.com/Nozbe/WatermelonDB): **53ms**
3. [RealmDB](https://github.com/realm/realm-js): **81ms**
4. [react-native-quick-sqlite](https://github.com/ospfranco/react-native-quick-sqlite): **82ms**
5. [AsyncStorage](https://github.com/react-native-async-storage/async-storage): **242ms**

MMKV is **20x** faster than AsyncStorage (slowest), and **4x** faster than WatermelonDB (second fastest)!

<div align="center">
  <img src="./img/graph.png" align="center" />
</div>

Output in the console:

<div align="center">
  <img src="./img/comparison.png" align="center" />
</div>

> Tested on an iPhone 16 Pro Simulator

## Run it

1. Clone the repo and navigate to the `app/` directory
2. Run `yarn`
3. Run `yarn pods`
4. Run `yarn ios --device "YOURPHONENAME"`

<!-- You can also omit the `--device "YOURPHONENAME"` flag, but running on a Simulator always gives different results than on an actual device. -->

### Hardware

The above results were tested on an iPhone 16 Pro Simulator. Results may differ on different iPhones or Android Phones. Feel free to test on your own device, and report back your results in a GH issue.

### Debug

The above results were tested in a debug build. Release mode builds come with many optimizations and are therefore faster than debug.

### Operations

The above results were tested using _get_ operations for a single string key (value: `'hello'`). Results may differ when using other operations, such as _set_, _delete_, _update_, and more.
