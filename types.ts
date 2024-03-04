export interface AllTrending {
  results: Trending[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Trending {
  name: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

export interface Movie {
  name: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  tagline: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  original_name: string;
  genres: Genre[];
  runtime: number;
}

export interface Genre {
  id: number;
  name: string;
}
