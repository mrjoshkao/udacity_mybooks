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

       <BookShelf books={books} changeShelf={changeShelf} shelfName='currentlyReading' title='Currently Reading'/>
       <BookShelf books={books} changeShelf={changeShelf} shelfName='wantToRead' title='Want To Read'/>
       <BookShelf books={books} changeShelf={changeShelf} shelfName='read' title='Read'/>
       <div className="open-search">
         <Link to='/search'>Add a book</Link>
       </div>
     </div>
   )
    
  }
  
}

export default MainPage