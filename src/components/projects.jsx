import { useNavigate,useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
import supabase from "../supabase-client"
import {
  Box,
  CircularProgress,Dialog,DialogContent,DialogTitle,Button,TextField,DialogActions,FormControl,Snackbar,Alert,List,Typography,ListItem,ListItemText
} from "@mui/material";


export const Projects = ({handleClick,handleGeneralClick})=>{
    const [loading,setLoading] = useState(false) 
    const [openDialog,setOpenDialog] = useState(false)
    const [data,setData] = useState([])
    const [locations,setLocations] = useState([])
    const [newProject,setNewProject] = useState("")
    const [newLocation,setNewLocation] = useState("")
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
    const [saving,setSaving] = useState({
        projectSaving : false, locationSaving:false
    })
    const fetch = async()=>{
            setLoading(true)
            const {data,error} = await supabase.from('customers').select('*')
            if (error) console.error(error)
            else setData(data) 
            setLoading(false)
            
        }
    useEffect(()=>{
        const fetchLocations = async ()=>{
            const {data,error} = await supabase
                .from('locations')
                .select('*');
            if (error) console.error("error: ", error)
            setLocations(data)
        }
        fetchLocations()
        fetch()
    },[])
    const location = useLocation()
    const navigate = useNavigate();

    const handleNewLocation = async ()=>{
        setSaving({...saving,locationSaving:true})
        if (!newLocation.trim()) {
            setSnackbar({ open: true, type: "error", message: "Location Name Required!" }) // triggers the warning
            return;
        }
        const {data,error} = await supabase
            .from('locations')
            .insert([{name:newLocation.trim(),"description":null}])
            .select();
        if (error){
            setSnackbar({ open: true, type: "error", message: "error saving project name" }) 
            setSaving({...saving,locationSaving:false})
            setOpenDialog(false)
            setNewLocation("")
            return;
        }else {
            setSnackbar({ open: true, type: "success", message: "New Location Saved!" })
             setSaving({...saving,locationSaving:false})
            setOpenDialog(false)
            setNewLocation("")
        }
    }
    const handleAddNewProject = async ()=>{
        setSaving({...saving,projectSaving:true})
        if (!newProject.trim()) {
            setSnackbar({ open: true, type: "error", message: "Project Name Required!" }) // triggers the warning
            return;
        }
        const {data,error} = await supabase
            .from('customers')
            .insert([{name:newProject.trim()}])
            .select();
        if (error){
            setSnackbar({ open: true, type: "error", message: "error saving project name" }) 
            setSaving({...saving,projectSaving:false})
            setOpenDialog(false)
            setNewProject("")
   
        }else {
            setSnackbar({ open: true, type: "success", message: "New Project Saved!" })
            setSaving({...saving,projectSaving:false})
            setOpenDialog(false)
            setNewProject("")
         }
        
    }
    if (loading) {
    return (
      <Box className="flex justify-center items-center h-[80vh]">
        <CircularProgress />
      </Box>
    );
  }
    return  (<div className=" flex flex-col justify-center items-center gap-3.5 h-fit lg:grid lg:grid-cols-[minmax(200px,350px)_minmax(200px,350px)] xl:gap-[20px] rounded-2xl  max-w-full " >
                {location.pathname==='/inventory'&&<div className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl" onClick={()=>navigate("/inventory/item_summary")}>
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold text-[12px]">
                        <span>General</span>
                    </div>
                    
                </div>}
                {data.map((p,index)=>
                    <div key={index} className="flex w-full h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                         active:bg-amber-200 active:scale-97  shadow-2xl" onClick={()=>handleClick(p.name)}>
                        <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                                7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                                stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-light text-[15px] ">
                            <span>{p.name}</span>
                        </div>
                    </div>
                )}
                
                
                <div className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl" onClick={()=>setOpenDialog(true)}>
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold text-[12px]" >
                        <span>{location.pathname==='/inventory'?"ADD NEW LOCATION":"ADD NEW PROJECT"}</span>
                    </div>
                    
                </div>
                <Dialog open={openDialog} onClose={()=>{
                    location.pathname==='/inventory'?setNewLocation(""):setNewProject("")
                    setOpenDialog(false)}
                    } maxWidth="sm" fullWidth>
                    <DialogTitle>{location.pathname==='/inventory'?"ADD NEW LOCATION":"ADD NEW PROJECT"}</DialogTitle>
                    <DialogContent>
                         {/* 👇 New Section: Show current locations/projects */}
                      { location.pathname==='/inventory'&& <Box sx={{ maxHeight: 200, overflowY: "auto", mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Current Locations Listed:
                            </Typography>
                            <List dense>
                            {locations?.map((item) => 
                                <ListItem key={item.id} disablePadding>
                                <ListItemText primary={item.name} />
                                </ListItem>)
                            }
                            </List>
                        </Box>}
                        <FormControl fullWidth>
                            <TextField fullWidth label={location.pathname==='/inventory'?"Location Name":"Project Name"} name="name" value={location.pathname==='/inventory'?newLocation:newProject} onChange={(e)=>{
                                location.pathname==='/inventory'?setNewLocation(e.target.value):setNewProject(e.target.value)}
                                } required>

                        </TextField>
                        </FormControl>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={location.pathname==='/inventory'?handleNewLocation:handleAddNewProject} disabled={setSaving.projectSaving}>Save</Button>
                        <Button variant="" onClick={()=>{
                            location.pathname==='/inventory'?setNewLocation(""):setNewProject("")
                            setOpenDialog(false)}
                            }>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {/* Snackbar for Success / Error */}
                        <Snackbar
                            open={snackbar.open}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            slotProps={{
                              root: {
                                sx: {
                                  position: "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                },
                              },
                            }}
                            autoHideDuration={3000}
                            onClose={() => setSnackbar({ ...snackbar, open: false })}>
                              <Alert severity={snackbar.type} sx={{ width: "100%" }}>
                                {snackbar.message}
                                </Alert>
                        </Snackbar>
                
            </div>)
        
}