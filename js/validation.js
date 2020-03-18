class FormValidator {
  constructor(form, linkInput, validationWords, popupButtonImage) {
    this.form = form;
    this.linkInput = linkInput;
    this.validationWords = validationWords;
    this.popupButtonImage = popupButtonImage;
  }

  //Проверка на валидность полей ввода
  checkInputValidity(elementInput, elementError) {
    if (elementInput.type !== this.linkInput.type) {
      if (elementInput.value.length === 0) {
        elementError.classList.add('popup__error-message_active');
        elementError.textContent = this.validationWords.validationInfo;
        return; 
      } 
      if (elementInput.validity.tooShort || elementInput.validity.tooLong) {
        elementError.classList.add('popup__error-message_active');
        elementError.textContent = this.validationWords.validationLenght;
        return;
      }
      this.resetError(elementError);
      return;
    } else {
      if (elementInput.value.length === 0) {
        elementError.classList.add('popup__error-message_active');
        elementError.textContent = this.validationWords.validationInfo;
        return;
      }
      if (!elementInput.checkValidity()) {
        elementError.classList.add('popup__error-message_active');
        elementError.textContent = this.validationWords.validationUrl;
        return;
      }
      this.resetError(elementError);
    }
  }

  //Установка активности кнопки
  setSubmitButtonState(elementForm, elementButton) {
    if (!elementForm.checkValidity()) {
      elementButton.setAttribute('disabled', true);
      elementButton.classList.remove('popup__button_active');
      this.popupButtonImage.classList.remove('popup__button-image_active');
    } else {
      elementButton.removeAttribute('disabled');
      elementButton.classList.add('popup__button_active');
      this.popupButtonImage.classList.add('popup__button-image_active');
    }
  }

  //Установка слушателей
  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target, event.target.nextElementSibling);
      this.setSubmitButtonState(this.form, this.form.querySelector('.popup__button'));
    });
  }

  //Сброс ошибки
  resetError(element) {
    element.classList.remove('popup__error-message_active');
    element.textContent = '';
  }
}

