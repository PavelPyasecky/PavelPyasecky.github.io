window.CARD_CONTAINER_ID_NAME = "game";
window.CARD_CLASS_NAME = "card";
window.CARD_STYLE_CLASS_NAMES = "card_primary-style";
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
	        this.container.insertAdjacentHTML("afterbegin", this.html);
            this.cardsArrayDOM = document.getElementsByClassName(window.CARD_CLASS_NAME);
            for(let element of this.cardsArrayDOM) {
                element.addEventListener('click', this._handlerCardClick);
            }
            this.refreshButton.addEventListener("click", this._handlerRefreshClick);
        }

        _handlerRefreshClick(event) {
			this.shuffleCards();
			this.setupCards();
        }

        _handlerCardClick(event) {
	        let card = event.target;
            let cardDataId = card.attributes.getNamedItem(window.CARD_DATA_ID_CLASS_NAME);
            let choseCards = document.getElementsByClassName(window.CARD_PICKED_CLASS_NAME);
	        const isPicked = card.hasClass(window.CARD_PICKED_CLASS_NAME)
	        const isMatched = card.hasClass(window.CARD_MATCHED_CLASS_NAME)
	        if(isPicked || isMatched || this.gameIsPaused) {
	            return null
	        }

	        card.addClass(window.CARD_PICKED_CLASS_NAME);
	        if(!this.cardIdGuess) {
	            this.cardIdGuess = cardDataId;
            } else if(this.cardIdGuess == cardDataId) {
	            choseCards.map((element) => element.addClass(window.CARD_MATCHED_CLASS_NAME));
	            this.cardIdGuess = null;
            } else {
	            this.cardIdGuess = null;
	            this.gameIsPaused = true;
	            setTimeout(() => {
	                choseCards.removeClass(window.CARD_PICKED_CLASS_NAME);
	                this.gameIsPaused = false;
                }, 600)
            }
	        let matchedCards = document.getElementsByClassName(window.CARD_MATCHED_CLASS_NAME);
	        if(matchedCards.length === this.cardsArray.length) {
	            this.win();
            }
        }

        win() {
	        this.gameIsPaused = true;
	        setTimeout(() => {
	            this._showModal();
            }, 1000)
        }

        _showModal() {

        }

        _buildHTML() {
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
			name: "php",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
			id: 1,
		},
		{
			name: "css3",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
			id: 2
		},
		{
			name: "html5",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
			id: 3
		},
		{
			name: "jquery",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
			id: 4
		},
		{
			name: "javascript",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
			id: 5
		},
		{
			name: "node",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
			id: 6
		},
		{
			name: "photoshop",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
			id: 7
		},
		{
			name: "python",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
			id: 8
		},
		{
			name: "rails",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
			id: 9
		},
		{
			name: "sass",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
			id: 10
		},
		{
			name: "sublime",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
			id: 11
		},
		{
			name: "wordpress",
			img_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			id: 12
		},
	];

	let game = new Memory(cards);
	game.shuffleCards();
	game.setupCards();

})();