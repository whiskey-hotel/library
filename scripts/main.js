const container = document.querySelector("#container");

let myLibrary = [
	{ title: "Harry Potter and the Chamber of Secrets", author: "JK Rowling", pages: 251, read: false },
	{ title: "Harry Potter and the Sorcerer's Stone", author: "JK Rowling", pages: 223, read: false },
	{ title: "Harry Potter and the Prisoner of Azkaban", author: "JK Rowling", pages: 317, read: false },
	{ title: "Harry Potter and the Goblet of Fire", author: "JK Rowling", pages: 636, read: false },
	{ title: "Harry Potter and the Order of the Phoenix", author: "JK Rowling", pages: 766, read: false },
	{ title: "The Outsiders", author: "S.E. Hinton", pages: 192, read: false },
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
	document.getElementById("form-container").style.display = "none";
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
	const bookDetails = document.createElement("div");
	bookDetails.classList.add("book");
	bookDetails.setAttribute("data-value", index);

	const bookTitle = document.createElement("div");
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement("div");
	bookAuthor.textContent = book.author;

	const bookPages = document.createElement("div");
	bookPages.textContent = book.pages;

	const brk = document.createElement("br");

	const bookRead = document.createElement("button");
	bookRead.onclick = () => {
		book.read = !book.read;
	};
	bookRead.textContent = "Read?";

	const delBook = document.createElement("button");
	delBook.classList.add("remove-book");
	delBook.onclick = function () {
		removeBook(bookDetails.dataset.value, container, bookDetails);
	};
	delBook.textContent = ":";

	container.appendChild(bookDetails);
	bookDetails.appendChild(bookTitle);
	bookDetails.appendChild(bookAuthor);
	bookDetails.appendChild(bookPages);
	bookDetails.appendChild(brk);
	bookDetails.appendChild(bookRead);
	bookDetails.appendChild(delBook);
}

function openForm() {
	document.getElementById("form-container").style.display = "block";
}

function closeForm() {
	document.getElementById("form-container").style.display = "none";
}

const subBtn = document.getElementById("subBtn");
const clBtn = document.getElementById("clBtn");

subBtn.addEventListener("click", function () {
	const titleValue = document.getElementById("title").value;
	const authorValue = document.getElementById("author").value;
	const pagesValue = document.getElementById("pages").value;
	const newBook = new book(titleValue, authorValue, pagesValue);
	newBook.addBooks(newBook);
	display(newBook, myLibrary.length + 1);
});

clBtn.addEventListener("click", () => {
	closeForm();
});
