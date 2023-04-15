function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}


function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  return [borrowedBooks, returnedBooks];
}



function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {...borrow, ...account};
  });
  return borrows.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
