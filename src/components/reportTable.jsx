import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import supabase from '../supabase-client';



export const ReportTable = ({project_name,data,mode})=>{


    const stockInOutData = data?.flatMap(item=>mode === "stock_out"? item.stock_out : item.stock_in) || []


    const rows = [{ id: 1, item: 'MG Spoons',  date: '7/16/2025', unit: '486 pcs' },
    { id: 2, item: 'Beads',  date: '7/16/2025', unit: '9528 pcs' },
    { id: 3, item: 'Clevis',  date: '7/16/2025', unit: '1104 pcs' }]

    const columns = [
    { field: 'item_name', headerName: 'Item', flex: 1 },
    { field: mode === "stock_out"?'stock_out_date':"stock_date", headerName: 'Date', flex:1 },
    { field: 'quantity', headerName: 'Unit', flex: 1 },
    { field: mode === "stock_out"?"used_by":"received_by", headerName:mode === "stock_out"?"released_by":"received_by", flex:1},
    {
      field: 'actions',
      headerName: 'actions',
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
  return(
    <div className='h-[500px] md:h-[clamp(450px,60vh,2000px)]  min-w-[200px] md:w-[600px] lg:w-[clamp(700px,70vw,2000px)]   shadow-2xl'>
                    <div className="flex justify-between items-center px-2 py-2 bg-gray-50">
                        <span>{project_name}</span>
                        <div>
                            {/* <BasicDatePicker/> */}
                            <IconButton size="small">
                            <Download />
                            </IconButton>
                            <IconButton size="small">
                            <Search />
                            </IconButton>
                        </div>
                    </div>
                    <DataGrid
                        rows={stockInOutData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableColumnMenu
                        disableSelectionOnClick
                        />
                </div>
  )
}