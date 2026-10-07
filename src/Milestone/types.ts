/**
 * Subset of GitHub's milestone payload that the sites render.
 * https://docs.github.com/en/rest/issues/milestones
 */
export interface GitHubMilestone {
  number: number;
  title: string;
  description: string | null;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
  open_issues: number;
  closed_issues: number;
}
