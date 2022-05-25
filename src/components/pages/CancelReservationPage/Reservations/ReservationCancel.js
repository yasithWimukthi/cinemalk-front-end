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
//import res from "./reservations.json";
import {deleteReservation, getReservationsByUserId} from "../../../../API/Reservation pages/ReservationCancelAPI";

const ReservationCancel = () => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [loadedReservations, setLoadedReservations] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteReservation("/api/reservations/", id)
      .then((res) => {
        console.log("ress", res.data);
        window.location.reload();
        getAllReservations();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getData = () => {};
  useEffect(() => {
    getData();
  }, []);

  // Retrieve reservation data from backend
  const uid = localStorage.getItem('user_id');

  const getAllReservations = () => {
    getReservationsByUserId("/api/reservations/", uid)
      .then((res) => {
        setLoadedReservations(res.data.data.bookings);
        setCustomerDetails(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div className="ResCancelPage">
      <div className="ResCancelHeader">
        <center>
          <h4>Cancel Reservations</h4>
        </center>
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
            <th><center> Actions</center></th>
          </tr>
        </thead>
        <tbody>
          {loadedReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation._id}</td>
              <td> {customerDetails.firstName+" "+customerDetails.lastName}</td>
              <td>{reservation.movieName}</td>
              <td>{reservation.theater}</td>
              <td>{reservation.bookingDate}</td>
              <td>{reservation.bookedTime}</td>
              <td>{reservation.noOfTickets}</td>
              <td>
                <center>
                  {" "}
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                  >
                    Delete
                  </Button>
                </center>
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
                    <Button
                      onClick={() => handleDelete(reservation._id)}
                      color="error"
                    >
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
