import LoginComponent from './Login';
import { Route, Routes } from 'react-router-dom';
import Dash from './dashboard';
import Login from './Login';


function App() {
  return ( 
    <div>
     {/* <LoginComponent /> */}
     <Routes>
      <Route path='/' element={<LoginComponent />}/>
      <Route path='/dashboard' element={<Dash />}/>
      <Route path='/loginpage' element={<Login />}/>
     </Routes>
    </div>
  );
}

export default App;
