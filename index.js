const moviesContainer = document.getElementById('movies')

const movies = [
  {
    image:
      'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 8.2,
    year: 2022,
    description:
      'Batman se aventura no submundo de Gotham City quando um assassino sádico deixa para trás um rastro de pistas enigmáticas. À medida que as evidências começam a chegar mais perto de casa e a escala dos planos do criminoso se torna clara, ele deve forjar novos relacionamentos, desmascarar o culpado e trazer justiça ao abuso de poder e à corrupção que há muito atormentam a metrópole.',
    isFavorited: true
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    title: 'Avengers',
    rating: 9.2,
    year: 2019,
    description:
      'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.',
    isFavorited: false
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doctor Strange',
    rating: 9.2,
    year: 2022,
    description:
      'A vida do Dr. Stephen Strange (Benedict Cumberbatch) muda depois que um acidente de carro o rouba do uso de suas mãos. Quando a medicina tradicional falha, ele procura cura e esperança em um misterioso enclave. Ele rapidamente descobre que o enclave está na linha de frente de uma batalha contra forças das trevas invisíveis empenhadas em destruir a realidade. Em pouco tempo, Strange é forçado a escolher entre sua vida de fortuna e status ou deixar tudo para trás para defender o mundo como o feiticeiro mais poderoso que existe.',
    isFavorited: false
  }
]

window.onload = () => {
  movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {
  const { title, image, rating, year, description, isFavorited } = movie

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
  iconHeart.src = isFavorited ? '/assets/Heart.svg' : '/assets/Vector.svg'
  iconHeart.alt = 'star-icon'

  titleElement.textContent = `${title} (${year})`
  spanStar.textContent = rating
  spanHeart.textContent = 'Favoritar'

  movieElement.appendChild(movieText)
  movieText.appendChild(titleElement)
  movieText.appendChild(iconsElements)
  iconsElements.appendChild(iconStar)
  iconsElements.appendChild(spanStar)
  iconsElements.appendChild(iconHeart)
  iconsElements.appendChild(spanHeart)

   //////////////////DIV-MOVIE-DESCRIPTION////////////////////////////
  const movieDescription = document.createElement('div')
  const descriptionElement = document.createElement('p')
  movieDescription.classList.add('movie-description')
  descriptionElement.textContent = description

  movieElement.appendChild(movieDescription)
  movieDescription.appendChild(descriptionElement)
}
