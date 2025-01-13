## Device Release
```mermaid
%%{init: {'theme': 'forest'}}%%
xychart-beta horizontal
    title "Expo Storage Benchmark (Device iPhone 15 Pro, Release)"
    x-axis ["async-storage", "react-native-mmkv", "expo-sqlite", "realm-js", "expo-secure-store", "react-native-keychain"]
    y-axis "Time (in ms)" 0 --> 300
    bar [50, 2, 197, 4, 290, 263]
```


## Device Debug
```mermaid
%%{init: {'theme': 'forest'}}%%
xychart-beta horizontal
    title "Expo Storage Benchmark (Device iPhone 15 Pro, Debug)"
    x-axis ["async-storage", "react-native-mmkv", "expo-sqlite", "realm-js", "expo-secure-store", "react-native-keychain"]
    y-axis "Time (in ms)" 0 --> 300
    bar [64, 5, 260, 7, 305, 293]
```


## Simulator Debug
```mermaid
%%{init: {'theme': 'forest'}}%%
xychart-beta horizontal
    title "Expo Storage Benchmark (Simulator iPhone 16 Pro, Debug)"
    x-axis ["async-storage", "react-native-mmkv", "expo-sqlite", "realm-js", "expo-secure-store", "react-native-keychain"]
    y-axis "Time (in ms)" 0 --> 300
    bar [34, 2, 190, 3, 190, 180]
```
