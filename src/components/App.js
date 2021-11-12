import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen({isEditAvatarPopupOpen: !isEditAvatarPopupOpen});
    document.querySelector('.popup').classList.add('popup_opened');
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen({isEditProfilePopupOpen: !isEditProfilePopupOpen});
    document.querySelector('.popup').classList.add('popup_opened');
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen({isAddPlacePopupOpen: !isAddPlacePopupOpen});
    document.querySelector('.popup').classList.add('popup_opened');
  }
  function closeAllPopups(){
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} closePopup={closeAllPopups}/>
      <Footer />
    </div>
  );
}

export default App;
