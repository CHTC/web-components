import type { AdvisoryCvss, SecurityAdvisory } from "../types";

/**
 * The CVSS score to display, preferring v4 over v3 since that is what GitHub
 * shows on the advisory itself. Returns null when neither is scored.
 */
export function getAdvisoryCvss(advisory: SecurityAdvisory): AdvisoryCvss | null {
  const v4 = advisory.cvss_severities?.cvss_v4;
  if (v4?.score) {
    return { version: "4.0", score: v4.score, vector: v4.vector_string };
  }

  const v3 = advisory.cvss_severities?.cvss_v3;
  if (v3?.score) {
    return { version: "3.1", score: v3.score, vector: v3.vector_string };
  }

  return null;
}

export default getAdvisoryCvss;
