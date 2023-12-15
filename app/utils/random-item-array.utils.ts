export function randomItemArray<T>(arrays: T[]) {
  const randomIndex = Math.floor(Math.random() * arrays.length);
  return arrays[randomIndex];
}
