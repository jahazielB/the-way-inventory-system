import { createBrowserRouter,Navigate } from "react-router-dom"
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
import { StockManPage } from "../pages/stockmanPage"
import { UserActionPage } from "../pages/userActionPage"
import { UserReleaseReplenishPage } from "../pages/UserReleaseOrReplenishPage"
import AuthCallback from "../pages/AuthCallback"

import { AdminRoute } from "./AdminRoute"
import path from "path"

export const router = createBrowserRouter([
    {
    path: "/auth/callback",
    element: <AuthCallback/>,
  },
  {
    path: "/",
    element: <AuthCallback/>,
    errorElement: <div className="flex justify-center py-50">BOSS san ka punta?</div>
  },
    {
    path:'/login',
    element:<LandingPage/>,
    errorElement: <div className="flex justify-center py-50">BOSS san ka punta?</div>
},
  
//admin-only section
{
    element:<AdminRoute allowedRoles={["admin"]}/>,
    children:[
        {path: "/dashboard", element: <Dashboard/>},
        {path: "/projects", element: <ProjectsPage/>},
        {path: "/inventory", element: <InventoryPage/>},
        {path: "/projects/:project_name", element: <SelectedProject/>},
        {path: "/inventory/item_summary", element: <SelectedProjectInventory/>},
        {path: "/inventory/item_summary/:customer_name", element: <SelectedProjectInventory/>},
        {path: "/accounts", element: <AccountManagementPage/>},
        {path: "/accounts/create", element: <CreateAccountPage/>},
        {path: "/inventory/addItem", element: <CreateAccountPage/>},
        {path: "/accounts/edit", element: <EditAccountPage/>},
        {path: "/inventory/replenishItems", element: <ReplenishReleasePage mode={'Replenish'}/>},
        {path: "/inventory/releaseItems", element: <ReplenishReleasePage mode={'Release'}/>},
        {path: "/notifications", element: <NotificationsPage/>},
        {path: "notifications/approval", element: <ApprovalPage/>}
    ],
    

},

//user 
{
    element:<AdminRoute allowedRoles={["user"]} />,
    children:[
        {path:"/user",element:<StockManPage/>},
        {path:"/user/project",element:<UserActionPage/>},
        {path:"/user/userReplenish",element:<UserReleaseReplenishPage/>},
        {path:"/user/userRelease",element:<UserReleaseReplenishPage/>}
    ]
},

])