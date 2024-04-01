import { useState } from 'react'

import Home from './components/Home'
import Footer from './components/Footer'
import Header from './components/Header'

function App() { 
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
