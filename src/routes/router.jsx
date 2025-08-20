import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../pages/landingpage"
import { Dashboard } from "../pages/dashboard"
import { ProjectsPage } from "../pages/projectsPage"
import { InventoryPage } from "../pages/inventoryPage"
import { SelectedProject } from "../pages/selectedProject"
import { SelectedProjectInventory } from "../pages/selectedProjectInventory"
import { AccountManagementPage } from "../pages/accountManagementPage"
import { CreateAccountPage } from "../pages/createAccountPage"
import { EditAccountPage } from "../pages/editAccountPage"
import { ReplenishReleasePage } from "../pages/replenishOrReleasePage"
import { NotificationsPage } from "../pages/notifsPage"
import { ApprovalPage } from "../pages/approvalPage"

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
    path:'/inventory/projectinventory',
    element: <SelectedProjectInventory/>
},
{
    path:'/accounts',
    element:<AccountManagementPage/>
},
{
    path:'/accounts/create',
    element:<CreateAccountPage/>
},
{
    path:'/accounts/edit',
    element:<EditAccountPage/>
},
{
    path:'/inventory/replenishItems',
    element:<ReplenishReleasePage mode={'Replenish Items'}/>
},
{
    path:'/inventory/releaseItems',
    element:<ReplenishReleasePage mode={'Release Items'}/>
},
{
    path:'/notifications',
    element:<NotificationsPage/>
},
{
    path:'/notifications/approval',
    element:<ApprovalPage/>
}
])