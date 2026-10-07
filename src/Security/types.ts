/**
 * Subset of GitHub's repository security advisory payload that the sites
 * render. https://docs.github.com/en/rest/security-advisories/repository-advisories
 */
export interface SecurityAdvisory {
  ghsa_id: string;
  cve_id: string | null;
  html_url: string;
  summary: string;
  description: string | null;
  severity: AdvisorySeverity | null;
  state: "published" | "draft" | "triage" | "closed" | "withdrawn";
  published_at: string | null;
  updated_at: string | null;
  withdrawn_at: string | null;
  identifiers: { value: string; type: string }[] | null;
  vulnerabilities: AdvisoryVulnerability[] | null;
  cvss_severities: {
    cvss_v3?: AdvisoryCvssScore | null;
    cvss_v4?: AdvisoryCvssScore | null;
  } | null;
  cwes: { cwe_id: string; name: string }[] | null;
  credits: { login: string; type: string }[] | null;
}

export interface AdvisoryCvssScore {
  vector_string: string | null;
  score: number | null;
}

export interface AdvisoryVulnerability {
  package: { ecosystem: string; name: string | null } | null;
  vulnerable_version_range: string | null;
  patched_versions: string | null;
}

export type AdvisorySeverity = "critical" | "high" | "medium" | "low";

/** The CVSS score to display for an advisory. */
export interface AdvisoryCvss {
  version: string;
  score: number;
  vector: string | null;
}
