import { ConfirmDeleteCancel } from './modals/confirmDeleteCancel';
import { EditAccountDialog } from './editAccountDialog';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton,Snackbar,Alert } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import { format } from "date-fns";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../api/updateUser';
import { deleteUser } from '../api/deleteUser';


export const AccountManagementTable = ({data,refetch})=>{
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
    const [updating,setUpdating] = useState(false)
    const [deleteItem,setDeleteItem] = useState(null)
    const [selectedData,setSelectedData] = useState()
    const [open,setOpen] = useState({
      deleteModal: false,
      editModal:false
    })
    const navigate = useNavigate()
    const handleDeleteButton = (email)=>{

        const foundUser = data.find(d=>d.email===email)
        setDeleteItem(foundUser.id)
        setOpen({...open,deleteModal:true})
        
    }
    const handleConfirmDeleteButton = async ()=>{
        setUpdating(true)
        const result = await deleteUser(deleteItem)
        if (result.success){
          setSnackbar({ open: true, type: "success", message: "account deleted!" });
          setUpdating(false)
          refetch()
        }else setSnackbar({ open: true, type: "error", message: "error deleting account" });
        setOpen({deleteModal:false})
        setDeleteItem(null)
    }
    const handleCancelModal = ()=>{
      setOpen({...open,deleteModal:false})
      setDeleteItem(null)
    }
    const handleEditDialog = (email)=>{
      const foundUser = data.find(d=>d.email===email)
      setSelectedData(foundUser)
      setOpen({...open,editModal:true})
    
    }

    const handleSave = async (formData)=>{
      setUpdating(true)
      const result = await updateUser(selectedData.id,formData.email,formData.password||null,{profile_name:formData.profile_name , role: formData.role})

      if (result.success){
        
        setSnackbar({ open: true, type: "success", message: "Updated Successfully" });
        refetch()
        setUpdating(false)
        
      }else setSnackbar({ open: true, type: "error", message: "error updating account" });

    }
    const columns = [
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'created_at', headerName: 'Creation date', flex:1,valueFormatter:(p)=>{
      if(!p) return "error fetching date"
      const date = p
      return format(date , "MMM dd, yyyy")
    } },
    { field: 'profile_name', headerName: 'Name', width:150 },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton size="small" color="primary" onClick={()=>handleEditDialog(params.row.email)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={()=>handleDeleteButton(params.row.email)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];


  return (
    <div className='h-[500px] md:h-[clamp(450px,60vh,2000px)]  w-[clamp(200px,90vw,1700px)]  lg:w-[clamp(700px,70vw,2000px)]'>
      <div className="flex justify-end items-center px-2 py-2 bg-gray-50">
        <IconButton size="small">
          <FilterList />
        </IconButton>
        <IconButton size="small">
          <Download />
        </IconButton>
        <IconButton size="small">
          <Search />
        </IconButton>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableColumnMenu
        disableSelectionOnClick
        />
        {/* Delete Confirmation Dialog */}
      <ConfirmDeleteCancel  open={open.deleteModal} handleDelete={handleConfirmDeleteButton} handleCancel={handleCancelModal} updating={updating}/>
        {/*edit account dialg */ }
      <EditAccountDialog open={open.editModal} onClose={()=>setOpen({...open,editModal:false})} userData={selectedData||{}} onSave={handleSave} updating={updating}/>
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


    </div>
  );
}