import { QueryInput } from '../types/api';

export const filterEmptyItems = (items: string[]): string[] => 
  items.filter(item => item.trim() !== '');

export const buildMockQuery = (data: QueryInput): string => {
  const parts: string[] = [];
  
  if (data.must_have.length > 0) {
    parts.push(`(${data.must_have.join(' AND ')})`);
  }
  
  if (data.optional_or.length > 0) {
    parts.push(`OR (${data.optional_or.join(' OR ')})`);
  }
  
  if (data.exclude.length > 0) {
    parts.push(`NOT (${data.exclude.join(' OR ')})`);
  }
  
  return parts.join(' ').trim();
};

export const isSubmitDisabled = (mustHave: string[]): boolean => 
  mustHave.every(item => !item.trim());