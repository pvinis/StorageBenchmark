import { MMKV } from "react-native-mmkv"
import { StorageFns } from "../types"

const storage = new MMKV({
	id: "encrypted",
	encryptionKey: "hunter2",
})

function mmkvEncryptedClear(keys: string[]): void {
	storage.clearAll()
}

function mmkvEncryptedSet(key: string, value: string): void {
	storage.set(key, value)
}

function mmkvEncryptedGet(key: string): string | undefined {
	return storage.getString(key)
}

export const mmkvEncrypted: StorageFns = {
	clear: mmkvEncryptedClear,
	set: mmkvEncryptedSet,
	get: mmkvEncryptedGet,
}
