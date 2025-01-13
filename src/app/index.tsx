import { Button, Text, View } from "react-native"
import { useCallback, useState } from "react"
import { asyncStorage } from "../storages/AsyncStorage"
import { mmkv } from "../storages/MMKV"
import { mmkvEncrypted } from "../storages/MMKVEncrypted"
import { expoSqlite } from "../storages/ExpoSqlite"
import { expoSecureStorage } from "../storages/ExpoSecureStorage"
import { reactNativeKeychain } from "../storages/ReactNativeKeychain"
import { realm } from "../storages/Realm"
import { shuffle } from "lodash"
import { StorageFns } from "../types"

export default function Index() {
	const runBenchmarks = useCallback(async () => {
		console.log("Running Benchmark in 3... 2... 1...")
		let r = -1

		await waitForGC()
		r = await benchmark("AsyncStorage         :", asyncStorage)
		setResultsAsyncStorage(r)

		await waitForGC()
		r = await benchmark("MMKV                 :", mmkv)
		setResultsMMKV(r)

		await waitForGC()
		r = await benchmark("MMKV Encrypted      :", mmkvEncrypted)
		setResultsMMKVEncrypted(r)

		await waitForGC()
		r = await benchmark("Expo SQLite          :", expoSqlite)
		setResultsExpoSqlite(r)

		await waitForGC()
		r = await benchmark("RealmDB              :", realm)
		setResultsRealm(r)

		await waitForGC()
		r = await benchmark("Expo Secure Storage  :", expoSecureStorage)
		setResultsExpoSecureStorage(r)

		await waitForGC()
		r = await benchmark("React Native Keychain:", reactNativeKeychain)
		setResultsReactNativeKeychain(r)
	}, [])

	const [resultsAsyncStorage, setResultsAsyncStorage] = useState(-1)
	const [resultsMMKV, setResultsMMKV] = useState(-1)
	const [resultsMMKVEncrypted, setResultsMMKVEncrypted] = useState(-1)
	const [resultsRealm, setResultsRealm] = useState(-1)
	const [resultsExpoSqlite, setResultsExpoSqlite] = useState(-1)
	const [resultsExpoSecureStorage, setResultsExpoSecureStorage] = useState(-1)
	const [resultsReactNativeKeychain, setResultsReactNativeKeychain] = useState(-1)

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Ready?</Text>
			<Button title="Run Benchmarks" onPress={runBenchmarks} />
			<Text>Results:</Text>
			<Text>AsyncStorage: {resultsAsyncStorage.toFixed(4)}ms</Text>
			<Text>MMKV: {resultsMMKV.toFixed(4)}ms</Text>
			<Text>MMKV Encrypted: {resultsMMKVEncrypted.toFixed(4)}ms</Text>
			<Text>Expo SQLite: {resultsExpoSqlite.toFixed(4)}ms</Text>
			<Text>Realm: {resultsRealm.toFixed(4)}ms</Text>
			<Text>Expo Secure Storage: {resultsExpoSecureStorage.toFixed(4)}ms</Text>
			<Text>React Native Keychain: {resultsReactNativeKeychain.toFixed(4)}ms</Text>
		</View>
	)
}

async function waitForGC(): Promise<void> {
	// Wait for Garbage Collection to run. We give a 500ms delay.
	return new Promise((r) => setTimeout(r, 500))
}

const iterations = 1000
const keys1 = shuffle(Array.from({ length: iterations }, (_, i) => `k-${i}`))
const keys2 = shuffle(Array.from({ length: iterations }, (_, i) => `k-${i}`))

async function benchmark(label: string, fns: StorageFns): Promise<number> {
	try {
		console.log(`Starting Benchmark "${label}"...`)
		await fns.clear(keys1)

		const start = performance.now()
		for (const key of keys1) {
			await fns.set(key, "hello")
		}
		for (const key of keys2) {
			await fns.get(key)
		}
		const end = performance.now()

		const diff = end - start
		console.log(`Finished Benchmark "${label}"! Took ${diff.toFixed(4)}ms!`)
		return diff
	} catch (e) {
		console.error(`Failed Benchmark "${label}"!`, e)
		return 0
	}
}
