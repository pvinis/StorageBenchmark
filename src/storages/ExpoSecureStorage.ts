import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store"
import { StorageFns } from "../types"

async function expoSecureStorageClear(keys: string[]): Promise<void> {
	for (const key of keys) {
		await deleteItemAsync(key)
	}
}

async function expoSecureStorageSet(key: string, value: string): Promise<void> {
	await setItemAsync(key, value)
}

async function expoSecureStorageGet(key: string): Promise<string | null> {
	return await getItemAsync(key)
}

export const expoSecureStorage: StorageFns = {
	clear: expoSecureStorageClear,
	set: expoSecureStorageSet,
	get: expoSecureStorageGet,
}
