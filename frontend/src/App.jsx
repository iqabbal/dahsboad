import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './context/UserContext';

//pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ImportCsv from './pages/ImportCsv';
import Ships from './pages/Ships';
import NotFound from './pages/NotFound';
import Roles from './components/common/Roles';
import Admin from './pages/Admin';

function App() {
  return (
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Admin/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/importcsv' element={<ImportCsv />} />
            <Route path='/ships' element={<Ships />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
  );
}

export default App;
