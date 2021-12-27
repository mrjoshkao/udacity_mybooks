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
      }))});
  }
  render () {
    const { query } = this.state
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
             <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
           </form>
           </div>
         </div>
         <div className="search-books-results">
           {this.state.noResults ? 'The search returned no results' : <BookShelf books={this.state.searchBooks} /> }
         </div>
      </div>
)}
}

export default SearchPage