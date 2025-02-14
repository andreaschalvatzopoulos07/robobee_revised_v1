import React from "react";
import Grid from "@mui/material/Grid2";
import config from "../../../config.json";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

interface OrdersShipping {
  contentRef: React.RefObject<HTMLDivElement>;
  gridSize1: number;
  gridSize2: number;
  marginRight: number;
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
    meta_data: Array<{ id: number; key: string; value: string }>;
    line_items: Array<{
      id: number;
      name: string;
      product_id: number;
      variation_id: number;
      quantity: number;
      tax_class: string;
      subtotal: string;
      subtotal_tax: string;
      total: string;
      total_tax: string;
      taxes: Array<{ id: number; total: string; subtotal: string }>;
      meta_data: Array<{ id: number; key: string; value: string }>;
      sku: string;
      price: number;
    }>;
    shipping_total: string;
    // Add other properties of selectedOrder here
  };
}

const Orders_shipping: React.FC<OrdersShipping> = ({
  contentRef,
  selectedOrder,
  gridSize1,
  gridSize2,
  marginRight,
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
  const tablecellSX = {
    backgroundColor: "#2196f3",
    color: "white",
    fontWeight: "bold",
  };

  const calculateTotalPrice = (
    lineItems: OrdersShipping["selectedOrder"]["line_items"]
  ) => {
    return lineItems
      .reduce((total, item) => total + parseFloat(item.total), 0)
      .toFixed(2);
  };

  const calculateTotalTax = (
    lineItems: OrdersShipping["selectedOrder"]["line_items"]
  ) => {
    return lineItems
      .reduce((total, item) => total + parseFloat(item.total_tax), 0)
      .toFixed(2);
  };

  return (
    <div
      ref={contentRef}
      style={{
        position: "absolute",
        top: "-10000px",
        left: "-10000px",
        width: `calc(210mm - ${marginRight}mm)`, // Match A4 width minus margin
        height: "auto",
        background: "#fff",
        padding: "20px",
        marginRight: `${marginRight}mm`, // Apply margin during printing
      }}
    >
      <Grid container size={gridSize1}>
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
                  flexDirection: "column",
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
                    ? "ΑΝΤΙΚΑΤΑΒΟΛΗ:"
                    : "ΠΛΗΡΩΜΕΝΟ"}
                </Typography>
                {selectedOrder.payment_method === "cod" && (
                  <Typography
                    sx={{
                      fontSize: 20,
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor: 'yellow',
                      pr: 2, pl: 2
                    }}
                  >
                    {selectedOrder.total} €
                  </Typography>
                )}
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
        <Grid container size={12} sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={tablecellSX}>SKU</TableCell>
                  <TableCell sx={tablecellSX}>Προϊόν</TableCell>
                  <TableCell sx={tablecellSX}>Ποσότητα</TableCell>
                  <TableCell sx={tablecellSX}>Συνολική Τιμή</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.line_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{  border: "1px solid",fontSize: 12 }}>{item.sku}</TableCell>
                    <TableCell sx={{  border: "1px solid",fontSize: 12 }}>{item.name}</TableCell>
                    <TableCell sx={{  border: "1px solid",fontSize: 12 }}>{item.quantity}</TableCell>
                    <TableCell sx={{  border: "1px solid",fontSize: 12 }}>
                      {(
                        parseFloat(item.subtotal) +
                        parseFloat(item.subtotal_tax)
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          size={12}
          sx={{
            mt: 2,
            pr: 5,
            justifyContent: "flex-end",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ fontSize: 14 }}>
            Μερικό Σύνολο:&nbsp; &nbsp; {calculateTotalPrice(selectedOrder.line_items)}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            ΦΠΑ:&nbsp; &nbsp; {`${calculateTotalTax(selectedOrder.line_items)}`}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            Μεταφορικά:&nbsp; &nbsp; {`${selectedOrder.shipping_total}`}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: 'crimson' }}>
            Σύνολο:&nbsp; &nbsp; {`${selectedOrder.total}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container size={gridSize2}></Grid>
    </div>
  );
};

export default Orders_shipping;
