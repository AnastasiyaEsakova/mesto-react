import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
      <template id="card">
        <article className="element">
          <button className="element__delete-button" type="button" aria-label="удалить фото"></button>
          <img className="element__image" src="#" alt="картинка" />
          <div className="element__container">
            <h2 className="element__title"></h2>
            <div className="element__like-container">
              <button className="element__like" type="button" aria-label="лайк"></button>
              <p className="element__like-numbers"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
