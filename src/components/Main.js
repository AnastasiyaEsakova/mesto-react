import React from 'react';
import PopupWithForm from './PopupWithForm';
class  Main extends React.Component{
  constructor(props){
    super(props);
  }
  handleEditAvatarClick(){
    document.querySelector('#popup_type_avatar').classList.add('popup_opened');
  }
  handleEditProfileClick(){
    document.querySelector('#popup_type_profile').classList.add('popup_opened');
  }
  handleAddPlaceClick(){
    document.querySelector('#popup_type_place').classList.add('popup_opened');
  }
  render(){
    return(
      <main className="content">
          <section className="profile profile_page_size">
            <div className="profile__items">
              <div className="profile__overlay" onClick={this.handleEditAvatarClick}></div>
              <img className="profile__avatar" src="<%=require('../images/avatar.jpg')%>" alt="Аватар"/>
              <div className="profile__info">
                <div className="profile__fullname">
                  <h1 className="profile__name">Жак-Ив Кусто</h1>
                  <button className="profile__edit-button" type="button" aria-label="кнопка изменения профиля" onClick={this.handleEditProfileClick}></button>
                </div>
                <p className="profile__description">Исследователь океана</p>
              </div>
            </div>
            <button className="profile__button" type="button" aria-label="добавить фото" onClick={this.handleAddPlaceClick}></button>
          </section>
          <section className="elements elements_page_size">
          </section>
          {/* <PopupWithForm title="Редактировать профиль" name=""/>
          <PopupWithForm title="Обновить аватар" name=""/>
          <PopupWithForm title="Новое место" name=""/>
          <PopupWithForm title="Вы уверены?" name=""/> */}
          <div className="popup" id="popup_type_profile">
            <div className="popup__container">
              <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_profile"></button>
              <form className="popup__form" name="editProfileForm" id="edit_profile_form">
                <h2 className="popup__title">Редактировать профиль</h2>
                <input className="popup__input popup__input_el_name" id ="name-profile" name="name" type="text" value="Жак-Ив Кусто"
                 placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="popup__error" id="name-profile-error"></span>
                <input className=" popup__input popup__input_el_job" id="job-profile" type="text" value="Исследователь океана"
                 placeholder="Описание" name="about" minLength="2" maxLength="200" required />
                <span className="popup__error" id="job-profile-error"></span>
                <button className="popup__button" type="submit" id="edit-profile-button" value="Сохранить">Сохранить</button>
              </form>
            </div>
          </div>
          <div className="popup" id="popup_type_place">
            <div className="popup__container">
              <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_place"></button>
              <form className="popup__form" name="addPhotoForm" id="add_photo_form" >
                <h2 className="popup__title">Новое место</h2>
                <input className="popup__input popup__input_el_place-name" id="place-name" type="text"
                placeholder="Название" name="name" minLength="2" maxLength="30" required />
                <span className="popup__error" id="place-name-error"></span>
                <input className=" popup__input popup__input_el_link" id="link" type="url"
                placeholder="Ссылка на картинку" name="link" required />
                <span className="popup__error" id="link-error"></span>
                <button className="popup__button" type="submit" id="add-photo-button" value="Создать">Создать</button>
              </form>
            </div>
          </div>
          <div className="popup popup_type_image" id='popup_type_image'>
            <div className="popup__container popup__container_type_image">
              <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_image"></button>
              <figure className="popup__image-container">
                <img src="#" alt="Картинка" className="popup__image" />
                <figcaption className="popup__caption"></figcaption>
              </figure>
            </div>
          </div>
          <div className="popup" id="popup_type_avatar">
            <div className="popup__container">
              <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_avatar"></button>
              <form className="popup__form" name="editAvatar" id="edit_avatar" >
                <h2 className="popup__title">Обновить аватар</h2>
                <input className=" popup__input popup__input_el_avatar" id="avatar" type="url"
                placeholder="Ссылка на фото" name="avatar" required />
                <span className="popup__error" id="avatar-error"></span>
                <button className="popup__button" type="submit" id="edit-avatar-button" value="Сохранить">Сохранить</button>
              </form>
            </div>
          </div>
          <div className="popup" id="popup_type_check">
            <div className="popup__container">
              <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_ask"></button>
              <form className="popup__form">
                <h2 className="popup__title popup__title_el_check">Вы уверены?</h2>
                <button className="popup__button popup__button_el_check" type="submit" id="delete-button">Да</button>
              </form>
            </div>
          </div>
        </main>
    )
  }

};
export default Main;
