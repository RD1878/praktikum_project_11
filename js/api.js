class Api {
    constructor(options) {
        this.options = options;
    }

    //Получение данных юзера с сервера
    getUserData() {
        return (fetch(`${this.options.url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.options.authorization
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err))
        );
    }

    //Получение данных карточек с сервера
    getInitialCards() {
        return (fetch(`${this.options.url}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.options.authorization
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err))
        );
    }

    //Отправка отредактированного профиля
    editProfileData(userInput, jobInput) {
        return fetch(`${this.options.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInput,
                about: jobInput
            })
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err))
    }

    //Добавление новой карточки на сервер
    addCard(name, link) {
        return (fetch(`${this.options.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); 
        })
        .catch((err) => console.log(err))
        );
    }

    //Удаление новой карточки с сервера
    deleteCard(cardId) {
        return (fetch(`${this.options.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err)));
    }

    //Добавление лайка карточки на сервер
    addLike(cardId) {
        return (fetch(`${this.options.url}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); 
        })
        .catch((err) => console.log(err))
        );
    }

    //Удаление лайка карточки с сервера
    delLike(cardId) {
        return (fetch(`${this.options.url}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); 
        })
        .catch((err) => console.log(err))
        );
    }

    //Отправка аватара
    editAvatar(urlAvatar) {
        return fetch(`${this.options.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: urlAvatar
            })
        })
        .then((res) => {
            return res.ok ? res.json() :  Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err));
    }
}