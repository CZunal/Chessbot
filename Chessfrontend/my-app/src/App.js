import logo from './logo.svg';
import './App.css';
import Chessboard from "./Chessboard/Components/Chessboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Chessboard
              initialPiecePositionsString={`
        rnbqkbnr
        pppppppp
        ........
        ........
        ........
        ........
        PPPPPPPP
        RNBQKBNR
    `}
          />
      </header>
    </div>
  );
}

export default App;
