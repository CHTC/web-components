/**
 * Frontmatter list fields may be absent, null, or a bare scalar. Normalize to
 * an array so callers can iterate or search without guarding first.
 */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export default toArray;
