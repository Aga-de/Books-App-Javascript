{
  'use strict';


  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  const select = {
    containerOf: {
      bookList: '.books-list',
      filters: '.filters'
    }

  };


  class BooksList {

    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.determineRatingBgc();
      thisBooksList.determineRatingWidth();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
    }

    getElements () {
      const thisBooksList = this;
      thisBooksList.listOfBooks = document.querySelector(select.containerOf.bookList); 
      thisBooksList.filtersForm = document.querySelector(select.containerOf.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() { 
      const thisBooksList = this;
    
      for (let bookId in thisBooksList.data) {

        let book = thisBooksList.data[bookId];

        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);

        book.ratingWidth = thisBooksList.determineRatingWidth(book.rating);

        console.log(book);
  
        const generatedHTML = templates.bookList(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.listOfBooks.appendChild(generatedDOM);
      }
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {

        let shouldBeHidden = false;

        for (const filter of thisBooksList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden == true) {
          const found = document.querySelector('.book__image[data-id="' + book.id + '"]');
          found.classList.add('hidden');
        } else if (shouldBeHidden == false) {
          const found = document.querySelector('.book__image[data-id="' + book.id + '"]');
          found.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let color = '';

      if (rating < 6) {
        color = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      else if (rating > 6 && rating <= 8) {
        color = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      else if (rating > 8 && rating <= 9) {
        color = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      else if (rating > 9) {
        color = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return color;
    }

    determineRatingWidth(rating) {
      let width = '';

      if (rating) {
        width = rating * 10;
      }

      return width;
    }

    initActions() {
      const thisBooksList = this;
    

      thisBooksList.listOfBooks.addEventListener('dblclick', function(event) {
        event.preventDefault();
        console.log(event);

        const clickedElement = event.target.offsetParent; 
    
        if (clickedElement.classList.contains('book__image')) {
        
          if (clickedElement.classList.contains('favorite')) {
            const imageId = clickedElement.getAttribute('data-id');
            const index = thisBooksList.favoriteBooks.indexOf(imageId);
          
            thisBooksList.favoriteBooks.splice(index, 1); 
            clickedElement.classList.remove('favorite');
          } else  {
            clickedElement.classList.add('favorite');

            const imageId = clickedElement.getAttribute('data-id');
            thisBooksList.favoriteBooks.push(imageId);  
          }
        
        }
      });

      thisBooksList.filtersForm.addEventListener('click', function(event) {

        const clickedElement = event.target;

        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
          console.log(clickedElement.value);

          if (clickedElement.checked === true) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const index = thisBooksList.filters.indexOf(clickedElement.value);
            thisBooksList.filters.splice(index, 1);
          }
        }
        thisBooksList.filterBooks();

      });   
    }
  }

  const app = { 
    initApp: function() {
      new BooksList();
    }
  };

  app.initApp();

}










