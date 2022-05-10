import * as React from "react";

import { Modal, Button } from "antd";
import { Card, CardMedia, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import theaters from "./movieTheaters.json";

export default function MovieBooking(props) {

  const [bookingDetails, setBookingDetails] = React.useState({
    movieImg: props.imgSrc,
    movieName: props.name,
    bookingDate: new Date(),
    theater: "",
    bookedTime: "",
    noOfTickets: "",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleDateOnChange = (e) => {
    setBookingDetails({ ...bookingDetails, bookingDate: e });
    console.log("b detaisl", bookingDetails);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
    console.log("b detaisl", bookingDetails);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the input forms
    const errorsFoundFromValidation = validate(bookingDetails);
    setFormErrors(errorsFoundFromValidation);
    setIsSubmit(true);
    console.log("form", bookingDetails);
  };
  const validate = (values) => {
    let errors = {};
    if (!values.bookingDate) {
      errors.date = "Pls select the booking date";
    }
    if (!values.theater) {
      errors.theater = "Pls select a theater";
    }
    if (!values.bookedTime) {
      errors.time = "Pls select the show-time";
    }
    if (!values.noOfTickets) {
      errors.tickets = "Pls enter the no of tickets";
    }
    return errors;
  };

  React.useEffect(() => {
    console.log("errr", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.closeModal();
      console.log("formvalues", bookingDetails);
    }
  }, [formErrors]);

  return (
    <div>
      <Modal
        className="movie-booking-modal"
        title="Basic Modal"
        visible={true}
        onOk={props.closeModal}
        onCancel={props.closeModal}
        footer={[
          <Button key="cancel" type="default" onClick={props.closeModal}>
            CANCEL
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            ADD TO CART
          </Button>,
        ]}
      >
        <Card>
          <CardMedia
            className="movie-img"
            component="img"
            alt="movie img"
            height="2780px"
            src={props.imgSrc}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={2} className="input-stack">
                      <div className="movie-name-label" >
            <h5>{"Movie - " + props.name}</h5>
            {props.genres.map((genre) => (
              <span key={props.genres.indexOf(genre)}>{genre + ", "}</span>
            ))}
          </div>
              <DesktopDatePicker
                name="bookingDate"
                label="Date of booking"
                inputFormat="MM/dd/yyyy"
                value={bookingDetails.bookingDate}
                onChange={handleDateOnChange}
                renderInput={(params) => <TextField {...params} />}
                error={formErrors.date}
              />
              {/* <span>{formErrors.date}</span> */}
              {/* cinema hall */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="theater-input-label">
                    Movie Theater
                  </InputLabel>
                  <Select
                    name="theater"
                    labelId="theater-input-label"
                    id="theater-input"
                    value={bookingDetails.theater}
                    label="Movie Theater"
                    onChange={handleOnChange}
                    error={formErrors.theater}
                  >
                    {theaters.map((theater) => (
                      <MenuItem key={theater.id} value={theater.theater_name}>
                        {theater.theater_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <span>{formErrors.theater}</span> */}
              </Box>
              {/* show time */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="show-time-input-label">Show Time</InputLabel>
                  <Select
                    name="bookedTime"
                    labelId="show-time-input-label"
                    id="show-time-input"
                    value={bookingDetails.bookedTime}
                    label="Show Time"
                    onChange={handleOnChange}
                    error={formErrors.time}
                  >
                    <MenuItem value="9.00 AM">9.00 AM</MenuItem>
                    <MenuItem value="2.30 PM">2.30 PM</MenuItem>
                    <MenuItem value="4.30 PM">4.30 PM</MenuItem>
                    <MenuItem value="6.30 PM">6.30 PM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* <span>{formErrors.time}</span> */}
              {/* no of tickets */}
              <TextField
                name="noOfTickets"
                value={bookingDetails.noOfTickets}
                label="No of tickets"
                type="number"
                onChange={handleOnChange}
                error={formErrors.tickets}
              />
              {/* <span>{formErrors.tickets}</span> */}
            </Stack>
          </LocalizationProvider>
        </Card>
      </Modal>
    </div>
  );
}
