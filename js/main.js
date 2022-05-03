window.CARD_CONTAINER_ID_NAME = "game";
window.CARD_CLASS_NAME = "card";
window.CARD_STYLE_CLASS_NAMES = "card_primary-style";	// class for additional styling
window.CARD_PICKED_CLASS_NAME = "picked";
window.CARD_MATCHED_CLASS_NAME = "matched";
window.CARD_DATA_ID_CLASS_NAME = "data-id";
window.CARD_BACKGROUND_IMG_SOURCE = "img/memory.jpeg";
window.BUTTON_REFRESH_ID_NAME = "refresh";
window.MOVE_COUNTER_ID_NAME = "moves";


(function(){

	class Memory {

	    constructor(cards) {
			this.moves = 0;
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
			this.moves = 0;
			this.setMoves()
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
				this.moves += 1;
				this.setMoves()
            } else {
				this.moves += 1;
				this.setMoves()
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

		setMoves() {
			let moves = document.getElementById(window.MOVE_COUNTER_ID_NAME);
			moves.innerHTML = this.moves;
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
            }, 3000)
        }

        _showModal() {
			window.alert(`Your score is: ${this.moves} moves`);
			this.moves = 0;
			this.setMoves()
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
			img_src: "img/45FNDNMrzWj_kxTwAS5bl8-KkX3J6Q2CbPHnmq4WtiKO6PyOU8QD0PBveIUJkY3wm9344ftVxxxDVN1Rb_Mm5alS.jpg",
			id: 1,
		},
		{
			name: "Volkswagen",
			img_src: "img/dDiTGqXyCsM.jpg",
			id: 2
		},
		{
			name: "Daimler",
			img_src: "img/e7DuaIuuxrc.jpg",
			id: 3
		},
		{
			name: "Ford Motor",
			img_src: "img/EXIRCv-kI9s.jpg",
			id: 4
		},
		{
			name: "Honda",
			img_src: "img/IjdYtf4VnPs.jpg",
			id: 5
		},
		{
			name: "Acura",
			img_src: "img/jIb6StR7-WLg-ApBrNkAZaYwSX0KGtZZrJikvJnpXl0JiKCXtscyux_DDLB9oAJ7HDt0spUiuo4MRqDqgPCOBesF.jpg",
			id: 6
		},
		{
			name: "Nissan",
			img_src: "img/Np8mcEafPkQ.jpg",
			id: 7
		},
		{
			name: "Mitsubishi",
			img_src: "img/q2K7gxKiaLAZ_puP_ZcnIkNr-I30tpkDhsJgTFz5K21P84QqQoo9cWMA2DNQxnPwUBD76iXC1e82fl3VpHXFVdFB.jpg",
			id: 8
		}
	];

	let game = new Memory(cards);
	game.shuffleCards();
	game.setupCards();

})();