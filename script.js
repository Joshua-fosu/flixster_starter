// https://api.themoviedb.org/3/movie/550?api_key=e31d3ef41e690c0589dc357561e14fe0
const api_key = "e31d3ef41e690c0589dc357561e14fe0"
const imageBaseUrl = 'https://image.tmdb.org/t/p'
const baseRequest = "https://api.themoviedb.org/3/movie/550?api_key=e31d3ef41e690c0589dc357561e14fe0&language=en-US"
let currQuery = ""
let currpage = 1
var currL;
// Example image tag
// <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>


const main_page = document.querySelector("#movies-grid")
const img_selector = document.querySelector(".movie-poster")
var flix_individual_movie = document.getElementsByClassName(".movie-card");
const main_body = document.getElementById("entire_page")
const toggle_display_movie_details = document.getElementById("no_display_mid_screen")
const movie_display_detail = document.getElementById("movie_details")
const search_bar = document.getElementById("search-input")
const form_selector = document.getElementById("form")
const endless_scrolling_switch = document.querySelector(".switch")
const load_more_selector = ""
var endless_scrolling  = false;
var is_submitted = false;







form_selector.addEventListener('submit', submitted);

async function submitted(event) {
    event.preventDefault();
    main_page.innerHTML += ``
    is_submitted = true
}

function addComponent(Main_Page, movie_details) {
    console.log(movie_details)
    image_path = movie_details.poster_path?movie_details.poster_path: movie_details.backdrop_path
    Main_Page.innerHTML +=
        `
    <div class="movie-card" id="${movie_details.id}">

        <div class="on_hover_trailer">

        </div>
        <div class="movie_pic">

        <img class="movie-poster" src="${imageBaseUrl}/original/${image_path}" alt="${movie_details.title}" title="${movie_details.title}" id="${movie_details.id}"/>


        </div>
        <div class="rating_name">
            <p id="movie-votes"><i class="fa-solid fa-star"></i>${movie_details.vote_average}</p>
            <p id="movie-title">${movie_details.title}</p>

        </div>

    </div>
    
     `
}

function addLoadMoreButton(){
    main_page.innerHTML += `
    <button id="load-more-movies-btn" onclick='load_more_movies();'>
        Load More
    </button>
    
    `

}

function addQueryComponent(Main_page, movie_details){
    image_path = movie_details.poster_path?movie_details.poster_path: movie_details.backdrop_path
    Main_page.innerHTML =
        `
    <div class="movie-card"  id="${movie_details.id}">
        <div class="movie_pic">

        <img class="movie-poster" src="${imageBaseUrl}/original/${image_path}" alt="${movie_details.title}" title="${movie_details.title}"  hover='addLoadMoreButton();'/>


        </div>
        <div class="rating_name">
            <p id="movie-votes"><i class="fa-solid fa-star"></i>${movie_details.vote_average}</p>
            <p id="movie-title">${movie_details.title}</p>

        </div>

    </div>
    
     `

}

main_body.addEventListener('click', function (e) {
    // But only alert for elements that have an alert-button class
    if (e.target.classList.contains("rating_name")) {
        displayIndividualMovieDetails(e.target.parentElement.id)
    }
});


async function playTrailer(movie_id){
    const response = await fetch("https://api.themoviedb.org/3/movie/"+ movie_id +"?api_key=e31d3ef41e690c0589dc357561e14fe0&language=en-US&append_to_response=videos,images")
    const response_json = await response.json()
    let video_path = await "https://www.youtube.com/embed/" + response_json.videos.results[0].key +"?controls=0&autoplay=1&mute=1&cc_lang_pref=en&cc_load_policy=1"
    return video_path

}



main_body.addEventListener('mouseover', async (event)=>{
    if (event.target.classList.contains("movie-poster")  && (window.innerWidth >= 1000)){
        youtube_key = await playTrailer(event.target.id);
        currL = event.target.parentElement.innerHTML
        event.target.parentElement.innerHTML =  `
        <iframe
            src=${youtube_key}
            width="100%" height="100%"
            modestbranding="1" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            class="youtube_embed"
            >
            </iframe>
        
        
        `
    }
})

