import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Creates a binary map of a given matrix of characters with respect to a given character.
 * @param matrix A matrix containing either of 3 values: 1 character or 0 length string/undefined/null
 * @param chr The character to be mapped with.
 * @return [[],[],[]] A binary map with respect to the given character.
 */
function binMap(matrix, chr) {
    return matrix.map(e => e.map(el => (el === chr) ? 1 : 0));
}

function rowSums(bin_matrix) {
    return bin_matrix.map(row => row.reduce((e, n) => e + n));
}

function diagSums(matrix) {
    let sums = [0, 0];
    const N = matrix.length - 1;
    for (let i = 0; i <= N; i++) {
        sums[0] += matrix[i][i];
        sums[1] += matrix[i][N - i];
    }
    return sums;
}

function rotateMatrix(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    matrix.length = 0;
    matrix.push(...result);
    return matrix;
}

function checkWin(matrix, chr) {
    let won = false;
    sumUp(binMap(matrix, chr)).map(arr => Math.max(...arr)).forEach(sum => (sum === 3) ? won = true : false);
    return won;
}

function getNextMove(finished, position) {
    let nextPos = [0, 0];
    nextPos[0] = position[2];
    nextPos[1] = position[3];
    let bin = finished.map(e => e.map(e => Object.keys(e).length !== 0)) // create binary matrix with empty object as true
    if (bin[nextPos[0]][nextPos[1]]) {  // check playability of suggested next matrix if not find next in line playable matrix in line from left->right, top->down
        let flag = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!bin[i][j]) {
                    nextPos[0] = i;
                    nextPos[1] = j;
                    flag = true;
                    break;
                }
            }
            if (flag) break;
        }
    }
    return nextPos;
}

/**
 * Creates a matrix containing row sums, col sums and both diagonal sums.
 * @param bin_matrix Binary matrix to calculate sums.
 * @return [[Number, Number, Number],[Number, Number, Number],[Number, Number]]
 */
function sumUp(bin_matrix) {
    let sums = [];
    sums.push(rowSums(bin_matrix));
    sums.push(rowSums(rotateMatrix(bin_matrix)));
    sums.push(diagSums(bin_matrix));
    return sums;
}

