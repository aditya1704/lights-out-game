import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps={
    nrows:5,
    ncols:5,
    chanceLightStartsOn:0.25
  };
  constructor(props) {
    super(props);
    this.state={
       hasWon:false,
       board:this.createBoard(),
       playing:false
    }
  
  }


  handlePlaying =()=>{
    this.setState({
      playing:!this.state.playing
    })
  }

  handleHasWon =()=>{
    this.setState({
      hasWon:!this.state.hasWon,
      board:this.createBoard()
    })
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0;x<this.props.ncols;x++){
        row.push(Math.random()<this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);  //Initial cell
    flipCell(y,x-1);//left cell
    flipCell(y,x+1) //right cell
    flipCell(y-1,x) //above cell
    flipCell(y+1,x) //below cell
    // TODO: flip this cell and the cells around it
    
    let hasWon=board.every(row=>row.every(cell=>!cell));// every cell in every row in board is false
    this.setState({board, hasWon});
  }



  render() {
    
    let tblboard=[];
    for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0;x<this.props.ncols;x++){
        let coord=`${y}-${x}`
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={()=>this.flipCellsAround(coord)}/>)
       }
    tblboard.push(<tr key={y}>{row}</tr>);
    }


    //how to play page when user enter game

    if(!this.state.playing){
      return(
        <>
          <div className='board-title'>  
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          <div className='rules'>
            <h1>How to Play..</h1>
            <div className='rules-text'>
              <h4>The game consists of a 5 by 5 grid of lights.</h4>
              <h4>When the game starts, a random number or a stored pattern of these lights is switched on.</h4>
              <h4>Pressing any of the lights will toggle it and the adjacent lights.</h4>
              <h4>The goal of the puzzle is to switch all the lights off, preferably in as few button presses as possible.</h4>
            </div>
            <div className='rules-btn'>
              <button className='start-btn-neon-blue' style={{lineHeight:'50px',justifyContent:'center'}} onClick={this.handlePlaying}>Start Game</button>
            </div>
          </div>
        </>
      )
    }


    //when user starts playing

    if(this.state.playing&&!this.state.hasWon){
    return(
    <>
      <div className='board-title'>  
        <div className='neon-orange'>Lights</div>
        <div className='neon-blue'>Out</div>
      </div>
      <table className='Board'>
        <tbody>
          {tblboard}
        </tbody>
      </table>
    </>
    )
    }
  
    // if the game is won, just show a winning msg & render nothing else

    if(this.state.hasWon){
      return (
        <>
        <div className='board-title'>
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!!</span>
          </div>
        </div>
        <div>
            <button className='play-again-btn' onClick={this.handleHasWon}>Play Again</button>
          </div>
        </>
      )
    }
    

  }
}


export default Board;
