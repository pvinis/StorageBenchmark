import { MMKV } from "react-native-mmkv"
import { StorageFns } from "../types"

const storage = new MMKV({
	id: "regular",
})

function mmkvClear(keys: string[]): void {
	storage.clearAll()
}

function mmkvSet(key: string, value: string): void {
	storage.set(key, value)
}

function mmkvGet(key: string): string | undefined {
	return storage.getString(key)
}

export const mmkv: StorageFns = {
	clear: mmkvClear,
	set: mmkvSet,
	get: mmkvGet,
}
