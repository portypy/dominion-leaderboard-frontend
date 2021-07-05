import React from 'react';
import { Route, Switch }  from 'react-router-dom';
import NewSeason from '../components/NewSeason';
import NewGame from './NewGame';
import ManagePlayers from '../components/ManagePlayers';
import AddPoints from '../components/AddPoints';

const FirstPage = ({seasons, incrementStateCounter, currentSeason, allPlayers}) => {

    if (seasons.length === 0){
        return (
            <NewSeason
            seasons={seasons}
            incrementStateCounter={incrementStateCounter}
            />
        )
    } 

    if (allPlayers.length < 4) {  // min 4 players for the ranking game
        return (
            <ManagePlayers 
            allPlayers={allPlayers}
            incrementStateCounter={incrementStateCounter}/>
        )
    }

    return (
        <Switch>       
            <Route path="/new_game" 
                    render={() => <NewGame currentSeason={currentSeason}
                                            allPlayers={allPlayers}
                                            incrementStateCounter={incrementStateCounter}/>}/>
            <Route path="/players"
                    render={() => <ManagePlayers allPlayers={allPlayers}
                                            incrementStateCounter={incrementStateCounter}/> }/>
            <Route path="/new_season"
                    render={() => <NewSeason seasons={seasons}
                                            incrementStateCounter={incrementStateCounter}/>}/>
            <Route path="/add_points"
                    render={() => <AddPoints></AddPoints>}/>
        </Switch>
    )
}

export default FirstPage;