import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Main from './pages/main/Main';
import Campaign from './pages/campaign/Campaign';
import Support from './pages/support/Support';
import News from './pages/news/News';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/main" element={<Main />}></Route>
          <Route exact path="/campaign" element={<Campaign />}></Route>
          <Route exact path="/support" element={<Support />}></Route>
          <Route exact path="/news" element={<News />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
