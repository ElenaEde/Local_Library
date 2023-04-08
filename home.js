function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      count++;
    }
  });
  return count;
}


function getMostCommonGenres(books) {
  // Count the occurrence of each genre
  const genreCount = books.reduce((acc, book) => {
    const genre = book.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  // Convert the object to an array of objects
  const genres = Object.keys(genreCount).map(name => ({
    name: name,
    count: genreCount[name]
  }));

  // Sort the genres array by count, descending
  genres.sort((a, b) => b.count - a.count);

  // Return the top five genres, or fewer if there are less than five
  return genres.slice(0, 5);
}


function getMostPopularBooks(books) {
  // Create an array of objects with book name and borrow count
  const bookBorrows = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length
    };
  });

  // Sort the array by borrow count, in descending order
  const sortedBooks = bookBorrows.sort((book1, book2) => book2.count - book1.count);

  // Return an array of the top five books by borrow count
  return sortedBooks.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  // Create an object to hold the author's ID and the number of times their books have been borrowed
  const authorCount = {};
  
  // Loop through each book in the array
  for (let book of books) {
    const author = authors.find(author => author.id === book.authorId);
    if (author) {
      // If the author's ID is already in the authorCount object, add the book's borrow count to it
      if (authorCount[author.id]) {
        authorCount[author.id].count += book.borrows.length;
      } else {
        // If the author's ID is not in the authorCount object, add it with the initial count of the book's borrow count
        authorCount[author.id] = {
          name: `${author.name.first} ${author.name.last}`,
          count: book.borrows.length
        };
      }
    }
  }
  
  // Convert the authorCount object to an array and sort it by count in descending order
  const sortedAuthors = Object.values(authorCount).sort((a, b) => b.count - a.count);
  
  // Return the top five authors, or fewer if there are less than five
  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
