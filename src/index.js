import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
	return (
		<button 
			className={"square" + (props.winLines.includes(props.index) ? " square-win" : "")} 
			onClick={() => {props.onClick()}}>
			{props.value}
		</button>
	)
}

function calculateWineer(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],			
	];
	let wineer = null;
	let winLines = null;
	let result;


	for(let i = 0; i < lines.length; i++){//勝利判斷
		const [a, b, c] = lines[i];
		if(squares[a] && squares[b] === squares[c] && squares[a] === squares[c]) {
			wineer = squares[a]
			winLines = lines[i]
			result = 0
		}
	}
	const isTie = !squares.some((elem)=> elem == null)
	if(result!==0){
		if(isTie) 
			result = 1
		else 
			result = 2
	}
	return {
		result,//0 勝利 1 平手 2 遊戲進行中
		wineer,
		winLines
	}
}
  
class Board extends React.Component {

	renderSquare() {
		const yRows = []
		for(let i = 0; i < 3; i++) {
				const xRows = []
			for(let j = 0; j < 3; j++){
				const value = i * 3 + j;
				xRows.push(<Square
					value={this.props.squares[value]}
					index={value}
					winLines={this.props.winLines}
					onClick={() => this.props.onClick(value)}
					key={'square'+value}
				/>)
			}
			yRows.push(<div className="board-row" key={'div'+i}>
					{xRows}
				</div>)
		}
		return yRows
	}

	render() {


		return (
			<div>
				{this.renderSquare()}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				clickIndex: null
			}],
			stepNumber: 0,
			xIsNext: true,
			isHistoryForward: true,
		}
	}

  handleClick(i) {
		// const history = this.state.history;
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
    const squares = current.squares.slice();
		
		const {result, wineer, winLines} = calculateWineer(squares)
		

		
		if(result!==2 || squares[i]){
			return;
		}
    squares[i] = this.state.xIsNext ? 'X' : "O";


    this.setState({
			history: history.concat([{
				squares: squares,
				clickIndex: i
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
  }		

	jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


	changeHistoryOrder() {
		this.setState({
			isHistoryForward: !this.state.isHistoryForward
		})
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber]
		const {result, wineer, winLines} = calculateWineer(current.squares)

    const moves = history.map(({squares, clickIndex}, move) => {
			const x = clickIndex % 3
			const y = Math.floor(clickIndex / 3)
      const desc = move ?
        'Go to move #' + move  + `(${x}, ${y})`:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });		

		const orderMoves = this.state.isHistoryForward ? moves : moves.slice().reverse()

		let status;

		if(result===0){
			status = "Winner:" + wineer;
		}else if(result===1){
			status = "Tie";
		}else{
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						winLines={wineer ? winLines : []}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<button onClick={()=>{ this.changeHistoryOrder() }}>switch order</button>
					<ol>{orderMoves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
  