import { DataGrid } from '@mui/x-data-grid';
import { IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button, } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import { useState } from 'react';


export const AccountManagementTable = ()=>{
     const [rows,setRows] = useState([
    { id: 1, name: 'Edward Perry', age: 25, joinDate: '7/16/2025', department: 'Finance' },
    { id: 2, name: 'Josephine Drake', age: 36, joinDate: '7/16/2025', department: 'Market' },
    { id: 3, name: 'Cody Phillips', age: 19, joinDate: '7/16/2025', department: 'Development' },
  ])
    const [open,setOpen] = useState(false)
    const handleDeleteButton = ()=>{
        
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
      renderCell: () => (
        <div className="flex gap-2">
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

 



  return (
    <div className='h-[300px] w-[800px]'>
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
      <Dialog open={open} >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button >Cancel</Button>
          <Button  color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}