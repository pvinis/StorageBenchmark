import { open } from "react-native-nitro-sqlite"
import { StorageFns } from "../types"

const db = open({ name: "myDatabase.sqlite" })

function nitroSqliteClear(keys: string[]): void {
	db.execute("DROP TABLE IF EXISTS Benchmark")
	db.execute("CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))")
}

function nitroSqliteSet(key: string, value: string): void {
	db.execute("INSERT INTO Benchmark (value) VALUES (:value)", ["hello"])
}

function nitroSqliteGet(key: string): string | undefined {
	const { rows } = db.execute("SELECT * FROM `Benchmark`")

	if (rows == null || rows.length < 1) {
		throw new Error("Failed to get Values!")
	}

	const row = rows.item(0)
	if (!row) return undefined
	return row.value as string
}

export const nitroSqlite: StorageFns = {
	clear: nitroSqliteClear,
	set: nitroSqliteSet,
	get: nitroSqliteGet,
}
