import { open } from "react-native-nitro-sqlite"

const db = open({ name: "myDatabase.sqlite" })

db.execute("DROP TABLE IF EXISTS Benchmark")

db.execute("CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))")

db.execute("INSERT INTO Benchmark (value) VALUES (:value)", ["hello"])

export function getFromNitroSqlite(): string | undefined {
	const { rows } = db.execute("SELECT * FROM `Benchmark`")

	if (rows == null || rows.length < 1) {
		throw new Error("Failed to get Values!")
	}

	const row = rows.item(0)
	if (!row) return undefined
	return row.value as string
}
