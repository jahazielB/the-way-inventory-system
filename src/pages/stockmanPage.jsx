import { Card, CardContent, Typography, 
Chip, Divider, Stack, IconButton, Box,CircularProgress,
Menu,MenuItem,ListItemIcon,ListItemText } from "@mui/material";
import { Logout, Inventory, AccountCircle,MoveToInbox, Outbox} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import  { useState, useEffect, useRef } from "react";
import supabase from "../supabase-client";

export const StockManPage = () => {
  const navigate = useNavigate();
  const [lowStockItems, setLowStockItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [user,setUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const [fetchedRequest,setFetchedRequest] = useState([])
  const containerRef = useRef(null);


  const ITEMS_PER_PAGE = 5;
  const open = Boolean(anchorEl);

  const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  return user;
};

  const fetchUser = async ()=>{
    const user = await getCurrentUser();
    if (!user) return;
    const {data,error} = await supabase
        .from("users")
        .select("profile_name,role,id")
        .eq("id",user.id)
        .single();
    if (error) console.error(error)
    else {
    setUser(data)
    
   
}
  }
  const fetchRequest = async ()=>{
    const user = await getCurrentUser();
    if (!user) return;
    const {data:approvals_view,error} = await supabase
        .from('approvals_view')
        .select("item_name,quantity,unit,action_type,status")
        .eq("requested_by",user.id);
    if (error) console.error("error: ", error)
    else {
    
    setFetchedRequest(approvals_view)
}
  }

  // 🔹 Fetch low stock items from Supabase
  const fetchLowStock = async (pageNum) => {
    setLoading(true);
    const start = (pageNum - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    const { data, error } = await supabase
      .from("item_summary")
      .select("item_id, item_name, unit, balance, reorder_point, location_name, customers")
      .eq("reorder_notification", true)
      .range(start, end); // pagination

    if (error) {
      console.error("Error fetching low stock items:", error);
      setLoading(false)
      return;
    } 
    if (!data || data.length === 0) {
    setHasMore(false);
    setLoading(false);
    return;
  }
    if (data.length < ITEMS_PER_PAGE) setHasMore(false);

      // Append new data to existing list
    setLowStockItems((prev) => [...prev, ...data]);
    

    setLoading(false);
  };

  useEffect(() => {
    fetchLowStock(page);
    fetchUser()
    fetchRequest()
  }, [page]);

  // 🔹 Detect scroll bottom
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || loading || !hasMore) return;

      const isBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10;

      if (isBottom) setPage((prev) => prev + 1);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const myRequests = [
    { item_name: "Torpedo Divers", action_type: "stock_out", quantity: 20, status: "pending" },
    { item_name: "Warrior Lures", action_type: "stock_in", quantity: 50, status: "approved" },
    { item_name: "Warrior Lures", action_type: "stock_in", quantity: 50, status: "approved" },
    { item_name: "Warrior Lures", action_type: "stock_in", quantity: 50, status: "approved" },
    { item_name: "Warrior Lures", action_type: "stock_in", quantity: 50, status: "approved" }
  ];
   const handleLogout = async () => {
         
         if (user.id) {
             await supabase
                  .from("users")
                  .update({ is_logged_in: false, last_active:null })
                  .eq("id", user.id);
           }
        await supabase.auth.signOut();
       
        window.location.href = "/login";
      };

  return (
    <div className="p-6 relative min-h-screen overflow-hidden font-jakarta bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-black text-blue-700">THE WAY</h1>
          <p className="text-[12px] text-gray-600">{`Welcome, ${user?.profile_name||"Unable to fetch User"}`}</p>
        </div>

        <div className="flex gap-2">
          <IconButton color="primary" onClick={(event) => setAnchorEl(event.currentTarget)}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={()=>setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: 1 }}
            >
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
            </Menu>
          <IconButton color="primary"  onClick={() => navigate('/user/ReleaseOrReplenish')}>
            <Inventory />
          </IconButton>

        </div>
      </div>

      {/* Two Cards Section */}
      <div className="p-4 flex flex-col md:flex-row gap-6 relative z-10">
        {/* LOW STOCK CARD */}
        <Card
      sx={{
        flex: 1,
        borderRadius: 3,
        boxShadow: 2,
        backdropFilter: "blur(3px)",
        maxHeight: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, overflowY: "auto" }} ref={containerRef}>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h6" color="primary">
            Low Stock Items
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            needs reorder
          </Typography> */}
        </div>

        <Divider sx={{ mb: 2 }} />

        {lowStockItems.length === 0 && !loading ? (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            All stocks are sufficient ✅
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {lowStockItems.map((item,index) => (
              <Box
                key={`${item.item_id}-${index}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  "&:hover": { bgcolor: "#ececec" },
                }}
              >
                <Typography fontWeight={500}>{item.item_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.balance} {item.unit}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!hasMore && !loading && lowStockItems.length > 0 && (
          <Typography
            textAlign="center"
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            No more items 📦
          </Typography>
        )}
      </CardContent>
    </Card>

        {/* APPROVAL REQUESTS CARD */}
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 2, backdropFilter: "blur(3px)" }}>
          <CardContent >
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h9" color="primary">
                My Approval Requests
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fetchedRequest.length} request{fetchedRequest.length !== 1 ? "s" : ""}
              </Typography>
            </div>
            <Divider sx={{ mb: 1 }} />

            {fetchedRequest.length === 0 ? (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                No requests submitted yet
              </Typography>
            ) : (
              <Stack sx={{ maxHeight: 200, overflowY: "auto" }} spacing={1.1}>
                {fetchedRequest.map((r, i) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      "&:hover": { bgcolor: "#ececec" },
                    }}
                  >
                    <Box>
                      <Typography fontWeight={500}>{r.item_name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {r.action_type} – {r.quantity} {r.unit}
                      </Typography>
                    </Box>
                    <Chip
                      label={r.status.toUpperCase()}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          r.status === "pending"
                            ? "#FFF3CD"
                            : r.status === "approved"
                            ? "#D1E7DD"
                            : "#F8D7DA",
                        color:
                          r.status === "pending"
                            ? "#856404"
                            : r.status === "approved"
                            ? "#0F5132"
                            : "#842029",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </div>
    {/* Bottom SVG Background */}
        <svg
        className="absolute bottom-0 left-0 w-full h-[500px] "
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        >
        <path
            d="M566.538 295.267C623.357 507.32 497.516 725.284 285.463 782.103C73.4103 838.922 -144.554 713.081 -201.373 501.028C-258.192 288.975 -132.351 71.0113 79.702 14.192C291.755 -42.6274 509.719 83.2141 566.538 295.267Z"
            fill="#0118D8"
        />
        <path
            d="M573.914 322.796C632.092 539.916 533.731 754.92 354.22 803.02C174.708 851.12 -17.9764 714.102 -76.1537 496.981C-134.331 279.86 -35.9704 64.8565 143.541 16.7565C323.052 -31.3434 515.737 105.675 573.914 322.796Z"
            fill="#1B56FD"
        />
        </svg>


    </div>
  );
};
