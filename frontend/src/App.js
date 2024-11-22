import "./App.css";
import ClickMe from "./components/click";
import GetDummyData from "./components/dummyData";
function App() {
  return (
    <div className="App">
      Hello
      <ClickMe />
      <GetDummyData kidda="vadia" />
    </div>
  );
}

export default App;
