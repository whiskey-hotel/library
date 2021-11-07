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
				bookRead.style.backgroundColor = "#D06079";
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
	const delBook1 = document.createElement("button");
	delBook1.textContent = ":";
	delBook1.classList.add("remove-book");

	//create hidden delete button
	const delBook2 = document.createElement("button");
	delBook2.textContent = "Remove Book";
	delBook2.style.display = "none";

	delBook1.addEventListener("click", () => {
		delBook2.style.display = "block";
	});

	delBook2.addEventListener("click", () => {
		removeBook(bookDetails.dataset.value, container, bookDetails);
		delBook2.style.display = "none";
	});

	//close delete button if click is not on the button
	document.addEventListener("click", (e) => {
		if (!delBook1.contains(e.target)) {
			delBook2.style.display = "none";
		}
	});

	container.appendChild(bookDetails);
	bookDetails.appendChild(bold);
	bookDetails.appendChild(bookTitle);
	bookDetails.appendChild(bookAuthor);
	bookDetails.appendChild(bookPages);
	bookDetails.appendChild(brk);
	bookDetails.appendChild(bookRead);
	bookDetails.appendChild(delBook1);
	bookDetails.appendChild(delBook2);
	bookDetails.appendChild(check);
}

function openForm() {
	document.getElementById("form-section").style.display = "flex";
}

function closeForm() {
	document.getElementById("form-section").style.display = "none";
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
