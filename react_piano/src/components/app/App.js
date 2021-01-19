import {useState} from "react";
import * as Tone from 'tone'

import './App.css';
import WhiteTile from "../tiles/WhiteTile";
import BlackTile from "../tiles/BlackTile";

function App() {
  const [whiteKeyPressed, setWhiteKeyPressed] = useState(-1)
  const whiteTileLetters = 'qwertyuiopzxcvbnm,./a'
  const blackTileLetters = '2356790sdfhjl;\''
  const blackTileIndexes = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20]

  const whiteTileSounds = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
  const blackTileSounds = ['C#3', 'D#3', 'F#3', 'G#3', 'A#3', 'C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5', 'F#5', 'G#5', 'A#5']

  let synth = new Tone.Synth().toDestination();
  synth.oscillator.type = "sine";
  synth.volume.value = -6

  const tileClickHandler = (type, index) => {
    if (type === 'white') {
      synth.triggerAttackRelease(whiteTileSounds[index], '8n')
    } else if (type === 'black') {
      synth.triggerAttackRelease(blackTileSounds[index], '8n')
    }
  }

  const keyPressedHandler = (event) => {
    document.onkeydown = null;

    const key = event.key.toLowerCase()
    const whiteTileIndex = whiteTileLetters.split('').indexOf(key)
    const blackTileIndex = blackTileLetters.split('').indexOf(key)

    if (whiteTileIndex !== -1) {
      setWhiteKeyPressed(whiteTileIndex)
      tileClickHandler('white', whiteTileIndex)
      return
    }

    if (blackTileIndex !== -1) {
      tileClickHandler('black', blackTileIndex)
    }
  }

  document.onkeydown = keyPressedHandler

  document.onkeyup = function () {
    document.onkeydown = keyPressedHandler
  }

  return (
    <div className="App">
      <div className="Piano">
        {whiteTileLetters.split('').map((letter, index) => (
          <WhiteTile
            key={index}
            letter={letter}
            isKeyPressed={whiteKeyPressed === index}
            onClick={() => tileClickHandler('white', index)}
          />
        ))}

        {blackTileLetters.split('').map((letter, index) => (
          <BlackTile
            key={index}
            letter={letter}
            index={blackTileIndexes[index]}
            onClick={() => tileClickHandler('black', index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
