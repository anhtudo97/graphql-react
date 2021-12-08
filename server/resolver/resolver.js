const resolvers = {
  Query: {
    books: () => [
      {
        id: 1,
        name: "Dế mèn phiêu lưu ký",
        genre: "Adventure",
      },
      {
        id: 2,
        name: "Thiên long bát bộ",
        genre: "Imagination",
      },
    ],
  },
};

module.exports = resolvers;
