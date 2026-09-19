export type SubjectId =
  | "physics"
  | "mathematics"
  | "chemistry"
  | "engineering"
  | "computer-science";

export type Subject = {
  id: SubjectId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  topicIds: string[];
};

export type Topic = {
  id: string;
  slug: string;
  name: string;
  subjectId: SubjectId;
  description: string;
  icon: string;
  concepts?: string[];
  relatedTopicIds?: string[];
};

export type CalculationStep = {
  label: string;
  latex: string;
  plainText?: string;
};

export type SearchItem = {
  id: string;
  type: "formula" | "topic" | "subject" | "tool";
  title: string;
  subtitle: string;
  path: string;
  equation?: string;
  subjectId?: SubjectId;
  topicId?: string;
  keywords?: string[];
};
