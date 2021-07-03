import React from 'react';
import NewSeason from '../components/NewSeason';
import ManagePlayers from '../components/ManagePlayers';
import NewGame from './NewGame';

const FirstPage = ({seasons, incrementStateCounter, currentSeason, allPlayers}) => {

    if (seasons.length === 0){
        return (
            <NewSeason
            seasons={seasons}
            incrementStateCounter={incrementStateCounter}
            />
        )
    } else {

        return(
            <>
            <h1>Manage Players</h1>
            <ManagePlayers
            allPlayers={allPlayers}
            incrementStateCounter={incrementStateCounter}
            /> 

            <h1>New Game</h1>
            <NewGame
            currentSeason={currentSeason}
            allPlayers={allPlayers}
            incrementStateCounter={incrementStateCounter}

            />
            </>
        );
    }
}

export default FirstPage;