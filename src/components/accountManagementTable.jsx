import { ConfirmDeleteCancel } from './modals/confirmDeleteCancel';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AccountManagementTable = ()=>{
     const [rows,setRows] = useState([
    { id: 1, name: 'Edward Perry', age: 25, joinDate: '7/16/2025', department: 'Finance' },
    { id: 2, name: 'Josephine Drake', age: 36, joinDate: '7/16/2025', department: 'Market' },
    { id: 3, name: 'Cody Phillips', age: 19, joinDate: '7/16/2025', department: 'Development' },
  ])
    const [open,setOpen] = useState(false)
    const [selectedId,setSelectedId] = useState(null)
    const navigate = useNavigate()
    const handleDeleteButton = (id)=>{
        setSelectedId(id)
        setOpen(true)
    }
    const handleConfirmDeleteButton = ()=>{
        setOpen(false)
        setRows((prev)=>prev.filter(row=>row.id!=selectedId))
        setSelectedId(null)
    }
    const handleCancelModal = ()=>{
      setOpen(false)
      setSelectedId(null)
    }
    const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', width: 120 },
    { field: 'joinDate', headerName: 'Join date', width: 150 },
    { field: 'department', headerName: 'Department', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton size="small" color="primary" onClick={()=>navigate('/accounts/edit')}>
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
    <div className='h-[300px] w-[clamp(380px,50vw,700px)] max-sm:w-full max-md:w-full'>
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
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableColumnMenu
        disableSelectionOnClick
        />
        {/* Delete Confirmation Dialog */}
      <ConfirmDeleteCancel open={open} handleDelete={handleConfirmDeleteButton} handleCancel={handleCancelModal}/>

    </div>
  );
}