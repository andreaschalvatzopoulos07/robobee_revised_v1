//NA PROSTHESW TIN ETAIRIA STA STOIXEIA

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../../config.json";
import {
  Badge,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  CircularProgress,
  Stack,
} from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import DvrIcon from "@mui/icons-material/Dvr";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Orders_shipping from "./Orders_shipping";

function OrdersAll() {
  const API_URL = config.VITE_API_URL;
  const API_CS = config.VITE_API_CS;
  const API_CK = config.VITE_API_CK;
  interface Order {
    id: number;
    status: string;
    date_created: string;
    total: string;
    payment_method_title: string;
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
    payment_method: string;
    date_paid: string;
    date_paid_gmt: string;
    date_completed: string | null;
    date_completed_gmt: string | null;
    cart_hash: string;
    shipping_total: string;
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
    customer_note: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  //==========================================================

  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [gridSize1, setGridSize1] = useState(12);
  const [gridSize2, setGridSize2] = useState(0);
  const [marginRight, setMarginRight] = useState(0);

  const handleDownloadAndPrintPdf = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210 - marginRight; // A4 width minus margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Άνοιγμα του PDF σε νέο παράθυρο και εκτύπωση
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl);

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  const handlePrintButtonClick = (
    gridSize1: number,
    gridSize2: number,
    marginRight: number
  ) => {
    setGridSize1(gridSize1);
    setGridSize2(gridSize2);
    setMarginRight(marginRight);
    setTimeout(handleDownloadAndPrintPdf, 100); // Ensure state updates before printing
  };

  //==========================================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`, {
          auth: {
            username: API_CK,
            password: API_CS,
          },
          params: {
            per_page: 50,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_CK, API_CS, API_URL]);

  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  );

  const rows = processingOrders.map((order) => ({
    id: order.id,
    status: order.status,
    payment_method_title: order.payment_method_title,
    order_total: order.total,
    date_created: order.date_created,
    billing: order.billing,
  }));

  const handleOrderClick = (order: Order) => {
    console.log(order);
    setSelectedOrder(order);
  };

  const calculateTotalPrice = (lineItems: Order["line_items"]) => {
    return lineItems
      .reduce((total, item) => total + parseFloat(item.total), 0)
      .toFixed(2);
  };

  const calculateTotalTax = (lineItems: Order["line_items"]) => {
    return lineItems
      .reduce((total, item) => total + parseFloat(item.total_tax), 0)
      .toFixed(2);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={2} sx={{ mt: 20, p: 1 }}>
          <Stack spacing={2}>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              sx={{ textTransform: "none", width: "200px" }}
              onClick={() => console.log("123")}
            >
              &nbsp; Επεξεργασία
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              sx={{ textTransform: "none", width: "200px" }}
              onClick={() => console.log("123")}
            >
              &nbsp; Σε αναμονή
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              sx={{ textTransform: "none", width: "200px" }}
              onClick={() => console.log("123")}
            >
              &nbsp; Ολοκληρώθηκε
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              onClick={() => console.log("123")}
              sx={{ textTransform: "none", width: "200px" }}
            >
              &nbsp; Ακυρώθηκε
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              onClick={() => console.log("123")}
              sx={{ textTransform: "none", width: "200px" }}
            >
              &nbsp; Επιστράφηκε
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              onClick={() => console.log("123")}
              sx={{ textTransform: "none", width: "200px" }}
            >
              &nbsp; Απέτυχε
            </Fab>
            <Fab
              color="info"
              variant="extended"
              aria-label="add"
              size="small"
              onClick={() => console.log("123")}
              sx={{ textTransform: "none", width: "200px" }}
            >
              &nbsp; Σκουπίδια
            </Fab>
          </Stack>
        </Grid>
        <Grid size={8}>
          {selectedOrder && (
            <Box component="form" noValidate autoComplete="off">
              <Typography variant="h6" sx={{ mt: 2 }}>
                Πληροφορίες Χρέωσης
              </Typography>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Όνομα"
                    value={`${selectedOrder.billing.first_name} ${selectedOrder.billing.last_name}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Διεύθυνση"
                    value={`${selectedOrder.billing.address_1}, ${selectedOrder.billing.city}, ${selectedOrder.billing.state}, ${selectedOrder.billing.postcode}, ${selectedOrder.billing.country}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Email"
                    value={selectedOrder.billing.email}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Τηλέφωνο"
                    value={selectedOrder.billing.phone}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
              </Grid>
              <div
                style={{ border: "2px solid", color: "crimson", width: "100%" }}
              ></div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Πληροφορίες Αποστολής
              </Typography>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Όνομα"
                    value={`${selectedOrder.shipping.first_name} ${selectedOrder.shipping.last_name}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Διεύθυνση"
                    value={`${selectedOrder.shipping.address_1}, ${selectedOrder.shipping.city}, ${selectedOrder.shipping.state}, ${selectedOrder.shipping.postcode}, ${selectedOrder.shipping.country}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <div
                  style={{
                    border: "2px solid",
                    color: "crimson",
                    width: "100%",
                  }}
                ></div>
              </Grid>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Σημείωση Πελάτη
              </Typography>
              <TextField
                label="Σημείωση Πελάτη"
                value={selectedOrder.customer_note}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                  style: { fontSize: 12 },
                }}
              />
              <div
                style={{ border: "2px solid", color: "crimson", width: "100%" }}
              ></div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Στοιχεία Παραγγελίας
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SKU</TableCell>
                      <TableCell>Προϊόν</TableCell>
                      <TableCell>Ποσότητα</TableCell>
                      <TableCell>Τιμή</TableCell>
                      <TableCell>Φόρος Υποσυνόλου</TableCell>
                      <TableCell>Συνολική Τιμή</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.line_items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.subtotal}</TableCell>
                        <TableCell>{item.subtotal_tax}</TableCell>
                        <TableCell>
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
              <div
                style={{ border: "2px solid", color: "crimson", width: "100%" }}
              ></div>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={3}>
                  <TextField
                    label="Συνολική Τιμή Προϊόντων (χωρίς ΦΠΑ)"
                    value={`${calculateTotalPrice(selectedOrder.line_items)}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={3}>
                  <TextField
                    label="Συνολικός Φόρος"
                    value={`${calculateTotalTax(selectedOrder.line_items)}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={3}>
                  <TextField
                    label="Μεταφορικά"
                    value={`${selectedOrder.shipping_total}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
                <Grid size={3}>
                  <TextField
                    label="Συνολική Τιμή"
                    value={`${selectedOrder.total}`}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 12 },
                    }}
                  />
                </Grid>
              </Grid>
              <div
                style={{ border: "2px solid", color: "crimson", width: "100%" }}
              ></div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Επιλογές
              </Typography>
              <Grid size={12} sx={{ textAlign: "right" }}>
                <Fab
                  onClick={() => handlePrintButtonClick(12, 0, 0)}
                  color="success"
                  variant="extended"
                  aria-label="add"
                  sx={{ m: 2, textTransform: "none" }}
                >
                  <LocalShippingIcon />
                  &nbsp; Αυτοκόλλητο Μεγάλο
                </Fab>
                <Fab
                  onClick={() => handlePrintButtonClick(9, 0, 4)}
                  color="secondary"
                  variant="extended"
                  aria-label="add"
                  sx={{ m: 2, textTransform: "none" }}
                >
                  <LocalShippingIcon />
                  &nbsp; Αυτοκόλλητο Μικρό
                </Fab>
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid size={2}>
          {loading ? (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              <CircularProgress />
            </Grid>
          ) : rows.length > 0 ? (
            <div>
              <Grid size={12}>
                <Typography sx={{ fontSize: 14, textAlign: "left", m: 2 }}>
                  Παραγγελίες σε εκκρεμότητα:{" "}
                  <Badge badgeContent={rows.length} color="error">
                    <DvrIcon color="action" />
                  </Badge>
                </Typography>
              </Grid>
              <Grid size={12} sx={{ textAlign: "center" }}>
                {processingOrders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      border: "1px solid #000",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOrderClick(order)}
                  >
                    <Typography sx={{ fontSize: 12, textAlign: "left", m: 2 }}>
                      {order.id} - {order.billing.first_name}{" "}
                      {order.billing.last_name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, textAlign: "left", m: 2 }}>
                      {dayjs(order.date_created).format("DD/MM/YYYY")} -{" "}
                      {order.total} - {order.payment_method_title}
                    </Typography>
                  </div>
                ))}
              </Grid>
            </div>
          ) : (
            <Grid size={12}>
              <Typography sx={{ fontSize: 14, textAlign: "left", m: 2 }}>
                Δεν βρέθηκαν νέες παραγγελίες
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {selectedOrder && (
        <Orders_shipping
          gridSize1={gridSize1}
          gridSize2={gridSize2}
          contentRef={contentRef}
          selectedOrder={selectedOrder}
          marginRight={marginRight}
        />
      )}
    </div>
  );
}

export default OrdersAll;
