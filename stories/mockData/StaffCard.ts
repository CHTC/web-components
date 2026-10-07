import { StaffCardProps } from "../../src/Staff/types";

export const defaultStaff: Omit<StaffCardProps, "type"> = {
  name: "John Doe",
  image: "https://placehold.co/150x150",
  title: "Research Software Engineer",
  institution: "University of Wisconsin—Madison",
};

export const defaultLeader: Omit<StaffCardProps, "type"> = {
  name: "John Doe",
  image: "https://placehold.co/150x150",
  title: "Principal Investigator",
  institution: "University of Wisconsin—Madison",
};
