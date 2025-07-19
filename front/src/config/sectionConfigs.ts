import { SectionConfig, SectionType } from '../types/api';

export const sectionConfigs: Record<SectionType, SectionConfig> = {
  mustHave: {
    title: "Must Have",
    color: "success",
    icon: "✅",
    description: "These words MUST be in the results - like ingredients in a recipe!"
  },
  optionalOr: {
    title: "Nice to Have",
    color: "warning",
    icon: "⭐",
    description: "Any of these words would be great to find - like bonus toppings!"
  },
  exclude: {
    title: "Don't Want",
    color: "error",
    icon: "❌",
    description: "Keep these words OUT of the results - like foods you don't like!"
  }
};