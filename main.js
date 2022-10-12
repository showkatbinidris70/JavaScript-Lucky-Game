(() => {
    const formElm = document.querySelector("form");
    const inputElm = document.querySelector("#luck-input");
    const winScoreElm = document.querySelector(".lucky-number span");
    const winPlayerElm = document.querySelector(".winner");
    const p1BtnElm = document.querySelector(".p1Btn");
    const p2BtnElm = document.querySelector(".p2Btn");
    const p1ScoreElm = document.querySelector(".p1");
    const p2ScoreElm = document.querySelector(".p2");
    const resetBtnElm = document.querySelector("#resetBtn");

    let p1score;
    let p2score;
    let p1Turn;
    let p2Turn;
    let winScore;
    let isGameOver;

    function setRandomPlayer() {
        const playerArr = ['p1Turn', 'p2Turn'];
        const num = Math.floor(Math.random() * playerArr.length);
        return playerArr[num];
    }

    function setInitialValues() {
        p1score = 0;
        p2score = 0;
        if (setRandomPlayer() == 'p1Turn') {
            p1Turn = true
        } else {
            p2Turn = true
        }
        // p1Turn = true;
        // p2Turn = false;

        winScore = Math.floor(Math.random() * 10) + 1;
        isGameOver = false;
    }
    setInitialValues();

    function setInitialDOM() {
        winScoreElm.textContent = winScore;
        p1ScoreElm.textContent = p1score;
        p2ScoreElm.textContent = p2score;
        if (! p1Turn) {
            p1BtnElm.setAttribute("disabled", "disableed");
        }
        if (! p2Turn) {
            p2BtnElm.setAttribute("disabled", "disableed");
        }
    }

    setInitialDOM();

    function validationInput(inputVal) {
        let isInValid = false;
        // check isNumber?
        // NaN !== NaN result frue if the value is not real number
        if (! inputVal || inputVal !== inputVal) {
            alert("Please enter a number");
            isInValid = true;
        }
        return isInValid;
    }
    function resetInput() { // reset value empty
        inputElm.value = "";
    }

    formElm.addEventListener("submit", (event) => { // page reload prevent
        event.preventDefault();
        // get value from input field as a number
        let inputVal = Number(inputElm.value);

        const isNotValid = validationInput(inputVal);
        if (isNotValid) 
            return;
        


        // if(inputVal !== inputVal){
        //     alert("Please enter a number");
        //     return;
        // }

        // check isNumber?

        // if (!inputVal.replace(/\D/g, "")) {
        //     alert("Please enter a valid number");
        //     return;
        // }

        // reset value
        resetInput();

        // setting data on memory
        winScore = inputVal;

        // set winning score in dom
        winScoreElm.textContent = inputVal;

        // console.log(inputVal);
    });

    function setDisablePlayerBtnOnWin() {
        p1BtnElm.setAttribute("disabled", "disabled");
        p2BtnElm.setAttribute("disabled", "disabled");
    }

    p1BtnElm.addEventListener("click", (event) => {
        if (p1Turn) { // memory data update
            p1score++;
            // DOM data update
            p1ScoreElm.textContent = p1score;
        }

        // setting p1 trun false
        p1Turn = false;
        p1BtnElm.setAttribute("disabled", "disabled");
        // switch to p2 turn
        p2Turn = true;
        p2BtnElm.removeAttribute("disabled");

        // checking winning state
        if (p1score === winScore) {
            isGameOver = true;
            p2BtnElm.setAttribute("disabled", "disabled");

            setDisablePlayerBtnOnWin();
            // p1 is winner
            winPlayerElm.textContent = "Player 1 is winner";
        }
        // console.log(p1score);
    });

    p2BtnElm.addEventListener("click", (event) => {
        if (p2Turn) { // memory data update
            p2score++;
            // DOM data update
            p2ScoreElm.textContent = p2score;
        }

        // setting p2 trun false
        p2Turn = false;
        p2BtnElm.setAttribute("disabled", "disabled");
        // switch to p1 turn
        p1Turn = true;
        p1BtnElm.removeAttribute("disabled");

        // checking winning state
        if (p2score === winScore) {
            isGameOver = true;
            setDisablePlayerBtnOnWin();
            // p2 is winner
            winPlayerElm.textContent = "Player 2 is winner";
        }

        // console.log(p2score);
    });

    resetBtnElm.addEventListener("click", () => {
        setInitialValues();
        setInitialDOM();
    });
})();
