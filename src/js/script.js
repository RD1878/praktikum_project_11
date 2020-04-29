import Api from './api';
import Card from './card';
import CardList from './cardList';
import Popup from './popup';
import UserInfo from './userinfo';
import FormValidator from './validation';

export default function func() {
  //ПЕРЕМЕННЫЕ
  /**********/
  const popupPlace = document.querySelector('.popup-place');
  const popupProfile = document.querySelector('.popup-profile');
  const popupImageWindow = document.querySelector('.popup-image');
  const popupImageAvatar = document.querySelector('.popup-avatar');
  const popupSaveButtonProfile = document.querySelector('.popup__button_save-profile');
  const popupSavePlace = document.querySelector('.popup__button_add');
  const popupSaveButtonAvatar = document.querySelector('.popup__button_save-avatar');
  const popupButtonImage = document.querySelector('.popup__button-image');
  const userInfoData = document.querySelector('.user-info__data');
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const userPhoto = document.querySelector('.user-info__photo');
  const placesList = document.querySelector('.places-list');

  const buttonEdit = document.querySelector('.user-info__edit');
  const buttonPlus = document.querySelector('.user-info__button');

  const formPlace = document.forms.place;
  const formUser = document.forms.profile;
  const formAvatar = document.forms.avatar;
  const userInput = formUser.elements.user;
  const jobInput = formUser.elements.job;
  const nameInput = formPlace.elements.name;
  const linkInput = formPlace.elements.link;
  const avatarInput = formAvatar.avatar;
  const validationWords = {
    validationLenght: 'Должно быть от 2 до 30 символов',
    validationUrl: 'Здесь должна быть ссылка',
    validationInfo: 'Это обязательное поле'
  };

  const authorization = '774c77c4-10ef-4cb2-86fa-45394b721778';
  const url = 'https://praktikum.tk/cohort8';



  //ОПРЕДЕЛЕНИЕ КОНСТАНТ С КЛАССАМИ
  /*******************************/
  //Создание Api
  const api = new Api ({
    url: url,
    authorization: authorization
  });

  //Создание объекта карточки
  const card = new Card();

  //Создание объекта списка карточек
  const cardList = new CardList(placesList, card, api);
  
  //Попапы
  const popupCard = new Popup({
    window: popupPlace,
    button: popupSavePlace,
    buttonImage: popupButtonImage,
  });
  const popupUser = new Popup({
    window: popupProfile,
    button: popupSaveButtonProfile
  });
  const popupImage = new Popup({
    imageWindow: popupImageWindow
  });
  const popupAvatar = new Popup({
    window: popupImageAvatar,
    button: popupSaveButtonProfile
  })

  //Редактор профиля
  const userInfo = new UserInfo({
    popupProfile: popupProfile,
    popupAvatar: popupImageAvatar,
    userData: userInfoData,
    name: userName,
    job: userJob,
    photo: userPhoto,
    userInput: userInput,
    jobInput: jobInput,
    avatarInput: avatarInput,
    api: api,
  });

  //Валидаторы
  const formValidPlace = new FormValidator(formPlace, linkInput, validationWords, popupButtonImage);
  const formValidUser = new FormValidator(formUser, linkInput, validationWords, popupButtonImage);
  const formValidAvatar = new FormValidator(formAvatar, avatarInput, validationWords, popupSaveButtonAvatar);

  
  //ФУНКЦИИ
  /*******/
  //Функция ожидания загрузки карточки
  function renderLoading(isLoading, button) {
    if(isLoading) {
      button.removeChild(button.firstElementChild);
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = '';
      button.innerHTML = `
        <img class='popup__button-image' src='./images/Vector.png' alt='+'>
      `;
    }
  }


  //ВЫЗОВЫ МЕТОДОВ КЛАССОВ
  /**********************/
  //Установка слушателей валидции
  formValidPlace.setEventListeners();
  formValidUser.setEventListeners();
  formValidAvatar.setEventListeners();
  

  //СЛУШАТЕЛИ
  /*********/
  //Открытие попапа карточки
  buttonPlus.addEventListener('click', function () {
    popupCard.open();
    //Закрытие попапа карточки
    document.querySelector('.popup__close_place').addEventListener('click', popupCard.close);
    document.addEventListener('keydown', function(event) {
      if(event.key === 'Escape') {
        popupCard.options.window.classList.remove('popup_is-opened');
      }
    });
  });
  
  //Открытие картинки карточки
  cardList.container.addEventListener('click', function(event) {
    if(event.target.classList.contains('place-card__image')) {
      popupImage.open(event);
    }
    //Закрытие картинки карточки по крестику и по Esc
    popupImage.options.imageWindow.addEventListener('click', function(event) {
      if(event.target.classList.contains('popup__close_image')) {
        popupImage.close(event);
      }
    });
    document.addEventListener('keydown', function(event) {
      if(event.key === 'Escape') {
        popupImage.options.imageWindow.classList.remove('popup_is-opened');
      }
    });
  });
    
  //Открытие попапа профиля с редактированием профиля 
  buttonEdit.addEventListener('click', function() {
    popupUser.open();
    if(popupProfile.classList.contains('popup_is-opened')) {
      formValidUser.resetError(formValidUser.form.user.nextElementSibling);
      formValidUser.resetError(formValidUser.form.job.nextElementSibling);
    }
    //Закрытие попапа профиля
    document.querySelector('.popup__close_profile').addEventListener('click', popupUser.close);
    document.addEventListener('keydown', function(event) {
      if(event.key === 'Escape') {
        popupUser.options.window.classList.remove('popup_is-opened');
      }
    });
  });
  
  //Открытие попапа аватар с редактированием профиля
  userPhoto.addEventListener('click', function() {
    popupAvatar.open();
    if(popupImageAvatar.classList.contains('popup_is-opened')) {
      formValidAvatar.resetError(formValidAvatar.form.avatar.nextElementSibling);
    }
    //Закрытие попапа аватара
    document.querySelector('.popup__close_avatar').addEventListener('click', popupAvatar.close);
    document.addEventListener('keydown', function(event) {
      if(event.key === 'Escape') {
        popupAvatar.options.window.classList.remove('popup_is-opened');
      }
    });
  })
 
  //Отправка новой карточки
  formPlace.addEventListener('submit', function(event) {
    event.preventDefault();
    renderLoading(true, popupSavePlace);
    api.addCard(nameInput.value, linkInput.value);
    cardList.addCard(card.create({
      name: nameInput.value,
      link: linkInput.value,
      likes: []
    }));

    formPlace.reset();
    popupPlace.classList.remove('popup_is-opened');
    renderLoading(false, popupSavePlace);
  });

  //Отправка отредактированного профиля
  formUser.addEventListener('submit', userInfo.updateUserInfo.bind(userInfo));
  
  //Отправка новой аватарки
  formAvatar.addEventListener('submit', userInfo.updateAvatar.bind(userInfo));
  
  //Лайк-дизлайк и удаление карточки
  cardList.container.addEventListener('click', function(event) {
    if(event.target.classList.contains('place-card__like-icon')) {
      if(event.target.classList.contains('place-card__like-icon_liked')) {
        api.delLike(event.target.closest('.place-card').firstElementChild.dataset.cardId);
        card.like(event);
        api.getInitialCards().then((data) => {
          data.forEach(function(item) {
            if(item._id === event.target.closest('.place-card').firstElementChild.dataset.cardId) {
              event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) - 1;
            }
          })
        });
      }
      else {
        api.addLike(event.target.closest('.place-card').firstElementChild.dataset.cardId);
        card.like(event);
        api.getInitialCards().then((data) => {
            data.forEach(function(item) {
              if(item._id === event.target.closest('.place-card').firstElementChild.dataset.cardId) {
                event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) + 1;
              }
            });
        });
      }
    }
    if(event.target.classList.contains('place-card__delete-icon')) {
      if(window.confirm('Вы действительно хотите удалить картинку?')) {
        api.deleteCard(event.target.closest('.place-card__image').dataset.cardId);
        card.remove(event);
      }
    }
  });

  //ВЫЗОВ ФУНКЦИЙ
  /*************/
  //отрисовка карточек
  cardList.render();
  //загрузка данных юзера без аватара
  window.onload = userInfo.setUserInfo();
  //загрузка аватара юзера
  window.onload = userInfo.setUserAvatar();
}