import slugify from "slugify";

export const generateSlug = (string: string) => {
  return slugify(string, { lower: true, strict: true });
};
