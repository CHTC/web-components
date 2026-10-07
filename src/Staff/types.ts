import type { Website } from "../types";

export type StaffStatus = "Staff" | "Student" | "Past";

/**
 * One person from the shared CHTC/staff-list repository. Field names mirror
 * the YAML files in that repository.
 */
export interface StaffBase {
  name: string;
  /** Absolute URL once loaded by `getStaff`; a repo-relative path in the YAML. */
  image: string;
  title: string;
  website?: string;
  institution?: string;
  /** Highlight this person at the top of a team page. */
  promoted?: boolean;
  /** Sort weight within a team page; lower sorts first. */
  weight?: number;
  description?: string;
  status: StaffStatus;
  /** Sites whose team pages list this person. */
  organizations: Website[];
}

/**
 * A staff member, with optional per-site overrides keyed by site. `getStaff`
 * flattens the override for the requested site onto the base fields.
 */
export type Staff = StaffBase & {
  [site in Website]?: Partial<StaffBase>;
};

/** What the StaffCard component renders; a subset of `Staff`. */
export type StaffCardProps = Pick<Staff, "name" | "image" | "title" | "institution"> & {
  type: "leader" | "staff";
};
