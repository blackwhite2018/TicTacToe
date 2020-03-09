'use strict';

function TicTacToe() {
	const self = this;

	// инициализация игры
	self.init = () => {
		self._wins = [ // выигрышные комбинации
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		self._text = document.querySelector('.win-text'); // текст модального окна
		self._modal = document.getElementById('modal');   // модальное окно
		self._setMove = true;                             // кто ходит
		self._movesCount = 0;                             // текущий номер хода
		self._isVictory = false;                          // если true - победа
		self._cells = document.querySelectorAll('.cell'); // псевдомассив клеток
		self._cells.forEach(cell => cell.addEventListener('click', event => {
			self._handleMove(event);
		}));
		document.querySelector('.game-restart').addEventListener('click', self._handleReset);
		document.querySelector('.reset').addEventListener('click', self._removeModal);
	}
		  
	// переход хода
	self._handleMove = function (event) {
		if (event.target.textContent == '') {
		    event.target.textContent = self._setMove ? 'X' : '0';
		    self._movesCount++;
		    self._setMove = !self._setMove;
		    self._handleWin();
		}
	}

	// проверка победы
	self._handleWin = function () {
		self._wins.forEach(win => {
		    if (self._cells[win[0]].textContent == 'X' && self._cells[win[1]].textContent == 'X' && self._cells[win[2]].textContent == 'X') {
		        self._isVictory = true;
		        self._text.textContent = '🍾 Победили Х! 🍾';
		        self._declareWinner();
		    }
		    if (self._cells[win[0]].textContent == '0' && self._cells[win[1]].textContent == '0' && self._cells[win[2]].textContent == '0') {
		        self._isVictory = true;
		        self._text.textContent = '🍾 Победили 0! 🍾';
		        self._declareWinner();
		    }
		});
		self._handleDraw();
	}

	// сброс игры
	self._handleReset = function () {
		self._cells.forEach(cell => cell.textContent = '');
		self._movesCount = 0;
		self._isVictory = false;
	}

	// проверка на ничью
	self._handleDraw = function () {
		if (!self._isVictory && self._movesCount == 9) {
			self._text.textContent = '🍾 Ничья! 🍾';
			self._declareWinner();
		}
	}

	// показывает модальное окно
	self._declareWinner = function () {
		self._modal.classList.remove('hidden');
	}

	// скрывает модальное окно, запускает обнуление игры
	self._removeModal = function () {
		self._modal.classList.add('hidden');
		self._handleReset();
	}
}

const game = new TicTacToe;
game.init();