import {React, useState} from "react";
import Request from "../helpers/Request"

const ManagePlayers = ({allPlayers, incrementStateCounter}) => {

    const [statePlayer, setStatePlayer] = useState(
        {
            name: ""
        }
    )

    const handlePlayerName = (event) => {
        let propertyName = event.target.name;
        let copiedPlayer = {...statePlayer}
        copiedPlayer[propertyName] = event.target.value;
        setStatePlayer(copiedPlayer);
    }
    
    const createPlayer = (event) => {
        event.preventDefault()
        if (statePlayer.name !== ""){
        const request = new Request()
        request.post("https://still-scrubland-50936.herokuapp.com/api/players", statePlayer)
        .then(() => incrementStateCounter())
        }
        setStatePlayer({
            name: ""
        })
    }

    const deletePlayer = (player) => {
        const request = new Request();
        if (player.seasons.length === 0 || player.seasons[player.seasons.length -1].completed){
            request.delete(`https://still-scrubland-50936.herokuapp.com/api/players/${player.id}`)
            .then(() => incrementStateCounter())
        }
    }

    const allPlayersNodes = allPlayers.map((player) => {  
        return( 
              <li key={player.id}>
                <button className="button" onClick={(() => deletePlayer(player))}>Delete {player.name}</button>
              </li>        
            )  
    })

    return(
        <>
        <div id="new-player-form">
        <h3>Create New Player Tab</h3>
        <form  onSubmit={createPlayer}>
        <label>Player Name: </label>
        <input className="input" onChange={handlePlayerName} type="text" name="name" value={statePlayer.name}></input>
        <button className="nav-link" type="submit" >Add Player</button>
        </form>
        </div>
        <ul id="all-players-manage">
             {allPlayersNodes}
        </ul>
        </>
    )
}

export default ManagePlayers