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
  // Optional depeding on add-city/add-school
  schoolName: string;
  cityName: string;
  countryName: string;
  schoolRef: string; // schools/[schoolDoc]
  cityRef: string; // cities/[cityDoc]
  countryRef: string; // countries/[countryDoc]
}

export interface SchoolModel {
  name: string;
  cityRef: string; // cities/[cityDoc]
  countryRef: string; // countries/[countryDoc]
}

export interface CityModel {
  name: string;
  countryRef: string; // countries/[countryDoc]
}

export interface CountryModel {
  name: string;
}
