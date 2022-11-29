export function enumToArray<T>(enumObject: T extends Record<keyof T, string> ? T : never): (keyof T)[] {
	return Object.keys(enumObject) as Array<keyof T>;
}
export function enumToArrayReadonly<T>(enumObject: T extends Record<keyof T, string> ? T : never): ReadonlyArray<keyof T> {
    return Object.keys(enumObject) as Array<keyof T>;
}

// export const categoryArray = enumToArrayReadonly(categoryEnum);
// export type categoryType = typeof categoryArray[number];

export type NonEmptyArray<T> = [T, ...T[]];
