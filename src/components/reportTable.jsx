import { DataGrid } from '@mui/x-data-grid';
import { IconButton,DialogTitle,Dialog,DialogContent,DialogActions,TextField,Button,CircularProgress,Snackbar,Alert } from '@mui/material';
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import supabase from '../supabase-client';
import { format } from "date-fns";

import { ConfirmDeleteCancel } from './modals/confirmDeleteCancel';
import { ExportPreview } from './exportPreview';

import { useState } from 'react';




export const ReportTable = ({project_name,data,mode,reportMode,infoDate,exportOpen,setExportOpen})=>{

    const [open,setOpen]= useState({
      deleteModal: false,
      editModal:false,
      
    })
    const [updating,setUpdating] = useState(false)
    const [selectedItem,setSelectedItem]= useState({
      quantity:"",
      id:""
    })
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });

    const stockInOutData = (() => {
      if (!data) return [];

      // Flatten the stock_in / stock_out arrays depending on mode
      const flatData = data.flatMap(item => (mode === "stock_out" ? item.stock_out : item.stock_in));

      // If in summary mode, aggregate quantities per item
      if (reportMode === "summary") {
        const summaryMap = flatData.reduce((acc, row) => {
          const key = row.item_name;
          if (!acc[key]) acc[key] = { ...row, quantity: 0 }; // keep first row as base
          acc[key].quantity += row.quantity; // aggregate quantity
          return acc;
        }, {});

        return Object.values(summaryMap);
      }

      // Normal mode, just return flattened data
      return flatData;
    })();

    const handleConfirmDelete = async()=>{
        const {data,error}= await supabase
          .from(mode==="stock_out"?"stock_out":"stock_in")
          .delete()
          .eq('id',selectedItem.id)

            if (error) {
        setSnackbar({ open: true, type: "error", message: "Something went wrong" });
        setUpdating(false)
      } else {
        setSnackbar({ open: true, type: "success", message: "Successfully Deleted!" });
        setUpdating(false)
        setOpen({...open,deleteModal:false})}
    }
    const handleDeleteIcon = (id)=>{
      setOpen({...open,deleteModal:true})
      setSelectedItem({...selectedItem,id:id})
      console.log(id)
    }
    const handleCancelModal = ()=>{
      setOpen({...open,deleteModal:false})
      
      
    }

    const handleEditModal = (id)=>{
      setOpen({...open,editModal:true})
      setSelectedItem({...selectedItem,id:id})
      console.log(id)
      
    }

      // --- Download Preview logic ---
const exportData = stockInOutData.map(row => {
  const filter = infoDate[0]; // take the current date filter
  let dateText = "";

  if (reportMode === "summary") {
    if (!filter || (!filter.selectedDate && (!filter.dateRange?.start || !filter.dateRange?.end))) {
      dateText = "From the beginning";
    } else if (filter.dateMode === "single" && filter.selectedDate) {
      dateText = format(filter.selectedDate, "MMM dd, yyyy");
    } else if (filter.dateMode === "range" && filter.dateRange?.start && filter.dateRange?.end) {
      dateText = `${format(filter.dateRange.start, "MMM dd, yyyy")} - ${format(filter.dateRange.end, "MMM dd, yyyy")}`;
    }
  } else {
    // Normal mode, just use the row date
    dateText = mode === "stock_out" ? row.stock_out_date : row.stock_date;
  }

  return {
    Item: row.item_name,
    Date: dateText,
    Quantity: row.quantity,
    Unit: row.unit,
    ...(mode === "stock_out"
      ? { Released_By: row.used_by || "-" }
      : { Received_By: row.received_by || "-" })
  };
});

    const saveButton = async ()=>{
      setUpdating(true)
      const  {data,error} = await supabase
          .from(mode==="stock_out"?"stock_out":"stock_in")
          .update({quantity:parseInt(selectedItem.quantity)})
          .eq('id',selectedItem.id)
          .select();
      if (error) {
        setSnackbar({ open: true, type: "error", message: "Something went wrong" });
        setUpdating(false)
      } else {
        setSnackbar({ open: true, type: "success", message: "Update Success!" });
        setUpdating(false)
        setOpen({...open,editModal:false})
  
    }}

    const columns = reportMode === "detailed"?[
    { field: 'item_name', headerName: 'Item', flex: 1 },
    { field: mode === "stock_out"?'stock_out_date':"stock_date", headerName: 'Date', flex:1,valueFormatter:(params)=>{
      if(!params) return "error fetching date"
      const date = new Date(params)
      return format(date, "MMM dd, yyyy")
    } },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: mode === "stock_out"?"used_by":"received_by", headerName:mode === "stock_out"?"released_by":"received_by", flex:1},
    {
      field: 'actions',
      headerName: 'actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton size="small" color="primary" onClick={()=>handleEditModal(params.row.id)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={()=>handleDeleteIcon(params.row.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ]:[{ field: 'item_name', headerName: 'Item', flex: 1 },{ field: 'quantity', headerName: 'Quantity', flex: 1 },] ;
  return(
    <div className='h-[500px] md:h-[clamp(450px,60vh,2000px)]  min-w-[200px] md:w-[600px] lg:w-[clamp(700px,70vw,2000px)]   shadow-2xl'>
                    <div className="flex justify-between items-center px-2 py-2 bg-gray-50">
                        <span>{project_name}</span>
                        {reportMode==="summary"&&infoDate.map((p,i)=>p.dateMode==="single"?(<span key={i}>{p.selectedDate?(format(p.selectedDate,"MMM dd, yyyy")):""}</span>)
                        :(<span key={i}>{p.dateRange?.start?(format(p.dateRange.start,"MMM dd, yyyy")):""} - {p.dateRange?.end?(format(p.dateRange.end,"MMM dd, yyyy")):""}</span>))}
                        <div>
                            {/* <BasicDatePicker/> */}
                            <IconButton size="small" onClick={()=>setExportOpen(true)}>
                            <Download />
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
      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteCancel  open={open.deleteModal} handleDelete={handleConfirmDelete} handleCancel={handleCancelModal} updating={updating}/>
      {/*Edit dialog */}
      <Dialog maxWidth="xs"  open={open.editModal}>
        <DialogContent dividers>
          <TextField label="Edit Unit" name='quantity' margin='normal' type='number' value={selectedItem.quantity||""} onChange={(e)=>setSelectedItem({...selectedItem,[e.target.name]:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={saveButton} disabled={updating} startIcon={updating?<CircularProgress size={20} color="inherit"/>:null}>
            Save
          </Button>
          <Button color="secondary" variant="contained" onClick={()=>
            {setOpen({...open,editModal:false})
            setSelectedItem({...selectedItem,quantity:"",id:""})}
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
      {/* Export Preview Dialog */}
        <Dialog
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Export Preview</DialogTitle>
          <DialogContent>
            <ExportPreview data={exportData} filename={`Project_Report_${project_name}_${mode}.xlsx`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setExportOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}