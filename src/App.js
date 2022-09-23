import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Coin from './pages/Coin';
import { styled } from '@mui/material';

function App() {

  const StyledDiv = styled("div")({
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh"
  })

  return (
    <BrowserRouter>
      <StyledDiv>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/coin/:id' element={<Coin />} />
        </Routes>
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
