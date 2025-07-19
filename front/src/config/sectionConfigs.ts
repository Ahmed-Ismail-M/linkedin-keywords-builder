import { SectionConfig, SectionType } from '../types/api';

export const sectionConfigs: Record<SectionType, SectionConfig> = {
  mustHave: {
    title: "Must-Have Skills",
    color: "success",
    icon: "💼",
    description: "Add skills or keywords that MUST be in your job search, like 'Python' or 'Marketing' – think of these as your dream job essentials!"
  },
  optionalOr: {
    title: "Nice-to-Have Extras",
    color: "warning",
    icon: "🌟",
    description: "Include skills or roles you'd love to see, like 'Remote' or 'Manager' – these are like bonus perks for your perfect job!"
  },
  exclude: {
    title: "Not Interested",
    color: "error",
    icon: "🚫",
    description: "List keywords to avoid, like 'Intern' or 'Sales' – keep these out of your job search, like jobs that don’t fit your goals!"
  }
};