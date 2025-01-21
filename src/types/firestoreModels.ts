export interface UserModel {
  email: string;
  createdAt: Date | null;
  role: "user" | "admin";
}

export interface ReviewModel {
  approved: boolean;
  date: Date;
  relationship: string;
  ratings: {
    teachers: number;
    learning: number;
    facilities: number;
    building: number;
    location: number;
  };
  comment: string;
  ratingOverall: number;
  isAddCity: boolean;
  isAddSchool: boolean;
  city: {
    name: string;
    slug: string;
    reference: string;
  };
  school: {
    name: string;
    slug: string;
    reference: string;
  };
  country: {
    name: string;
    slug: string;
    reference: string;
  };
}

export interface SchoolModel {
  name: string;
  slug: string;
  cityRef: string; // cities/[cityDoc]
  countryRef: string; // countries/[countryDoc]
}

export interface CityModel {
  name: string;
  slug: string;
  english: string;
  countryRef: string; // countries/[countryDoc]
}

export interface CountryModel {
  name: string;
}
