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
  const { id } = account;
  const result = [];
  for (let book of books) {
    const { borrows } = book;
    const recentBorrow = borrows[0];
    if (recentBorrow.id === id && !recentBorrow.returned) {
      const author = authors.find(author => author.id === book.authorId);
      const bookWithAuthor = {...book, author};
      result.push(bookWithAuthor);
    }
  }
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
