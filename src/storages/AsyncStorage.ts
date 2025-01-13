import AsyncStorage from "@react-native-async-storage/async-storage"
import { StorageFns } from "../types"

async function asyncStorageClear(keys: string[]): Promise<void> {
	await AsyncStorage.clear()
}

async function asyncStorageSet(key: string, value: string): Promise<void> {
	await AsyncStorage.setItem(key, value)
}

async function asyncStorageGet(key: string): Promise<string | null> {
	return await AsyncStorage.getItem(key)
}

export const asyncStorage: StorageFns = {
	clear: asyncStorageClear,
	set: asyncStorageSet,
	get: asyncStorageGet,
}
