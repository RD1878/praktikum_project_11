class UserInfo {
  constructor(options) {
    this.options = options;
  }

  //Функция ожидания загрузки информации юзера
  renderLoading(isLoading, button) {
    if(isLoading) {
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = 'Сохранить';
    }
  }

  //Загрузка данных профиля
  setUserInfo() {
    this.options.api.getUserData().then((data) => {
      this.options.name.textContent = data.name;
      this.options.job.textContent = data.about;
      this.options.userData.dataset.userId = data._id;

      this.options.userInput.value = data.name;
      this.options.jobInput.value = data.about;
    });
  }

  //Редактирование данных профиля
  updateUserInfo(event) {
    this.options.api.editProfileData(this.options.userInput.value, this.options.jobInput.value).then((res) => {
      this.setUserInfo();
    });
    
    event.preventDefault();
    this.renderLoading(true, this.options.popupProfile.querySelector('.popup__button_save-profile'));
    
    this.options.popupProfile.classList.remove('popup_is-opened');
    this.renderLoading(false, this.options.popupProfile.querySelector('.popup__button_save-profile'));
  }

  //Загрузка аватара
  setUserAvatar() {
    this.options.api.getUserData().then((data) => {
      this.options.photo.style.backgroundImage = `url('${data.avatar}')`;
    });
  }

  //Обновление аватара
  updateAvatar() {
    this.options.api.editAvatar(this.options.avatarInput.value).then((res) => {
      this.setUserAvatar();
    });
    
    event.preventDefault();

    this.options.popupAvatar.classList.remove('popup_is-opened');
  }
}