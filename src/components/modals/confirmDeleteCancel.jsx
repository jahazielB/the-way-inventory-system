import { IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,CircularProgress } from '@mui/material';
export const ConfirmDeleteCancel = (props)=>{
    return <div>
        <Dialog open={props.open} >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button disabled={props.updating}  color="error" variant="contained" onClick={()=>props.handleDelete(props.id)} startIcon={props.updating?<CircularProgress size={20} color="inherit"/>:null}>
            {props.updating?"Deleting":"Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
}