main_body.addEventListener('mouseout', (event) => {
    if (event.target.parentElement.classList.contains("movie_pic") && (window.innerWidth >= 1000)){
        event.target.parentElement.innerHTML = currL
    }

})


// flix_individual_movie.addEventListener("click", function() {

// })





document.getElementById("close-search-btn").addEventListener('click', (event) => {
    toggle_display_movie_details.style.display = "none"
})


function updateDisplayMovieDetail(movie_details){
    image_path = movie_details.poster_path?movie_details.poster_path: movie_details.backdrop_path
    let video_path = "https://www.youtube.com/embed/" + movie_details.videos.results[0].key +"?autoplay=1&mute=1&cc_lang_pref=en&cc_load_policy=1"
    var genre_string = () => {
        var name = ""
        movie_details.genres.forEach((genre)=>{
            name += genre.name
            name += ", "
        })
        name = name.substr(0, name.length-2)
        return name
    }


    movie_display_detail.innerHTML = `
        
            <div class="ideally_img_div">
            <iframe
            src=${video_path}
            width="100%" height="400px"
            modestbranding="0"  controls="0" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            class="youtube_embed"
            >
            </iframe>
            </div>

            <div class="details_div">
            
                <h1 class="no_padding_margin" id="movie-title">${movie_details.title}</h1>
                <div class="movie_side_side_details">
                    <h4 class="inline_movie_details no_padding_margin">${movie_details.runtime} min</h4>
                    <h4 class="inline_movie_details details_padding_right no_padding_margin"> ${movie_details.release_date}</h4>
                    
                    <h4 class="inline_movie_details details_padding_right no_padding_margin"> ${genre_string()} </h4>
                    <h4 class="inline_movie_details details_padding_right no_padding_margin" id="movie-votes"><i class="fa-solid fa-star"></i> ${movie_details.vote_average}</h4>

                </div>
                <p>
                    ${movie_details.overview}
                </p>

            </div>
        
        
        
      `
}

async function getTrendingMovies(){
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=e31d3ef41e690c0589dc357561e14fe0&language=en-US&page=" + currpage)
    const response_json = await response.json()
    const movies = response_json.results
    movies.forEach((movie) => {
        addComponent(main_page, movie)
    })
    addLoadMoreButton()

}

async function displayIndividualMovieDetails(movie_id) {
    toggle_display_movie_details.style.display = "block"
    const response = await fetch("https://api.themoviedb.org/3/movie/"+ movie_id +"?api_key=e31d3ef41e690c0589dc357561e14fe0&language=en-US&append_to_response=videos,images")
    const response_json = await response.json()
    console.log(response_json)
    updateDisplayMovieDetail(response_json)
}

async function runOngoingSearch() {
    // endless_scrolling = false
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+ api_key+"&language=en-US&page=1&include_adult=false&query=" + currQuery)
    const response_json = await response.json()
    user_movies = response_json.results
    main_page.innerHTML = ``
    await user_movies.forEach(user_movie => {
        addComponent(main_page, user_movie)
    });
}


window.onscroll = function (ev) {
    if ( ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) )  && (endless_scrolling == true) && (is_submitted == false)) {
        currpage += 1
        getTrendingMovies()
    }
};


function load_more_movies() {
    currpage += 1
    getTrendingMovies()
}

search_bar.addEventListener('input', (event)=> {
    currQuery = search_bar.value
    if (currQuery == ""){
        main_page.innerHTML = ``
        currpage = 1
        is_submitted = false
        getTrendingMovies()
    }else{
        runOngoingSearch()
    }
    
})


endless_scrolling_switch.addEventListener('mouseup', function (event) {
    console.log(endless_scrolling)
    if (endless_scrolling == true){
        endless_scrolling = false
    }else{
        endless_scrolling = true
    }
})

window.onload = () => {
    getTrendingMovies();
}
