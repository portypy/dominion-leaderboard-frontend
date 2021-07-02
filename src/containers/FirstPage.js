import React from 'react';
import NewSeason from '../components/NewSeason';
import ManagePlayers from '../components/ManagePlayers';

const FirstPage = ({seasons, incrementDataCounter}) => {

    if (seasons.length < 1){
        return (
            <NewSeason
            seasons={seasons}
            incrementDataCounter={incrementDataCounter}
            />
        )
    }

    return(
        <>
        <ManagePlayers/> 
        </>
    );
}

export default FirstPage;