import React from "react";
import Navigation from "../../nav_bar/nav";
import Footer from "../../footer/footer";
import ReservationCancel from "../CancelReservationPage/Reservations/ReservationCancel";

const CancelReservation = () => {
  const [load, setload] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setload(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navigation />
        <section id="#reservation" className="section-Reservations">
          <ReservationCancel />
        </section>
        <section id="#footer">
          <Footer />
        </section>
      </div>
    </>
  );
};
export default CancelReservation;
