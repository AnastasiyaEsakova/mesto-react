import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [nameValid, setNameValid] = React.useState(false);
  const [errorNameMessage, setErrorNameMessage] = React.useState('');
  const [linkValid, setLinkValid] = React.useState(false);
  const [errorLinkMessage, setErrorLinkMessage] = React.useState('');

  React.useEffect(() => {
    setName('');
    setNameValid(false);
    setErrorNameMessage('');
    setLink('');
    setLinkValid(false);
    setErrorLinkMessage('');
  }, [props.isOpen])

  function handleChangeName(e){
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorNameMessage(e.target.validationMessage);
  }

  function handleChangeLink(e){
    setLink(e.target.value);
    setLinkValid(e.target.validity.valid);
    setErrorLinkMessage(e.target.validationMessage);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }
  const formValid = nameValid && linkValid;
  return(
    <PopupWithForm title="Новое место" name="place" isOpen={props.isOpen} onClose={props.onClose} buttonText="Создать"
    onSubmit={handleSubmit} isLoading={props.isLoading} handleOverlayClose={props.handleOverlayClose} formValid={formValid}>
      <input className={`popup__input popup__input_el_place-name ${errorNameMessage ==='' ? "":"popup__input_type_error"}`} id="place-name" type="text"
      placeholder="Название" name="name" minLength="2" maxLength="30" required onChange={handleChangeName} value={name}/>
      <span className={`popup__error ${errorNameMessage==='' ? "" : "popup__error_visible"}`} id="place-name-error">{errorNameMessage}</span>
      <input className={`popup__input popup__input_el_link ${errorLinkMessage ==='' ? "" : "popup__input_type_error"}`} id="link" type="url"
      placeholder="Ссылка на картинку" name="link" required onChange={handleChangeLink} value={link}/>
      <span className={`popup__error ${linkValid ? "" : "popup__error_visible"}`} id="link-error">{errorLinkMessage}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
