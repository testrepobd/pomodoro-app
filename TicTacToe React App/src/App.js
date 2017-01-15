import React from 'react'
import './App.css'

class App extends React.Component{
	
	constructor(){
		super()
		this.state = {
			board : ["","","","","","","","",""],														
			PLAYER_1 : "X",
			PLAYER_2 : "O",
			turn : "PLAYER_1",
			endInWin : false,
			endInTie : false,
			winner:[],
			winningColor:"green"
			}
		}
	//Update the game board based on clicked tile and alternate turn state
	update(click){
		let pos = click.target.getAttribute('data-position')
		if(this.state.board[pos] === "" && !this.state.endInWin){
			let curSymbol = this.state[this.state.turn]
			let newBoard = this.state.board.slice()													//copy board to avoid mutating state directly
						
			newBoard[pos] = curSymbol
			this.checkWinner(newBoard)
			this.setState({
			board:newBoard,
			turn:this.state.turn === "PLAYER_1" ? "PLAYER_2" : "PLAYER_1"
			})
		}else if(this.state.endInWin){
		}
			
	}
	//Highlight the winning tiles
	showWinner(win){
		let board = document.querySelectorAll('.cell span');
		
		win.map((position)=>{
						board[position].style.color = this.state.winningColor
						board[position].style.fontWeight = "700"
					}).then
	}

	showTie(){
		alert("Tie Game")
	}

	//Check board to see if a player has won
	checkWinner(board){
		if(board[0] === board[1] && board[1] === board[2] && board[0] !== ""){
			let win = [0,1,2]
			this.setState({
				endInWin:true,
				winner:this.state.winner.concat(win)},this.showWinner(win))								//after state is updated show the winner
		}else if(board[3] === board[4] && board[4] === board[5] && board[3] !== ""){
			let win = [3,4,5]
			this.setState({
				endInWin:true,
				winner:this.state.winner.concat(win)},this.showWinner(win))		

		}else if(board[6] === board[7] && board[7] === board[8] && board[6] !== ""){
			let win = [6,7,8]
			this.setState({
				endInWin:true,
				winner:this.state.winner.concat(win)},this.showWinner(win))		

		}else if(board[2] === board[4] && board[4] === board[6] && board[2] !== ""){
			let win = [2,4,6]
			this.setState({
				endInWin:true,
				winner:this.state.winner.concat(win)},this.showWinner(win))		

		}else if(board[0] === board[4] && board[4] === board[8] && board[0] !== ""){
			let win = [0,4,8]
			this.setState({
				endInWin:true,
				winner:this.state.winner.concat(win)},this.showWinner(win))
		}else if(board.indexOf("") === -1){
			this.setState({
				endInTie:true
			},this.showTie())
		}
	}    

	render(){
		return (
			<div className="board">
			{
				this.state.board.map((position,index)=>																		//link div to game state so markers are shown 
																																									//and updated based on user actions
						 <div data-position={index} 
									onClick={this.update.bind(this)} 
									className="cell" 
									key={index}>

										<span>{position}</span>

							</div>
				)

			}
			</div>
			)
	}
}

export default App