import React, { Component } from 'react';

class BookShelfChanger extends Component {
  render () {
    const { shelfName, onSelect } = this.props
    return (
      <div className="book-shelf-changer">
        <select value={shelfName} onChange={onSelect}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading" >Currently Reading</option>
          <option value="wantToRead" >Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
  )}
}

export default BookShelfChanger