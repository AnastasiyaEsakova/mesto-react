
function PopupWithForm(props){
  const classId=`popup_type_${props.name}`;
    return(
      <div className={props.isOpen ? "popup popup_opened":"popup"} id={classId}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_profile" onClick={props.close}></button>
          <form className="popup__form" name={props.name} id="edit_profile_form">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
          </form>
        </div>
      </div>
        // <div className="popup" id={classId}>
        //     <div className="popup__container">
        //       <button className="popup__close-icon" type="button" aria-label="закрыть форму" id="button_close_profile"></button>
        //       <form className="popup__form" name={props.name} id="edit_profile_form">
        //         <h2 className="popup__title">{props.title}</h2>
        //         {/* <input className="popup__input popup__input_el_name" id ="name-profile" name="name" type="text" value="Жак-Ив Кусто"
        //          placeholder="Имя" minLength="2" maxLength="40" required />
        //         <span className="popup__error" id="name-profile-error"></span>
        //         <input className=" popup__input popup__input_el_job" id="job-profile" type="text" value="Исследователь океана"
        //          placeholder="Описание" name="about" minLength="2" maxLength="200" required />
        //         <span className="popup__error" id="job-profile-error"></span>
        //         <button className="popup__button" type="submit" id="edit-profile-button" value="Сохранить">Сохранить</button> */}
        //         {props.children}
        //       </form>
        //     </div>
        // </div>
    )

}
export default PopupWithForm;
