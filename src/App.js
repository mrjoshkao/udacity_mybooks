import React from 'react'
import MainPage from './MainPage.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css'

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

  render() {
    //console.log(this.state.books)
    
    return (
      //<MainPage books={this.state.books} changeShelf={this.changeShelf} />
      <SearchPage books={this.state.books} changeShelf={this.changeShelf} />
    )
  }
}

export default BooksApp
