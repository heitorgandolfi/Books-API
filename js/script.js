
const getMatches = async () => {
    try {
        const apiURL = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YSEodxWObGObSyIH4TvNnGa66EAJMRgA`)
        const data = await apiURL.json()
        return data
    } catch (err) {
        handle(err)
        throw err
    }
}

const showMatches = async () => {
    const data = await getMatches()

    const datas = data.results

    for (i = 0; i <= datas.books.length - 1; i++) {
        const divContainer = document.querySelector(".list");
        const divContent = document.createElement("div");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");

        divContainer.appendChild(divContent);
        divContent.appendChild(h2);
        divContent.appendChild(img);

        h2.innerHTML = `${datas.books[i].title}`;
        img.src = `${datas.books[i].book_image}`;
    }
}

showMatches()