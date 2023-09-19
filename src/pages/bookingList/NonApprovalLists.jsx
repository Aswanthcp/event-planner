

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

import NonApprovedBookingList from "../../components/bookingList/NonApprovedBooking";

const NonApprovedItemBookingListPage = () => {

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />
      <div className="listContainer">
       <NonApprovedBookingList/>
      </div>
    </div>
  );
};

export default NonApprovedItemBookingListPage;
