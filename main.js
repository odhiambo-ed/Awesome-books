class BookList{
    constructor(){
        this.bookList = [];
        this.loadBooksFromStorage();
    }

    addBook(title, author){
        const book = new Book(title, author,this.bookList.length + 1);
        this.bookList.push(book);
        localStorage.setItem('books', JSON.stringify(this.bookList));
        this.displayBook(book);
    }

    removeBook(bookId){
        // filter function to return all the books that do not match the given id
        this.bookList = this.bookList.filter((book) => {
            return book.id != bookId
        });

        // save the new list to local storage
        localStorage.setItem('books', JSON.stringify(this.bookList))
    }

    getBookList(){
        return this.bookList;
    }

    displayBook(book){

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
    
        // append list items to UL
        bookUl.appendChild(bookTitle);
        bookUl.appendChild(bookAuthor);
        bookUl.appendChild(deleteBook);
    
        // append the ul we created to the parent container
        let container = document.querySelector('.book-display');
        container.appendChild(bookUl);
        container.appendChild(document.createElement('hr'));
    
    }

    // method to load books from local storage
    loadBooksFromStorage(){
        // check if the localStorage has the books stored
        if(localStorage.getItem('books') !== null){
            // save the book list to the global object
            this.bookList = JSON.parse(localStorage.getItem('books'));
    
            // loop through the books to display to browser
            for(let i = 0; i < this.bookList.length; i += 1){
                this.displayBook(this.bookList[i])
            }
        }
    }
}

class Book{
    constructor(title, author, id){
        this.title = title;
        this.author = author;
        this.id = id;
    }

    getTitle(){
        return this.title;
    }

    getAuthor(){
        return this.author;
    }
}

let form = document.getElementById('add-form');
let bookItems = document.getElementById('book-items');

//declare the bookList instance
const bookList = new BookList();

// Submit Event, when form is submitted, add the book to the local storage and then display to browser
form.addEventListener('submit', (e) => {
    // prevent the page from refreshing after pressing the submit button
    e.preventDefault();
    
    // Get the Input Values
    const newBook = document.querySelector('#book').value;
    const newAuthor = document.querySelector('#author').value;

    // add the book to book list  class
    bookList.addBook(newBook, newAuthor);

    //clear the input fields
    document.querySelector('#book').value = '';
    document.querySelector('#author').value = '';

    //focus on the book title text box
    document.querySelector('#author').focus();
});



// event listener when the user clicks on remove button
document.addEventListener('click',function(e){
    if(e.target && e.target.className === 'remove-btn'){
        e.target.closest('ul').nextSibling.remove();
        
        let id = e.target.closest('ul').getAttribute('data-id');
        
        e.target.closest('ul').remove();

        bookList.removeBook(id);
     }
 });