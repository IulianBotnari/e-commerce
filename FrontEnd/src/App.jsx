import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderLayout from './components/HeaderLayout'
import HomePage from './pages/homepage/HomePage'
function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
