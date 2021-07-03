import React, { useEffect, useState } from 'react';
import './App.css';
import Request from './helpers/Request';
import FirstPage from './containers/FirstPage';


function App() {

  const [seasons, setSeasons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newStateCounter, setNewStateCounter] = useState(0);
  const [currentSeason, setCurrentSeason] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);

  const getSeasons = () => {
    const request = new Request();
    request.get("https://still-scrubland-50936.herokuapp.com/api/seasons")
    .then(data => { 
      setSeasons(data)
      setCurrentSeason(data[data.length -1]) })
    .then(() => setIsLoaded(true));
  };

  const getAllPlayers = () => {
    const request = new Request();
    request.get("https://still-scrubland-50936.herokuapp.com/api/players")
    .then(data => setAllPlayers(data))
  };

  useEffect(() => {
    getSeasons()
    getAllPlayers()
  },[newStateCounter]);

  const incrementStateCounter = () => {
    setNewStateCounter(newStateCounter + 1)
  };


  if (isLoaded === false){
    return(
      <div>
      Wait...
      </div>
    );
  } 
  
  return (
      <>
        <h1>Hello</h1>         
        <FirstPage
          seasons={seasons}
          allPlayers={allPlayers}
          incrementStateCounter={incrementStateCounter}
          currentSeason={currentSeason}
        />
    </>
  );
}
  
export default App;
