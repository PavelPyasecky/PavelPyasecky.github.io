window.CARD_CONTAINER_ID_NAME = "game";
window.CARD_CLASS_NAME = "card";
window.CARD_STYLE_CLASS_NAMES = "card_primary-style";	// class for additional styling
window.CARD_PICKED_CLASS_NAME = "picked";
window.CARD_MATCHED_CLASS_NAME = "matched";
window.CARD_DATA_ID_CLASS_NAME = "data-id";
window.CARD_BACKGROUND_IMG_SOURCE = "img/memory.jpeg";
window.BUTTON_REFRESH_ID_NAME = "refresh";


(function(){

	class Memory {

	    constructor(cards) {
            this.container = document.getElementById(window.CARD_CONTAINER_ID_NAME);
            this.refreshButton = document.getElementById(window.BUTTON_REFRESH_ID_NAME);
            this.cardsArray = cards.concat(cards);
            this.html = "";
            this.cardIdGuess = null;
            this.gameIsPaused = null;
        }

        shuffleCards() {
	        let counter = this.cardsArray.length;
	        let tmp, index;
	        while (counter > 0) {
                index = Math.floor(Math.random() * counter);
	            counter--;
	            tmp = this.cardsArray[counter];
	            this.cardsArray[counter] = this.cardsArray[index];
	            this.cardsArray[index] = tmp;
            }
		}

		setupCards() {
	        this._buildHTML();  // initialize this.html property
	        this.container.innerHTML = this.html;
            this.cardsArrayDOM = document.getElementsByClassName(window.CARD_CLASS_NAME);
            for(let element of this.cardsArrayDOM) {
                element.addEventListener('click',
					(event) => {this._handlerCardClick(event);});
            }
            this.refreshButton.addEventListener("click",
				(event) => {this._handlerRefreshClick(event);});
        }

        _handlerRefreshClick(event) {
			this.shuffleCards();
			this.setupCards();
        }

        _handlerCardClick(event) {
	        let card = event.target.closest('.card');
            let cardDataId = +card.attributes.getNamedItem(window.CARD_DATA_ID_CLASS_NAME).value;
	        const isPicked = card.classList.contains(window.CARD_PICKED_CLASS_NAME)
	        const isMatched = card.classList.contains(window.CARD_MATCHED_CLASS_NAME)
	        if(isPicked || isMatched || this.gameIsPaused) {
	            return null
	        }

	        card.classList.add(window.CARD_PICKED_CLASS_NAME);
	        let choseCards = document.getElementsByClassName(window.CARD_PICKED_CLASS_NAME);
	        if(!this.cardIdGuess) {
	            this.cardIdGuess = cardDataId;
            } else if(this.cardIdGuess === cardDataId) {
				this._addClassName(choseCards, window.CARD_MATCHED_CLASS_NAME)
				this.gameIsPaused = true;
				setTimeout(() => {
	            	this._removeClassName(choseCards, window.CARD_PICKED_CLASS_NAME);
	                this.gameIsPaused = false;
                }, 600);
	            this.cardIdGuess = null;
            } else {
	            this.cardIdGuess = null;
	            this.gameIsPaused = true;
	            setTimeout(() => {
	            	this._removeClassName(choseCards, window.CARD_PICKED_CLASS_NAME);
	                this.gameIsPaused = false;
                }, 600);
            }
	        let matchedCards = document.getElementsByClassName(window.CARD_MATCHED_CLASS_NAME);
	        if(matchedCards.length === this.cardsArray.length) {
	            this.win();
            }
        }

        _removeClassName(collection, className) {
  			collection[0].classList.remove(className);
  			if (collection[0]) {
  				this._removeClassName(collection, className);
			}
		}

		_addClassName(collection, className) {
  			for(let element of collection) {
  				element.classList.add(className);
			}
		}

        win() {
	        this.gameIsPaused = true;
	        setTimeout(() => {
	            this._showModal();
            }, 4000)
        }

        _showModal() {
			console.log("Modal message!");
			this.shuffleCards();
			this.setupCards();
        }

        _buildHTML() {
	    	this.html = "";
	        this.cardsArray.map((element) => {
	            let attributes = `${window.CARD_DATA_ID_CLASS_NAME}=${element.id}`;
	            let classes = `${window.CARD_CLASS_NAME} ${window.CARD_STYLE_CLASS_NAMES}`;
	            this.html += `<div class="${classes}" ${attributes}>
                <div class="front"><img src="${element.img_src}"/></div>
                <div class="back"><img src="${window.CARD_BACKGROUND_IMG_SOURCE}"/></div>
                </div>`
            })
        }
	}

	const cards = [
		{
			name: "Toyota",
			img_src: "https://www.carlogos.org/car-logos/toyota-logo.png",
			id: 1,
		},
		{
			name: "Volkswagen",
			img_src: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
			id: 2
		},
		{
			name: "Daimler",
			img_src: "https://www.carlogos.org/car-logos/daimler-logo.png",
			id: 3
		},
		{
			name: "Ford Motor",
			img_src: "https://www.carlogos.org/car-logos/ford-logo.png",
			id: 4
		},
		{
			name: "Honda",
			img_src: "https://www.carlogos.org/car-logos/honda-logo.png",
			id: 5
		},
		{
			name: "Acura",
			img_src: "https://www.carlogos.org/car-logos/acura-logo.png",
			id: 6
		},
		{
			name: "Nissan",
			img_src: "https://www.carlogos.org/car-logos/nissan-logo.png",
			id: 7
		},
		{
			name: "Mitsubishi",
			img_src: "https://www.carlogos.org/car-logos/mitsubishi-logo.png",
			id: 8
		}
	];

	let game = new Memory(cards);
	game.shuffleCards();
	game.setupCards();

})();