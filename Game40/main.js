const { combineReducers, createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;

// Initial State
const initialState = {
  availableCells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  xCells: [],
  oCells: [],
  activePlayer: 'x',
  winner: null,
  catsGame: false,
  cpu: null };


/********************* REDUCER *****************************/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLAIM_CELL':
      let cellToAdd = action.payload.cellId;

      // 1--- pop cellToAdd from availableCells
      let currAvailableCells = [...state.availableCells];
      let availableCellIndex = currAvailableCells.indexOf(cellToAdd);
      let nextPlayer = '';

      if (availableCellIndex > -1) {
        currAvailableCells.splice(availableCellIndex, 1);
        state.activePlayer === 'x' ? nextPlayer = 'o' : nextPlayer = 'x';
      } else {
        // TODO: popup message "duplicate, try again"
        console.log('duplicate cell try again');
        return state;
      }

      let newAvailableCells = [...currAvailableCells];

      // 3. Append new cell to xCells or oCells
      if (state.activePlayer === "x") {
        return {
          ...state,
          availableCells: newAvailableCells,
          xCells: [...state.xCells, cellToAdd],
          activePlayer: nextPlayer };

      }

      return {
        ...state,
        availableCells: newAvailableCells,
        oCells: [...state.oCells, cellToAdd],
        activePlayer: nextPlayer };


    case 'CHECK_WINNER':
      const winCheck = winArr => {
        let player = state.activePlayer;
        let playerCellsSorted = state[player + 'Cells'].sort();
        for (var i = 0; i < winArr.length; i++) {if (window.CP.shouldStopExecution(0)) break;
          if (playerCellsSorted.indexOf(winArr[i]) === -1)
          return false;
        }window.CP.exitedLoop(0);
        return true;
      };

      if (winCheck([1, 2, 3]) || winCheck([4, 5, 6]) || winCheck([7, 8, 9]) ||
      winCheck([1, 4, 7]) || winCheck([2, 5, 8]) || winCheck([3, 6, 9]) ||
      winCheck([1, 5, 9]) || winCheck([3, 5, 7])) {
        return { ...state, winner: state.activePlayer };
      }
      return state;

    case 'CHECK_CATSGAME':
      if (!state.winner) {
        return { ...state, catsGame: true };
      }
      return state;

    case 'RESET_GAME':
      return {
        ...state,
        availableCells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        xCells: [],
        oCells: [],
        activePlayer: 'x',
        winner: null,
        catsGame: false,
        cpu: null };


    case 'CHOOSE_CHAR':
      let char = action.payload.char;
      let cpu;
      char === 'x' ? cpu = 'o' : cpu = 'x';
      return { ...state, cpu };

    default:
      return state;}

};


/************************* Store ***************************/

const store = createStore(reducer, applyMiddleware(thunk));

/************************ Actions **************************/

const chooseChar = char => {
  return {
    type: 'CHOOSE_CHAR',
    payload: {
      char } };


};

const claimCell = cellId => {
  return {
    type: 'CLAIM_CELL',
    payload: {
      cellId } };


};

const checkWinner = () => ({ type: 'CHECK_WINNER' });

const checkCatsGame = () => ({ type: 'CHECK_CATSGAME' });

const toggleActivePlayer = () => ({ type: 'TOGGLE_PLAYER' });

const resetGame = () => ({ type: 'RESET_GAME' });


/******************** (thunk) Action Creators ************************/

// if player chooses O, CPU (X) will choose random cell for first move
const chooseCharFirstMove = char => {
  return (dispatch, getState) => {
    dispatch(chooseChar(char));
    let { cpu, activePlayer, claimedCells } = getState();
    if (cpu === activePlayer) {
      let randomIndex = Math.floor(Math.random() * 9);
      let randomUnclaimed = [1, 2, 3, 4, 5, 6, 7, 8, 9][randomIndex];
      dispatch(claimCellIfAvailable(randomUnclaimed));
    }
  };
};

