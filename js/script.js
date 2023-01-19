
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

    for (i = 0; i <= datas.books.length - 1; i++) {
        const divContainer = document.querySelector(".list"); // Container que engloba todas as divs dos livros.
        const divContent = document.createElement("div"); // Divs dos livros em si, contendo título deles e img.
        const h2 = document.createElement("h2");
        const img = document.createElement("img");

        divContainer?.appendChild(divContent);
        divContent.appendChild(h2);
        divContent.appendChild(img);

        h2.innerHTML = `${datas.books[i].title}`;
        img.src = `${datas.books[i].book_image}`;
    }
}
showData()

// Elementos do modal

const imgs = Array.from(document.getElementsByTagName("img"));

imgs.addEventListener("click", () => alert(`clicou no modal ${i}`))

// const title = document.querySelector(".modal__title");
//     title.innerHTML = `${datas.books[i].title}`