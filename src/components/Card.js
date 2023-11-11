
import { popupWithImage } from "./PopupWithImage.js";

const imagePopup = new popupWithImage("#picture-modal");
const pictureModal = document.querySelector("#picture-modal");

class Card{
    constructor(name, link, template){
        this._name = name;
        this._link = link;
        this._template = template;

    }

    _addImageFunctionality(){
        const cardElement = this._template;  
        const cardImageEl = cardElement.querySelector("#gallery__image");
        const cardTitleEl = cardElement.querySelector("#gallery__text");

        cardTitleEl.textContent = this._name; 
        cardImageEl.src = this._link;
        cardImageEl.alt = this._name;

        cardImageEl.addEventListener("click", () => {
            const cardElement = this._template;  
            const modalContent = pictureModal.querySelector("#picture-container");
            const modalImage = modalContent.querySelector("#picture");
            const modalImageSubHeader = modalContent.querySelector("#picture-modal-description");
            const cardImageEl = cardElement.querySelector("#gallery__image");
            const cardTitleEl = cardElement.querySelector("#gallery__text");
    
            modalImage.src = cardImageEl.src;
            modalImage.alt = this._name;
            modalImageSubHeader.textContent = cardTitleEl.textContent;

            imagePopup.open();
            imagePopup.setEventListeners();

        })

    }

    _addLikeFunctionality(){
        const likeButton = this._template.querySelector("#gallery__like-button");

        likeButton.addEventListener("click", () =>{
            likeButton.classList.toggle("gallery__like-button_liked");
        })
        
    }

    _addDeleteFunctionality(){

        const deleteButton = this._template.querySelector("#gallery__trash");
        deleteButton.addEventListener("click", () =>{
            const cardElement = deleteButton.closest(".gallery__card");
            if (cardElement) {
                cardElement.remove();
            }
        })

    }

    _setEventListeners(){

        this._addImageFunctionality();

        this._addLikeFunctionality();
        
        this._addDeleteFunctionality();
    }
    

    addCard(){
        this._template = this._template.cloneNode(true)

        this._setEventListeners();

        return (this._template);
    }
}

export default Card;
