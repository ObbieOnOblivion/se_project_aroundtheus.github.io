class Card {
  constructor(name, link, template, imageClickHandler,apiDelete, toggleButton, apiInfo) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._imageClickHandler = imageClickHandler; 
    this._deleteHandler = apiDelete
    this._toggleButton = toggleButton; 
    this._apiInformation = apiInfo;
  }

  _addImageFunctionality() {
    const cardElement = this._template;
    const cardImageEl = cardElement.querySelector("#gallery__image");

    cardImageEl.addEventListener("click", () => {
      this._imageClickHandler({
        name: this._name,
        link: this._link,
      });
    });
  }

  _addLikeFunctionality() { 
    const likeButton = this._template.querySelector("#gallery__like-button");

    this._apiInformation.forEach(item =>{
      if (item.name == this._name && item.link == this._link){
        if (item.isLiked){
          likeButton.classList.add("gallery__like-button_liked");
        }
      }
    })
    
    likeButton.addEventListener("click", () => {

      this._toggleButton(this._name, this._link, () => {
        likeButton.classList.add("gallery__like-button_liked");
      },
      () =>{
        likeButton.classList.remove("gallery__like-button_liked");
      })
    });
  }

  _addDeleteFunctionality() {
    
    const deleteButton = this._template.querySelector("#gallery__trash");
    deleteButton.addEventListener("click", () => {
        const cardElement = deleteButton.closest(".gallery__card");
        if (cardElement) {
          cardElement.remove();
      }
      this._apiInformation.forEach(item => {
        if (item.name == this._name && item.link == this._link){
          if (item._id){
            console.log(item._id);
            this._deleteHandler(item._id);
          }
        }
      })


    });
  }

  _setEventListeners() {
    this._addImageFunctionality();

    this._addLikeFunctionality();

    this._addDeleteFunctionality();
  }

  addCard() {
    this._template = this._template.cloneNode(true);

    const cardElement = this._template;
    const cardImageEl = cardElement.querySelector("#gallery__image");
    const cardTitleEl = cardElement.querySelector("#gallery__text");

    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    this._setEventListeners();

    return this._template;
  }
}

export default Card;
