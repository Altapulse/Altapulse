import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faEnvelope,
  faPhoneAlt,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set up the marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Contact = () => {
  const iconColor = "#3048AC";
  const location =
    "Saranga Compact Homes, F-108, Walajabad Road, Padappai, Karanaithangal, Tamil Nadu 602105";
  const lat = 12.8698317;
  const lng = 79.9750436;
  const googleMapsUrl = "https://maps.app.goo.gl/kda8VPaUxb1nxWnJ7";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
    } else {
      try {
        // Make the POST request to the backend
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Message sent successfully!", {
            icon: "✅",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error("Failed to send message. Please try again.", {
            icon: "❌",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          icon: "❌",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="2xl:container mx-auto py-8 px-4">
      {/* Toast container */}
      <ToastContainer />
      <div className=" w-[90%] mx-auto py-28">
        <div className="text-center mb-12">
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Get in Touch
          </h2>
          <p className="font-normal text-lg sm:text-xl md:text-2xl lg:text-xl">
            Expand your network with us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map section */}
          <div className="w-full ">
            <div className="flex flex-col gap-6">
              {/* Geo map location */}
              <div>
                <h2 className="font-semibold flex gap-2 text-sm sm:text-base md:text-lg lg:text-3xl">
                  Location Map
                </h2>
                <MapContainer
                  center={[lat, lng]}
                  zoom={15}
                  style={{ height: "300px", width: "100%" }}
                  className="rounded-lg shadow-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[lat, lng]}>
                    <Popup>
                      {location} <br />
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Office Address */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: iconColor }}
                  aria-label="Map Marker"
                />
                <div className="ml-4">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: iconColor }}
                  >
                    Office Address
                  </h3>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                    Chennai, Tamil Nadu
                  </span>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: iconColor }}
                  aria-label="Clock"
                />
                <div className="ml-4">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: iconColor }}
                  >
                    Timing
                  </h3>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                    Mon - Fri: 9:00 AM - 9:00 PM
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: iconColor }}
                  aria-label="Email"
                />
                <div className="ml-4">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: iconColor }}
                  >
                    Email
                  </h3>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                    sales@altapulse.in
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: iconColor }}
                  aria-label="Phone"
                />
                <div className="ml-4">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: iconColor }}
                  >
                    Phone No.
                  </h3>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                    733-879-2315
                  </span>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
                <FontAwesomeIcon
                  icon={faComments}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: iconColor }}
                  aria-label="Live Chat"
                />
                <div className="ml-4">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: iconColor }}
                  >
                    Live Chat
                  </h3>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                    +91 80563 92136
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form section */}
          <div>
            <h2 className="font-semibold text-sm sm:text-base md:text-lg lg:text-3xl mb-6">
              Contact Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
