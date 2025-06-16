export const sanitizeCity = (input: string): string => {
  return input.replace(/[^a-zA-Z\s,-]/g, '').trim().toLowerCase();
};
