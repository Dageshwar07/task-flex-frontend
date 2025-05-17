import React from "react";

const UserCard = ({ userInfo }) => {
  const { profileImageUrl, name, email, pendingTasks, inProgressTasks, completedTasks } = userInfo;

  // Check if the profileImageUrl exists and is not empty
  const imageUrl = profileImageUrl && profileImageUrl !== "" ? profileImageUrl : null;

  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Conditionally render image */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white">
              {/* Placeholder with initials */}
              <span>{name ? name[0] : "?"}</span>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard label="Pending" count={pendingTasks || 0} status="Pending" />
        <StatCard label="In Progress" count={inProgressTasks || 0} status="In Progress" />
        <StatCard label="Completed" count={completedTasks || 0} status="Completed" />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-orange-600 bg-orange-100";      
      case "Completed":
        return "text-green-600 bg-green-100";
      default: // Pending
      return "text-violet-600 bg-blue-100";
    }
    
  };

  return (
    <div className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
      <span className="text-[12px] font-semibold">{count}</span> <br />
      {label}
    </div>
  );
};
