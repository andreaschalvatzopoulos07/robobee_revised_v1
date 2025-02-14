import { Typography, Box, Stack, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

import config from "../../config.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

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
        const response = await axios.get(`${API_URL}/system_status`, {
          // Fixed URL string interpolation
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
          <Fab
            color="success"
            variant="extended"
            aria-label="add"
            size="small"
            sx={{textTransform: "none", width: '150px' }}
            onClick={() => navigate("/")}
          > <HomeTwoToneIcon /> &nbsp;
            Αρχική
          </Fab>
          <Fab
            color="secondary"
            variant="extended"
            aria-label="add"
            size="small"
            sx={{textTransform: "none", width: '150px' }}
            onClick={() => navigate("/customers")}
          ><PeopleAltTwoToneIcon /> &nbsp; 
            Πελάτες
          </Fab>
          <Fab color="info"
            variant="extended"
            aria-label="add"
            size="small"
            onClick={() => navigate("/ordersAll")}
            sx={{textTransform: "none", width: '150px' }}>
              <ListAltTwoToneIcon /> &nbsp;
            Παραγγελίες
          </Fab>
          <Fab color="error"
            variant="extended"
            aria-label="add"
            size="small"
            onClick={() => navigate("/settings")}
            sx={{textTransform: "none", width: '150px' }}>
              <SettingsTwoToneIcon /> &nbsp;
            Ρυθμίσεις
          </Fab>
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
