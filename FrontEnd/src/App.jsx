import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import SingIn from './pages/signin/SignIn.jsx'
import { AuthContext } from './contexts/AuthContext.jsx'
import UserAccount from './pages/user_account/UserAccount.jsx'
function App() {


  return (
    <>

      <BrowserRouter>
        <AuthContext>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={'user/login'} element=<LoginPage /> />
            <Route path={'user/signin'} element=<SingIn /> />
            <Route path={'user/user-account'} element=<UserAccount /> />
          </Routes>

        </AuthContext>
      </BrowserRouter>

    </>
  )
}

export default App
