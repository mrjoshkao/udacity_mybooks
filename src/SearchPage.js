import React, { Component } from 'react';
import BookShelf from './BookShelf.js';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
  state ={
    query : '',
    noResults : false,
  }
  componentDidMount() {
    this.setState(() => ({
      query: this.props.searchQuery,
    }))
  }
  
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }))
    let searchString = query;
    searchString === '' && (searchString = ' '); //explain this ******
    this.props.onChange(searchString);
  }

  spChangeShelf = (book,shelf) => {
    console.log('hi!')
    this.props.changeShelf(book,shelf)
    let changedBook = {...book};
    changedBook.shelf = shelf;
    const newBooks = this.props.searchBooks.filter(b => b.id !== book.id);
    this.setState((currentState) => ({
        searchBooks : newBooks.concat([changedBook])
    }))
  }
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

           <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

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