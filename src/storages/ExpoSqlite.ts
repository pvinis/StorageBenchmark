import Storage from "expo-sqlite/kv-store"
import { StorageFns } from "../types"

function expoSqliteClear(keys: string[]): void {
	Storage.clear()
}

async function expoSqliteSet(key: string, value: string): Promise<void> {
	await Storage.setItem(key, value)
}

async function expoSqliteGet(key: string): Promise<string | null> {
	return await Storage.getItem(key)
}

export const expoSqlite: StorageFns = {
	clear: expoSqliteClear,
	set: expoSqliteSet,
	get: expoSqliteGet,
}
