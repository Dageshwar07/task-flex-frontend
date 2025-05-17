import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../../../components/layouts/AvatarGroup';
import { Tooltip } from 'react-tooltip';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error Fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserObjects = allUsers.filter((user) =>
    selectedUsers.includes(user._id)
  );

  useEffect(() => {
    getAllUsers();
    setTempSelectedUsers(selectedUsers); // preselect already assigned
  }, [isModalOpen]);

  return (
    <div className="space-y-2 mt-2">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {selectedUserObjects.length > 0 ? (
         <AvatarGroup
         avatars={selectedUserObjects.map((u) =>
           u.profileImageUrl?.trim()
             ? u.profileImageUrl
             : `https://i.pravatar.cc/150?u=${u._id}`
         )}
         maxVisible={3}
       />
       
        ) : (
          <button className="flex items-center gap-2 text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition">
            <LuUsers size={16} /> Assign Users
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Team Members">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {allUsers.map((user) => (
  <div
    key={user._id}
    className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-50 transition border-b"
  >
   <img
  src={
    user?.profileImageUrl?.trim()
      ? user.profileImageUrl
      : `https://i.pravatar.cc/150?u=${user._id}`
  }
  alt={user?.name}
  className="w-10 h-10 rounded-full object-cover"
/>

    <div className="flex-1">
      <p className="font-medium text-gray-800">{user.name}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
    <input
      type="checkbox"
      checked={tempSelectedUsers.includes(user._id)}
      onChange={() => toggleUserSelection(user._id)}
      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded"
    />
  </div>
))}

        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="text-sm px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-sm px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleAssign}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
