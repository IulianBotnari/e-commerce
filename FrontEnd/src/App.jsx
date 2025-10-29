import HomePage from './pages/homepage/HomePage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import SingIn from './pages/signin/SignIn.jsx'
import UserAccount from './pages/user_account/UserAccount.jsx'
import EditUserPage from './pages/edit_user/EditUserPage.jsx'
import Infopage from './pages/info_pages/Infopage.jsx'
import AdminPage from './pages/admin_pages/AdminPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext.jsx'

function App() {


  return (
    <>

      <BrowserRouter>
        <AuthContext>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={'user/login'} element=<LoginPage /> />
            <Route path={'user/signin'} element=<SingIn /> />
            <Route path={'user/user-account'} element=<ProtectedRoute><UserAccount /></ProtectedRoute> />
            <Route path={'user/user-account/edit-user'} element=<ProtectedRoute><EditUserPage /></ProtectedRoute> />
            <Route path={'infopage'} element=<Infopage /> />
            <Route path={'admin-home'} element=<ProtectedRoute><AdminPage /></ProtectedRoute> />
          </Routes>

        </AuthContext>
      </BrowserRouter>

    </>
  )
}

export default App
