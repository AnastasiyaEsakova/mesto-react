import React from 'react';
import PopupWithForm from './PopupWithForm';

 function EditAvatarPopup(props){
  const avatarRef = React.useRef();
  const [avatarValid, setAvatarValid] = React.useState(false);
  const [errorAvatarMessage, setErrorAvatarMessage] = React.useState('');

  React.useEffect(() => {
    setAvatarValid(false);
    setErrorAvatarMessage('');
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleChangeAvatar(e){
    setAvatarValid(e.target.validity.valid);
    setErrorAvatarMessage(e.target.validationMessage);
  }
  function handleSubmit(e){
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value)
  }

   return(
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить"
    onSubmit={handleSubmit} isLoading={props.isLoading} handleOverlayClose={props.handleOverlayClose} formValid={avatarValid}>
      <input className={`popup__input popup__input_el_avatar ${errorAvatarMessage==='' ? "" : "popup__input_type_error"}`} id="avatar" type="url"
      placeholder="Ссылка на фото" name="avatar" required  ref={avatarRef} onChange={handleChangeAvatar}/>
      <span className={`popup__error ${avatarValid ? "" : "popup__error_visible"}`} id="avatar-error">{errorAvatarMessage}</span>
    </PopupWithForm>
   )
 }

 export default EditAvatarPopup;
