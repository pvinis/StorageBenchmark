import Storage from "expo-sqlite/kv-store"

const key = "k"

Storage.clear()
Storage.setItem(key, "hello")

export async function getFromExpoSqlite(): Promise<string | null> {
	return Storage.getItem(key)
}
