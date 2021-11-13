function PopupWithForm(props){
  const classId=`popup_type_${props.name}`;
    return(
      <div className={props.isOpen ? "popup popup_opened":"popup"} id={classId}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="закрыть форму" id={`button_close_${props.name}`} onClick={props.onClose}></button>
          <form className="popup__form" name={props.name} id={`form_${props.name}`}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className={`popup__button popup__button_el_${props.name}`} type="submit" id={`button_${props.name}`} value="Сохранить">{props.buttonText}</button>
          </form>
        </div>
      </div>
    )

}
export default PopupWithForm;