const claimCellIfAvailable = cellId => {
  return (dispatch, getState) => {
    // 1. claim cell
    dispatch(claimCell(cellId));

    {
      // 2-a check winner 
      let { xCells, oCells } = getState();
      if ([...xCells, ...oCells].length >= 5) {
        dispatch(checkWinner());
      }
    }

    {// 2-b check cat's game
      let { availableCells } = getState();
      if (availableCells.length === 0) {
        dispatch(checkCatsGame());
      }
    }

    // 3. if cpu turn, dispatch cpuTurn
    let { cpu, activePlayer, availableCells } = getState();
    if (cpu === activePlayer && availableCells.length !== 0) {
      dispatch(cpuTurn(availableCells));
    }
  };
};

const cpuTurn = availableCells => {
  return dispatch => {
    // CPU turn logic: if cpu's turn, choose a random unclaimed cell, recurse 
    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let randomAvailable = availableCells[randomIndex];
    dispatch(claimCellIfAvailable(randomAvailable));
  };
};



/********** Presentational Components ************/
// (x,y) for center of each cell
const centerCell = [
[100, 100], [300, 100], [500, 100],
[100, 300], [300, 300], [500, 300],
[100, 500], [300, 500], [500, 500]];


const GameBoard = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "game-board" }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 600 600" }, /*#__PURE__*/
    React.createElement("g", { className: "lines" }, /*#__PURE__*/
    React.createElement(DividerLine, { x: 200, y: 0, length: 600, horizontal: false }), /*#__PURE__*/
    React.createElement(DividerLine, { x: 400, y: 0, length: 600, horizontal: false }), /*#__PURE__*/
    React.createElement(DividerLine, { x: 0, y: 200, length: 600, horizontal: true }), /*#__PURE__*/
    React.createElement(DividerLine, { x: 0, y: 400, length: 600, horizontal: true })), /*#__PURE__*/

    React.createElement(Shapes, null), /*#__PURE__*/
    React.createElement(Cells, null), /*#__PURE__*/
    React.createElement(CharSelectModalContainer, null), /*#__PURE__*/
    React.createElement(WinModalContainer, null), /*#__PURE__*/
    React.createElement(CatsGameModalContainer, null))));



};


const DividerLine = ({ x, y, length, horizontal }) => {
  let coords = { x1: x, y1: y };
  if (horizontal) {
    coords.x2 = coords.x1 + length;
    coords.y2 = coords.y1;
  } else {
    coords.x2 = coords.x1;
    coords.y2 = coords.y1 + length;
  }
  return /*#__PURE__*/React.createElement("line", coords);
};

const OShape = props => {
  let cellId = props.id;
  return /*#__PURE__*/React.createElement("circle", {
    className: "o-shape",
    cx: centerCell[cellId - 1][0],
    cy: centerCell[cellId - 1][1] });

};

const XShape = props => {
  let cellId = props.id;
  let backslash = {
    x1: centerCell[cellId - 1][0] + 70,
    y1: centerCell[cellId - 1][1] - 70,
    x2: centerCell[cellId - 1][0] - 70,
    y2: centerCell[cellId - 1][1] + 70 };

  let fwdslash = {
    x1: centerCell[cellId - 1][0] - 70,
    y1: centerCell[cellId - 1][1] - 70,
    x2: centerCell[cellId - 1][0] + 70,
    y2: centerCell[cellId - 1][1] + 70 };

  return /*#__PURE__*/(
    React.createElement("g", { className: "x-shape" }, /*#__PURE__*/
    React.createElement("line", backslash), /*#__PURE__*/
    React.createElement("line", fwdslash)));


};

const Cell = props => /*#__PURE__*/React.createElement("rect", props);

const XButton = props => {
  return /*#__PURE__*/(
    React.createElement("g", { className: "char-select-btn x-button" }, /*#__PURE__*/
    React.createElement("rect", { className: "baseLayer", x: 190 }), /*#__PURE__*/
    React.createElement("text", { x: 215, y: 245, fontFamily: "Arial", fontSize: "40", fill: "red" }, "X"), /*#__PURE__*/
    React.createElement("rect", { className: "clickLayer", x: 190, fillOpacity: 0, onClick: props.onClick })));


};

const OButton = props => {
  return /*#__PURE__*/(
    React.createElement("g", { className: "char-select-btn o-button" }, /*#__PURE__*/
    React.createElement("rect", { className: "baseLayer", x: 330 }), /*#__PURE__*/
    React.createElement("text", { x: 355, y: 245, fontFamily: "Arial", fontSize: "40", fill: "blue" }, "O"), /*#__PURE__*/
    React.createElement("rect", { className: "clickLayer", x: 330, fillOpacity: 0, onClick: props.onClick })));


};

