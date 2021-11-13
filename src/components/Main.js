import React from 'react';
import Card from './Card';
import api from '../utils/Api';

function  Main(props){
  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription ] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then((res) =>{
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err =>{
        alert(err + " Ошибка с запросом данных пользователя");
      });
  },[]);
  React.useEffect(() =>{
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err =>{
        alert(err + " Ошибка с запросом карточек");
      });
  }, []);

    return(
      <main className="content">
        <section className="profile profile_page_size">
          <div className="profile__items">
            <div className="profile__overlay" onClick={props.onEditAvatar}></div>
            <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
            <div className="profile__info">
              <div className="profile__fullname">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-button" type="button" aria-label="кнопка изменения профиля" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__description">{userDescription}</p>
            </div>
          </div>
          <button className="profile__button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements elements_page_size">
          {cards.map((card) =>{
            return (
              <Card card={card} key={card._id} onCardClick={props.onCardClick}/>
            )
          })}
        </section>
      </main>
    )
};
export default Main;
