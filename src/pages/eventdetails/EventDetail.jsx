import "./eventdetails.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCordinatorEvent } from "../../utils/Constants";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import EventModal from "../../components/eventModal/EventModal";
import { ToastContainer } from "react-toastify";

const EventDetails = () => {
  const formatDate = (dateString) => {
    const dateStr = "2023-05-11T12:33:00Z";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate; // returns date in a readable format
  };
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [slideNumber, setSlideNumber] = useState(0);
  const [events, setEvents] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const getEvents = async () => {
    axios
      .get(`${getCordinatorEvent}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    getEvents();
  }, []);

  const photos = [
    {
      src: events?.imageUrl,
    },
    {
      src: "https://cdn0.weddingwire.com/article/1127/3_2/960/jpg/17211-0-hero-inessa-nichols-design-wedding-chair-rentals.jpeg",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://www.nationaleventsupply.com/Images/uploaded/2015/11/wholesale-tables-and-chairs-for-events-web.jpg",
    },
    {
      src: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/8/12/0/Original_Camille-Smith-Ultimate-Wedding-Backdrop-Beauty-horiz-wide.jpg.rend.hgtvcom.616.411.suffix/1565625914635.jpeg",
    },
    {
      src: "https://images.pexels.com/photos/5157660/pexels-photo-5157660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <br />
      <Navbar />

      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={events.imageUrl} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">
            {events
              ? `${events.event.name} | ${
                  events.coordinator.username.toUpperCase().split("@")[0]
                }`
              : ""}
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              location{" "}
              <strong style={{ fontSize: "1.6em" }}>
                {events ? `${events.location}` : ""}
              </strong>
            </span>
          </div>
          <span className="hotelDistance">
            Total capacity – {events.capacity} of Person
          </span>
          <span className="hotelPriceHighlight">
            Love, Celebration, Union, Enchantment, Togetherness, Joy,
            Everlasting, Romance, Magic, Memories
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                Everlasting Love: A Celebration of Uniting Souls
              </h1>
              <p className="hotelDesc">
                Join us as we embark on a journey of love and togetherness at
                our enchanting marriage event, "Everlasting Love." This
                extraordinary occasion will bring together two souls, bound by
                love and destined for a lifetime of happiness. Amidst the
                picturesque surroundings of our elegant venue, witness the union
                of two hearts in a celebration that epitomizes the beauty and
                strength of love. Prepare to be captivated by heartfelt vows,
                tender moments, and the unbreakable bond that forms when two
                individuals commit to a lifetime of love and
                companionship.Immerse yourself in an atmosphere of joy and
                merriment as we rejoice in the union of two families, coming
                together as one.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1> Date Available: {formatDate(events.date_available)}</h1>
              <span>
                Event • {events ? `${events.event.name.split(" ")[1]}` : ""} •
                (1 Full day)
              </span>
              <h2>
                <b>
                  ₹
                  {events
                    ? Math.floor(events.price).toLocaleString("en-IN")
                    : ""}
                </b>
              </h2>
              <EventModal
                event={events.id}
                eventname={events ? events.event.name : ""}
                user={user.username}
                avialiable={events.date_available}
                className="bookNow"
              />
            </div>
          </div>
          <ToastContainer />
        </div>
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default EventDetails;
