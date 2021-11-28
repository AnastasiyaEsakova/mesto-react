import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  function handleChangeName(e){
    setName(e.target.value);
  }
  function handleChangeLink(e){
    setLink(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }
  return(
    <PopupWithForm title="Новое место" name="place" isOpen={props.isOpen} onClose={props.onClose} buttonText="Создать"
    onSubmit={handleSubmit} isLoading={props.isLoading} handleOverlayClose={props.handleOverlayClose}>
      <input className="popup__input popup__input_el_place-name" id="place-name" type="text"
      placeholder="Название" name="name" minLength="2" maxLength="30" required onChange={handleChangeName}/>
      <span className="popup__error" id="place-name-error"></span>
      <input className=" popup__input popup__input_el_link" id="link" type="url"
      placeholder="Ссылка на картинку" name="link" required onChange={handleChangeLink}/>
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
