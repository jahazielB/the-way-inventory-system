// components/NotificationBell.jsx
import { useEffect, useState } from "react";
import { Badge,Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";

export const NotificationBell = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [approvalCount, setApprovalCount] = useState(2);
  const navigate = useNavigate();

  // 1️⃣ initial fetch
  const fetchLowStock = async () => {
    const { data, error } = await supabase
      .from("item_summary")
      .select("item_id")
      .eq("reorder_notification", true);
      if (error) {
        console.error("Error fetching low stock count:", error);
        return;
      }
    setLowStockCount(data?.length||0);
  };

  useEffect(() => {
    fetchLowStock();

    // 2️⃣ realtime subscription
    const channel = supabase
      .channel("realtime-low-stock")
      .on(
        "postgres_changes",
        {
          event: "*", // listen to inserts/updates/deletes
          schema: "public",
          table: "stock_out",
        },
        () => {
          // any change -> refetch count
          fetchLowStock();
        }
      ).on(
        "postgres_changes",
        {
          event: "*", // listen to inserts/updates/deletes
          schema: "public",
          table: "stock_in",
        },
        () => {
          // any change -> refetch count
          fetchLowStock();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div
      className="flex items-center gap-2 mb-2 cursor-pointer active:bg-amber-600 hover:bg-[rgba(107,107,182,0.9)] rounded-4xl"
      onClick={() => navigate("/notifications")}
    >
    <Tooltip
      title={`${lowStockCount} needs reorder, ${approvalCount} approval request`}
      arrow
      placement="right"
    >
      <Badge
        badgeContent={lowStockCount+approvalCount}
        color="error"
        overlap="circular"
        invisible={lowStockCount === 0}
      >
        <NotificationsIcon style={{ color: "#0118D8" }} />
      </Badge>
      <span>Notifications</span>
      </Tooltip>
    </div>
  );
};
