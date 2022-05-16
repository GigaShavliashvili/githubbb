import Header from "./components/Header";
import RoutesLib from "./Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Global.css";

let store = createStore(rootReducer);

function App() {
  return (
    <main>
      <Provider store={store}>
        <Header />
        <RoutesLib />
      </Provider>
    </main>
  );
}

export default App;
