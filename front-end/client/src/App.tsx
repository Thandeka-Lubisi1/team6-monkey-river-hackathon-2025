import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Button } from "@/components/ui/button"
import { Link, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <>

        <main>
        <Router>
          <AppRoutes />
        </Router>
      </main>
     
      {/* <Button ><Link to="/Preferences">Preferences</Link></Button> */}
      

    </>
  )
}

export default App
