import React from 'react';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup';

function  Main(props){
  const [userName, setUserName] = React.useState();
  const [userDescription , setUserDescription ] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then((res) =>{
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err =>{
        alert(err + " Ошибка с запросом данных пользователя");
      });
  },[]);
  React.useEffect(() =>{
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err =>{
        alert(err + " Ошибка с запросом карточек");
      });
  }, []);

  function handleChange(evt){
    console.log(evt.target.value);
    // временная функция обработки input
  }
    return(
      <main className="content">
          <section className="profile profile_page_size">
            <div className="profile__items">
              <div className="profile__overlay" onClick={props.onEditAvatar}></div>
              <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
              <div className="profile__info">
                <div className="profile__fullname">
                  <h1 className="profile__name">{userName}</h1>
                  <button className="profile__edit-button" type="button" aria-label="кнопка изменения профиля" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__description">{userDescription}</p>
              </div>
            </div>
            <button className="profile__button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
          </section>
          <section className="elements elements_page_size">
            {cards.map((card, i) =>{
                return (
                  <Card card={card} key={i} onCardClick={props.onCardClick}/>
                )
            })}
          </section>
          <PopupWithForm title="Редактировать профиль" name="profile" onClose={props.closePopup} isOpen={props.profileOpen}>
            <input className="popup__input popup__input_el_name" id ="name-profile" name="name" type="text" value="Jacques Cousteau"
                 placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChange}/>
            <span className="popup__error" id="name-profile-error"></span>
            <input className=" popup__input popup__input_el_job" id="job-profile" type="text" value="Sailor, researcher"
                 placeholder="Описание" name="about" minLength="2" maxLength="200" required onChange={handleChange}/>
            <span className="popup__error" id="job-profile-error"></span>
            <button className="popup__button" type="submit" id="edit-profile-button" value="Сохранить">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.avatarOpen} onClose={props.closePopup}>
            <input className=" popup__input popup__input_el_avatar" id="avatar" type="url"
                placeholder="Ссылка на фото" name="avatar" required onChange={handleChange}/>
            <span className="popup__error" id="avatar-error"></span>
            <button className="popup__button" type="submit" id="edit-avatar-button" value="Сохранить">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm title="Новое место" name="place" isOpen={props.addPhotoOpen} onClose={props.closePopup}>
            <input className="popup__input popup__input_el_place-name" id="place-name" type="text"
                placeholder="Название" name="name" minLength="2" maxLength="30" required onChange={handleChange}/>
            <span className="popup__error" id="place-name-error"></span>
            <input className=" popup__input popup__input_el_link" id="link" type="url"
                placeholder="Ссылка на картинку" name="link" required onChange={handleChange}/>
            <span className="popup__error" id="link-error"></span>
            <button className="popup__button" type="submit" id="add-photo-button" value="Создать">Создать</button>
          </PopupWithForm>
          <PopupWithForm title="Вы уверены?" name="check"  onClose={props.closePopup}>
            <button className="popup__button popup__button_el_check" type="submit" id="delete-button">Да</button>
          </PopupWithForm>
          <ImagePopup onClose={props.closePopup} card={props.card}/>
        </main>
    )
};
export default Main;
