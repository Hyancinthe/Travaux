import './App.css'
import Login from './Pages/Authentification/Connexion/Login'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Authentification/Connexion/Register'
import Choix from './Pages/Components/choix'
import Dashboard from './Pages/Components/Pages/Dashboard';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/choix' element={<Choix />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
