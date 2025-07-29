import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Button } from "@/components/ui/button"
import { Link, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-2">
        <main>
        <Router>
          <AppRoutes />
        </Router>
      </main>
     
      {/* <Button ><Link to="/Preferences">Preferences</Link></Button> */}
      
    </div>
    </>
  )
}

export default App
