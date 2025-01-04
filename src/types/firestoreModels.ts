export interface UserModel {
  email: string;
  createdAt: Date | null;
  role: "user" | "admin";
}

export interface ReviewModel {
  id: string;
  approved: boolean;
  cityID: string; // cities/[document]
  schoolID: string; // schools/[document]
  date: Date;
  connection: string;
  ratings: {
    teachers: number;
    learning: number;
    facilities: number;
    building: number;
    location: number;
  };
  comment: string;
  recommend: boolean;
  ratingOverall: number;
}

export interface AddCityModel {
  id: string;
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
  recommend: boolean;
  ratingOverall: number;
}

export interface AddSchoolModel {
  id: string;
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
  recommend: boolean;
  ratingOverall: number;
}

export interface CityModel {
  id: string;
  name: string;
}

export interface SchoolModel {
  id: string;
  name: string;
  cityID: string; // cities/[document]
}
