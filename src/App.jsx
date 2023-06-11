
import {Routes,Route} from 'react-router-dom'
import UserList from './pages/UserList'
import Register from './pages/Register'
import axios  from 'axios'
import EditDetails from './pages/EditDetails'

import View from './pages/View'

function App() {
  // 'http://localhost:5000'
axios.defaults.baseURL= 'https://usermanagement-c8h7.onrender.com/'
axios.defaults.withCredentials=true;
  

  return (
    <div >
      <Routes>
        <Route path='/addform' element={<Register/>}></Route>
        <Route path='/' element={<UserList/>} ></Route>
        <Route path='/editform/:userId' element={<EditDetails/>}></Route>
        <Route path='/view/:userId' element={<View/>}></Route>
        
      </Routes>
    
    </div>
  )
}

export default App
