import { QueryInput } from "@/types/api";

const calculateQueryLength = (input: QueryInput): number => {
  const combine = [
    ...input.must_have,
    ...input.optional_or,
    ...input.exclude,
  ];
  return combine.filter(Boolean).join(' ').length;
};
export const queryService = {
  calculateQueryLength,
};