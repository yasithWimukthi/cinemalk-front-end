import React, { useState, useEffect } from "react";
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
import res from "./reservations.json";

const ReservationCancel = () => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const getData = () => {};
  useEffect(() => {
    getData();
  }, []);

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
          {res.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td> {item.cusName}</td>
              <td>{item.movieName}</td>
              <td>{item.theatre}</td>
              <td>{item.date}</td>
              <td>{item.showTime}</td>
              <td>{item.seats}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ReservationCancel;
