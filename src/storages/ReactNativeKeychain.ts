import { resetGenericPassword, setGenericPassword, getGenericPassword } from "react-native-keychain"
import { StorageFns } from "../types"

function reactNativeKeychainClear(keys: string[]): void {
	resetGenericPassword()
}

async function reactNativeKeychainSet(key: string, value: string): Promise<void> {
	await setGenericPassword(key, value)
}

async function reactNativeKeychainGet(key: string): Promise<string | undefined> {
	const result = await getGenericPassword()
	if (result) return result.password
	return undefined
}

export const reactNativeKeychain: StorageFns = {
	clear: reactNativeKeychainClear,
	set: reactNativeKeychainSet,
	get: reactNativeKeychainGet,
}
