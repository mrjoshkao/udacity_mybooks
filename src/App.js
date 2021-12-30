import React from 'react'
import MainPage from './MainPage.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books : [],
    searchBooks : [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  
  changeShelf = (book, shelf) => {
    let changedBook = {...book};
    changedBook.shelf = shelf;
    const newBooks = this.state.books.filter(b => b.id !== book.id);
    console.log(newBooks.concat([changedBook]));
    BooksAPI.update(book, shelf).then((book,shelf) => {
      this.setState((currentState) => ({
        books : newBooks.concat([changedBook])
      }))
    })
    console.log(changedBook);
    console.log(shelf);
  }
  search = (query) => {
    BooksAPI.search(query, 20).then((searchResult) => {
      console.log(query);
      console.log(searchResult);
      let searchResultArray = [];
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
  }
  render() {
    
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage books={this.state.books} searchBooks={this.state.searchBooks} onChange={this.search} changeShelf={this.changeShelf} />} />
          <Route path='/search' element={<SearchPage books={this.state.books} searchBooks={this.state.searchBooks} onChange={this.search} changeShelf={this.changeShelf} />} />
        </Routes>
      </Router>
    )
  }
}

export default BooksApp
