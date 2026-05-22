import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <>
      <div className="App">Message from the backend: {message}</div>
      <div>
        <h1>ランニング練習アプリ</h1>
        <button>ログイン</button>
        <button>ゲストとして開始</button>
      </div>
    </>
  );
}

export default App;
