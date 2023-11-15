import Navbar from './components/navbar';
import './App.css';
import hand from './images/hand.svg'
import smack from './images/Smack.svg'
import x from './images/X.svg'

function App() {
  return (
    <div className="body">
      <div className="welcome-bar">
        <div className="hand-welcome">
          <img src={hand} className="hand" alt="hand Icon" />
          <img src={smack} className="smack-logo" alt="Smack icon" />
        </div>
        <div className="welcome-user"><p>Welcome!</p></div>
      </div>
      <section className="home-container">
        <div className='container-first-row'>
        <div className="song-container"> 
          <div className="song-top">
            <p>Hot Song!</p>
            <div className="song-top-x-container">
            <img src={x} className="x-song" alt="Smack icon" />
            </div>
          </div>
          <div className="song-body">
            <section className="song-pic"></section>
          </div>
        </div>
        <section className="movie-container">
          
        </section>
        </div>
      </section>
    </div>
  );
}


export default App;
