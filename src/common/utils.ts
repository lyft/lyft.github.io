/**
 * Returns a promise that resolves later
 * @param time time in milliseconds
 */
export function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
