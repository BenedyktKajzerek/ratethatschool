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
  cityName: string;
  schoolName: string;
}

export interface CityModel {
  name: string;
}

export interface SchoolModel {
  name: string;
  cityID: string; // cities/[document]
}
