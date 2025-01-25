export type GroupedSchools = Record<
  string,
  {
    name: string;
    slug: string;
    cities: Record<
      string,
      {
        name: string;
        slug: string;
        schools: { name: string; slug: string }[];
      }
    >;
  }
>;
