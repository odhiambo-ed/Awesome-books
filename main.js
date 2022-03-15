//list of books collection
const listOfBooks = [];

// DOM
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const container = document.querySelector('.book-display');
const addBtn = document.getElementById('add-btn');

//calling a constructor function/sets value of this to be new empty object
class Book {
    constructor(bookTit, bookAuth) {
        this.title = bookTit,
        this.author = bookAuth,
        this.id = bookTit;
    }
}


// indent html section into the container 

function addSection(title, author) {
    container.innerHTML += `
    <ul>
    <li>${title}</p>
    <li>${author}</p>
    </ul>
    <button type="button" id="title">Remove</button>
    <hr>
    </div>
    `
}

//adding a fucntion with an event listner to add button 
function addBook (){
 addBtn.addEventListener('click', () => {
    listOfBooks.push(new Book(bookTitle.value, bookAuthor.value));
    addSection(bookTitle.value,bookAuthor.value);
    bookTitle.value = '';
    bookAuthor.value = '';
 });
};

addBook();