export default new Vuex.Store({
    state: {
        player1: {
            letter: "X",
            name: "Player X",
            score: 0,
        },
        player2: {
            letter: "O",
            name: "Player Y",
            score: 0
        },
        playing: {},  // currently active player reference
        active: [0, 0], //currently active matrix location
        matrix: [
            [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
            [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
            [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]]
        ],
        finished: [ //won matrices
            [{}, {}, {}], //contains the winning player element reference if won
            [{}, {}, {}],
            [{}, {}, {}]
        ],
        gameDone: false,
        winner: {},
        current_move: [],
        startOverlay: true,
        lastActive: [],
        gridKey: 0,
        startTime: 0
    },
    mutations: {

        /**
         * Sets a given move in the playing field.
         * @param state State object given by vuex.
         */
        setMove(state) {
            if (state.current_move.length === 4 && !state.gameDone) { //is valid move?
                if (checkWin(state.matrix[state.active[0]][state.active[1]], state.playing.letter)) {   //did player win this matrix
                    console.log("player " + state.playing.letter + " won matrix: " + state.active)
                    state.finished[state.active[0]][state.active[1]] = state.playing;   //set player object to matrix
                    if (state.playing.name === state.player1.name) {
                        state.player1.score++;  //increment score
                    } else {
                        state.player2.score++;  //increment score
                    }

                    //check if game is done
                    state.gameDone = state.finished.flat().map(e => Object.keys(e).length !== 0).reduce((e, n) => e && n);

                    if (state.gameDone) { //fill in winning player
                        state.winner = state.playing;
                        return; // stops method from executing
                    }
                }

                //if matrix is full but no one has won
                if (state.matrix[state.active[0]][state.active[1]].flat().map(e => e !== "").reduce((e, n) => e && n)) {
                    state.finished[state.active[0]][state.active[1]] = {nowinner: true};
                    state.gameDone = state.finished.flat().map(e => Object.keys(e).length !== 0).reduce((e, n) => e && n);
                }

                if (!state.gameDone) {
                    //select next active field to play in
                    state.lastActive = JSON.parse(JSON.stringify(state.current_move));
                    state.active = getNextMove(state.finished, state.current_move, state.lastActive);
                    if (state.playing === state.player1) {
                        state.playing = state.player2;
                    } else state.playing = state.player1;
                }
                state.current_move = [];
            }
        },
        /**
         * Completely resets all the field data.
         */
        resetField(state) {
            state.gridKey++;    // makes VueJS reload the sttt grid
            state.startOverlay = true;
            state.active = [0, 0];
            state.current_move = [];
            state.matrix = [
                [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
                [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]],
                [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]]
            ];
            state.finished = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ];
            state.gameDone = false;
            state.winner = {};
            state.startTime = 0;
        },
        /**
         * Temporarily sets a move in a given box.
         * @param state State object given by vuex.
         * @param location Contains the location of the box in the active grid [srow, scol, row, col]
         */
        setPosition(state, location) {
            // checks if the position set event comes from the focused block and the selected box is not taken
            if (location[0] === state.active[0] && location[1] === state.active[1]) {
                if (state.matrix[location[0]][location[1]][location[2]][location[3]] !== "" &&  //is taken
                    state.current_move.length !== 0 &&  // there is already a current move
                    location[0] === state.current_move[0] &&    //the current move is the same as desired move
                    location[1] === state.current_move[1] &&
                    location[2] === state.current_move[2] &&
                    location[3] === state.current_move[3]
                ) { //invert last move
                    state.matrix[state.active[0]][state.active[1]][location[2]][location[3]] = "";
                    state.current_move = [];
                } else if (state.current_move.length === 0 && state.matrix[location[0]][location[1]][location[2]][location[3]] === "") {
                    state.matrix[state.active[0]][state.active[1]][location[2]][location[3]] = state.playing.letter;
                    state.current_move = JSON.parse(JSON.stringify(location));
                }
            }
        },
        /**
         * Starts the game and sets the players contained within the payload accordingly.
         */
        startGame(state, payload) {
            payload.player1.score = 0;
            payload.player2.score = 0;
            state.player1 = payload.player1;
            state.player2 = payload.player2;
            state.playing = (Math.random() * 2 > 1) ? state.player2 : state.player1;  // randomly select a beginning player
            state.startTime = Date.now();
            state.startOverlay = false;
        }
    },
    actions: {},
    modules: {},
    getters: {
        /**
         * Used in the winning screen to show the winners stats.
         */
        winner: state => {
            return state.winner
        },
        /**
         * Used in the SuperPlayingField component to highlight the currently active matrix
         */
        active: state => {
            return state.active
        },
        /**
         * Used in the SuperPlayingField component to highlight the already won matrices
         */
        finishedBool: state => {
            return state.finished.map(e => e.map(e => Object.keys(e).length !== 0));
        },
        /**
         * Used to display each box state in playing field.
         */
        matrix: state => {
            return state.matrix;
        },
        /**
         * Used to display the startOverlay
         */
        startOverlay: state => {
            return state.startOverlay;
        },
        /**
         * Used in the player display table
         */
        playerTable: state => {
            return [
                state.player1, state.player2
            ]
        },
        /**
         * Used whether to display the Win Screen.
         * @return {boolean} If the game is done.
         */
        gameDone: state => {
            return state.gameDone
        },
        /**
         * Used to reset the sttt grid.
         * Capitalizes on the principle that VueJS creates a new component, if it's key changes.
         */
        gridKey: state => {
            return state.gridKey
        }
    }
})
