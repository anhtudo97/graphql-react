const { books, authors } = require("../data/static");
const Author = require("../models/Author");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) =>
      books.find((book) => book.id.toString() === args.id),

    authors: () => authors,
    author: (parent, args) =>
      authors.find((author) => author.id.toString() === args.id),
  },

  Book: {
    author: ({ authorId }, args) =>
      authors.find((author) => author.id.toString() === authorId),
  },

  Author: {
    books: ({ id }, args) => books.filter((book) => book.authorId === id),
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },
    createBook: async (parent, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
  },
};

module.exports = resolvers;
