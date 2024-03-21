// Elements
const bookForm = document.getElementById("add-book-form");
const tableBody = document.getElementById("table-body");
const updateBookForm = document.getElementById("update-book-form");

function deleteBook(el) {
  const ID = el.id;
  el.parentElement.parentElement.remove();
  let allBooks = JSON.parse(localStorage.getItem("books"));
  let updatedList = allBooks.filter(book => {
    if (ID != book.id) {
      return book;
    }
  });
  localStorage.setItem("books", JSON.stringify(updatedList));
}

function updateBook(id) {
  let allBooks = JSON.parse(localStorage.getItem("books"));
  let book = allBooks.find(b => {
    return b.id == id;
  });
  let newIsbn = document.getElementById("newisbn");
  let newBook = document.getElementById("newbookname");
  let newAuthor = document.getElementById("newauthorname");

  newIsbn.value = book.book.isbn;
  newBook.value = book.book.name;
  newAuthor.value = book.book.author;
  document.getElementById("bookID").value = book.id;
}

// Event Handlers
function handelForm(e) {
  e.preventDefault();
  const ID = Date.now();
  let isbn = document.getElementById("isbn");
  let bookName = document.getElementById("bookname");
  let authorName = document.getElementById("authorname");

  //   DOM
  const tableRow = document.createElement("tr");
  const isbnTag = document.createElement("td");
  const bookNameTag = document.createElement("td");
  const authorNameTag = document.createElement("td");
  const actionTag = document.createElement("td");

  isbnTag.appendChild(document.createTextNode(isbn.value));
  bookNameTag.appendChild(document.createTextNode(bookName.value));
  authorNameTag.appendChild(document.createTextNode(authorName.value));
  actionTag.innerHTML = `<i id="${ID}" onclick="updateBook(${ID})" data-toggle="modal" data-target=".bd-example-modal-lg" class="fas fa-edit mr-1 text-success"></i><i onclick="deleteBook(this)" id=${ID}  class="text-danger ml-1 fas fa-trash"></i>`;

  tableRow.appendChild(isbnTag);
  tableRow.appendChild(bookNameTag);
  tableRow.appendChild(authorNameTag);
  tableRow.appendChild(actionTag);

  tableBody.appendChild(tableRow);

  //   Local Storage
  let allBooks = [];
  if (localStorage.getItem("books")) {
    allBooks = JSON.parse(localStorage.getItem("books"));
  }
  let book = {
    id: ID,
    book: {
      isbn: isbn.value,
      name: bookName.value,
      author: authorName.value
    }
  };
  allBooks.push(book);
  localStorage.setItem("books", JSON.stringify(allBooks));

  isbn.value = "";
  bookName.value = "";
  authorName.value = "";
}

function handelUpdateForm(e) {
  e.preventDefault();
  let newIsbn = document.getElementById("newisbn").value;
  let newBook = document.getElementById("newbookname").value;
  let newAuthor = document.getElementById("newauthorname").value;
  const ID = document.getElementById("bookID").value;

  let allBooks = JSON.parse(localStorage.getItem("books"));

  let updatedBook = allBooks.filter(b => {
    return b.id != ID;
  });
  let obj = {
    id: ID,
    book: {
      name: newBook,
      isbn: newIsbn,
      author: newAuthor
    }
  };
  updatedBook.push(obj);

  localStorage.setItem("books", JSON.stringify(updatedBook));
  window.location.reload();
}

// Event Listners
bookForm.addEventListener("submit", handelForm);
updateBookForm.addEventListener("submit", handelUpdateForm);

// On Load
window.onload = function() {
  if (this.localStorage.getItem("books")) {
    let allBooks = this.JSON.parse(this.localStorage.getItem("books"));
    allBooks.forEach(book => {
      const tableRow = document.createElement("tr");
      const isbnTag = document.createElement("td");
      const bookNameTag = document.createElement("td");
      const authorNameTag = document.createElement("td");
      const actionTag = document.createElement("td");

      isbnTag.appendChild(document.createTextNode(book.book.isbn));
      bookNameTag.appendChild(document.createTextNode(book.book.name));
      authorNameTag.appendChild(document.createTextNode(book.book.author));
      actionTag.innerHTML = `<i id="${book.id}" onclick="updateBook(${book.id})" data-toggle="modal" data-target=".bd-example-modal-lg" class="fas fa-edit mr-1 text-success"></i><i onclick="deleteBook(this)" id=${book.id}  class="text-danger ml-1 fas fa-trash"></i>`;

      tableRow.appendChild(isbnTag);
      tableRow.appendChild(bookNameTag);
      tableRow.appendChild(authorNameTag);
      tableRow.appendChild(actionTag);

      tableBody.appendChild(tableRow);
    });
  }
};
