import React, { Component } from 'react';
import BookShelf from './BookShelf.js';
import { Link } from 'react-router-dom'

class MainPage extends Component {
  render () {
   const { books, changeShelf } = this.props
   return (
     <div className="app">
       <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
       </div>
       <BookShelf books={books} changeShelf={changeShelf} shelfName='currentlyReading' title='Currently Reading' emptyShelfMessage='Nothing on this shelf'/>
       <BookShelf books={books} changeShelf={changeShelf} shelfName='wantToRead' title='Want To Read' emptyShelfMessage='Nothing on this shelf'/>
       <BookShelf books={books} changeShelf={changeShelf} shelfName='read' title='Read' emptyShelfMessage='Nothing on this shelf'/>
       <div className="open-search">
         <Link to='/search'>Add a book</Link>
       </div>
     </div>
   )  
  }
}

export default MainPage