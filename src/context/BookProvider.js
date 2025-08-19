// // BookProvider.js
// import React, { useState } from 'react';
// import BookContext from './store';


// const BookProvider = ({ children }) => {
//   const [book, setBook] = useState([]);

//   const addBook = (newbook) => setBook(()=>[...book,newbook])
//     // console.log('Bokk----->',book)
//   return (
//     <BookContext.Provider value={{ book, addBook }}>
//       {children}
//     </BookContext.Provider>
//   );
// };

// export default BookProvider;
