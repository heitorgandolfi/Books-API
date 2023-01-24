const getData = async () => {
    try {
        const apiURL = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YSEodxWObGObSyIH4TvNnGa66EAJMRgA`);
        const data = await apiURL.json();
        return data;
    } catch (err) {
        handle(err);
        throw err;
    }
}

const showData = async () => {
    const data = await getData();
    const datas = data.results;

    const refDate = document.querySelector(".ref__date");
    const locale = 'pt-br';
    const newRefDate = new Date(`${datas.bestsellers_date}`).toLocaleDateString(locale);
    refDate.innerHTML = `Reference date: ${newRefDate}`;

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
}

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

    closeModal.addEventListener("click", () => { modalContainer.style.display = "none" });

    for (let i = 0; i <= imgs.length - 1; i++) {
        imgs[i].addEventListener("click", () => {
            modalContainer.style.display = "flex";
            modalTitle.innerHTML = `${datas.books[i].title}`;
            modalImg.src = `${datas.books[i].book_image}`;
            modalRank.innerHTML = `Rank #${datas.books[i].rank}`;
            modalLwRank.innerHTML = `(Last Week: ${datas.books[i].rank_last_week} | Weeks on List: ${datas.books[i].weeks_on_list})`;
            modalAuthor.innerHTML = `<span>Author:</span> ${datas.books[i].author}`;
            modalSynopsis.innerHTML = `<span>Synopsis:</span> ${datas.books[i].description}`;
            modalPublisher.innerHTML = `<span>Publisher:</span> ${datas.books[i].publisher}`;
        })
    }
}

showModal();