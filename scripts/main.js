const container = document.querySelector('#container');

let myLibrary = [
	{ title: 'Harry Potter', author: 'JK Rowling', pages: 356 },
	{ title: 'The Outsiders', author: 'S.E. Hinton', pages: 270 },
];

myLibrary.forEach((book, index) => {
	display(book, index);
});

function book(title, author, pages) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = false;
}

book.prototype.addBooks = function (obj) {
	myLibrary.push(obj);
	console.log(myLibrary);
	document.getElementById('form-container').style.display = 'none';
	return;
};

function removeBook(dataAttribute, el, childEl) {
	const index = parseInt(dataAttribute);
	if (index > -1) {
		myLibrary.splice(index, 1);
		el.removeChild(childEl);
	}
}

function display(book, index) {
	const bookDetails = document.createElement('div');
	bookDetails.classList.add('book');
	bookDetails.setAttribute('data-value', index);

	const bookTitle = document.createElement('div');
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement('div');
	bookAuthor.textContent = book.author;

	const bookPages = document.createElement('div');
	bookPages.textContent = book.pages;

	const bookRead = document.createElement('div');

	const delBook = document.createElement('button');
	delBook.onclick = function () {
		removeBook(bookDetails.dataset.value, container, bookDetails);
	};
	delBook.textContent = 'Remove Book';

	container.appendChild(bookDetails);
	bookDetails.appendChild(bookTitle);
	bookDetails.appendChild(bookAuthor);
	bookDetails.appendChild(bookPages);
	bookDetails.appendChild(bookRead);
	bookDetails.appendChild(delBook);
	console.log(book);
}

function openForm() {
	document.getElementById('form-container').style.display = 'block';
}

function closeForm() {
	document.getElementById('form-container').style.display = 'none';
}

const subBtn = document.getElementById('subBtn');
const clBtn = document.getElementById('clBtn');

subBtn.addEventListener('click', function () {
	const titleValue = document.getElementById('title').value;
	const authorValue = document.getElementById('author').value;
	const pagesValue = document.getElementById('pages').value;
	const newBook = new book(titleValue, authorValue, pagesValue);
	newBook.addBooks(newBook);
	display(newBook, myLibrary.length + 1);
});

clBtn.addEventListener('click', () => {
	closeForm();
});
