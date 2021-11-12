export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
export const popupTypeImage = document.querySelector('#popup_type_image');
export const popupProfile = document.querySelector('#popup_type_profile');
export const popupPlace = document.querySelector('#popup_type_place');
export const editProfileForm = document.querySelector('#edit_profile_form');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const addPhotoForm = document.querySelector('#add_photo_form');
export const addPhotoButton = document.querySelector('.profile__button');
const inputName = document.querySelector('.popup__input_el_name');
const inputJob = document.querySelector('.popup__input_el_job');
export const insertValues = (config) => {
  inputName.value = config.name;
  inputJob.value = config.about;
};
export const avatar = document.querySelector('.profile__avatar');
export const editAvatarForm = document.querySelector('#edit_avatar');
export const popupDelete = document.querySelector('#popup_type_check');
export const popupAvatar = document.querySelector('#popup_type_avatar');
export const editAvatarButton = document.querySelector('.profile__overlay');
