import React,{Component} from 'react';
import './App.css';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			closeVotingClicked: false,
			winner: "",
			mmos : [
				{name: "Final Fantasy XIV Online", votes: 0},
				{name: "World of Warcraft", votes: 0},
				{name: "The Elder Scrolls Online", votes: 0},
			]
		}

		this.closeVoting = this.closeVoting.bind(this);
	}

	vote (i) {
		let newMmmos = [...this.state.mmos];
		newMmmos[i].votes++;
		this.setState({mmos: newMmmos});
	}

	closeVoting () {
		let votingMmos = [...this.state.mmos];

		console.log(votingMmos[0].votes);
		console.log(votingMmos[1].votes);
		console.log(votingMmos[2].votes);

		console.log((votingMmos[0].votes > votingMmos[1].votes) && (votingMmos[0].votes > votingMmos[2].votes));
		console.log((votingMmos[1].votes > votingMmos[0].votes) && (votingMmos[1].votes > votingMmos[2].votes));
		console.log((votingMmos[2].votes > votingMmos[0].votes) && (votingMmos[2].votes > votingMmos[1].votes));

		if ((votingMmos[0].votes > votingMmos[1].votes) && (votingMmos[0].votes > votingMmos[2].votes)) {
			this.setState({winner: votingMmos[0].name})
		} else if ((votingMmos[1].votes > votingMmos[0].votes) && (votingMmos[1].votes > votingMmos[2].votes)) {
			this.setState({winner: votingMmos[1].name})
		} else if ((votingMmos[2].votes > votingMmos[0].votes) && (votingMmos[2].votes > votingMmos[1].votes)) {
			this.setState({winner: votingMmos[2].name})
		} else {
			this.setState({winner: "Empate entre duas ou mais opções!"})
		}

		this.setState({closeVotingClicked: true})
	}

	reloadPage () {
		window.location.reload();
	}

	render(){
		if (this.state.closeVotingClicked) {
			return(
				<>
					<h1>Resultado</h1>
					<p>Vencedor: {this.state.winner}</p>
					<br/>
					<button className="mmobutton" onClick={this.reloadPage}>Votar novamente</button>
				</>
			);
		}
		return(
			<>
				<h1>Votação melhor MMORPG de 2021!</h1>
				<div className="mmos">
				{
					this.state.mmos.map((mmo, i) =>
						<div key={i} className="mmo">
							<div className="voteCount">
								{mmo.votes}
							</div>
							<div className="mmoName">
								{mmo.name}
							</div>
						<button className="mmobutton" onClick={this.vote.bind(this, i)}>Votar</button>
						</div>
					)
				}
				<br/>
				<button className="mmobutton" onClick={this.closeVoting}>Fechar votação</button>
				</div>
			</>
		);
	}
}
export default App;