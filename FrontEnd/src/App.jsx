import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import SingIn from './pages/signin/SignIn.jsx'
function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={'user/login'} element=<LoginPage /> />
          <Route path={'user/signin'} element=<SingIn /> />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
