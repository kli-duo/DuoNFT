import "web-ui/dist/esm/src/styles/fonts.scss";

import styles from "./App.module.scss";
import Demo from "./DEMO/Demo";

const App = () => (
  <div className={styles.app}>
    <Demo />
  </div>
);

export default App;
