import React, { Component } from 'react';
import BookShelf from './BookShelf.js';

class MainPage extends Component {
  
  render () {
   const { books } = this.props
   return (
     <div className="app">
       <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
       </div>
     
       <BookShelf books={books}/>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
     </div>
   )
    
  }
  
}

export default MainPage