import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { User, Mail, Phone, Shield, Calendar, X } from "lucide-react";

const SingleUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/allusers`);
        const user = response.data.users.find((user) => user._id === userId);

        if (user) {
          setUserData(user);
          console.log("User Data:", user);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
      }
    };

    fetchAllUsers();
  }, [userId]);

  if (!userData) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <User className="w-16 h-16 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
        <p className="text-gray-500">{userData.role === "admin" ? "Administrator" : "User"}</p>

        <div className="mt-4 space-y-3 text-gray-700 text-left">
          {/* Email Section with Modal */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600" onClick={() => setIsEmailModalOpen(true)}>
            <Mail className="w-5 h-5 text-blue-500" />
            <span>{userData.email}</span>
          </div>

          {/* WhatsApp Section with Modal */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-green-600" onClick={() => setIsWhatsappModalOpen(true)}>
            <Phone className="w-5 h-5 text-green-500" />
            <span>{userData.mobile_number}</span>
          </div>

          {/* Role & Dates */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="capitalize">{userData.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            <span>Joined: {new Date(userData.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>Updated: {new Date(userData.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Email Modal */}
        {isEmailModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Send Email to {userData.name}</h3>
                <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input 
                type="email" 
                value={userData.email} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea 
                placeholder="Type your message here..." 
                value={emailMessage} 
                onChange={(e) => setEmailMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button 
                onClick={() => alert(`Email Sent: ${emailMessage}`)} 
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Send Email
              </button>
            </div>
          </div>
        )}

        {/* WhatsApp Modal */}
        {isWhatsappModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Send WhatsApp Message to {userData.name}</h3>
                <button onClick={() => setIsWhatsappModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input 
                type="text" 
                value={userData.mobile_number} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea 
                placeholder="Type your message here..." 
                value={whatsappMessage} 
                onChange={(e) => setWhatsappMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button 
                onClick={() => window.open(`https://wa.me/${userData.mobile_number}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send WhatsApp Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
