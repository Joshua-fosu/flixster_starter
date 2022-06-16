// https://api.themoviedb.org/3/movie/550?api_key=e31d3ef41e690c0589dc357561e14fe0

const imageBaseUrl = 'https://image.tmdb.org/t/p'

// Example image tag
// <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>


const main_page = document.querySelector("#flixter_movie_main_page")
const img_selector = document.querySelector(".movie-poster")
var flix_individual_movie = document.getElementsByClassName(".flixter_movie_card");
const main_body = document.getElementById("entire_page")
const toggle_display_movie_details = document.getElementById("no_display_mid_screen")
const movie_display_detail = document.getElementById("movie_details")

const movies = [
    {
        id: 338953,
        posterPath: "/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg",
        title: "Fantastic Beasts: The Secrets of Dumbledore",
        voteAverage: 6.9
    },
    {
        id: 526896,
        posterPath: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        title: "Morbius",
        voteAverage: 6.4
    },
    {
        id: 752623,
        posterPath: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
        title: "The Lost City",
        voteAverage: 6.8
    },
    {
        id: 675353,
        posterPath: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
        title: "Sonic the Hedgehog 2",
        voteAverage: 7.7
    },
    {
        id: 639933,
        posterPath: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
        title: "The Northman",
        voteAverage: 7.3
    },
    {
        id: 818397,
        posterPath: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
        title: "Memory",
        voteAverage: 7.3
    },
    {
        id: 507086,
        posterPath: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
        title: "Jurassic World Dominion",
        voteAverage: 6.7
    },
    {
        id: 453395,
        posterPath: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        title: "Doctor Strange in the Multiverse of Madness",
        voteAverage: 7.4
    },
    {
        id: 831946,
        posterPath: "/cpWUtkcgRKeauhTyVMjYHxAutp4.jpg",
        title: "Interceptor",
        voteAverage: 6.3
    },
    {
        id: 610150,
        posterPath: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
        title: "Dragon Ball Super: Super Hero",
        voteAverage: 6.8
    },
    {
        id: 414906,
        posterPath: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        title: "The Batman",
        voteAverage: 7.8
    },
    {
        id: 628900,
        posterPath: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
        title: "The Contractor",
        voteAverage: 6.6
    },
    {
        id: 629542,
        posterPath: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
        title: "The Bad Guys",
        voteAverage: 7.8
    },
    {
        id: 825808,
        posterPath: "/g2n1lFIFXC0lpG32ysUhFi0Uz61.jpg",
        title: "See for Me",
        voteAverage: 6
    },
    {
        id: 763285,
        posterPath: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
        title: "Ambulance",
        voteAverage: 7
    },
    {
        id: 648579,
        posterPath: "/bmxCAO0tz79xn40swJAEIJPRnC1.jpg",
        title: "The Unbearable Weight of Massive Talent",
        voteAverage: 7.3
    },
    {
        id: 361743,
        posterPath: "/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg",
        title: "Top Gun: Maverick",
        voteAverage: 8.3
    }
];

function addComponent(Main_Page, movie_details) {
    Main_Page.innerHTML +=
        `
    <div class="flixter_movie_card">
        <div class="movie_pic">
        <img class="movie-poster" src="${imageBaseUrl}/w342${movie_details.posterPath}" alt="${movie_details.title}" title="${movie_details.title}" id="${movie_details.id}"/>


        </div>
        <div class="rating_name">
            <p>${movie_details.voteAverage}</p>
            <p>${movie_details.title}</p>

        </div>

    </div>
    
     `
}

main_body.addEventListener('click', function (e) {
    // But only alert for elements that have an alert-button class
    if (e.target.classList.contains("movie-poster")) {
        console.log(e.target.id)
        displayIndividualMovieDetails(e.target.id)
    }
});


// flix_individual_movie.addEventListener("click", function() {

// })

document.getElementById("no_display_mid_screen_btn").addEventListener('click', (event) => {
    toggle_display_movie_details.style.display = "none"
})


/*
Update later
*/
// toggle_display_movie_details.addEventListener('click', (event) => {



// });

function updateDisplayMovieDetail(movie_details){
    console.log(movie_details)
    movie_display_detail.innerHTML = `
        
        <img class="individual_movie_poster" src="https://i0.wp.com/tivertonlibrary.org/wp-content/uploads/2019/02/intergalactic-blog.png?fit=650%2C400&ssl=1" alt="${movie_details.title}" title="${movie_details.title}" id="${movie_details.id}"/>
        
            <div>
                <h4>Nomaland</h4>
                <p>
                    Hi
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

            </div>
        
        
        
        
      `
}

function displayIndividualMovieDetails(movie_id) {
    console.log(movie_id)
    toggle_display_movie_details.style.display = "block"
    /*data.find(el => el.code === "AL");*/
    let movie_detail = movies.find(movie => movie.id == movie_id);
    updateDisplayMovieDetail(movie_detail)
}

window.onload = () => {
    movies.forEach((movie) => {
        addComponent(main_page, movie)
    })
    console.log("Loaded")


}
