const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.classList.add("hide");
});

const getData = async () => {
  try {
    const apiURL = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YSEodxWObGObSyIH4TvNnGa66EAJMRgA`
    );
    const data = await apiURL.json();
    return data;
  } catch (err) {
    handle(err);
    throw err;
  }
};

const showData = async () => {
  const data = await getData();
  const datas = data.results;

  const refDate = document.querySelector(".ref__date");
  const ptBrDate = datas.bestsellers_date.split("-").reverse().join("/");
  refDate.innerHTML = `Reference date: ${ptBrDate}`;

  for (let i = 0; i <= datas.books.length - 1; i++) {
    const divContainer = document.querySelector(".list"); // Container que engloba todas as divs dos livros.
    const divContent = document.createElement("div"); // Divs dos livros em si, contendo título deles e img.
    const h2 = document.createElement("h2");
    const img = document.createElement("img");

    divContainer.appendChild(divContent);
    divContent.appendChild(h2);
    divContent.appendChild(img);

    h2.innerHTML = `${datas.books[i].title}`;
    img.src = `${datas.books[i].book_image}`;
  }
};

showData();

// Modal

const showModal = async () => {
  const data = await getData();
  const datas = data.results;

  const imgs = Array.from(document.getElementsByTagName("img"));

  const modalContainer = document.querySelector(".modal__container");
  const modalTitle = document.querySelector(".modal__title");
  const modalImg = document.querySelector(".modal__img");
  const modalRank = document.querySelector(".modal__rank");
  const modalLwRank = document.querySelector(".modal__lw__rank");
  const modalAuthor = document.querySelector(".modal__author");
  const modalSynopsis = document.querySelector(".modal__synopsis");
  const modalPublisher = document.querySelector(".modal__publisher");
  const closeModal = document.querySelector(".close__modal");

  closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  for (let i = 0; i <= imgs.length - 1; i++) {
    let bookSelector = datas.books[i];
    imgs[i].addEventListener("click", () => {
      modalContainer.style.display = "flex";
      modalTitle.innerHTML = `${bookSelector.title}`;
      modalImg.src = `${bookSelector.book_image}`;
      modalRank.innerHTML = `Rank #${bookSelector.rank}`;
      modalLwRank.innerHTML = `(Last Week: #${bookSelector.rank_last_week} | Weeks on List: ${bookSelector.weeks_on_list})`;
      modalAuthor.innerHTML = `<span>Author:</span> ${bookSelector.author}`;
      modalSynopsis.innerHTML = `<span>Synopsis:</span> ${bookSelector.description}`;
      modalPublisher.innerHTML = `<span>Publisher:</span> ${bookSelector.publisher}`;
    });
  }
};

showModal();
