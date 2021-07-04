import {React, useState} from 'react';
import Request from '../helpers/Request';

const AddPlayersToGame = ({allPlayers, currentGame, incrementStateCounter, currentSeason}) => {

    const [selectedPlayers, setSelectedPlayers] = useState([]);

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
        request.put(`https://still-scrubland-50936.herokuapp.com/api/games/${currentGame.id}`, currentGame);

        for (let selectedPlayer of selectedPlayers) {
            if (!currentSeason.players.some(playerInCurrentSeason => playerInCurrentSeason.id ===  selectedPlayer.id)){
                currentSeason.players.push(selectedPlayer)}
        }
        request.put(`https://still-scrubland-50936.herokuapp.com/api/seasons/${currentSeason.id}`, currentSeason)

        incrementStateCounter();

    }

    const selectedPlayersNodes = selectedPlayers.map((player) => {
        return(<li key={player.id}><button onClick={() => handleRemovePlayerFromGame(player)} >- {player.name} </button></li>)});
    
    const allPlayersNodes = allPlayers.map((player) => {
        return(<li key={player.id}> <button onClick={() => handleAddPlayerToGame(player)}> + {player.name} </button></li>)});
    

    
    if (selectedPlayers.length < 4){
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
    
                <button>not ready</button>
            </>
        )
    } else {
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
    
                <button onClick={handleUpdateGame} >ready</button>
            </>
        )    }
}

export default AddPlayersToGame;