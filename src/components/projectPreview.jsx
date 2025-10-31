import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Divider, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ProjectPreview = ({fetchApprovals}) => {
  const navigate = useNavigate();



  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1, height: 260 }}>
      <CardContent sx={{ p: 3, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Approval Requests</Typography>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/notifications")}
          >
            See All Notifications →
          </Typography>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Table */}
        {fetchApprovals?.length === 0  ? (
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              py: 5,
              fontSize: 13,
              fontStyle: "italic",
            }}
          >
            No approval requests
          </Typography>
        ) : (
          <Box
            sx={{
              pr: 1,
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 3,
              },
            }}
          >
            <Stack sx={{ maxHeight: 150, overflowY: "auto" }} divider={<Divider />} spacing={0}>
              {fetchApprovals.map((a, i) => (
                <Box
                  key={i}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  py={1.5}
                >
                  {/* Status */}
                  <Box display="flex" alignItems="center" gap={1} sx={{ width: "25%" }}>
                    <Chip
                    label={a.status.toUpperCase()}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor:
                        a.status.toLowerCase() === "pending"
                          ? "#FFF3CD"
                          : a.status.toLowerCase() === "approved"
                          ? "#D1E7DD"
                          : "#F8D7DA",
                      color:
                        a.status.toLowerCase() === "pending"
                          ? "#856404"
                          : a.status.toLowerCase() === "approved"
                          ? "#0F5132"
                          : "#842029",
                      borderRadius: "9999px",
                      px: 1.5,
                      fontSize: 11,
                    }}
                  />

                  </Box>

                  {/* Item Name */}
                  <Box sx={{ width: "25%", fontWeight: 600, fontSize: { xs: 12, md: 15 } }}>
                    {a.item_name}
                  </Box>

                  {/* Quantity */}
                  <Box sx={{ width: "25%", fontWeight: 600, fontSize: { xs: 12, md: 15 } }}>
                    {a.quantity} {a.unit}
                  </Box>

                  {/* Approved By / Stage */}
                  <Box sx={{ width: "25%", color: "text.secondary", fontSize: { xs: 10, md: 13 } }}>
                    {a.requested_by_name}
                  </Box>

                  {/* Menu dots */}
                  <Typography sx={{ width: 24, color: "text.disabled", cursor: "pointer" }}>
                    ⋯
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
