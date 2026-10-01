import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import Dashboard from './pages/Dashboard/Dashboard';
import ArticlesManagement from './pages/Admin/ArticlesManagement';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='article/:id' element={<ArticleDetail />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/admin' element={<ArticlesManagement />} />
      </Routes>
    </Router>
  )
}

export default App
