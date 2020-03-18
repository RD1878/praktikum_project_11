class Card {
  
  //Лайк карточки
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  //Удаление карточки
  remove(event) {
    event.target.closest('.places-list').removeChild(event.target.closest('.place-card'));
  }

  //Создание карточки
  create(options) {
    const card = document.createElement('div');
    const cardImage = document.createElement('div');
    const delIcon = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeContainer = document.createElement('div');
    const likeIcon = document.createElement('button');
    const likesCount = document.createElement('div');

    card.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.dataset.cardId = options.cardId;
    cardImage.dataset.cardUserId = options.userId;
    cardImage.style.backgroundImage = "url(" + options.link + ")";
    delIcon.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = options.name;
    likeContainer.classList.add('place-card__like-container');
    likeIcon.classList.add('place-card__like-icon');
    likesCount.classList.add('place-card__likes');
    
    if(options.likes.find(function(item) {
      return item._id === options.myUserId;
    })) {
      likesCount.textContent = options.likes.length + 1;
      likeIcon.classList.add('place-card__like-icon_liked');
    }

    likesCount.textContent = options.likes.length;

    card.appendChild(cardImage);
    card.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeContainer);
    likeContainer.appendChild(likeIcon);
    likeContainer.appendChild(likesCount);

    if(options.userId === options.myUserId) {
      cardImage.appendChild(delIcon);
    }

    return card;
  }
}

