import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger.js'

class Book extends Component {
  onSelect = e => {
    e.preventDefault();
    //console.log(e.target.value);
    this.props.changeShelf(this.props.book,e.target.value);
  }
  
  render () {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <BookShelfChanger shelfName={book.shelf} onSelect={this.onSelect}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    )}
}

export default Book