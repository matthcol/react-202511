// util functions 

const range = (n: number, start?: number) => [...Array(n)].map((_, i) => i + (start ?? 0))

export {range}