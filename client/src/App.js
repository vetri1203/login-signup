import { Routes, Route } from 'react-router-dom';
import Login from './Component/Login.jsx';
import Signup from './Component/Signup.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/signup' Component={Signup}/>
     </Routes>
    </div>
  );
}

export default App;
