import {React, useState} from 'react';
import Request from '../helpers/Request';
import AddPoints from './AddPoints';

const AddPlayersToGame = ({allPlayers, currentGame, incrementStateCounter, currentSeason}) => {

    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [gameIsReady, setGameIsReady] = useState(null)

    const handleAddPlayerToGame = (playerToAdd) => {
        if (!selectedPlayers.some(player => player.id === playerToAdd.id) && selectedPlayers.length < 6){   //to prevent adding the same player twice
            setSelectedPlayers([...selectedPlayers, playerToAdd])}};                                        //max 6 players - the game rules

    const handleRemovePlayerFromGame = (playerToRemove) => {
        const newSelectedPlayers = selectedPlayers.filter(function(playerinSelectedPlayers){
            return playerToRemove.id !== playerinSelectedPlayers.id
        })
        setSelectedPlayers(newSelectedPlayers)};

    let handleUpdateGame = () => {
        const request = new Request();
        currentGame.players = selectedPlayers;

        for (let selectedPlayer of selectedPlayers) {
            if (!currentSeason.players.some(playerInCurrentSeason => playerInCurrentSeason.id === selectedPlayer.id)){
                currentSeason.players.push(selectedPlayer)}
        }

        request.put(`https://still-scrubland-50936.herokuapp.com/api/games/${currentGame.id}`, currentGame);
        request.put(`https://still-scrubland-50936.herokuapp.com/api/seasons/${currentSeason.id}`, currentSeason)
        .then(() => incrementStateCounter())
        .then(() => setGameIsReady(1))

    }

    const selectedPlayersNodes = selectedPlayers.map((player) => {
        return(<li key={player.id}><button onClick={() => handleRemovePlayerFromGame(player)} >- {player.name} </button></li>)});
    
    const allPlayersNodes = allPlayers.map((player) => {
        return(<li key={player.id}> <button onClick={() => handleAddPlayerToGame(player)}> + {player.name} </button></li>)});
    
    if (gameIsReady === null) {
        return(
            <>
                <h4>add player to the game</h4>
                <ul>
                    {allPlayersNodes}
                </ul>
    
                <h4>players added</h4>
                <ul>
                    {selectedPlayersNodes}
                </ul>
    
                {(selectedPlayers.length < 4) ? <button> not ready </button> : <button onClick={handleUpdateGame}> ready </button>}
            </>
        )
    } else {
        return(
            <AddPoints
            incrementStateCounter={incrementStateCounter}
            currentGame={currentGame}
            />
        )
    }
}

export default AddPlayersToGame;