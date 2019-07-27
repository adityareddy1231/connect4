import React from "react";
import Tile from "./Tile";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPlayer: "Red",
      board: [[], [], [], [], [], [], []],
      message: "New game has been started! Red's turn.",
      totalCircles: 0,
      winner: " "
    };
  }

  //initializing play board
  createBoard = () => {
    const tiles = [];
    for (let row = 5; row >= 0; row--) {
      const rows = [];
      for (let col = 0; col <= 6; col++) {
        rows.push(
          <Tile
            key={col}
            row={row}
            col={col}
            dropCircle={this.dropCircle}
            board={this.state.board}
          />
        );
      }
      tiles.push(
        <div key={row} className="row">
          {rows}
        </div>
      );
    }
    return tiles;
  };

  //Checking horizontal victory
  checkRows = board => {
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 4; i++) {
        if (
          board[i][j] !== undefined &&
          board[i + 1][j] !== undefined &&
          board[i + 2][j] !== undefined &&
          board[i + 3][j] !== undefined
        ) {
          if (
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i + 2][j] &&
            board[i][j] === board[i + 3][j]
          ) {
            const winner = board[i][j];
            this.setState({ winner: winner });
            return true;
          }
        }
      }
    }
    return false;
  };

  //Checking vertical victory
  checkColumns = board => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          board[i][j] !== undefined &&
          board[i][j + 1] !== undefined &&
          board[i][j + 2] !== undefined &&
          board[i][j + 3] !== undefined
        ) {
          if (
            board[i][j] === board[i][j + 1] &&
            board[i][j] === board[i][j + 2] &&
            board[i][j] === board[i][j + 3]
          ) {
            const winner = board[i][j];
            this.setState({ winner: winner });
            return true;
          }
        }
      }
    }
    return false;
  };

  //Checking diagonal victory
  checkDiagonalLeftToRight = board => {
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 4; i++) {
        if (
          board[i][j] !== undefined &&
          board[i + 1][j + 1] !== undefined &&
          board[i + 2][j + 2] !== undefined &&
          board[i + 3][j + 3] !== undefined
        ) {
          if (
            board[i][j] === board[i + 1][j + 1] &&
            board[i][j] === board[i + 2][j + 2] &&
            board[i][j] === board[i + 3][j + 3]
          ) {
            const winner = board[i][j];
            this.setState({ winner: winner });
            return true;
          }
        }
      }
    }
    return false;
  };

  //Checking anti-diagonal victory
  checkDiagonalRightToLeft = board => {
    for (let i = 6; i >= 3; i--) {
      for (let j = 0; j < 3; j++) {
        if (
          board[i][j] !== undefined &&
          board[i - 1][j + 1] !== undefined &&
          board[i - 2][j + 2] !== undefined &&
          board[i - 3][j + 3] !== undefined
        ) {
          if (
            board[i][j] === board[i - 1][j + 1] &&
            board[i][j] === board[i - 2][j + 2] &&
            board[i][j] === board[i - 3][j + 3]
          ) {
            const winner = board[i][j];
            this.setState({ winner: winner });
            return true;
          }
        }
      }
    }
    return false;
  };

  //Checking for winner and setting message
  checkWinner = currentPlayer => {
    if (
      this.checkRows(this.state.board) === true ||
      this.checkColumns(this.state.board) === true ||
      this.checkDiagonalLeftToRight(this.state.board) === true ||
      this.checkDiagonalRightToLeft(this.state.board) === true
    ) {
      if (currentPlayer === "Red") {
        this.setState({
          message: "Game Over! Black wins!"
        });
      } else {
        this.setState({
          message: "Game Over! Red wins!"
        });
      }
      return true;
    }
    return false;
  };

  //Simulating dropping of play piece
  dropCircle = column => {
    let state = { ...this.state };

    //Game still in progress
    if (this.checkWinner() !== true) {
      //Checking if column is full - Adding dropped values - Increasing Circle Count
      if (state.board[column].length < 6) {
        const newColumn = state.board[column].concat(state.currentPlayer);
        state.board[column] = newColumn;
        state.totalCircles++;

        let message = "";

        //Checking for draw game
        if (state.totalCircles === 42) {
          message = "Draw game! Please start a new one.";
        } else {
          message = "Game in progress! " + state.currentPlayer + "'s turn.";
        }

        //Changing current player
        state.currentPlayer = state.currentPlayer === "Red" ? "Black" : "Red";

        //Setting new state
        this.setState({
          board: state.board,
          currentPlayer: state.currentPlayer,
          totalCircles: state.totalCircles,
          message: message
        });

        //Checking for winner after previous move
        this.checkWinner(state.currentPlayer);
      } else {
        //Column is already full
        let message = ";";
        if (state.totalCircles === 42) {
          message = "Draw game! Please start a new one.";
        } else {
          message =
            "Game in progress! " +
            state.currentPlayer +
            "'s turn. That column is full. Please drop into another column!";
        }
        this.setState({ message: message });
      }
    } else {
      //Game Over with Victory
      this.setState({
        message: "Game is over! " + this.state.winner + " wins! Please restart."
      });
    }
  };

  //Restart button
  buttonClick = () => {
    const state = {
      currentPlayer: "Red",
      board: [[], [], [], [], [], [], []],
      message: "New game has been started! Red's turn.",
      totalCircles: 0
    };

    this.setState({
      board: state.board,
      currentPlayer: state.currentPlayer,
      totalCircles: state.totalCircles,
      message: state.message
    });
  };

  render() {
    return (
      <div className="App">
        <p className="header">Connect 4 Game</p>
        <p className="message">{this.state.message}</p>
        <div className="board">{this.createBoard()}</div>
        <p>
          <button className="button" onClick={this.buttonClick}>
            Restart the game!
          </button>
        </p>
      </div>
    );
  }
}

export default App;
