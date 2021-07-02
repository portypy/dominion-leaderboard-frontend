import React, { useEffect, useState } from 'react';
import './App.css';
import Request from './helpers/Request';
import FirstPage from './containers/FirstPage';


function App() {

  const [seasons, setSeasons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newDataCounter, setNewDataCounter] = useState(0);

  const getSeasons = () => {
    const request = new Request();
    request.get("https://still-scrubland-50936.herokuapp.com/api/seasons")
    .then(data => { setSeasons(data) })
    .then(() => setIsLoaded(true));
  };

  useEffect(() => {
    getSeasons()
  },[newDataCounter]);

  const incrementDataCounter = () => {
    setNewDataCounter(newDataCounter + 1)
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
          incrementDataCounter={incrementDataCounter}
        />
    </>
  );
}
  
export default App;
