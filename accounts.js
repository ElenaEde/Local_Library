function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.localeCompare(accountB.name.last)
  );
}


function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let total = 0;
  for (let book of books) {
    const { borrows } = book;
    for (let borrow of borrows) {
      if (borrow.id === id) {
        total++;
      }
    }
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const result = [];
  for (let book of books) {
    const { borrows } = book;
    const recentBorrow = borrows[0];
    if (isPossessedByAccount(accountId, recentBorrow)) {
      const bookWithAuthor = getBookWithAuthor(book, authors);
      result.push(bookWithAuthor);
    }
  }
  return result;
}

function isPossessedByAccount(accountId, borrow) {
  return borrow.id === accountId && !borrow.returned;
}

function getBookWithAuthor(book, authors) {
  const author = authors.find(author => author.id === book.authorId);
  return {...book, author};
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
