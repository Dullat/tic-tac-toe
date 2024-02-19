let GameBoard = (function () {
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    let render = () => {
        let boardContainer = document.querySelector('.board');
        gameBoard.forEach((element, index) => {
            let boardHtml = document.createElement('div');
            boardHtml.classList.add('box');
            boardHtml.setAttribute('id', `box-number-${index}`);
            boardHtml.textContent = "";
            boardContainer.appendChild(boardHtml);
        });
    };

    function drawMarks(box, mark) {
        box.textContent = mark;
        if (mark === "X") {
            box.style.background = 'aqua';
        } else box.style.background = 'red';
    };

    function afterWin(array) {
        document.querySelectorAll('.box').forEach(e => {
            e.setAttribute('hide', '');
        })
        array.forEach((e, i) => {
            document.querySelector(`#box-number-${e}`).removeAttribute('hide');
        });
    }

    let clear = () => {
        let board = document.querySelector('.board');
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        render();
    }

    return { render, drawMarks, afterWin, clear };
})();

GameBoard.render();

let regester = (function () {
    let plr1 = [];
    let plr2 = [];
    let currentUser = "plr1";

    function checkWinner(plr, who) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningCombos.forEach((combo) => {
            let [a, b, c] = combo;
            if (plr.includes(a) && plr.includes(b) && plr.includes(c)) {
                GameBoard.afterWin([a, b, c]);
                console.log(a, b, c);
            }
        })
    }

    function switchUser(box, index) {
        if (currentUser === "plr1") {
            GameBoard.drawMarks(box, "X");
            plr1.push(index);
            checkWinner(plr1, "plr1");
            currentUser = "plr2";
        } else if (currentUser === "plr2") {
            GameBoard.drawMarks(box, "O");
            plr2.push(index);
            checkWinner(plr2, "plr2");
            currentUser = "plr1"
        }
    }

    let getBoxes = () => {
        document.querySelectorAll('.box').forEach((element, index) => {
            element.addEventListener('click', () => {
                if (!element.hasAttribute('clicked')) {
                    switchUser(element, index);
                }
                element.setAttribute('clicked', '');
            });
        });
    };

    let clear = () => {
        plr1 = [];
        plr2 = [];
        currentUser = "plr1";
    }

    return { getBoxes, clear };
})();




// start and clear

(function () {
    let btn = document.querySelector('#start');
    btn.addEventListener('click', () => {
        regester.getBoxes();
        if (btn.textContent === 'Clear') {
            GameBoard.clear();
            regester.clear();
            btn.textContent = 'Start';
        } else
            btn.textContent = 'Clear';
    })
})();
