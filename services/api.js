import { APIKey } from '../config/APIKey.js'

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${title}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}

async function getPopularMovies() {
  const url = `
  https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}

export const API = {
  searchMovieByName,
  getPopularMovies
}