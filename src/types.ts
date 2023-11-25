export type Genre =
  | "Action"
  | "Adventure"
  | "Comedy"
  | "Horror"
  | "Romance"
  | "SF"
  | "Thriller"
  | "Animation";

export type OTT =
  | "Netflix"
  | "Disney+"
  | "Amazon Prime Video"
  | "Apple TV+"
  | "Hulu";

export interface Login {
  username: string;
  password: string;
}

export interface Register extends Login {
  name: string;
  email: string;
  birth: string;
  favorite_genre: Genre | "";
  subscript_ott: OTT | "";
}

export type User = Omit<Register, "password">;

export interface MovieInfo {
  title: string;
  director: string;
  genre: string;
  runtime: number;
  poster_location: string;
  ott_platforms: OTT;
}

export interface RecommendMovie extends MovieInfo {
  movie_id: number;
  episodes: number;
}

export type RecommendList = Array<RecommendMovie>;
