import styles from "./App.styles";
import JokesList from "./components/Jokes/JokesList";
function App() {
  return (
    <div style={styles.app}>
      <JokesList />
    </div>
  );
}

export default App;
