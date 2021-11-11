const container = document.querySelector("#container");
const totalBooks = document.getElementById("total-books");
const readBooks = document.getElementById("read-books");
const newBookSection = document.getElementById("form-section");
const newBookSubmitButton = document.getElementById("subBtn");
const newBookCloseButton = document.getElementById("clBtn");

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
	document.getElementById("form-section").style.display = "none";
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

	const bold = document.createElement("strong");
	bold.textContent = "Title:";
	bold.style.fontWeight = "900";
	bold.style.fontSize = "1.25rem";

	const bookTitle = document.createElement("div");
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement("div");
	bookAuthor.textContent = `By: ${book.author}`;

	const bookPages = document.createElement("div");
	bookPages.textContent = `${book.pages} Pages`;

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
		book.read = !book.read;

		//animated checkmark for read books
		if (book.read) {
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
	delBookButton.setAttribute("id", "bookDeleteButton")
	delBookButton.style.display = "none";

	delBookIcon.addEventListener("click", () => {
		delBookButton.style.display = "block";
	});

	delBookButton.addEventListener("click", () => {
		removeBook(bookDetails.dataset.value, container, bookDetails);
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
	}
});


newBookSubmitButton.addEventListener("click", function () {
	const titleValue = document.getElementById("newBookBtnTitle").value;
	const authorValue = document.getElementById("author").value;
	const pagesValue = document.getElementById("pages").value;
	const newBook = new book(titleValue, authorValue, pagesValue);
	newBook.addBooks(newBook);
	display(newBook, myLibrary.length + 1);
	document.getElementById("add-book").reset()
});

newBookCloseButton.addEventListener("click", () => {
	closeForm();
});

