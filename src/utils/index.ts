export const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export const getFirstPartString = (string: string): string | undefined => {
    return string.split(':')[0]?.trim()
}

export const getSecondPartString = (string: string): string | undefined => {
    return string.split(':')[1]?.trim()
}