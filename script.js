let GameBoard = (function () {
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    function drawMarks(box, mark) {
        box.textContent = mark;
        console.log(box);
        if(mark === "X"){
            box.style.background = 'aqua';
        }
    }

    let render = () => {
        let boardContainer = document.querySelector('.board');
        gameBoard.forEach((element, index) => {
            let boardHtml = document.createElement('div');
            boardHtml.classList.add('box');
            boardHtml.setAttribute('id', `box-number-${index}`);
            boardHtml.textContent = "";
            boardContainer.appendChild(boardHtml);
            console.log("h");
        });
    };

    return { render, drawMarks };
})();

GameBoard.render();

let regester = (function () {
    let you = [];
    let friend = [];
    let currentUser = "you";

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
            let [a,b,c] = combo;
            console.log([a,b,c]);
            if(plr.includes(a) && plr.includes(b) && plr.includes(c)){
                alert(`${who} won`)
            }
        })
    }

    function switchUser(box, index) {
        console.log(currentUser);
        if (currentUser === "you") {
            GameBoard.drawMarks(box, "X");
            you.push(index);
            checkWinner(you, "you");
            currentUser = "friend";
        } else if (currentUser === "friend") {
            GameBoard.drawMarks(box, "O");
            friend.push(index);
            checkWinner(friend, "friend");
            currentUser = "you"
        }

        console.log({ ur: you, frnd: friend });
    }

    let getBoxes = () => {
        document.querySelectorAll('.box').forEach((element, index) => {
            element.addEventListener('click', () => {
                element.style.background = 'red';
                if (!element.hasAttribute('clicked')) {
                    switchUser(element, index);
                }
                element.setAttribute('clicked', '');
            });
        });
    };

    return { getBoxes };
})();

regester.getBoxes();
