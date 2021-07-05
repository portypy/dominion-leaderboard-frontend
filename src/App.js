import React, { useEffect, useState } from 'react';
import './App.css';
import Request from './helpers/Request';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar';
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
    <Router> 
        <Header></Header>
        <NavBar></NavBar>
        <FirstPage
          seasons={seasons}
          allPlayers={allPlayers}
          incrementStateCounter={incrementStateCounter}
          currentSeason={currentSeason}
        /> 
    </Router>
  )
}
  
export default App;
