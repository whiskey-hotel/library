const container = document.querySelector("#container");
const dataAtts = document.getElementsByClassName("book");
const totalBooks = document.getElementById("total-books");
const readBooks = document.getElementById("read-books");
const newBookForm = document.getElementById("add-book");
const newBookSection = document.getElementById("form-section");
const newBookSubmitButton = document.getElementById("subBtn");
const newBookCloseButton = document.getElementById("clBtn");

let myLibrary = [
	new book("Harry Potter and the Chamber of Secrets", "JK Rowling", 251),
	new book("Harry Potter and the Sorcerer's Stone", "JK Rowling", 223),
	new book("Harry Potter and the Prisoner of Azkaban", "JK Rowling", 317),
	new book("Harry Potter and the Goblet of Fire", "JK Rowling", 636),
	new book("Harry Potter and the Order of the Phoenix", "JK Rowling", 766),
	new book("The Outsiders", "S.E. Hinton", 192),
];

function book(title, author, pages) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = false;
}

book.prototype.addBooks = function () {
	myLibrary.push(this);
	newBookSection.style.display = "none";
	return;
};

book.prototype.removeBook = function (dataAttribute, el, childEl) {
	const index = parseInt(dataAttribute);
	if (index > -1) {
		myLibrary.splice(index, 1);
		el.removeChild(childEl);
	}
	totalBooks.textContent = bookCount(myLibrary);
	readBooks.textContent = readBookCount(myLibrary);
	dataAttributeUpdate();
}

book.prototype.display = function (index) {
	const bookDetails = document.createElement("div");
	bookDetails.classList.add("book");
	bookDetails.setAttribute("data-value", index);

	const bold = document.createElement("strong");
	bold.textContent = "Title:";
	bold.style.fontWeight = "900";
	bold.style.fontSize = "1.25rem";

	const bookTitle = document.createElement("div");
	bookTitle.textContent = this.title;

	const bookAuthor = document.createElement("div");
	bookAuthor.textContent = `By: ${this.author}`;

	const bookPages = document.createElement("div");
	bookPages.textContent = `${this.pages} Pages`;

	const brk = document.createElement("br");

	const bookRead = document.createElement("button");
	const check = document.createElement("div");
	check.classList.add("checkmark");
	check.classList.add("draw");

	bookRead.setAttribute("id", "read-button");
	bookRead.addEventListener("mouseover", () => {
		bookRead.style.backgroundColor = "#5cb85c";
	});
	bookRead.addEventListener("mouseleave", () => {
		bookRead.style.backgroundColor = "#7d2ae8";
	});

	bookRead.onclick = () => {
		this.read = !this.read;
		readBooks.textContent = readBookCount(myLibrary);

		//animated checkmark for read books
		if (this.read) {
			check.style.display = "block";
			bookRead.textContent = "Mark as unread";
			bookRead.addEventListener("mouseover", () => {
				bookRead.style.backgroundColor = "#d11a2a";
			});
			bookRead.addEventListener("mouseleave", () => {
				bookRead.style.backgroundColor = "#7d2ae8";
			});
		} else {
			check.style.display = "none";
			bookRead.textContent = "Mark as read";
			bookRead.addEventListener("mouseover", () => {
				bookRead.style.backgroundColor = "#5cb85c";
			});
			bookRead.addEventListener("mouseleave", () => {
				bookRead.style.backgroundColor = "#7d2ae8";
			});
		}
	};
	bookRead.textContent = "Mark as read";

	// create delete button symbol
	const delBookIcon = document.createElement("button");
	delBookIcon.textContent = ":";
	delBookIcon.classList.add("remove-book");

	//create hidden delete button
	const delBookButton = document.createElement("button");
	delBookButton.textContent = "Remove Book";
	delBookButton.setAttribute("id", "bookDeleteButton");
	delBookButton.style.display = "none";

	delBookIcon.addEventListener("click", () => {
		delBookButton.style.display = "block";
	});

	delBookButton.addEventListener("click", () => {
		this.removeBook(bookDetails.dataset.value, container, bookDetails);
		delBookButton.style.display = "none";
	});

	//close delete button if click is not on the button
	document.addEventListener("click", (e) => {
		if (!delBookIcon.contains(e.target)) {
			delBookButton.style.display = "none";
		}
	});

	container.appendChild(bookDetails);
	bookDetails.appendChild(bold);
	bookDetails.appendChild(bookTitle);
	bookDetails.appendChild(bookAuthor);
	bookDetails.appendChild(bookPages);
	bookDetails.appendChild(brk);
	bookDetails.appendChild(bookRead);
	bookDetails.appendChild(delBookIcon);
	bookDetails.appendChild(delBookButton);
	bookDetails.appendChild(check);
};

book.prototype.edit = function () {};


function bookCount(obj) {
	return obj.length;
}

function readBookCount(obj) {
	let count = 0;
	obj.forEach((index) => {
		if (index.read) {
			count += 1;
		}
	});
	return count;
}

function dataAttributeUpdate() {
	let count = 0;
	Array.from(dataAtts).forEach((d) => {
		d.dataset.value = count;
		count += 1;
	});
}

function openForm() {
	newBookSection.style.display = "flex";
}

function closeForm() {
	newBookSection.style.display = "none";
}

//close "add new book" window if click is not on the form window
newBookSection.addEventListener("click", (e) => {
	if (!document.getElementById("form-container").contains(e.target)) {
		newBookSection.style.display = "none";
		document.getElementById("add-book").reset();
	}
});

newBookForm.addEventListener("submit", function () {
	const titleValue = newBookForm.elements["title"].value;
	const authorValue = newBookForm.elements["author"].value;
	const pagesValue = newBookForm.elements["pages"].value;
	const newBook = new book(titleValue, authorValue, pagesValue);
	newBook.addBooks();
	newBook.display(myLibrary.length - 1);
	newBookForm.reset();
	totalBooks.textContent = bookCount(myLibrary);
});

newBookCloseButton.addEventListener("click", () => {
	closeForm();
	document.getElementById("add-book").reset();
});

//initial library display
myLibrary.forEach((book, index) => {
	book.display(index);
});

totalBooks.textContent = bookCount(myLibrary);
readBooks.textContent = readBookCount(myLibrary);
