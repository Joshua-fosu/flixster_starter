// https://api.themoviedb.org/3/movie/550?api_key=e31d3ef41e690c0589dc357561e14fe0
const api_key = "e31d3ef41e690c0589dc357561e14fe0"
const imageBaseUrl = 'https://image.tmdb.org/t/p'
const baseRequest = "https://api.themoviedb.org/3/movie/550?api_key=e31d3ef41e690c0589dc357561e14fe0&language=en-US"
let currQuery = ""
let currpage = 1


// Example image tag
// <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>


const main_page = document.querySelector("#flixter_movie_main_page")
const img_selector = document.querySelector(".movie-poster")
var flix_individual_movie = document.getElementsByClassName(".flixter_movie_card");
const main_body = document.getElementById("entire_page")
const toggle_display_movie_details = document.getElementById("no_display_mid_screen")
const movie_display_detail = document.getElementById("movie_details")
const search_bar = document.getElementById("query")
const form_selector = document.getElementById("form")
const load_more_selector = ""
var endless_scrolling  = true







form_selector.addEventListener('submit', submitted);

async function submitted(event) {
    event.preventDefault();
    main_page.innerHTML += ``
}

function addComponent(Main_Page, movie_details) {
    console.log(movie_details)
    image_path = movie_details.poster_path?movie_details.poster_path: movie_details.backdrop_path
    Main_Page.innerHTML +=
        `
    <div class="flixter_movie_card">
        <div class="movie_pic">

        <img class="movie-poster" src="${imageBaseUrl}/original/${image_path}" alt="${movie_details.title}" title="${movie_details.title}" id="${movie_details.id}"/>


        </div>
        <div class="rating_name">
            <p><i class="fa-solid fa-star"></i>${movie_details.vote_average}</p>
            <p>${movie_details.title}</p>

        </div>

    </div>
    
     `
}

function addLoadMoreButton(){
    main_page.innerHTML += `
    <button id="load_more" onclick='load_more_movies();'>
        Load More
    </button>
    
    `
    
}

function addQueryComponent(Main_page, movie_details){
    image_path = movie_details.poster_path?movie_details.poster_path: movie_details.backdrop_path
    Main_page.innerHTML =
        `
    <div class="flixter_movie_card">
        <div class="movie_pic">

        <img class="movie-poster" src="${imageBaseUrl}/original/${image_path}" alt="${movie_details.title}" title="${movie_details.title}" id="${movie_details.id}"/>


        </div>
        <div class="rating_name">
            <p><i class="fa-solid fa-star"></i>${movie_details.vote_average}</p>
            <p>${movie_details.title}</p>

        </div>

    </div>
    
     `

}

main_body.addEventListener('click', function (e) {
    // But only alert for elements that have an alert-button class
    if (e.target.classList.contains("movie-poster")) {
        displayIndividualMovieDetails(e.target.id)
    }
});


// flix_individual_movie.addEventListener("click", function() {

// })

document.getElementById("no_display_mid_screen_btn").addEventListener('click', (event) => {
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
            
                <h1 class="no_padding_margin">${movie_details.title}</h1>
                <div class="movie_side_side_details">
                    <h4 class="inline_movie_details no_padding_margin">${movie_details.runtime} min</h4>
                    <h4 class="inline_movie_details details_padding_right no_padding_margin"> ${movie_details.release_date}</h4>
                    
                    <h4 class="inline_movie_details details_padding_right no_padding_margin"> ${genre_string()} </h4>
                    <h4 class="inline_movie_details details_padding_right no_padding_margin"><i class="fa-solid fa-star"></i> ${movie_details.vote_average}</h4>

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
    endless_scrolling = false
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+ api_key+"&language=en-US&page=1&include_adult=false&query=" + currQuery)
    const response_json = await response.json()
    user_movies = response_json.results
    main_page.innerHTML = ``
    await user_movies.forEach(user_movie => {
        addComponent(main_page, user_movie)
    });
}


// window.onscroll = function (ev) {
//     if ( ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) )  && (endless_scrolling)) {
//         currpage += 1
//         getTrendingMovies()
//     }
// };


// load_more_selector.addEventListener('click', (event) => {
//     currpage += 1
//     getTrendingMovies()
// })

function load_more_movies() {
    console.log("came, here")
    currpage += 1
    getTrendingMovies()
}

search_bar.addEventListener('input', (event)=> {
    currQuery = search_bar.value
    if (currQuery == ""){
        main_page.innerHTML = ``
        currpage = 1
        getTrendingMovies()
    }else{
        
    runOngoingSearch()
    }
    
})

window.onload = () => {
    getTrendingMovies();
}
