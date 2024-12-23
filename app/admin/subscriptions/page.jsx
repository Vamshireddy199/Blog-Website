"use client";
import React, { useEffect, useState } from "react";
import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails); 
    } catch (error) {
      toast.error("Failed to fetch emails");
    }
  };

  
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: {
          id: mongoId,
        },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      toast.error("Failed to delete email");
    }
  };

  useEffect(() => {
    fetchEmails(); 
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date Subscribed
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => {
              
              return (
                <SubsTableItem
                  key={item._id}
                  mongoId={item._id}
                  name={item.name}
                  email={item.email}
                  date={item.createdAt}
                  deleteEmail={deleteEmail}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
