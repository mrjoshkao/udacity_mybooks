import React, { Component } from 'react';
import BookShelf from './BookShelf.js';
import * as BooksAPI from './BooksAPI.js'

class SearchPage extends Component {
  state ={
    showSearchPage: true,
    query : '',
    searchBooks : [],
    noResults : false,
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }))
  }
  search = (e) => {
    e.preventDefault();
    BooksAPI.search(this.state.query, 20).then((searchResult) => {
      console.log(searchResult);
      this.setState(() => ({
        searchBooks : searchResult,
        noResults : false
    }))}).catch(err => {
      console.log(err);
      this.setState(() => ({
        searchBooks : [],
        noResults : true
    }))})
  }
  spChangeShelf = (book,shelf) => {
    this.props.changeShelf(book,shelf)
    let changedBook = {...book};
    changedBook.shelf = shelf;
    const newBooks = this.state.searchBooks.filter(b => b.id !== book.id);
    this.setState((currentState) => ({
        searchBooks : newBooks.concat([changedBook])
    }))
  }
  render () {
    let newSearch = this.state.searchBooks;
    newSearch.forEach((b) => {
      b.shelf = 'none';
      this.props.books.find(element => ((element.id === b.id) && (b.shelf = element.shelf)));
    })
    console.log(newSearch);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
              */}
           <form onSubmit={this.search}>
             <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
           </form>
           </div>
         </div>
         <div className="search-books-results">
           <BookShelf books={newSearch} changeShelf={this.spChangeShelf} shelfName='none' title='Search Results' emptyShelfMessage='No results'/>
           <BookShelf books={newSearch} changeShelf={this.spChangeShelf} shelfName='currentlyReading-wantToRead-read' title='Already on Shelf' emptyShelfMessage='No results'/>
         </div>
      </div>
)}
}

export default SearchPage