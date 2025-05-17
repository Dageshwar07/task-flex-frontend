import React from 'react';

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentcount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'text-violet-500 bg-violet-100';
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'text-violet-500 bg-violet-100';
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <h2 className="text-lg font-semibold mb-2 md:mb-0">{title}</h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getStatusTagColor()} md:ml-4 mt-2 md:mt-0`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${getPriorityTagColor()} mb-2 md:mb-0`}
        >
          {priority}
        </span>
        <span className="text-xs text-gray-500">Due: {new Date(dueDate).toLocaleDateString()}</span>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Attachments: {attachmentcount} | Todos: {completedTodoCount}/{todoChecklist?.length || 0}
      </div>
      

      <div className="mt-2 flex -space-x-2">
      {assignedTo?.map((url, index) => (
  <img
    key={index}
    src={url || 'https://i.pravatar.cc/100'}
    alt="Assignee"
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
    onError={(e) => { e.target.src = "/default-avatar.png"; }}
  />
))}


      </div>
    </div>
  );
};

export default TaskCard;
