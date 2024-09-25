import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import Template4 from '../components/templates/Template4';

const templateRegistry = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
};

export const getTemplate = (templateNumber) => {
  return templateRegistry[templateNumber] || templateRegistry[1]; // Default to Template1 if not found
};
