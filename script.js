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
            console.log("h");
        });
    };

    return { render };
})();

GameBoard.render();

let regester = (function () {
    let currentUser = "you";
    function switchUser(value) {
        console.log(currentUser);
        if(currentUser === "you"){
            currentUser = "friend";
        }else if(currentUser === "friend"){
            currentUser = "you"
        }
    }

    let getBoxes = () => {
        document.querySelectorAll('.box').forEach((element, index) => {
            element.addEventListener('click', () => {
                element.style.background = 'red';
                if (!element.hasAttribute('clicked')) {
                    switchUser(element);
                }
                element.setAttribute('clicked', '');
            });
        });
    };

    return { getBoxes };
})();

regester.getBoxes();
