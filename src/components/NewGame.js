import {React, useState} from 'react';
import Request from '../helpers/Request';


const NewGame = ( props ) => {

    const [currentGame, setCurrentGame] = useState([]);


    const handleCreateNewGame = () => {
        const request = new Request();
        const currentSeasonNumber = props.currentSeasonNumber;
        const newGameUrl = ("https://still-scrubland-50936.herokuapp.com/api/seasons/" + currentSeasonNumber + "/new_game")
        request.get(newGameUrl)
        .then(data => setCurrentGame(data));
    }

   return( <button onClick={handleCreateNewGame}>New Game</button> )
}

export default NewGame;