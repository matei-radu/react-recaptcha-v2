import { useCallback, useState } from "react";
import ReCaptcha from "@matt-block/react-recaptcha-v2";
import "./App.css";

function App() {
  const [showCaptcha, setShowCaptcha] = useState(false);

  const onShowClick = useCallback(() => {
    setShowCaptcha((prevState) => !prevState);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button id="show-captcha-btn" onClick={onShowClick}>
          {showCaptcha ? "Hide" : "Show"} Captcha
        </button>
        {showCaptcha && <ReCaptcha siteKey={"test"} />}
      </header>
    </div>
  );
}

export default App;
