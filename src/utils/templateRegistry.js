import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';

const templateRegistry = {
  1: Template1,
  2: Template2,
  // Add more templates here as they are created
};

export const getTemplate = (templateNumber) => {
  return templateRegistry[templateNumber] || templateRegistry[1]; // Default to Template1 if not found
};