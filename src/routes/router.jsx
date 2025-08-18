import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../pages/landingpage"
import { Dashboard } from "../pages/dashboard"
import { ProjectsPage } from "../pages/projectsPage"
import { InventoryPage } from "../pages/inventoryPage"
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
}
])