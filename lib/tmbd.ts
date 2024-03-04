"use server";

import { AllTrending, Movie } from "@/types";

const baseUrl = "https://api.themoviedb.org/3";

export async function GetWeeklyTrending(): Promise<AllTrending> {
  const key = process.env.TMBD_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/trending/all/day?api_key=${key}&language=en-US`,
    options
  );

  const data = await response.json();

  return data;
}

export async function GetMovieById(id: string): Promise<Movie> {
  const key = process.env.TMBD_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/movie/${id}?api_key=${key}&language=en-US`,
    options
  );

  const data = await response.json();

  return data;
}

export async function GetMovieCreditsById(id: string): Promise<any> {
  const key = process.env.TMBD_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/movie/${id}/credits?api_key=${key}&language=en-US`,
    options
  );

  const data = await response.json();

  return data;
}

export async function GetMovieWatchProvidersById(id: string): Promise<any> {
  const key = process.env.TMBD_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/movie/${id}/watch/providers?api_key=${key}`,
    options
  );

  const data = await response.json();

  return data;
}

export async function SearchForMovie(query: string): Promise<Movie[]> {
  const key = process.env.TMBD_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/search/movie?api_key=${key}&query=${query}&language=en-US&page=1&include_adult=false`,
    options
  );

  const data = await response.json();

  const obj: Movie[] = data.results.splice(0, 5);

  return obj;
}

export async function SearchForTv(query: string): Promise<Movie[]> {
  // https://api.themoviedb.org/3/search/movie?query=inter&include_adult=false&language=en-US&page=1
  const key = process.env.TMBD_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(
    `${baseUrl}/search/tv?api_key=${key}&query=${query}&language=en-US&page=1&include_adult=false`,
    options
  );

  const data = await response.json();

  const obj: Movie[] = data.results.splice(0, 5);

  return obj;
}
