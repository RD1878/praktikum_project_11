class CardList {
  constructor(container, card, api) {
    this.container = container;
    this.card = card;
    this.api = api;
  }

  //Добавление карточки
  addCard(card) {
    this.container.appendChild(card);
  }

  //Рендеринг первоначальных карточек
  render() {
    this.api.getUserData().then((dataUser) => {
      this.api.getInitialCards().then((dataCards) => {
        dataCards.sort(function(a, b) {
          if (a.likes.length > b.likes.length) {
            return -1;
          }
          if (a.likes.length < b.likes.length) {
            return 1;
          }
          return 0;
        });
        const cardsCount = prompt('Какое количество карточек с наибольшим количеством лайков Вам показать?', 20); 
        dataCards.slice(0, +cardsCount).forEach((item) => { 
          const renderCard = this.card.create({
              name: item.name,
              link: item.link,
              cardId: item._id,
              userId: item.owner._id,
              likes: item.likes,
              myUserId: dataUser._id
            });
            this.addCard(renderCard);
        });
      });
    });
  }
}