
// Task 2: Basic CRUD

// Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" });

// Find books published after a certain year (e.g., 2000)
db.books.find({ published_year: { $gt: 2000 } });

// Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell" });

// Update the price of a specific book (e.g., The Hobbit)
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
);

// Delete a book by its title (e.g., Animal Farm)
db.books.deleteOne({ title: "The Hobbit" });



// Task 3: Advanced Queries

// Find books in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1 });

// Sort books by price ascending
db.books.find().sort({ price: 1 });

// Sort books by price descending
db.books.find().sort({ price: -1 });

// Pagination (5 books per page)
// Page 1
db.books.find().skip(0).limit(5);
// Page 2
db.books.find().skip(5).limit(5);



// Task 4: Aggregation

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [ { $divide: ["$published_year", 10] }, 
      { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] },
      count: { $sum: 1 }
    }
  }
]);



// Task 5: Indexing

// Create an index on title
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Show query performance (example query with explain)
db.books.find({ title: "The Hobbit" }).explain("executionStats");
