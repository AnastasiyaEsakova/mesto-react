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
import {IsLoadingContext} from '../contexts/IsLoadingContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});
  const [deletedCard, setDeletedCard] = React.useState('');
  const [currentUser, setCurrentUser ] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);


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
    setIsImagePopupOpen(true);
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
  function handleDeletePopupClick(card){
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
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
    setTimeout(() => {
      setSelectedCard({name:'', link:''});
    }, 3000);
    setIsImagePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleUpdateUser(userInfo){
    setIsLoading(true);
    api.setProfileInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(avatarLink){
    setIsLoading(true);
    api.changeAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  function handleCardDelete(e){
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== deletedCard._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data){
    setIsLoading(true);
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} cards={cards}  onCardLike={handleCardLike} onCardDelete={handleDeletePopupClick}/>
        <Footer />
        <IsLoadingContext.Provider value={isLoading}>
          <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <PopupWithForm title="Вы уверены?" name="check" onClose={closeAllPopups} buttonText="Да" isOpen={isConfirmationPopupOpen} onSubmit={handleCardDelete}/>
        </IsLoadingContext.Provider>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
