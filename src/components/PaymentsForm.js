import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../feature/checkout-slice";

const PaymentsForm = () => {
  const dispatch = useDispatch();
  const payment = useSelector((store) => store.checkout?.payment);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(updatePayment({ [name]: value }));
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Box component="form" onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="name"
              id="name"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              defaultValue={payment.name ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="cardNumber"
              id="cardNumber"
              label="Card Number"
              fullWidth
              autoComplete="cc-name"
              defaultValue={payment.cardNumber ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="expiryDate"
              id="expiryDate"
              label="Expiry Date"
              fullWidth
              autoComplete="cc-exp"
              defaultValue={payment.expiryDate ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="cvv"
              id="cvv"
              label="CVV Number"
              type="password"
              fullWidth
              autoComplete="cc-csc"
              defaultValue={payment.cvv ?? ""}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentsForm;
