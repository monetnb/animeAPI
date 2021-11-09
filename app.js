async function AnimeList() {
  const res = await fetch('https://api.jikan.moe/v3/search/anime?q=nar&page=1');
  console.log(res);
  const data = await res.json();
  console.log(data);
}

AnimeList();
