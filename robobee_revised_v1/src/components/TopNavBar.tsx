import { Typography, Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

import config from "../../config.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_URL = config.VITE_API_URL;

function TopNavbar() {
  const navigate = useNavigate();
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
      <Grid size="grow">
      <Stack spacing={2} direction="row">
        <Button variant="text" sx={{textTransform: "none" }} onClick={() => navigate("/")}>
          Αρχική
        </Button>
        <Button variant="text" sx={{textTransform: "none" }} onClick={() => navigate("/customers")}>
          Πελάτες
        </Button>
        <Button variant="text" sx={{textTransform: "none" }}>
          ΤΒΑ
        </Button>
        </Stack>
      </Grid>
      <Grid>
        <Typography sx={{ fontSize: 12, textAlign: "right" }}>
          Server Status: {status === "online" ? "🟢 Online" : "🔴 Offline"}
          <br />
          Application Version: {API_VERSION}
        </Typography>
      </Grid>
    </Box>
  );
}

export default TopNavbar;
