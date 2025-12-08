import './App.css';
import Countdown from './components/Countdown';
import LocationMap from './components/LocationMap';
import MouseTextTrail from './MouseTextTrail';
import Dresscode from './components/Dresscode';
import Ablauf from './components/Zeitlicher Ablauf';
import Essen from './components/Essen';
import Starfield from './components/Starfield';
import sonnichrissy from '../assets/sonnichrissy.jpg';

export default function App() {
  return (
    <div className="container">
      <MouseTextTrail />
      <h1>Wir sagen ja!</h1>
      <Starfield />
            <img
        src={sonnichrissy}
        alt="Brautpaar"
        className="headline-image"
      />
      <div className='countdown'>
      <Countdown />
      <p>Am 18. September 2026</p>
      </div>
      <div className="map-container">
        <Ablauf />
      </div>
      <div className="map-container">
        <LocationMap />
      </div>
      <div className="map-container">
        <Essen />
      </div>
      <div className="map-container">
        <Dresscode />
      </div>
    </div>
  );
}
