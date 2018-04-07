import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(<App />, document.getElementById('app'));

// const searchBar = document.querySelector('#benson .search-bar');
// const list = document.querySelector('#benson #results');
// searchBar.focus();

// searchBar.addEventListener('keyup', async () => {
//     if (searchBar.value.length > 0) {
//         const results = await search(searchBar.value);

//         // <li>
//         //     <img src="http://pngimg.com/uploads/chrome_logo/chrome_logo_PNG17.png" /> jsonstore.io
//         // <span class="type">Tab</span>
//         //     <span class="command">Ctrl + 1</span>
//         // </li>
//     }
// });