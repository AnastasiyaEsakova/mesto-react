function Card(props){
  return(
    <article className="element">
      <button className="element__delete-button" type="button" aria-label="удалить фото"></button>
      <img className="element__image" src={props.card.link} alt={props.card.name} />
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="лайк"></button>
          <p className="element__like-numbers">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
export default Card;
