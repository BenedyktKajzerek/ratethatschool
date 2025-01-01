export interface UserModel {
  email: string;
  createdAt: Date | null;
  role: "user" | "admin";
}

export interface ReviewModel {
  id: string;
  approved: boolean;
  cityID: string;
  comment: string;
  date: Date;
  ratingOverall: number;
  ratings: {
    bathroom: number;
    building: number;
    location: number;
    teachers: number;
  };
  recommend: boolean;
  schoolID: string;
}

export interface AddCityModel {
  approved: boolean;
  cityName: string;
  comment: string;
  date: Date;
  ratingOverall: number;
  ratings: {
    bathroom: number;
    building: number;
    location: number;
    teachers: number;
  };
  recommend: boolean;
  schoolName: string;
}

export interface AddSchoolModel {
  approved: boolean;
  cityID: string;
  comment: string;
  date: Date;
  ratingOverall: number;
  ratings: {
    bathroom: number;
    building: number;
    location: number;
    teachers: number;
  };
  recommend: boolean;
  schoolName: string;
}

export interface CityModel {
  id: string;
  name: string;
}

export interface SchoolModel {
  id: string;
  name: string;
  cityID: string;
}
