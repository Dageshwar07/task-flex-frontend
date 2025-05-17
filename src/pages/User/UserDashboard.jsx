import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';

import { useUserAuth } from '../../hooks/useUserAuth';
import { useCountUp } from '../../hooks/useCountUp';

import { UserContext } from '../../context/useContext';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import InfoCard from '../../components/cards/InfoCard';
import TaskListTable from '../../components/layouts/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { addThousandsSeparator } from '../../utils/helper';

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      setDashboardData(response.data || {});
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  // Count data
  const all = useMemo(() => dashboardData?.charts?.taskDistribution?.All || 0, [dashboardData]);
  const pending = useMemo(() => dashboardData?.charts?.taskDistribution?.Pending || 0, [dashboardData]);
  const inProgress = useMemo(() => dashboardData?.charts?.taskDistribution?.InProgress || 0, [dashboardData]);
  const completed = useMemo(() => dashboardData?.charts?.taskDistribution?.Completed || 0, [dashboardData]);

  const totalTasksCount = useCountUp(all, 2000);
  const pendingTasksCount = useCountUp(pending, 2000);
  const inProgressTasksCount = useCountUp(inProgress, 2000);
  const completedTasksCount = useCountUp(completed, 2000);

  // Charts
  const pieChartData = useMemo(() => [
    { name: 'Pending', value: pending },
    { name: 'In Progress', value: inProgress },
    { name: 'Completed', value: completed },
  ], [pending, inProgress, completed]);

  const barChartData = useMemo(() => {
    const priority = dashboardData?.charts?.taskPriorityLevels || {};
    return [
      { priority: 'Low', count: priority?.Low || 0 },
      { priority: 'Medium', count: priority?.Medium || 0 },
      { priority: 'High', count: priority?.High || 0 }
    ];
  }, [dashboardData]);
  

  const onSeeMore = useCallback(() => navigate("/user/tasks"), [navigate]);

  const renderInfoCards = useCallback(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
      <InfoCard label="Total Tasks" value={addThousandsSeparator(totalTasksCount)} color="bg-gray-500 text-white" />
      <InfoCard label="Pending Tasks" value={addThousandsSeparator(pendingTasksCount)} color="bg-violet-500 text-white" />
      <InfoCard label="In Progress Tasks" value={addThousandsSeparator(inProgressTasksCount)} color="bg-orange-400 text-white" />
      <InfoCard label="Completed Tasks" value={addThousandsSeparator(completedTasksCount)} color="bg-green-500 text-white" />
    </div>
  ), [totalTasksCount, pendingTasksCount, inProgressTasksCount, completedTasksCount]);

  const renderCharts = useCallback(() => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
      <div className='card'>
        <h5 className='font-medium'>Task Distribution</h5>
        {pieChartData.length > 0 ? (
          <CustomPieChart
            data={pieChartData}
            colors={["#8B5CF6", "#FB923C", "#22C55E"]}
          />
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p>No data available</p>
          </div>
        )}
      </div>

      <div className='card'>
        <h5 className='font-medium'>Task Priority Levels</h5>
        {barChartData.length === 0 ? (
  <div className="flex items-center justify-center h-[300px]">
    <p>No data available</p>
  </div>
) : (
  <CustomBarChart data={barChartData} />
  
)}
{}

      </div>
    </div>
  ), [pieChartData, barChartData]);
  {console.log("---->>>", barChartData);
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'>Good day! {user?.name}</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>

        {loading ? (
          <p className='text-center my-4'>Loading dashboard...</p>
        ) : error ? (
          <p className='text-red-500 my-4 text-center'>{error}</p>
        ) : (
          renderInfoCards()
        )}
      </div>

      {!loading && !error && (
        <>
          {renderCharts()}

          <div className='card'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg md:text-xl'>Recent Tasks</h2>
              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className='text-sm' />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
