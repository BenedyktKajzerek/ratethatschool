export interface UserModel {
  email: string;
  createdAt: Date | null;
  role: "user" | "admin";
}

export interface ReviewModel {
  approved: boolean;
  cityID: string; // cities/[document]
  schoolID: string; // schools/[document]
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
}

export interface AddCityModel {
  approved: boolean;
  cityName: string;
  schoolName: string;
  date: Date;
  connection: string;
  ratings: {
    teachers: number;
    building: number;
    location: number;
    facilities: number;
    administration: number;
  };
  comment: string;
  ratingOverall: number;
}

export interface AddSchoolModel {
  approved: boolean;
  cityID: string; // cities/[document]
  schoolName: string;
  date: Date;
  connection: string;
  ratings: {
    teachers: number;
    building: number;
    location: number;
    facilities: number;
    administration: number;
  };
  comment: string;
  ratingOverall: number;
}

export interface CityModel {
  name: string;
}

export interface SchoolModel {
  name: string;
  cityID: string; // cities/[document]
}
