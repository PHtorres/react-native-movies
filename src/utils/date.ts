export function parseDate(input: string): Date | undefined {
  if (!input) return undefined;
  var parts = input.match(/(\d+)/g);
  return new Date(Number(parts![0]), Number(parts![1]) - 1, Number(parts![2])); // months are 0-based
}
