import React from 'react';
import Request from '../helpers/Request';

const AddPoints = ({ incrementStateCounter, currentGame }) => {
    
    const request = new Request();

    const playersInGame = [];
    currentGame.players.map(player => playersInGame.push(player));
    let points;

    const handlePointsChange = (e) => {
        const playerToUpdate = currentGame.players.filter(player => player.id === parseInt(e.target.id))[0];
        playerToUpdate.gamePoints = parseInt(e.target.value);
    }

    const handlePositionChange = (e) => {
        const playerToUpdate = currentGame.players.filter(player => player.id === parseInt(e.target.id))[0];
        playerToUpdate.gamePosition = parseInt(e.target.value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            handleStats();
            playersInGame.map(player =>
                request.put(`https://still-scrubland-50936.herokuapp.com/api/players/${player.id}`, player)
                .then(incrementStateCounter())
                .then(() => {window.location = '/new_game'})
            )
    }  

    const handleStats = () => {
        playersInGame.map(player => (
            player.seasonPoints += player.gamePoints,
            player.totalPoints += player.gamePoints,
            player.seasonGames += 1,
            player.totalGames += 1,
            player.seasonAvPosition = player.seasonAvPosition + ((player.gamePosition - player.seasonAvPosition) / (player.seasonGames + 1)),
            player.totalAvPosition = player.totalAvPosition + ((player.gamePosition - player.totalAvPosition) / (player.totalGames + 1)),
            currentGame.results[player.id] = player.gamePoints,
            currentGame.positions[player.id] = player.gamePosition
            )
        ) 
        request.put(`https://still-scrubland-50936.herokuapp.com/api/games/${currentGame.id}`, currentGame)
    }

    const playersNodes = currentGame.players.map((player) => {
        return(
            <li key={player.id}>
                <label> {player.name}'s points </label>
                <input type="number" id={player.id} value={points} onChange={handlePointsChange} 
                                required step="1"
                                onKeyDown={ (evt) => (evt.key === 'e' && evt.preventDefault()) 
                                                ||   (evt.key === '.' && evt.preventDefault())
                                                ||   (evt.key === 'E' && evt.preventDefault())
                                            }
                ></input>
                 <input type="number" id={player.id} value={points} onChange={handlePositionChange} required
                                min="1" max="6" step="1"
                                onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() 
                                                ||   (evt.key === '.' && evt.preventDefault())
                                                ||   (evt.key === 'E' && evt.preventDefault())
                                            }
                ></input>
            </li>
        )
    })

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                {playersNodes}
            </ul>
            <input type="submit" name="Submit" />
        </form>
    )
}

export default AddPoints;