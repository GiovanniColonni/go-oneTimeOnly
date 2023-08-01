import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import EncryptPage from './components/EncryptPage';
import DecryptPage from './components/DecryptPage';


function App() {
  return (
    <>
    <div className="App">
      <Header />
        <Routes>
          
            <Route index element={<EncryptPage/>} />
            <Route exact path="/retrieveSecret/*" element={<DecryptPage/>} />
        
        </Routes>
      <Footer />
    </div>
    </>
  );
}

export default App;
