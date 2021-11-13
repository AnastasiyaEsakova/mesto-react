function PopupWithForm(props){
  const classId=`popup_type_${props.name}`;
    return(
      <div className={props.isOpen ? "popup popup_opened":"popup"} id={classId}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_profile" onClick={props.onClose}></button>
          <form className="popup__form" name={props.name} id="edit_profile_form">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
          </form>
        </div>
      </div>
    )

}
export default PopupWithForm;
