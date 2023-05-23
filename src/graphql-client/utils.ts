export function removeTypename<T>(obj: T) {
  if (typeof obj !== "object") return obj;

  for (const key in obj) {
    if (key === "__typename") delete obj[key];
    else obj[key] = removeTypename(obj[key]);
  }

  return obj;
}
