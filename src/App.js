import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
