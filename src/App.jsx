import { useState } from 'react'
import LandingPage from './pages/landingpage'
import { Sidebar } from './components/sidebar'
import { Dashboard } from './pages/dashboard'
import { ProjectsPage } from './pages/projectsPage'
import { InventoryPage } from './pages/inventoryPage'

function App() {

  return <div>
      {/* <LandingPage/> */}
      {/* <Dashboard/> */}
      {/* <ProjectsPage/> */}
      <InventoryPage/>
  </div>
    
  
}

export default App
