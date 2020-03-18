class Popup {
  constructor(options) {
    this.options = options;
  }

  //Попап открытия
  open(event) {
    if(this.options.buttonImage) {
      this.options.window.classList.add('popup_is-opened');
      this.options.button.setAttribute('disabled', true);
      this.options.button.classList.remove('popup__button_active');
      this.options.buttonImage.classList.remove('popup__button-image_active');
    }
    if(this.options.imageWindow) {
      const linkImage = () => {
        const linkStyle = event.target.getAttribute('style');
        const linkBeginIndex = linkStyle.search('https');
        const link = linkStyle.slice(linkBeginIndex);
        return link.slice(0, link.length - 3);
      }
      this.options.imageWindow.querySelector('.popup__image').src = linkImage();
      this.options.imageWindow.classList.add('popup_is-opened');
    }

    if(!this.options.buttonImage && !this.options.imageWindow) {
      this.options.window.classList.add('popup_is-opened');
      this.options.button.setAttribute('disabled', true);
    }
  }

  //Попап закрытия
  close(event) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
  }
}