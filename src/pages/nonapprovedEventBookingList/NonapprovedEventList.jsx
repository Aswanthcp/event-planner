import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { nonapprovedEventBookings } from "../../utils/Constants";

import "./style.scss"; // Assuming you have a CSS file for this component

import NonapprovedEventBookingList from "../../components/bookingList/NonapprovalEventBooking";

const NonApproveEventBookingListPage = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <div className="listContainer">
        <NonapprovedEventBookingList url={nonapprovedEventBookings} />
      </div>
    </div>
  );
};

export default NonApproveEventBookingListPage;
