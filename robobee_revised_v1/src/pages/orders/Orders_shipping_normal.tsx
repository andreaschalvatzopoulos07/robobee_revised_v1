import React from "react";
import Grid from "@mui/material/Grid2";
import config from "../../../config.json";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

interface OrdersShippingNormal {
  contentRef: React.RefObject<HTMLDivElement>;
  selectedOrder: {
    id: number;
    total: string;
    customer_note: string;
    date_created: string;
    payment_method: string;
    shipping: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
    billing: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
      email: string;
      phone: string;
    };
    // Add other properties of selectedOrder here
  };
}

const Orders_shipping_normal: React.FC<OrdersShippingNormal> = ({
  contentRef,
  selectedOrder,
}) => {
  const VITE_API_KATASTIMA = config.VITE_API_KATASTIMA;
  const VITE_API_SINODEUTIKO_APOSTOLIS_GT =
    config.VITE_API_SINODEUTIKO_APOSTOLIS_GT;
  const VITE_API_PHONE1 = config.VITE_API_PHONE1;
  const VITE_API_AFM1 = config.VITE_API_AFM1;
  const VITE_API_NAME1 = config.VITE_API_NAME1;
  const VITE_API_ADDR1 = config.VITE_API_ADDR1;
  const VITE_API_EMAIL = config.VITE_API_EMAIL;
  const VITE_API_EPISTROFI = config.VITE_API_EPISTROFI;

  return (
    <div
      ref={contentRef}
      style={{
        position: "absolute",
        // top: "-10000px",
        // left: "-10000px",
        width: "180mm", // Match A4 width
        height: "auto",
        background: "#fff",
        padding: "20px",
      }}
    >
      <Grid container size={12}>
        <Grid
          size={1}
          height={300}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 40,
              pb: 2,
              transform: "rotate(-90deg)",
            }}
          >
            RB{dayjs(selectedOrder.date_created).format("YYYY")}-
            {selectedOrder.id}
          </Typography>
        </Grid>
        <Grid size={11}>
          <Grid container size={12}>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: 14,
                  textAlign: "left",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                {VITE_API_KATASTIMA}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ fontSize: 10, textAlign: "right" }}>
                {VITE_API_SINODEUTIKO_APOSTOLIS_GT}
              </Typography>
            </Grid>
          </Grid>
          <Grid container size={12} sx={{ mt: 1 }}>
            <Grid size={4}>
              <Typography sx={{ fontSize: 10, textAlign: "left" }}>
                {VITE_API_NAME1} <br />
                Δ:&nbsp;{VITE_API_ADDR1} <br />
                Email:&nbsp;{VITE_API_EMAIL} <br /> T:&nbsp;{VITE_API_PHONE1}{" "}
                <br /> ΑΦΜ:&nbsp;{VITE_API_AFM1}
              </Typography>
            </Grid>
            <Grid size={8} sx={{ textAlign: "right" }}>
              <img
                src="logo.png"
                alt="React Image"
                style={{
                  border: 1,
                  borderStyle: "none",
                  width: "300px",
                  marginBottom: 10,
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{ border: "1px solid", color: "blue", width: "100%" }}
          ></div>
          <Grid container size={12}>
            <Grid size={6} sx={{ border: "1px solid", mt: 1, p: 1 }}>
              <Typography
                sx={{
                  fontSize: 10,
                  textAlign: "left",
                  textDecoration: "underline",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                Στοιχεία Αποστολής
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                {selectedOrder.shipping.company} <br />
                {selectedOrder.shipping.last_name}{" "}
                {selectedOrder.shipping.first_name} <br />
                {selectedOrder.shipping.address_1} -{" "}
                {selectedOrder.shipping.postcode} <br />
                {selectedOrder.shipping.city} <br />
                {selectedOrder.billing.phone} <br />
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  textAlign: "left",
                  textDecoration: "underline",
                  color: "blue",
                  mt: 1,
                  fontWeight: "bold",
                }}
              >
                Σχόλια
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  textAlign: "left",
                }}
              >
                {selectedOrder.customer_note}
              </Typography>
            </Grid>
            <Grid container size={6}>
              <Grid
                size={12}
                sx={{
                  p: 1,
                  mt: 1,
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    textDecoration: "underline",
                    color: "blue",
                    m: 1,
                  }}
                >
                  Ημερομηνία Παραγγελίας:
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                    m: 1,
                    fontWeight: "bold",
                  }}
                >
                  {dayjs(selectedOrder.date_created).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
              <Grid
                size={12}
                sx={{
                  border: "1px solid",
                  color: "blue",
                  m: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {selectedOrder.payment_method === "cod"
                    ? `ΑΝΤΙΚΑΤΑΒΟΛΗ: ${selectedOrder.total} € `
                    : "ΠΛΗΡΩΜΕΝΟ"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container size={12} sx={{ border: "1px solid", mt: 1, p: 1 }}>
            <Typography
              sx={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              {VITE_API_EPISTROFI}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Orders_shipping_normal;
