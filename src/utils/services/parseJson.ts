export function parseJson<T>(
  value: string,
  field: string,
  isExpected: (value: unknown) => value is T
): T {
  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid JSON in local data field "${field}".`, {
      cause: error,
    });
  }

  if (!isExpected(parsed)) {
    throw new Error(`Unexpected value in local data field "${field}".`);
  }

  return parsed;
}
