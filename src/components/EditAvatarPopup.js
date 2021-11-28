import React from 'react';
import PopupWithForm from './PopupWithForm';

 function EditAvatarPopup(props){
   const avatarRef = React.useRef();

  function handleSubmit(e){
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value)
  }
   return(
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить"
    onSubmit={handleSubmit} isLoading={props.isLoading} handleOverlayClose={props.handleOverlayClose}>
      <input className=" popup__input popup__input_el_avatar" id="avatar" type="url"
      placeholder="Ссылка на фото" name="avatar" required  ref={avatarRef}/>
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
   )
 }

 export default EditAvatarPopup;
