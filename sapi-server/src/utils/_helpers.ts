// Function to convert input string to integer
export function toInteger(input: string): number {
  if (input === undefined || input === null) {
    return 0;
  }
  return parseInt(input, 10);
}
