import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function ContactSection() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const projectId = location.state?.projectId || searchParams.get("projectId") || null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    country: "IN",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [brochureUrl, setBrochureUrl] = useState(null);

  useEffect(() => {
    if (projectId) {
      console.log(`Attempting to fetch brochure for projectId: ${projectId}`);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/project/${projectId}`)
        .then((res) => {
          console.log("API Response Received:", res.data);

          // ✅ FINAL FIX: Changed '.brochure' to '.Brochure' to match your API response
          const fetchedBrochureUrl = res.data?.data?.Brochure;

          if (fetchedBrochureUrl) {
            console.log("Brochure URL found and set:", fetchedBrochureUrl);
            setBrochureUrl(fetchedBrochureUrl);
          } else {
            console.warn(
              "Project data was fetched successfully, but no brochure URL was found in the response."
            );
          }
        })
        .catch((err) => {
          console.error("Error fetching project brochure:", err);
        });
    } else {
      console.log("No projectId found in URL or state. Brochure will not be loaded.");
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message } = formData;

    if (!firstName || !lastName || !email || !phone || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        ...formData,
        projectId,
      });

      if (brochureUrl) {
        toast.success("Message sent! Your brochure will open shortly.");
        setTimeout(() => {
          window.open(brochureUrl, "");
        }, 800);
      } else {
        toast.success("Message sent successfully!");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        country: "IN",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col-reverse lg:grid lg:grid-cols-2 min-h-screen w-full">
      {/* Left Side */}
      <div className="bg-[#4B3B2B] text-white px-10 py-16 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-8">Let’s make things happen.</p>
          <div className="space-y-4">
            <div className="items-center gap-2">
              <h1 className="text-3xl">Our Headquarters</h1>
              <br />
              <div className="flex items-center gap-2">
                <MapPin />
                <span>
                  Goa Studio House No. 599, Ozran Beach Road,
                  <br /> Small Vagator, Near Leoney Resort, Vagator,
                  <br /> Anjuna 403509, Goa
                </span>
              </div>
            </div>
            <br />
            <div className="flex items-center gap-2">
              <Phone /> <span>Call us at +91-9987690860 | +91-8384082906</span>
            </div>
            <br />
            <div className="flex items-center gap-2">
              <Mail /> <span>krrivah@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-white px-10 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-[#2B2B2B]">
          SEND US A MESSAGE
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            rows={4}
            required
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-full py-3 text-sm font-semibold hover:bg-gray-100 text-[#4B3B2B] disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? "SENDING..."
              : brochureUrl
              ? "SEND MESSAGE & GET BROCHURE"
              : "SEND MESSAGE"}
          </button>

          <p className="text-xs text-[#4B3B2B]">
            By hitting submit you agree to our{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
} 