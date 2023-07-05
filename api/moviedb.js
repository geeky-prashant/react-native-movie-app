import axios from "axios";
import { apiKey } from "../constants";

// EndPoints

// Base URL
const apiBaseUrl = "https://api.themoviedb.org/3";

// Trending Movie Endpoint URL
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;

// Upcoming Movie Endpoint URL
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;

// Top Rated Movie Endpoint URL
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// Dynamic Endpoints to pass Movie ID, Casts and Similar Movies
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// Function to Fecth Image having width of 500
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

// Function to Fecth Image having width of 500
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

// Function to Fecth Image having width of 500
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// FallBack Images for Poster and Person
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";



// API Call Method to Fecth the Data from Endpoints
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// Funtion to Call API for Fetching Data from the Trending Endpoints
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint); // t this method will call the apiCall Method with the trendingMoviesEndpoint that we defined and this will get all the trendingmovieslist
};

// Funtion to Call API for Fetching Data from the Upcoming Endpoints
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

// Funtion to Call API for Fetching Data from the Top Rated Endpoints
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

// Funtion to Call API for Fetching Data from the Dynamic Enpoints ( Movie ID, Casts and Similar Movies)
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}