import React from 'react';

const FirstPage = ({seasons}) => {

    return(
<>
<h1>season number {seasons[0].seasonNumber}</h1>
            
<h1>nr of players {seasons[0].players.length}</h1>         
</>
    );
}

export default FirstPage;