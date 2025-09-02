import { Route, Routes } from "react-router";
import EmailEntry from "./pages/EmailEntry";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailEntry />} />
    </Routes>
  );
}

export default App;
