import React from 'react';
import NewSeason from '../components/NewSeason';
import ManagePlayers from '../components/ManagePlayers';
import NewGame from '../components/NewGame';

const FirstPage = ({seasons, incrementDataCounter, currentSeasonNumber}) => {



    if (seasons.length < 1){
        return (
            <NewSeason
            seasons={seasons}
            incrementDataCounter={incrementDataCounter}
            />
        )
    } else {

        return(
            <div>
            <h1>Manage Players</h1>
            <ManagePlayers
            /> 

            <h1>New Game</h1>
            <NewGame
            currentSeasonNumber={currentSeasonNumber}
            />
            </div>
        );
    }
}

export default FirstPage;