import Realm from "realm"
import { StorageFns } from "../types"

const TestSchema = {
	name: "Test",
	properties: {
		_id: "string",
		value: "string",
	},
	primaryKey: "_id",
}

const realmdb = new Realm({ schema: [TestSchema], deleteRealmIfMigrationNeeded: true })

function realmClear(keys: string[]): void {
	realmdb.write(() => {
		realmdb.deleteAll()
	})
}

function realmSet(key: string, value: string) {
	realmdb.write(() => {
		realmdb.create("Test", { _id: key, value })
	})
}

function realmGet(key: string) {
	const o = realmdb.objectForPrimaryKey("Test", key)
	if (o) return "ok"
	return undefined
}

export const realm: StorageFns = {
	clear: realmClear,
	set: realmSet,
	get: realmGet,
}
