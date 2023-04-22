import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageDropzone from "./ImageDropzone";

function App() {
  return (
    <div className="App">
      <h1>Color Identifier</h1>
      <ImageDropzone />
    </div>
  );
}

export default App;
