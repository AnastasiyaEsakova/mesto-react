import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});

  function handleCardClick (card){
    setSelectedCard(card);
    closeWhithEsc();
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
    closeWhithEsc();
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
    closeWhithEsc();
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
    closeWhithEsc();
  }

  const [isClose, setIsClose] = React.useState(false);
  function closeWhithEsc(){
    setIsClose(!isClose);
  }
  function handleKeyDown(evt){
    if (evt.key === "Escape"){
      closeAllPopups();
    }
  }
  React.useEffect(() => {
    if(isClose){
      document.addEventListener("keydown", handleKeyDown);
      return (() =>{
        document.removeEventListener('keydown', handleKeyDown);
      })
    }
  }, [isClose]);

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
  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="profile" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} buttonText="Сохранить">
        <input className="popup__input popup__input_el_name" id ="name-profile" name="name" type="text" value="Jacques Cousteau"
        placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChange}/>
        <span className="popup__error" id="name-profile-error"></span>
        <input className=" popup__input popup__input_el_job" id="job-profile" type="text" value="Sailor, researcher"
                 placeholder="Описание" name="about" minLength="2" maxLength="200" required onChange={handleChange}/>
        <span className="popup__error" id="job-profile-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input className=" popup__input popup__input_el_avatar" id="avatar" type="url"
        placeholder="Ссылка на фото" name="avatar" required onChange={handleChange}/>
        <span className="popup__error" id="avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
        <input className="popup__input popup__input_el_place-name" id="place-name" type="text"
        placeholder="Название" name="name" minLength="2" maxLength="30" required onChange={handleChange}/>
        <span className="popup__error" id="place-name-error"></span>
        <input className=" popup__input popup__input_el_link" id="link" type="url"
        placeholder="Ссылка на картинку" name="link" required onChange={handleChange}/>
        <span className="popup__error" id="link-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="check" onClose={closeAllPopups} buttonText="Да" />
      <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
    </div>
  );
}

export default App;
