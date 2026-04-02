export async function fetchMovies<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error Occured!");
  return res.json() as Promise<T>;
}
