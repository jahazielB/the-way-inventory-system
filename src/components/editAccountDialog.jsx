import{ useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,MenuItem,CircularProgress
} from "@mui/material";
import { Password } from "@mui/icons-material";

export const EditAccountDialog = ({ open, onClose, onSave ,userData,updating }) => {
  const [formData, setFormData] = useState({
    email:  "",
    password: "",
    profile_name: "",
    role: ""
  });

  useEffect(()=>{
    setFormData({
      ...formData,
      email: userData.email || "",
      password:"",
      profile_name:userData.profile_name||"",
      role: userData.role||""
    })
  },[userData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    setTimeout(()=>{
      onClose()
    },2000)
    
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Account</DialogTitle>

      <DialogContent dividers>
        <TextField
          autoFocus
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Change Password"
          name="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />

          <TextField
          label="Name"
          name="profile_name"
          fullWidth
          margin="normal"
          value={formData.profile_name}
          onChange={handleChange}
        />
        <TextField select fullWidth label="Role" name="role" value={formData.role} onChange={handleChange}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User/Stockman</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button disabled={updating} onClick={handleSave} variant="contained" startIcon={updating?<CircularProgress size={20} color="inherit"/>:null}>
          {updating?"saving":"Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccountDialog;
