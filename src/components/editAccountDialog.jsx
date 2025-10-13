import{ useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,MenuItem
} from "@mui/material";

export const EditAccountDialog = ({ open, onClose, onSave ,data }) => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Account</DialogTitle>

      <DialogContent dividers>
        <TextField
          autoFocus
          label="Email"
          name="field1"
          fullWidth
          disabled
          margin="normal"
          value={formData.field1}
          onChange={handleChange}
        />

        <TextField
          label="Change Password"
          name="field2"
          fullWidth
          margin="normal"
          value={formData.field2}
          onChange={handleChange}
        />

          <TextField
          label="Name"
          name="field2"
          fullWidth
          margin="normal"
          value={formData.field2}
          onChange={handleChange}
        />
        <TextField select fullWidth label="Role">
          <MenuItem>Admin</MenuItem>
          <MenuItem>User/Stockman</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccountDialog;
