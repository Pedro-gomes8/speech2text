import { useState } from 'react';
import './App.css';
import microphoneImage from "./assets/images/microphone.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [paragraph, setParagraph] = useState('');

  let lang;
  const queryString = window.location.search;
  if (queryString) {
    lang = queryString.split("?")[1];
  } else {
    lang = "en";
  }

  const handleListing = () => {
    setIsListening(true);
    setParagraph('');
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: lang,
    });
  }
  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    setParagraph(transcript);
    resetTranscript();
  };
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <>
        <p>Browser does not support Speech recognition</p>
      </>
    )
  }
  return (
    <div className="App">
      <header className="heading-title">
        <h1 className="page-title">Speech to text</h1>
        <p className="description">Bem vindo ao Speech to Text, pressione o microfone quando desejar falar. Ao final aparecerá a transcrição do seu áudio ao lado. </p>

      </header>
      <main className='primary-content'>
        <img className="microphone" src={microphoneImage} alt="microphone" onClick={handleListing}></img>
        {isListening && (
          <button className="btn" onClick={stopHandle}>
            Stop
          </button>
        )}
        <p className="transcript">{paragraph}</p>

      </main>
    </div>
  );
}

export default App;
