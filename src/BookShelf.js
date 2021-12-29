import React, { Component } from 'react';
import Book from './Book.js';

class BookShelf extends Component {
  render () {
    const { books, changeShelf, shelfName, title, emptyShelfMessage } = this.props
    const booksOnShelf = books.filter(b => shelfName.includes(b.shelf)) //test for 'none' for the SearchPage component to work
    console.log(booksOnShelf)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {/* The React Chrome dev tools requires a key for the wrapper to prevent error https://github.com/facebook/react/issues/21468#issuecomment-838770329*/}
          <ol key={new Date().getTime()} className="books-grid">
            {booksOnShelf.map((b) => (<li key={b.id}> <Book book={b} changeShelf={changeShelf}/> </li>))}
          </ol>
          { booksOnShelf.length === 0 && emptyShelfMessage }
        </div>
      </div>
  )}
}

export default BookShelf