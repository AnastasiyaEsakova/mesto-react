import React from 'react';
import {IsLoadingContext} from '../contexts/IsLoadingContext';

function PopupWithForm(props){
  const classId=`popup_type_${props.name}`;
  const isLoading = React.useContext(IsLoadingContext);

  function handleOverlayClose(e){
    if(e.target.classList.contains('popup')){
      props.onClose();
    }
  }

    return(
      <div className={props.isOpen ? "popup popup_opened":"popup"} id={classId} onClick={handleOverlayClose}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="закрыть форму" id={`button_close_${props.name}`} onClick={props.onClose}></button>
          <form className="popup__form" name={props.name} id={`form_${props.name}`} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className={`popup__button popup__button_el_${props.name}`} type="submit" id={`button_${props.name}`}
            value={props.buttonText}>{isLoading ? 'Сохранение...' : props.buttonText}</button>
          </form>
        </div>
      </div>
    )

}
export default PopupWithForm;
