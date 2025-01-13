export type StorageFns = {
	clear: (keys: string[]) => void
	set: (key: string, value: string) => void
	get: (key: string) => string | undefined | null | Promise<string | undefined | null>
}
