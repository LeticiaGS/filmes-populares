import { API } from '././services/api.js'
import { LocalStorage } from '././services/localStorage.js'

const moviesContainer = document.getElementById('movies')
const input = document.querySelector('input')
const checkboxInput = document.getElementById('checkbox')
const searchButton = document.getElementById('icon-search')

searchButton.addEventListener('click', searchMovie)
checkboxInput.addEventListener('change', checkCkeckboxStatus)

function checkCkeckboxStatus() {
  const isChecked = checkboxInput.checked
  clearAllMovies()
  if (isChecked) {
    input.value = ''
    const movies = LocalStorage.getFavoriteMovies() || []
    if (movies.length == 0) {
      sorryMensage(1)
    } else {
      movies.forEach(movie => renderMovie(movie))
    }
  } else {
    getAllPopularMovies()
    input.value = ''
  }
}

input.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    searchMovie()
    return
  }
})

async function searchMovie() {
  const inputValue = input.value.trim()
  clearAllMovies()
  if (inputValue != '') {
    if (checkboxInput.checked === false) {
      const movies = await API.searchMovieByName(inputValue)
      if (movies.length == 0) sorryMensage(0)
      movies.forEach(movie => renderMovie(movie))
    } else {
      searchFavoriteMovies(inputValue)
    }
  } else {
    getAllPopularMovies()
    checkboxInput.checked = false
  }
  input.value = inputValue
}

function searchFavoriteMovies(movieName) {
  const formatedMovieName = formatText(movieName)
  const movies = LocalStorage.getFavoriteMovies() || []
  const regex = /[^a-z0-9 ]/gi
  const replacement = ''
  const findMovies = movies.filter(movie =>
    movie.title.replace('-', ' ')
               .replace(regex, replacement)
               .includes(formatedMovieName)
  )
  if (findMovies.length == 0) sorryMensage(0)
  else findMovies.forEach(movie => renderMovie(movie))
}

function formatText(text) {
  const lowerCase = text.toLowerCase()
  const textArray = lowerCase.split(' ')
  const tratedArray = []

  for (let i = 0; i < textArray.length; i++) {
    tratedArray[i] =
      textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1)
  }

  return tratedArray.join(' ')
}

function clearAllMovies() {
  moviesContainer.innerHTML = ''
}

function favoriteButtonPressed(event, movie) {
  const favoriteState = {
    favorited: '././assets/heart-fill.svg',
    notFavorited: '././assets/heart.svg'
  }

  if (event.target.src.includes(favoriteState.notFavorited)) {
    event.target.src = favoriteState.favorited
    LocalStorage.saveToLocalStorage(movie)
  } else {
    event.target.src = favoriteState.notFavorited
    LocalStorage.removeFromLocalStorage(movie.id)
  }
}

window.onload = async () => {
  if (checkboxInput.checked) {
    clearAllMovies()
    checkCkeckboxStatus()
  } else {
    getAllPopularMovies()
  }
}

async function getAllPopularMovies() {
  const movies = await API.getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {
  const { id, title, poster_path, vote_avenrage, release_date, overview } =
    movie

  const isFavorited = LocalStorage.checkMovieIsFavorited(id)
  const year = new Date(release_date).getFullYear()
  let image = ''
  if (poster_path == null) image = '././assets/noImageMovie.png'
  else image = `https://image.tmdb.org/t/p/w500${poster_path}`

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

  iconStar.src = '././assets/Star.png'
  iconStar.alt = 'star-icon'
  iconHeart.src = isFavorited ? '././assets/heart-fill.svg' : '././assets/heart.svg'
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

function sorryMensage(n) {
  const apologizeMessage = document.createElement('h1')
  let text = ''
  apologizeMessage.classList.add('no-movie')
  if (n == 0) text = 'that title :('
  else
    text = 'any favorite movies. How about adding some titles in your list? :)'
  apologizeMessage.textContent = `Sorry, we couldn't find ${text}`
  moviesContainer.appendChild(apologizeMessage)
}
