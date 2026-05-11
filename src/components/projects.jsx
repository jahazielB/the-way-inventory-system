import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabase-client";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  DialogActions,
  FormControl,
  Snackbar,
  Alert,
  List,
  Typography,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ConfirmDeleteCancel } from "./modals/confirmDeleteCancel";

export const Projects = ({ handleClick, handleGeneralClick }) => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [editProjectName, setEditProjectName] = useState({
    id: "",
    name: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [saving, setSaving] = useState({
    projectSaving: false,
    locationSaving: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    updating: false,
  });

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event, project) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const fetch = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("customers").select("*");
    if (error) console.error(error);
    console.log(data);
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) console.error("error: ", error);
      setLocations(data);
    };
    fetchLocations();
    fetch();
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewLocation = async () => {
    setSaving({ ...saving, locationSaving: true });
    if (!newLocation.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Location Name Required!",
      }); // triggers the warning
      return;
    }
    const { data, error } = await supabase
      .from("locations")
      .insert([{ name: newLocation.trim(), description: null }])
      .select();
    if (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "error saving project name",
      });
      setSaving({ ...saving, locationSaving: false });
      setOpenDialog(false);
      setNewLocation("");
      return;
    } else {
      setSnackbar({
        open: true,
        type: "success",
        message: "New Location Saved!",
      });
      setSaving({ ...saving, locationSaving: false });
      setOpenDialog(false);
      setNewLocation("");
    }
  };
  const handleAddNewProject = async () => {
    setSaving({ ...saving, projectSaving: true });
    if (!newProject.trim()) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Project Name Required!",
      }); // triggers the warning
      return;
    }
    const { data, error } = await supabase
      .from("customers")
      .insert([{ name: newProject.trim() }])
      .select();
    if (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "error saving project name",
      });
      setSaving({ ...saving, projectSaving: false });
      setOpenDialog(false);
      setNewProject("");
    } else {
      setSnackbar({
        open: true,
        type: "success",
        message: "New Project Saved!",
      });
      setSaving({ ...saving, projectSaving: false });
      setOpenDialog(false);
      setNewProject("");
      await fetch();
    }
  };
  const handleEdit = async (id) => {
    try {
      const projectEditName = editProjectName.name.trim();
      if (!projectEditName) {
        return setSnackbar({
          open: true,
          type: "warning",
          message: "Dont leave field empty!",
        });
      }
      const { data, error } = await supabase
        .from("customers")
        .update({ name: projectEditName })
        .eq("id", id)
        .select();
      if (error) console.error("error: ", error);
      setSnackbar({
        open: true,
        type: "success",
        message: "Edit Successful!",
      });
      setEditProjectName({
        id: "",
        name: "",
      });
      await fetch();
    } catch (e) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Error Editing Project Name",
      });
    } finally {
    }
  };
  const handleDelete = async (id) => {
    try {
      setOpenDeleteDialog((prev) => ({ ...prev, updating: true }));

      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) console.error(error);
      setSnackbar({
        open: true,
        type: "success",
        message: "Successfully Deleted",
      });
      await fetch();
      setEditProjectName({
        id: "",
        name: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Error Editing Project Name",
      });
    } finally {
      setOpenDeleteDialog((prev) => ({
        ...prev,
        updating: false,
        open: false,
      }));
    }
  };
  if (loading) {
    return (
      <Box className="flex justify-center items-center h-[80vh]">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className=" flex flex-col justify-center items-center gap-3.5 h-fit lg:grid lg:grid-cols-[minmax(200px,350px)_minmax(200px,350px)] xl:gap-[20px] rounded-2xl  max-w-full ">
      {location.pathname === "/inventory" && (
        <div
          className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl"
          onClick={() => navigate("/inventory/item_summary")}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z"
              stroke="black"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z"
              stroke="black"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-light text-[16px]">
            <span>General</span>
          </div>
        </div>
      )}
      {data && data.length > 0 ? (
        data.map((p, index) => (
          <div
            key={index}
            className="flex w-full h-[80px] max-sm:h-[60px] bg-white rounded-[10px] p-5 max-sm:p-3
      hover:bg-[rgba(233,223,195,.7)]
      active:bg-amber-200 active:scale-97 shadow-2xl"
            onClick={() => handleClick(p.name)}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546 7 37.3333 11.1787 37.3333 16.3333Z"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-light text-[15px]">
              <span>{p.name}</span>
            </div>

            {/* TRIPLE DOT */}
            <div className="ml-auto">
              <IconButton onClick={(e) => handleMenuOpen(e, p)} size="small">
                <MoreVertIcon />
              </IconButton>
            </div>

            {/* MENU */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ mt: 1 }}
              slotProps={{
                paper: {
                  sx: {
                    boxShadow: 1,
                  },
                },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  setDialogMode("edit");
                  setEditProjectName((prev) => ({
                    ...prev,
                    id: selectedProject?.id,
                    name: selectedProject?.name,
                  }));
                  setOpenDialog(true);
                  e.stopPropagation();
                  handleMenuClose();
                  console.log("Edit", selectedProject);
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText>Edit</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={(e) => {
                  setEditProjectName((prev) => ({
                    ...prev,
                    id: selectedProject?.id,
                    name: selectedProject?.name,
                  }));
                  e.stopPropagation();
                  handleMenuClose();
                  setOpenDeleteDialog((prev) => ({ ...prev, open: true }));
                  console.log("Delete: ", selectedProject);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>

                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ))
      ) : (
        <div
          className="w-full h-[120px] rounded-[10px] bg-white shadow-2xl
    flex items-center justify-center text-gray-400 text-sm"
        >
          No projects found
        </div>
      )}

      <div
        className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl"
        onClick={() => {
          setDialogMode("add");
          setOpenDialog(true);
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-light text-[15px]">
          <span>
            {location.pathname === "/inventory"
              ? "ADD NEW LOCATION"
              : "ADD NEW PROJECT"}
          </span>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => {
          location.pathname === "/inventory"
            ? setNewLocation("")
            : setNewProject("");
          setOpenDialog(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "edit"
            ? "Edit Project Name"
            : location.pathname === "/inventory"
              ? "ADD NEW LOCATION"
              : "ADD NEW PROJECT"}
        </DialogTitle>
        <DialogContent>
          {/* 👇 New Section: Show current locations/projects */}
          {dialogMode === "edit"
            ? ""
            : location.pathname === "/inventory" && (
                <Box sx={{ maxHeight: 200, overflowY: "auto", mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Current Locations Listed:
                  </Typography>
                  <List dense>
                    {(locations || []).map((item) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
          <FormControl fullWidth>
            <TextField
              fullWidth
              label={
                dialogMode === "edit"
                  ? "Edit Project Name"
                  : location.pathname === "/inventory"
                    ? "Location Name"
                    : "Project Name"
              }
              name="name"
              value={
                dialogMode === "edit"
                  ? editProjectName.name
                  : location.pathname === "/inventory"
                    ? newLocation
                    : newProject
              }
              onChange={(e) => {
                if (dialogMode === "edit") {
                  setEditProjectName((prev) => ({
                    ...prev,
                    name: e.target.value ?? "",
                  }));
                } else {
                  location.pathname === "/inventory"
                    ? setNewLocation(e.target.value)
                    : setNewProject(e.target.value);
                }
              }}
              required
            ></TextField>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={
              dialogMode === "edit"
                ? async () => {
                    await handleEdit(editProjectName?.id);
                    console.log("UPDATED:", editProjectName);

                    // future update query here

                    setOpenDialog(false);
                  }
                : location.pathname === "/inventory"
                  ? handleNewLocation
                  : handleAddNewProject
            }
            disabled={setSaving.projectSaving}
          >
            Save
          </Button>
          <Button
            variant=""
            onClick={() => {
              location.pathname === "/inventory"
                ? setNewLocation("")
                : setNewProject("");
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
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
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <ConfirmDeleteCancel
        open={openDeleteDialog.open}
        handleCancel={() => setOpenDeleteDialog((p) => ({ ...p, open: false }))}
        handleDelete={() => handleDelete(editProjectName?.id)}
      />
    </div>
  );
};
