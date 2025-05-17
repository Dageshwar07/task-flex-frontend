import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/cards/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for download
  const [downloadError, setDownloadError] = useState(null); // State for download errors

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to fetch users");
    }
  };

  // Download task Report with loading state and error handling
  const handleDownloadReport = async () => {
    setIsLoading(true); // Start loading
    setDownloadError(null); // Reset any previous errors
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: 'blob', // Important to handle binary data
      });

      // Check if the response contains valid data
      if (response.data) {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
  
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user_details.xlsx'); // Set file name here
  
        // Append the link to the document, click it to start download, and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Release the object URL after use
        window.URL.revokeObjectURL(url);
  
        toast.success("User details downloaded successfully!");
      } else {
        throw new Error("No data received from the server.");
      }
    } catch (error) {
      console.error("Error downloading user details", error);
      toast.error("Failed to download user details, please try again");
      setDownloadError("An error occurred while downloading the file.");
    } finally {
      setIsLoading(false); // Reset loading state after completion
    }
  };

  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between ">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>

          <button
            className="flex md:flex download-btn"
            onClick={handleDownloadReport}
            disabled={isLoading} // Disable button while loading
          >
            <LuFileSpreadsheet className="text-lg" />
            {isLoading ? "Downloading..." : "Download Report"}
          </button>
        </div>

        {/* Display error if download fails */}
        {downloadError && (
          <div className="text-red-500 mt-2">{downloadError}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
          {allUsers?.map((user) => {
            return <UserCard key={user._id} userInfo={user} />;
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
