// 去除只读属性 -- 适用于任何对象类型
export type Writable<T> = { -readonly [P in keyof T]: T[P] }

// 创建一个可写数组 -- 适用于数组类型
export type WritableArray<T> = T extends readonly any[] ? Writable<T> : T

// 检查类型 T 是否为 never
export type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N

// 检查类型 T 是否为 unknown
export type IfUnknown<T, Y = true, N = false> = [T] extends [unknown] ? Y : N

// 将 unknown 类型转换为 never，其他类型保持不变
export type UnknownToNever<T> = IfUnknown<T, never, T>

export {}
