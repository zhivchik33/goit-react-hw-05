

import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhlZmZiODEzNTFmZDc4NGE3YzRkNjE4MmI4YWI0OSIsIm5iZiI6MTczNDY0NTMzMS45NzksInN1YiI6IjY3NjQ5NjUzODBkY2Q4Zjc4ZjgyMjRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jkgSGNgvKK8QTB75qdWHMpt2gXoqB0WwZjCcYC-mDls";

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    include_adult: false,
    language: "en-US",
  },
});

export const getTrendingMovies = async (time_window = "week") => {
  const { data } = await movieInstance.get(`/trending/movie/${time_window}`, {
    params: {
      page: 1,
    },
  });
  return data;
};

export const searchMovieByName = async (movieName) => {
  const { data } = await movieInstance.get(`/search/movie`, {
    params: {
      query: movieName,
      page: 1,
    },
  });
  return data;
};

export const fetchMovieDetails = async (movie_id) => {
  const { data } = await movieInstance.get(`/movie/${movie_id}`);
  return data;
};

export const fetchMovieCredits = async (movie_id) => {
  const { data } = await movieInstance.get(`/movie/${movie_id}/credits`);
  return data;
};

export const fetchMovieReviews = async (movie_id) => {
  const { data } = await movieInstance.get(`/movie/${movie_id}/reviews`);
  return data;
};
