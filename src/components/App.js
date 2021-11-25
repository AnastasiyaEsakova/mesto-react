import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});
  const [currentUser, setCurrentUser ] = React.useState('');
  React.useEffect(() => {
    api.getProfileInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      alert(err + "Ошибка с запросом данных пользователя");
    })
  },[]);
  function handleCardClick (card){
    setSelectedCard(card);
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  // const [isClose, setIsClose] = React.useState(false);
  // function closeWhithEsc(){
  //   setIsClose(!isClose);
  // }
  // function handleKeyDown(evt){
  //   if (evt.key === "Escape"){
  //     closeAllPopups();
  //   }
  // }
  // React.useEffect(() => {
  //   if(isClose){
  //     document.addEventListener("keydown", handleKeyDown);
  //     return (() =>{
  //       document.removeEventListener('keydown', handleKeyDown);
  //     })
  //   }
  // }, [isClose]);

  function closeAllPopups(){
    setSelectedCard({name:'', link:''});
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }
  function handleChange(evt){
    console.log(evt.target.value);
    // временная функция обработки input
  }
  function handleUpdateUser(userInfo){
    api.setProfileInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleUpdateAvatar(avatarLink){
    api.changeAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }
  const [cards, setCards] = React.useState([]);

  React.useEffect(() =>{
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err =>{
        alert(err + " Ошибка с запросом карточек");
      });
  }, []);

  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(isLiked){
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else{
      api.setLike(card._id)
        .then((newCard) =>{
          setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data){
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} cards={cards}  onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
        <Footer />
        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        {/* <PopupWithForm title="Новое место" name="place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
          <input className="popup__input popup__input_el_place-name" id="place-name" type="text"
          placeholder="Название" name="name" minLength="2" maxLength="30" required onChange={handleChange}/>
          <span className="popup__error" id="place-name-error"></span>
          <input className=" popup__input popup__input_el_link" id="link" type="url"
          placeholder="Ссылка на картинку" name="link" required onChange={handleChange}/>
          <span className="popup__error" id="link-error"></span>
        </PopupWithForm> */}
        <PopupWithForm title="Вы уверены?" name="check" onClose={closeAllPopups} buttonText="Да" />
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
