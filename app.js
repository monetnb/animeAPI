const animeContainer = document.querySelector('.animeList');
const searchForm = document.querySelector('.searchAnime');
const searchInput = document.querySelector('#search');

const getAnime = async (ani) => {
  const res = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${ani}&page=1`
  );
  const data = await res.json();
  const aniList = await data.results;
  //   console.log(aniList);
  displayAnime(aniList);
};
getAnime();

function displayAnime(anime) {
  animeContainer.innerHTML = '';
  anime.forEach((anime) => {
    const animeEl = document.createElement('div');
    animeEl.classList.add('anime');
    const { image_url, title, score, url, synopsis } = anime;

    const html = `
       
          <img
            src="${image_url}"
            alt="${title}"
          />
          <div class="animeInfo">
            <h3>${title}</h3>
            <span class="${scoreColor(+score)}" id="score">${score.toFixed(
      1
    )}</span>
          </div>
          <div class="overview">
            <a
              href="${url}"
              >Overview</a>
            <p>
              ${synopsis}
            </p>
          </div>
     
      `;

    animeEl.innerHTML = html;
    animeEl.addEventListener('click', () => {
      document.location.href = url;
    });
    animeContainer.appendChild(animeEl);
  });

  //   console.log(anime);
  function scoreColor(score) {
    if (score >= 8) {
      return 'green';
    } else if (score < 6) {
      return 'red';
    } else {
      return 'orange';
    }
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const animeSearch = searchInput.value;
  console.log(animeSearch);
  animeContainer.innerHTML = '';
  getAnime(animeSearch);
  searchInput.value = '';
});

// mouse over overview
// name length
// loading and if cant find anime ERR