const WinModal = props => {
  return /*#__PURE__*/(
    React.createElement("g", { className: "win-modal modal" }, /*#__PURE__*/
    React.createElement("rect", { className: "cover", onClick: () => store.dispatch(resetGame()) }), /*#__PURE__*/
    React.createElement("rect", { className: "dialog-box",
      x: 125,
      y: 225,
      width: 355,
      height: 140 }), /*#__PURE__*/

    React.createElement("text", {
      x: 150,
      y: 320,
      fontFamily: "Arial",
      fontSize: "80",
      fill: "black" }, " ",
    props.value, " WINS! ")));


};


const CatsGameModal = props => {
  return /*#__PURE__*/(
    React.createElement("g", { className: "win-modal modal" }, /*#__PURE__*/
    React.createElement("rect", { className: "cover", onClick: () => store.dispatch(resetGame()) }), /*#__PURE__*/
    React.createElement("text", {
      x: 200,
      y: 320,
      fontFamily: "Arial",
      fontSize: "40",
      fill: "gray" }, " CAT'S GAME! ")));



};


const CharSelectModal = () => {
  return /*#__PURE__*/(
    React.createElement("g", { className: "char-modal modal" }, /*#__PURE__*/
    React.createElement("rect", { className: "cover" }), /*#__PURE__*/
    React.createElement("rect", { className: "dialog-box",
      x: 150,
      y: 120,
      width: 300,
      height: 230 }), /*#__PURE__*/

    React.createElement("text", {
      x: 162,
      y: 155,
      fontFamily: "Arial",
      fontSize: 24,
      fill: "gray" }, " SELECT YOUR SYMBOL "), /*#__PURE__*/

    React.createElement("text", {
      x: 210,
      y: 320,
      fontFamily: "Arial",
      fontSize: 24,
      fill: "gray" }, " 'X' GOES FIRST ")));



};


/*************** Container Components *************/
class Cells extends React.Component {
  render() {
    // (x,y) coords of top left corner of each rect
    let cellCoords = [
    [5, 5], [205, 5], [405, 5],
    [5, 205], [205, 205], [405, 205],
    [5, 405], [205, 405], [405, 405]];


    return /*#__PURE__*/(
      React.createElement("g", { className: "cells" },
      cellCoords.map((curr, i) => /*#__PURE__*/
      React.createElement(Cell, {
        x: curr[0],
        y: curr[1],
        id: i + 1,
        key: "cell" + i + 1,
        onClick: () => store.dispatch(claimCellIfAvailable(i + 1)) }))));




  }}


class Shapes extends React.Component {
  render() {
    let xCells = store.getState().xCells;
    let oCells = store.getState().oCells;

    return /*#__PURE__*/(
      React.createElement("g", { className: "shapes" },
      xCells.map((cellId, i) => /*#__PURE__*/React.createElement(XShape, { id: cellId, key: i })),
      oCells.map((cellId, i) => /*#__PURE__*/React.createElement(OShape, { id: cellId, key: i }))));


  }}


class WinModalContainer extends React.Component {
  render() {
    let modalVisible = store.getState().winner ? true : false;
    if (modalVisible) {
      let winner = store.getState().winner.toUpperCase();
      return /*#__PURE__*/React.createElement(WinModal, { value: winner });
    }
    return null;
  }}


class CatsGameModalContainer extends React.Component {
  render() {
    if (store.getState().catsGame) {
      return /*#__PURE__*/React.createElement(CatsGameModal, null);
    }
    return null;
  }}


class CharSelectModalContainer extends React.Component {
  render() {
    let modalVisible = !store.getState().cpu ? true : false;
    if (modalVisible) {
      return /*#__PURE__*/(
        React.createElement("g", null, /*#__PURE__*/
        React.createElement(CharSelectModal, null), /*#__PURE__*/
        React.createElement(XButton, { onClick: () => store.dispatch(chooseCharFirstMove('x')) }), /*#__PURE__*/
        React.createElement(OButton, { onClick: () => store.dispatch(chooseCharFirstMove('o')) })));


    }
    return null;
  }}



/************ Root Render Function**************/
const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(GameBoard, null),
  document.getElementById('root'));

};

render();
store.subscribe(render);