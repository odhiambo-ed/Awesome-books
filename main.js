let form = document.getElementById('add-form');
let bookItems = document.getElementById('book-items');

// object to hold the book items
let bookList = [];

// Submit Event, when form is submitted, add the book to the local storage and then display to browser
form.addEventListener('submit', (e) => {
    // prevent the page from refreshing after pressing the submit button
    e.preventDefault();
    
    // Get the Input Values
    const newBook = document.querySelector('#book').value;
    const newAuthor = document.querySelector('#author').value;

    // declare the book as an object to add to the book list
    const book = {
        title: newBook,
        author: newAuthor,
        id: bookList.length + 1,
    }

    // add the new book to local storage
    addBookToLocalStorage(book);

    // display the new book to the browser
    displayBook(book);

    //clear the input fields
    document.querySelector('#book').value = '';
    document.querySelector('#author').value = '';

    //focus on the book title text box
    document.querySelector('#author').focus();
});

// function to display book to the page
const displayBook = (book) => {

    //create ul to hold book information
    let bookUl = document.createElement('ul');
    bookUl.className = 'book-items';
    bookUl.setAttribute('data-id', book.id);

    // Create book title as list item
    let bookTitle = document.createElement('li'); 
    // Add Class
    bookTitle.className = 'book-list';
    bookTitle.textContent = book.title;

    // Create book author as list item
    let bookAuthor = document.createElement('li'); 
    // Add Class
    bookAuthor.className = 'book-list';
    bookAuthor.textContent = book.author;

    // Create a list item to hold delete button
    let deleteBook = document.createElement('li');

    //create delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = 'remove-btn';
    deleteButton.textContent = 'Remove';

    // append children to the UL

    // add delete button to it's corresponding list item
    deleteBook.appendChild(deleteButton)

    bookUl.appendChild(bookTitle);
    bookUl.appendChild(bookAuthor);
    bookUl.appendChild(deleteBook);

    // append the ul we created to the parent container
    let container = document.querySelector('.book-display');
    container.appendChild(bookUl);
    container.appendChild(document.createElement('hr'));

}

// function to store the book to the local storage
const addBookToLocalStorage = (book) => {
    bookList.push(book);

    localStorage.setItem('books', JSON.stringify(bookList));
}

// function to load books from the local storage and display to html
const loadBooksFromStorage = () => {
    // check if the localStorage has the books stored
    if(localStorage.getItem('books') !== null){
        // save the book list to the global object
        bookList = JSON.parse(localStorage.getItem('books'));

        // loop through the books to display to browser
        for(let i = 0; i < bookList.length; i += 1){
            displayBook(bookList[i])
        }
    }
}

// function to remove book from localStorage
const removeBookFromLocalStorage = (bookId) => {
    // filter function to return all the books that do not match the given id
    let newList = bookList.filter((book) => {
        return book.id != bookId
    });

    // update the global book list
    bookList = newList;

    // save the new list to local storage
    localStorage.setItem('books', JSON.stringify(bookList))
}


// event listener when the user clicks on remove button
document.addEventListener('click',function(e){
    if(e.target && e.target.className === 'remove-btn'){
        e.target.closest('ul').nextSibling.remove();
        
        let id = e.target.closest('ul').getAttribute('data-id');
        
        e.target.closest('ul').remove();

        removeBookFromLocalStorage(id);
     }
 });

// when the page loads, read stored books from local storage and display them to browser
loadBooksFromStorage();