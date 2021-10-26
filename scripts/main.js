const container = document.querySelector('#container');

let myLibrary = [
	{ title: 'Harry Potter', author: 'JK Rowling', pages: 356 },
	{ title: 'The Outsiders', author: 'S.E. Hinton', pages: 270 },
];

function book(title, author, pages) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = false;
}

function addBooks() {
	const newBook = Object.create(book);
	newBook.title = prompt('Please enter the title of the book');
	newBook.author = prompt('Please enter the full name of the author');
	newBook.pages = prompt('Number of pages');
	myLibrary.push(newBook);
}

function display() {
	myLibrary.forEach((book) => {
		const bookDetails = document.createElement('div');
		bookDetails.classList.add('book');

		const bookTitle = document.createElement('div');
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement('div');
		bookAuthor.textContent = book.author;

		const bookPages = document.createElement('div');
		bookPages.textContent = book.pages;

		const bookRead = document.createElement('div');

		container.appendChild(bookDetails);
		bookDetails.appendChild(bookTitle);
		bookDetails.appendChild(bookAuthor);
		bookDetails.appendChild(bookPages);
		bookDetails.appendChild(bookRead);
		console.log(book);
	});
}

// addBooks();
display();
