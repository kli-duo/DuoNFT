import "web-ui/dist/esm/src/styles/fonts.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.css";
import NFTPage from "./NFT/NFTPage.js";

const App = () => (
  <Router>
    <Switch>
      <Route exact={true} path="/">
        <NFTPage />
      </Route>
      <Route exact={true} path="/NFT">
        {/* <div className={styles.app}> */}
        <NFTPage />
        {/* </div> */}
      </Route>
    </Switch>
  </Router>
);

export default App;
