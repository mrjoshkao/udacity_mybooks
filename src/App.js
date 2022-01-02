import React from 'react'
import MainPage from './MainPage.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books : [],
    searchBooks : [],
    searchQuery : '',
  }
  /**
  * @description Calls the API on mount and assigns data to books state
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  /**
  * @description Changes the shelf for a given book
  * @param {object} book - A book object, with containers for strings and integers of information regarding a book
  *                 the objects are pulled using the API
  * @param {string} shelf - A string with 4 possible values: 'read', 'wantToRead', 'currentlyReading', 'none'
  */
  changeShelf = (book, shelf) => {
    let changedBook = {...book};
    changedBook.shelf = shelf;
    let newBooks = this.state.books.filter(b => b.id !== book.id);
    console.log(newBooks.concat([changedBook]));
    
    /**
    *  calls the API to update the book, more info in README.md
    *  after updating the book, it will update the same book
    *  that exists in the searchBooks state for the search page
    *  this is done if the current search result has a length that's 
    *  not 0
    */
    BooksAPI.update(book, shelf).then((book,shelf) => {
      this.setState((currentState) => ({
        books : newBooks.concat([changedBook])
      }))
    }).then(() => {
      newBooks = this.state.searchBooks.filter(b => b.id !== book.id);
      console.log(newBooks.length === 0);
      newBooks.length === 0 || this.setState((currentState) => ({
        searchBooks : newBooks.concat([changedBook])
    }))})
    //console.log(changedBook);
    //console.log(shelf);
  }
  /**
  * @description Performs the search using the API
  * @param {string} query - A search string that is passed to the API to perform the search
  * 
  * this function also does 2 checks: first if the querry is an empty string then the search
  * API is not called and the searchBooks state is set to empty array. the second check
  * is to see if the API returned an error - if we assume that there is no result and set
  * the searchBooks state to empty array
  *
  * finally, the function also makes sure to look at the books state to see if any search
  * results match the books already on the shelf. if so, then the book object from 
  * searchBooks is updated with a shelf container with a string containing the name of the
  * shelf it is on in the books state (one of: 'currentlyReading', 'wantToRead' or 'read)
  */
  search = (query) => {
    this.setState(() => ({
      searchQuery: query,
    }))
    let searchResultArray = [];
    query === '' ? (
      this.setState(() => ({
        searchBooks : searchResultArray
    }))) : (
    BooksAPI.search(query, 20).then((searchResult) => {
      console.log(query);
      console.log(searchResult);
      Array.isArray(searchResult) && (searchResultArray = searchResult);
      this.setState(() => ({
        searchBooks : searchResultArray
    }))}).then(() =>{
      let newSearch = [...this.state.searchBooks];
      newSearch.forEach((b) => {
        b.shelf = 'none';
        this.state.books.find(element => ((element.id === b.id) && (b.shelf = element.shelf)));
      })
      newSearch && this.setState(() => ({
        searchBooks: newSearch,
    }))})
  )}
  
  render() {
    return (
      <Router>
        <Routes>
          <Route 
            exact path='/' 
            element={<MainPage books={this.state.books} changeShelf={this.changeShelf}/>} 
          />
          <Route 
            path='/search' 
            element={<SearchPage books={this.state.books} searchBooks={this.state.searchBooks} onChange={this.search} changeShelf={this.changeShelf} searchQuery={this.state.searchQuery}/>} 
           />
        </Routes>
      </Router>
  )}
}

export default BooksApp
