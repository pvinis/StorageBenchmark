import Realm from "realm"

const TestSchema = {
	name: "Test",
	properties: {
		dict: "string{}",
	},
}

type Test = {
	dict: Realm.Dictionary<string>
}

const realm = new Realm({
	schema: [TestSchema],
	deleteRealmIfMigrationNeeded: true,
})

const object = realm.write(() => {
	realm.deleteAll()
	return realm.create<Test>("Test", { dict: { k: "hello" } })
})

const dict = object?.dict

export function getFromRealm() {
	return dict.k
}
