let input = document.getElementById("input");
let button = document.getElementById("button");
let resultContainer = document.querySelector(".result-container");
let key = "bfc08b9e";
let loader = document.querySelector(".loader");

async function getFilm() {
  showLoadingScreen();
  let film = input.value.trim();
  let url = `https://www.omdbapi.com/?apikey=${key}&t=${film}`;

  const response = await fetch(url);
  const data = await response.json();

  if (film.length <= 0) {
    resultContainer.innerHTML = `<h3 class ="text-center mx-auto text-xl">Please enter a valid film name</h3>`;
    hideLoadingScreen();
  } else {
    try {
      resultContainer.innerHTML = `
      <div class="flex">
      <div class="max-w-[200px] mt-2">
          <img src="${data.Poster}" class="rounded-md">
      </div>
      <div class="ml-4 justify-center w-full items-center flex flex-col">
          <h1 class="text-2xl w-full text-center mx-auto">${data.Title}</h1>
          <div>
              <i class="fas fa-star text-yellow-400"></i>
              <span>${data.Ratings[0].Value}</span>
          </div>

          <div class="flex flex-wrap mt-2 gap-1 ">
              <span class="rounded-md px-3 border inline-flex border-black items-center">${data.Genre}</span>

          </div>
          <div class="mt-3">
              <span>${data.Released}</span>
              <span class="text-slate-400 ml-4">${data.Runtime}</span>
          </div>
      </div>
    </div>

    <div class="mt-3">
      <h1>Plot:</h1>
      <p>${data.Plot}</p>
    </div>
    <div class="mt-6">
      <h1>Cast:</h1>
      <p>${data.Actors}</p>
    </div>

    `;
    } catch (error) {
      resultContainer.innerHTML = `<h3 class ="text-center text-xl">Please enter a valid film name</h3>`;
      hideLoadingScreen();
    }
    hideLoadingScreen();
    input.value = "";
  }
}
button.addEventListener("click", getFilm);

function showLoadingScreen() {
  loader.style.display = "block";
}

function hideLoadingScreen() {
  loader.style.display = "none";
}
