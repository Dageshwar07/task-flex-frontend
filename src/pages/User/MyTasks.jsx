import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import TaskStatusTabs from "../../components/layouts/TaskStatusTabs";
import TaskCard from "../../components/cards/TaskCard";



const MyTasks = () => {

  
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
  
    const navigate = useNavigate();
  
    const getTasksById = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID, {
          params: {
            status: filterStatus === "All" ? "" : filterStatus,
          },
        });
  
        setAllTasks(response.data?.task?.length > 0 ? response.data.task : []);
  
        const statusSummary = response.data?.statusSummary || {};
  
        const statusArray = [
          { label: "All", count: statusSummary.all || 0 },
          { label: "Pending", count: statusSummary.pendingTasks || 0 },
          { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
          { label: "Completed", count: statusSummary.completedTasks || 0 },
        ];
  
        setTabs(statusArray);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    const handleClick = (taskId) => {
      navigate(`/user/task-details/${taskId}`);
    };
  
  
    useEffect(() => {
      getTasksById();
    }, [filterStatus]);
  
    return (
      <DashboardLayout activeMenu="Manage Tasks">
        <div className="my-5">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">

              <h2 className="text-xl md:text-xl font-medium">Manage Tasks</h2>

            {allTasks.length > 0 && (
                <TaskStatusTabs
                  tabs={tabs}
                  activeTab={filterStatus}
                  setActiveTab={setFilterStatus}
                />
            )}
          </div>
  
          {/* Task Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {allTasks?.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item._id)}
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  };
  
 
export default MyTasks