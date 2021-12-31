import React, { Component } from 'react';
import BookShelf from './BookShelf.js';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
              */}

           <input type="text" placeholder="Search by title or author" value={this.props.searchQuery} onChange={(event) => this.props.onChange(event.target.value)}/>

           </div>
         </div>
         <div className="search-books-results">
           <BookShelf books={this.props.searchBooks} changeShelf={this.props.changeShelf} shelfName='none' title='Not on Shelf' emptyShelfMessage='No results'/>
           <BookShelf books={this.props.searchBooks} changeShelf={this.props.changeShelf} shelfName='currentlyReading-wantToRead-read' title='Already on Shelf' emptyShelfMessage='No results'/>
         </div>
      </div>
)}
}

export default SearchPage