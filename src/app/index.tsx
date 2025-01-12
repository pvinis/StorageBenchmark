import { Button, Text, View } from "react-native"
import { getFromAsyncStorage } from "../storages/AsyncStorage"
import { useCallback, useState } from "react"
import { getFromMMKV } from "../storages/MMKV"
import { getFromExpoSqlite } from "../storages/ExpoSqlite"
import { getFromExpoSecureStorage } from "../storages/ExpoSecureStorage"
import { getFromReactNativeKeychain } from "../storages/ReactNativeKeychain"
import { getFromRealm } from "../storages/Realm"

export default function Index() {
	const runBenchmarks = useCallback(async () => {
		console.log("Running Benchmark in 3... 2... 1...")
		let r = -1

		await waitForGC()
		r = await benchmark("AsyncStorage         :", getFromAsyncStorage)
		setResultsAsyncStorage(r)

		await waitForGC()
		r = await benchmark("MMKV                 :", getFromMMKV)
		setResultsMMKV(r)

		await waitForGC()
		r = await benchmark("Expo SQLite          :", getFromExpoSqlite)
		setResultsExpoSqlite(r)

		await waitForGC()
		r = await benchmark("RealmDB              :", getFromRealm)
		setResultsRealm(r)

		await waitForGC()
		r = await benchmark("Expo Secure Storage  :", getFromExpoSecureStorage)
		setResultsExpoSecureStorage(r)

		await waitForGC()
		r = await benchmark("React Native Keychain:", getFromReactNativeKeychain)
		setResultsReactNativeKeychain(r)
	}, [])

	const [resultsAsyncStorage, setResultsAsyncStorage] = useState(-1)
	const [resultsMMKV, setResultsMMKV] = useState(-1)
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

async function benchmark(label: string, fn: () => unknown | Promise<unknown>): Promise<number> {
	try {
		console.log(`Starting Benchmark "${label}"...`)
		const start = performance.now()
		for (let i = 0; i < iterations; i++) {
			const r = fn()
			if (r instanceof Promise) {
				await r
			}
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
