import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../pages/landingpage"
import { Dashboard } from "../pages/dashboard"
import { ProjectsPage } from "../pages/projectsPage"
import { InventoryPage } from "../pages/inventoryPage"
import { SelectedProject } from "../pages/selectedProject"
import { SelectedProjectInventory } from "../pages/selectedProjectInventory"
import { AccountManagementPage } from "../pages/accountManagementPage"
export const router = createBrowserRouter([{
    path:'/',
    element:<LandingPage/>,
    errorElement: <div className="flex justify-center py-50">BOSS san ka punta?</div>
},
{
    path:'/dashboard',
    element: <Dashboard/>
},
{
    path:'/projects',
    element:<ProjectsPage/>
},
{
    path:'/inventory',
    element:<InventoryPage/>
},
{
    path:'/selected',
    element:<SelectedProject/>
},
{
    path:'/projectinventory',
    element: <SelectedProjectInventory/>
},
{
    path:'/accounts',
    element:<AccountManagementPage/>
}
])