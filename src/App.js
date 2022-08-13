// import Blobity from 'blobity';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  useEffect(() => {
    // const _ = new Blobity({
    //   licenseKey: 'peterfritz',
    //   dotColor: '#0000f0',
    //   focusableElementsOffsetX: 2,
    //   focusableElementsOffsetY: 2,
    //   color: '#0000f0',
    //   opacity: 0.15,
    //   magnetic: true,
    //   radius: 0,
    // });

    // console.log(_);
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
