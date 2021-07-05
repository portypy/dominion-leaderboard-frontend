import {React, useState} from 'react';
import Request from '../helpers/Request';
import AddPlayersToGame from '../components/AddPlayersToGame';


const NewGame = ( {incrementStateCounter, allPlayers, currentSeason} ) => {

    const [currentGame, setCurrentGame] = useState();

    const handleCreateNewGame = () => {
        const request = new Request();
        const currentSeasonNumber = currentSeason.seasonNumber;
        const newGameUrl = ("https://still-scrubland-50936.herokuapp.com/api/seasons/" + currentSeasonNumber + "/new_game")
        request.get(newGameUrl)
        .then((data) => setCurrentGame(data))
        .then(incrementStateCounter());
    };

    if (currentSeason.games.length > 0  && (currentGame !== undefined)) {
            return( 
                    <AddPlayersToGame
                    allPlayers={allPlayers}
                    currentGame={currentGame}
                    incrementStateCounter={incrementStateCounter}
                    currentSeason={currentSeason}
                    />
                )
        } else { 
            return (
            <button onClick={handleCreateNewGame}>New Game </button> 
            )
    }
}

export default NewGame;