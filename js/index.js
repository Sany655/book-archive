
// search book via on click
const search = () => {
    const searchText = document.getElementById('search').value
    if (searchText.length > 0) {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(response => response.json())
            .then(data => showData(data.docs))
    }
}

// showing search results
const showData = (books) => {
    const searchResult = document.getElementById('search-result')
    let colum = '';
    let publisher = 'Publisher Not Found';
    let author_name = 'Author Not Found';
    let first_publish_year = 'First Publish Year Not Found';
    books.forEach(book => {
        if (book.publisher) {
            publisher = book.publisher[0]
        }
        if (book.author_name) {
            author_name = book.author_name
        }
        if (book.first_publish_year) {
            first_publish_year = book.first_publish_year
        }
        colum += `<div class="col-md-4 col-lg-3">
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height:260px" alt="404">
                <div class="card-body">
                    <h1 class="card-title fs-2">${book.title}</h1>
                    <p class="card-text">Author : ${author_name}</p>
                    <p class="card-text">Publisher : ${publisher}</p>
                    <p class="card-text">First published on: ${first_publish_year}</p>
                </div>
            </div>
        </div>`
    });
    if (books.length > 0) {
        searchResult.innerHTML = colum + `<hr><h4>Total Result Found ${books.length}</h4>`;
    } else {
        searchResult.innerHTML = `<h2 class="text-center">No result found for ${document.getElementById('search').value}</h2>`
    }
}