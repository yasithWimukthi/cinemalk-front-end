import { useState } from "react";
import React from "react";
import "./ReservationCancel.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const ReservationCancel = () => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="ResCancelPage">
      <div className="ResCancelHeader">
        <h4>Cancel Reservations</h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Customer Name</th>
            <th>Movie Name</th>
            <th>Theater</th>
            <th>Date</th>
            <th>Show Time</th>
            <th>No Of Seats Reserved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td> Heshan Fernando</td>
            <td>Spiderman</td>
            <td>Scope Cinema</td>
            <td>5/9/2022</td>
            <td>17.30pm</td>
            <td>45</td>
            <td>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <center>
                  <WarningRoundedIcon sx={{ fontSize: 80 }} color="error" />
                </center>
                <DialogTitle>
                  {"Are you sure to delete this movie reservation?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Once the reservation is deleted it cannot be
                    undone.Therefore, please confirm your deletion!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="error">
                    Delete
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ReservationCancel;
