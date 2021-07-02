import React, { useEffect, useState } from 'react';
import './App.css';
import Request from './helpers/Request';
import FirstPage from './containers/FirstPage';


function App() {

  const [seasons, setSeasons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getSeasons = () => {
    const request = new Request();
    request.get("https://still-scrubland-50936.herokuapp.com/api/seasons")
    .then(data => { setSeasons(data) })
    .then(() => setIsLoaded(true));
  };

  useEffect(() => {
    getSeasons()
  },[]);

  if (isLoaded === false){
    return(
      <div>
      Wait...
      </div>
    );
  } else {
    return (
      <div>
          <h1>Hello</h1>
          <FirstPage
          seasons={seasons} 
          />
    </div>
  );
  }
}
  
export default App;
