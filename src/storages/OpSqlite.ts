import { open } from "@op-engineering/op-sqlite"
import { StorageFns } from "../types"

const db = open({
	name: "myDatabase.sqlite",
})

async function opSqliteClear(keys: string[]): Promise<void> {
	await db.execute("DROP TABLE IF EXISTS Benchmark")
	await db.execute(
		"CREATE TABLE IF NOT EXISTS Benchmark(key TEXT PRIMARY KEY NOT NULL, value TEXT)"
	)
}

async function opSqliteSet(key: string, value: string): Promise<void> {
	await db.execute(`INSERT INTO Benchmark (key, value) VALUES ('${key}', '${value}')`)
}

async function opSqliteGet(key: string): Promise<string | null> {
	const result = await db.execute(`SELECT * FROM Benchmark WHERE key = '${key}'`)
	return result.rows[0].value as string
}

export const opSqlite: StorageFns = {
	clear: opSqliteClear,
	set: opSqliteSet,
	get: opSqliteGet,
}
