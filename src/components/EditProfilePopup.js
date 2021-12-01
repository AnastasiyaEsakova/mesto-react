import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const [nameValid, setNameValid] = React.useState(true);
  const [errorNameMessage, setErrorNameMessage] = React.useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [errorDescriptionMessage, setErrorDescriptionMessage] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameValid(true);
    setErrorNameMessage('');
    setDescriptionValid(true);
    setErrorDescriptionMessage('');
  }, [currentUser, props.isOpen]);

  function handleChangeName(e){
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorNameMessage(e.target.validationMessage);
  }

  function handleChangeDescription(e){
    setDescription(e.target.value);
    setDescriptionValid(e.target.validity.valid);
    setErrorDescriptionMessage(e.target.validationMessage);
  }
  function handleSubmit(e){
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const formValid = nameValid && descriptionValid;
  return(
    <PopupWithForm title="Редактировать профиль" name="profile" onClose={props.onClose} isOpen={props.isOpen} buttonText="Сохранить"
    onSubmit={handleSubmit} isLoading={props.isLoading} handleOverlayClose={props.handleOverlayClose} formValid={formValid}>
      <input className={`popup__input popup__input_el_name ${nameValid ? "" : "popup__input_type_error"}`} id ="name-profile" name="name" type="text" value={name}
      placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChangeName}/>
      <span className={`popup__error ${nameValid ? "": "popup__error_visible"}`} id="name-profile-error">{errorNameMessage}</span>
      <input className={`popup__input popup__input_el_job ${descriptionValid ? "" : "popup__input_type_error"}`} id="job-profile" type="text" value={description}
       placeholder="Описание" name="about" minLength="2" maxLength="200" required onChange={handleChangeDescription}/>
      <span className={`popup__error ${descriptionValid ? "": "popup__error_visible"}`} id="job-profile-error">{errorDescriptionMessage}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
