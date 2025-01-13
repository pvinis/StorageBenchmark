import Realm from "realm"
import { StorageFns } from "../types"

const TestSchema = {
	name: "Test",
	properties: {
		dict: 'string{}',
	}
}

type Test = {
	dict: Realm.Dictionary<string>
}

const realmdb = new Realm({
	schema: [TestSchema],
	deleteRealmIfMigrationNeeded: true,
});

// Create a singleton object with a dictionary property used as a key-value store
const singleton = realmdb.write(() => realmdb.create<Test>("Test", {}))
const dict = singleton.dict

function realmClear(keys: string[]): void {
	realmdb.beginTransaction();
	// Defer a commit to the next event loop tick
	setTimeout(() => {
		realmdb.commitTransaction();
	}, 0);

	for (const key of keys) {
		dict.remove(key)
	}
}

function realmSet(key: string, value: string) {
	dict[key] = value
}

function realmGet(key: string) {
	return dict[key]
}

export const realm: StorageFns = {
	clear: realmClear,
	set: realmSet,
	get: realmGet,
}
