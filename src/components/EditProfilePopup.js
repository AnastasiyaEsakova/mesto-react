import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup(props){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e){
    setName(e.target.value);
  }
  function handleChangeDescription(e){
    setDescription(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return(
    <PopupWithForm title="Редактировать профиль" name="profile" onClose={props.onClose} isOpen={props.isOpen} buttonText="Сохранить" onSubmit={handleSubmit}>
      <input className="popup__input popup__input_el_name" id ="name-profile" name="name" type="text" value={name}
      placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChangeName}/>
      <span className="popup__error" id="name-profile-error"></span>
      <input className=" popup__input popup__input_el_job" id="job-profile" type="text" value={description}
       placeholder="Описание" name="about" minLength="2" maxLength="200" required onChange={handleChangeDescription}/>
      <span className="popup__error" id="job-profile-error"></span>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
