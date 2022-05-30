import { APIKey } from './config/APIKey.js'

const moviesContainer = document.getElementById('movies')
const input = document.querySelector('input')
const searchButton = document.getElementById('icon-search')

searchButton.addEventListener('click', searchMovie)

input.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    searchMovie()
    return
  }
})

async function searchMovie() {
  const inputValue = input.value.trim()
  if (inputValue != '') {
    clearAllMovies()
    const movies = await searchMovieByName(input.value)
    if (movies.length == 0) sorryMensage()
    movies.forEach(movie => renderMovie(movie))
    input.value = inputValue
  } else {
    clearAllMovies()
    const movies = await getPopularMovies()
    movies.forEach(movie => renderMovie(movie))
    input.value = inputValue
  }
}

function clearAllMovies() {
  moviesContainer.innerHTML = ''
}

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${title}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  console.log(results)
  return results
}

async function getPopularMovies() {
  const url = `
  https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}

function favoriteButtonPressed(event, movie) {
  console.log(event, movie.id)
  const favoriteState = {
    favorited: 'assets/Vector.svg',
    notFavorited: 'assets/Heart.svg'
  }

  if (event.target.src.includes(favoriteState.notFavorited)) {
    event.target.src = favoriteState.favorited
    saveToLocalStorage(movie)
  } else {
    event.target.src = favoriteState.notFavorited
    removeFromLocalStorage(movie.id)
  }
}

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function saveToLocalStorage(movie) {
  const movies = getFavoriteMovies() || []
  movies.push(movie)

  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem('favoriteMovies', moviesJSON) // salva o array no Local Storage
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id)
}

function removeFromLocalStorage(id) {
  console.log(id)
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  console.log(findMovie)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem('favoritesMovies', JSON.stringify(newMovies))
}

window.onload = async () => {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {
  const { id, title, poster_path, vote_avenrage, release_date, overview } =
    movie
  const isFavorited = checkMovieIsFavorited(id)

  const year = new Date(release_date).getFullYear()
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`

  const movieElement = document.createElement('div')
  movieElement.classList.add('movie')
  moviesContainer.appendChild(movieElement)

  //////////////////DIV-IMAGE////////////////////////////
  const movieImage = document.createElement('div')
  const ImgPhotoElement = document.createElement('img')
  movieImage.classList.add('movie-image')
  movieElement.appendChild(movieImage)
  ImgPhotoElement.src = image
  ImgPhotoElement.alt = `${title} Poster`
  movieImage.appendChild(ImgPhotoElement)

  //////////////////DIV-MOVIE-TEXT////////////////////////////
  const movieText = document.createElement('div')
  const titleElement = document.createElement('p')
  const iconsElements = document.createElement('div')
  const iconStar = document.createElement('img')
  const spanStar = document.createElement('span')
  const iconHeart = document.createElement('img')
  const spanHeart = document.createElement('span')

  movieText.classList.add('movie-text')
  iconsElements.classList.add('icons')
  titleElement.classList.add('title')

  iconStar.src = '/assets/Star.png'
  iconStar.alt = 'star-icon'
  iconHeart.src = isFavorited ? 'assets/Vector.svg' : 'assets/Heart.svg'
  iconHeart.alt = 'star-icon'

  titleElement.textContent = `${title} (${year})`
  spanStar.textContent = vote_avenrage
  spanHeart.textContent = 'Favoritar'

  movieElement.appendChild(movieText)
  movieText.appendChild(titleElement)
  movieText.appendChild(iconsElements)
  iconsElements.appendChild(iconStar)
  iconsElements.appendChild(spanStar)
  iconsElements.appendChild(iconHeart)
  iconsElements.appendChild(spanHeart)

  iconHeart.addEventListener('click', event =>
    favoriteButtonPressed(event, movie)
  )

  //////////////////DIV-MOVIE-DESCRIPTION////////////////////////////
  const movieDescription = document.createElement('div')
  const descriptionElement = document.createElement('p')
  movieDescription.classList.add('movie-description')
  if (overview === '') {
    descriptionElement.textContent = 'No description'
  } else {
    descriptionElement.textContent = overview
  }

  movieElement.appendChild(movieDescription)
  movieDescription.appendChild(descriptionElement)
}

function sorryMensage() {
  const apologizeMessage = document.createElement('h1')
  apologizeMessage.classList.add('no-movie')
  apologizeMessage.textContent = "Sorry, we couldn't find that title :("
  moviesContainer.appendChild(apologizeMessage)
}
