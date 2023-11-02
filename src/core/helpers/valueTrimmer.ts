export const valueTrimmer = <T>(obj: T): T => {
  for (const prop in obj) {
    if (typeof obj[prop] === 'string') {
      obj[prop] = obj[prop as string].trim();
    }
  }
  return obj;
};
