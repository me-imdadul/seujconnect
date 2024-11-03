import DOMPurify from "dompurify";

export const sanitizeHTML = (dirty) => {
  return DOMPurify.sanitize(dirty);
};
