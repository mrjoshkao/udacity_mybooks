import React, { Component } from 'react';
import Book from './Book.js';

class BookShelf extends Component {
  render () {
    const { books, changeShelf, shelfName, title } = this.props
    const booksOnShelf = books.filter(b => b.shelf === shelfName)
    console.log(booksOnShelf)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf.map((b) => (<li key={b.id}> <Book book={b} changeShelf={changeShelf}/> </li>))}
          </ol>
        </div>
      </div>
  )}
}

export default BookShelf