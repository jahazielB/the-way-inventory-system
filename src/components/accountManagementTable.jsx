import { ConfirmDeleteCancel } from './modals/confirmDeleteCancel';
import { EditAccountDialog } from './editAccountDialog';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AccountManagementTable = ({data})=>{
     const [rows,setRows] = useState([
    { id: 1, name: 'Edward Perry', age: 25, creationDate: '7/16/2025', department: 'Finance' },
    { id: 2, name: 'Josephine Drake', age: 36, joinDate: '7/16/2025', department: 'Market' },
    { id: 3, name: 'Cody Phillips', age: 19, joinDate: '7/16/2025', department: 'Development' },
  ])
    const [open,setOpen] = useState({
      deleteModal: false,
      editModal:false
    })
    const [selectedId,setSelectedId] = useState(null)
    const navigate = useNavigate()
    const handleDeleteButton = (id)=>{
        setSelectedId(id)
        setOpen({...open,deleteModal:true})
    }
    const handleConfirmDeleteButton = ()=>{
        setOpen({deleteModal:false})
        setRows((prev)=>prev.filter(row=>row.id!=selectedId))
        setSelectedId(null)
    }
    const handleCancelModal = ()=>{
      setOpen({...open,deleteModal:false})
      setSelectedId(null)
    }
    const handleEditDialog = ()=>{
      setOpen({...open,editModal:true})
    }
    const columns = [
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'created_at', headerName: 'Creation date', flex:1 },
    { field: 'profile_name', headerName: 'Name', width:150 },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton size="small" color="primary" onClick={()=>handleEditDialog()}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={()=>handleDeleteButton(params.row.id)}>
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
      <ConfirmDeleteCancel  open={open.deleteModal} handleDelete={handleConfirmDeleteButton} handleCancel={handleCancelModal}/>
        {/*edit account dialg */ }
      <EditAccountDialog open={open.editModal} onClose={()=>setOpen({...open,editModal:false})}/>

    </div>
  );
}