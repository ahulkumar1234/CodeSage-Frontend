import './App.css'
import CodeReviewPage from './pages/CodeReviewPage'
import "prismjs/themes/prism-tomorrow.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Footer from './components/Footer';

function App() {


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path='/' element={<CodeReviewPage />} />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  )
}

export default App
