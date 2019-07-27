import React from "react";

class Tile extends React.Component {
  tileClick = () => {
    this.props.dropCircle(this.props.col);
  };

  render() {
    let colorClasses = "tile";
    const board = this.props.board;
    const row = this.props.row;
    const column = this.props.col;

    if (board[column][row] !== undefined) {
      if (board[column][row] === "Red") {
        colorClasses += " red";
      } else {
        colorClasses += " black";
      }
    }

    return <div className={colorClasses} onClick={this.tileClick} />;
  }
}

export default Tile;
