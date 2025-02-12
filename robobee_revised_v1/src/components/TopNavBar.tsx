import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

import config from "../../config.json";
import axios from "axios";

//const API_URL = config.VITE_API_URL;

function TopNavbar() {
  const [status, setStatus] = useState("offline");
  const API_URL = config.VITE_API_URL;
  const API_VERSION = config.VITE_API_VERSION;
  const API_CS = config.VITE_API_CS;
  const API_CK = config.VITE_API_CK;

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await axios.get(`$${API_URL}/status`, {
          auth: {
            username: API_CK,
            password: API_CS,
          },
        });
        if (response.status === 200) {
          setStatus("online");
        } else {
          setStatus("offline");
        }
      } catch (error) {
        console.error("Error checking API connection:", error);
        setStatus("offline");
      }
    };

    checkApiConnection();
  }, [API_URL, API_CK, API_CS]);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
      <Typography sx={{ fontSize: 12, textAlign: "right" }}>
        Server Status: {status === "online" ? "🟢 Online" : "🔴 Offline"}
        <br />
        Application Version: {API_VERSION}
      </Typography>
    </Box>
  );
}

export default TopNavbar;
