// API Types
export interface QueryInput {
  must_have: string[];
  optional_or: string[];
  exclude: string[];
}

export interface QueryOutput {
  raw_query: string;
  encoded: string;
  example_link: string;
}

// Component Types
export interface SectionConfig {
  title: string;
  color: 'success' | 'warning' | 'error';
  icon: string;
  description: string;
}

export type SectionType = 'mustHave' | 'optionalOr' | 'exclude';