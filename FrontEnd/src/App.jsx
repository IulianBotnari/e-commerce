import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={'user/login'} element=<LoginPage /> />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
