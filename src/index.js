import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
	console.log("props", props.winLines.includes(props.value) ? "square-win" : "")
	console.log(props.winLines, props.value, props.winLines.includes(props.value))
	return (
		<button 
			className={"square" + (props.winLines.includes(props.value) ? "square-win" : "")} 
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
	console.log("calculateWineer", squares,)

	for(let i = 0; i < lines.length; i++){
		const [a, b, c] = lines[i];
		console.log("equal", a,b,c)
		if(squares[a] && squares[b] === squares[c] && squares[a] === squares[c]) {
			return {
				wineer: squares[a],
				winLines: lines[i]
			}
		}
	}
	return null
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
			winLines:[],
		}
	}

  handleClick(i) {
		// const history = this.state.history;
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
    const squares = current.squares.slice();
		
		const result = calculateWineer(squares)
		console.log("resuk", result, this.state.winLines.length)
		
		if(result && this.state.winLines.length === 0){
			console.log("thththth")
			this.changeWinLines(result.winLines)
		}				
		
		if(result || squares[i]){
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
		console.log("history", squares)
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

	changeWinLines(lines){
		console.log("lines", lines)
		
		this.setState({
			winLines: lines
		})
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber]
		const result = calculateWineer(current.squares)
		console.log("result", result)

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

		if(result){
			status = "Winner:" + result.wineer;
		}else{
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						winLines={this.state.winLines}
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
  