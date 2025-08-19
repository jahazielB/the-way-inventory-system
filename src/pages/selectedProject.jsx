import { Sidebar } from "../components/sidebar"

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';


export const SelectedProject = ()=>{
    const rows = [{ id: 1, item: 'MG Spoons',  date: '7/16/2025', unit: '486 pcs' },
    { id: 2, item: 'Beads',  date: '7/16/2025', unit: '9528 pcs' },
    { id: 3, item: 'Clevis',  date: '7/16/2025', unit: '1104 pcs' }]

    const columns = [
    { field: 'item', headerName: 'Item', flex: 1 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
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
    return <div className="flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                    <h1>INVENTORY MANAGEMENT SYSTEM</h1>
                </div>
                <span className="text-[32px] font-extrabold">Project Report</span>
                <div className='h-[300px] w-[800px]'>
                    <div className="flex justify-between items-center px-2 py-2 bg-gray-50">
                        <span>Warrior Lures</span>
                        <div>
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
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableColumnMenu
                        disableSelectionOnClick
                        />
                </div>
            </div>
        </div>
}