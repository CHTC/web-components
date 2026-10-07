import type { SecurityAdvisory } from "../types";

/** Non-empty patched version strings across an advisory's affected packages. */
export function getPatchedVersions(advisory: SecurityAdvisory): string[] {
  return (advisory.vulnerabilities ?? [])
    .map((vulnerability) => vulnerability.patched_versions?.trim())
    .filter((versions): versions is string => Boolean(versions));
}

export default getPatchedVersions;
