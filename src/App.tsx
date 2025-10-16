import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersList from './pages/UsersList'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UsersList/>}/>
        <Route path='/add' element={<AddUser/>}/>
        <Route path='/edit/:id' element={<EditUser/>}/>

        {/* To redirect the user to the home page we do this */}
        {/* <Route path='*' element={<Navigate to="/"/>}/> */}

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
