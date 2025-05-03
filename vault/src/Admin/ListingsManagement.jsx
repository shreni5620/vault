// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Search, Filter, CheckCircle, XCircle, Eye,
// // //   Trash2, MoreVertical, ArrowUp, ArrowDown, Scale,
// // //   Clock, Calendar, Car, User, Activity
// // // } from 'lucide-react';
// // // import { API_ENDPOINTS } from '../config/api';
// // // import './ListingsManagement.css';

// // // function ListingsManagement() {
// // //   const [filterStatus, setFilterStatus] = useState('all');
// // //   const [selectedCars, setSelectedCars] = useState([]);
// // //   const [showComparison, setShowComparison] = useState(false);
// // //   const [comparisonStats, setComparisonStats] = useState({
// // //     totalComparisons: 0,
// // //     todayComparisons: 0,
// // //     popularCombinations: []
// // //   });
// // //   const [testDriveRequests, setTestDriveRequests] = useState([]);
// // //   const [activityLogs, setActivityLogs] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         // Fetch comparison statistics
// // //         const statsResponse = await fetch(API_ENDPOINTS.ADMIN_COMPARISON_STATS);
// // //         const statsData = await statsResponse.json();
// // //         setComparisonStats(statsData);

// // //         // Fetch test drive requests
// // //         const testDriveResponse = await fetch(API_ENDPOINTS.ADMIN_TEST_DRIVES);
// // //         const testDriveData = await testDriveResponse.json();
// // //         setTestDriveRequests(testDriveData);

// // //         // Fetch activity logs
// // //         const activityResponse = await fetch(API_ENDPOINTS.ADMIN_ACTIVITY_LOGS);
// // //         const activityData = await activityResponse.json();
// // //         setActivityLogs(activityData);

// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError('Failed to fetch data. Please try again later.');
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const handleTestDriveAction = async (requestId, action) => {
// // //     try {
// // //       const response = await fetch(`${API_ENDPOINTS.ADMIN_TEST_DRIVES}/${requestId}/${action}`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       if (response.ok) {
// // //         // Update the test drive requests list
// // //         const updatedRequests = testDriveRequests.map(request => {
// // //           if (request._id === requestId){
// // //             return { ...request, status: action };
// // //           }
// // //           return request;
// // //         });
// // //         setTestDriveRequests(updatedRequests);
// // //       } else {
// // //         throw new Error('Failed to update test drive request');
// // //       }
// // //     } catch (err) {
// // //       setError('Failed to update test drive request. Please try again.');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="loading-container">
// // //         <div className="loading-spinner"></div>
// // //         <p>Loading data...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="error-container">
// // //         <p className="error-message">{error}</p>
// // //         <button onClick={() => window.location.reload()}>Retry</button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="listings-container">
// // //       {/* ... existing header and stats grid ... */}

// // //       <div className="comparison-stats-section">
// // //         <h2 className="section-title">Comparison Statistics</h2>
// // //         <div className="stats-cards">
// // //           <div className="stat-card">
// // //             <div className="stat-icon">
// // //               <Scale size={24} />
// // //             </div>
// // //             <div className="stat-content">
// // //               <h3>Total Comparisons</h3>
// // //               <p className="stat-value">{comparisonStats.totalComparisons}</p>
// // //               <p className="stat-subtitle">+{comparisonStats.todayComparisons} today</p>
// // //             </div>
// // //           </div>
// // //           <div className="stat-card">
// // //             <div className="stat-icon">
// // //               <Car size={24} />
// // //             </div>
// // //             <div className="stat-content">
// // //               <h3>Popular Combinations</h3>
// // //               <ul className="popular-combinations">
// // //                 {comparisonStats.popularCombinations.map((combo, index) => (
// // //                   <li key={index}>
// // //                     <span className="combo-cars">{combo.cars.join(' vs ')}</span>
// // //                     <span className="combo-count">{combo.count} times</span>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="test-drive-section">
// // //         <h2 className="section-title">Test Drive Requests</h2>
// // //         <div className="test-drive-table">
// // //           <table>
// // //             <thead>
// // //               <tr>
// // //                 <th>ID</th>
// // //                 <th>Car</th>
// // //                 <th>Customer</th>
// // //                 <th>Date</th>
// // //                 <th>Status</th>
// // //                 <th>Contact</th>
// // //                 <th>Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {Array.isArray(testDriveRequests) && testDriveRequests.map(request => (
// // //                 <tr key={request.id || index}>
// // //                   <td>{request.id}</td>
// // //                   <td>{request.car}</td>
// // //                   <td>{request.customer}</td>
// // //                   <td>{request.date}</td>
// // //                   <td>
// // //                     <span className={`status-badge ${request.status}`}>
// // //                       {request.status}
// // //                     </span>
// // //                   </td>
// // //                   <td>{request.contact}</td>
// // //                   <td>
// // //                     <div className="action-buttons">
// // //                       <button className="action-button view" title="View Details">
// // //                         <Eye size={16} />
// // //                       </button>
// // //                       {request.status === 'pending' && (
// // //                         <>
// // //                           <button 
// // //                             className="action-button approve" 
// // //                             title="Approve"
// // //                             onClick={() => handleTestDriveAction(request.id, 'approved')}
// // //                           >
// // //                             <CheckCircle size={16} />
// // //                           </button>
// // //                           <button 
// // //                             className="action-button reject" 
// // //                             title="Reject"
// // //                             onClick={() => handleTestDriveAction(request.id, 'rejected')}
// // //                           >
// // //                             <XCircle size={16} />
// // //                           </button>
// // //                         </>
// // //                       )}
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="activity-logs-section">
// // //         <h2 className="section-title">Recent Activity</h2>
// // //         <div className="activity-logs">
// // //           {activityLogs.map(log => (
// // //             <div key={log.id} className="activity-log">
// // //               <div className="log-icon">
// // //                 {log.type === 'comparison' ? <Scale size={20} /> : <Car size={20} />}
// // //               </div>
// // //               <div className="log-content">
// // //                 <div className="log-header">
// // //                   <span className="log-user">{log.user}</span>
// // //                   <span className="log-timestamp">{log.timestamp}</span>
// // //                 </div>
// // //                 <p className="log-details">{log.details}</p>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* ... existing comparison modal and other code ... */}
// // //     </div>
// // //   );
// // // }

// // // export default ListingsManagement;


// // import React, { useState, useEffect } from 'react';
// // import {
// //   Search, Filter, CheckCircle, XCircle, Eye,
// //   Trash2, MoreVertical, ArrowUp, ArrowDown, Scale,
// //   Clock, Calendar, Car, User, Activity
// // } from 'lucide-react';
// // import { API_ENDPOINTS } from '../config/api';
// // import './ListingsManagement.css';

// // function ListingsManagement() {
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [selectedCars, setSelectedCars] = useState([]);
// //   const [showComparison, setShowComparison] = useState(false);
// //   const [comparisonStats, setComparisonStats] = useState({
// //     totalComparisons: 0,
// //     todayComparisons: 0,
// //     popularCombinations: []
// //   });
// //   const [testDriveRequests, setTestDriveRequests] = useState([]);
// //   const [activityLogs, setActivityLogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         // Fetch comparison statistics
// //         const statsResponse = await fetch(API_ENDPOINTS.ADMIN_COMPARISON_STATS);
// //         const statsData = await statsResponse.json();
// //         setComparisonStats(statsData);

// //         // Fetch test drive requests
// //         const testDriveResponse = await fetch(API_ENDPOINTS.ADMIN_TEST_DRIVES);
// //         const testDriveData = await testDriveResponse.json();
// //         console.log("Fetched Test Drive Requests:", testDriveData);
// //         setTestDriveRequests(testDriveData);

// //         // Fetch activity logs
// //         const activityResponse = await fetch(API_ENDPOINTS.ADMIN_ACTIVITY_LOGS);
// //         const activityData = await activityResponse.json();
// //         setActivityLogs(activityData);

// //         setLoading(false);
// //       } catch (err) {
// //         setError('Failed to fetch data. Please try again later.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleTestDriveAction = async (requestId, action) => {
// //     try {
// //       const response = await fetch(`${API_ENDPOINTS.ADMIN_TEST_DRIVES}/${requestId}/${action}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (response.ok) {
// //         const updatedRequests = testDriveRequests.map(request => {
// //           if (request._id === requestId){
// //             return { ...request, status: action };
// //           }
// //           return request;
// //         });
// //         setTestDriveRequests(updatedRequests);
// //       } else {
// //         throw new Error('Failed to update test drive request');
// //       }
// //     } catch (err) {
// //       setError('Failed to update test drive request. Please try again.');
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-spinner"></div>
// //         <p>Loading data...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="error-container">
// //         <p className="error-message">{error}</p>
// //         <button onClick={() => window.location.reload()}>Retry</button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="listings-container">
// //       <div className="comparison-stats-section">
// //         <h2 className="section-title">Comparison Statistics</h2>
// //         <div className="stats-cards">
// //           <div className="stat-card">
// //             <div className="stat-icon">
// //               <Scale size={24} />
// //             </div>
// //             <div className="stat-content">
// //               <h3>Total Comparisons</h3>
// //               <p className="stat-value">{comparisonStats.totalComparisons}</p>
// //               <p className="stat-subtitle">+{comparisonStats.todayComparisons} today</p>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">
// //               <Car size={24} />
// //             </div>
// //             <div className="stat-content">
// //               <h3>Popular Combinations</h3>
// //               <ul className="popular-combinations">
// //                 {comparisonStats.popularCombinations.map((combo, index) => (
// //                   <li key={index}>
// //                     <span className="combo-cars">{combo.cars.join(' vs ')}</span>
// //                     <span className="combo-count">{combo.count} times</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="test-drive-section">
// //         <h2 className="section-title">Test Drive Requests</h2>
// //         <div className="test-drive-table">
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Car</th>
// //                 <th>Customer</th>
// //                 <th>Date</th>
// //                 <th>Status</th>
// //                 <th>Contact</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {Array.isArray(testDriveRequests) && testDriveRequests.map((request, index) => (
// //                 <tr key={request.id || index}>
// //                   <td>{request.id}</td>
// //                   <td>{request.car}</td>
// //                   <td>{request.customer}</td>
// //                   <td>{request.date}</td>
// //                   <td>
// //                     <span className={`status-badge ${request.status}`}>
// //                       {request.status}
// //                     </span>
// //                   </td>
// //                   <td>{request.contact}</td>
// //                   <td>
// //                     <div className="action-buttons">
// //                       <button className="action-button view" title="View Details">
// //                         <Eye size={16} />
// //                       </button>
// //                       {request.status === 'pending' && (
// //                         <>
// //                           <button 
// //                             className="action-button approve" 
// //                             title="Approve"
// //                             onClick={() => handleTestDriveAction(request.id, 'approved')}
// //                           >
// //                             <CheckCircle size={16} />
// //                           </button>
// //                           <button 
// //                             className="action-button reject" 
// //                             title="Reject"
// //                             onClick={() => handleTestDriveAction(request.id, 'rejected')}
// //                           >
// //                             <XCircle size={16} />
// //                           </button>
// //                         </>
// //                       )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="activity-logs-section">
// //         <h2 className="section-title">Recent Activity</h2>
// //         <div className="activity-logs">
// //           {activityLogs.map(log => (
// //             <div key={log.id} className="activity-log">
// //               <div className="log-icon">
// //                 {log.type === 'comparison' ? <Scale size={20} /> : <Car size={20} />}
// //               </div>
// //               <div className="log-content">
// //                 <div className="log-header">
// //                   <span className="log-user">{log.user}</span>
// //                   <span className="log-timestamp">{log.timestamp}</span>
// //                 </div>
// //                 <p className="log-details">{log.details}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ListingsManagement;
// import React, { useState, useEffect } from 'react';
// import {
//   Search, Filter, CheckCircle, XCircle, Eye,
//   Trash2, MoreVertical, ArrowUp, ArrowDown, Scale,
//   Clock, Calendar, Car, User, Activity
// } from 'lucide-react';

// import './ListingsManagement.css';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// const API_ENDPOINTS = {
//   ADMIN_COMPARISON_STATS: `${API_BASE_URL}/admin/comparison-stats`,
//   ADMIN_TEST_DRIVES: `${API_BASE_URL}/test-drives`,
//   ADMIN_ACTIVITY_LOGS: `${API_BASE_URL}/admin/activity-logs`
// };

// function ListingsManagement() {
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedCars, setSelectedCars] = useState([]);
//   const [showComparison, setShowComparison] = useState(false);
//   const [comparisonStats, setComparisonStats] = useState({
//     totalComparisons: 0,
//     todayComparisons: 0,
//     popularCombinations: []
//   });
//   const [testDriveRequests, setTestDriveRequests] = useState([]);
//   const [activityLogs, setActivityLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const statsResponse = await fetch(API_ENDPOINTS.ADMIN_COMPARISON_STATS);
//         const statsData = await statsResponse.json();
//         setComparisonStats(statsData);

//         const testDriveResponse = await fetch(API_ENDPOINTS.ADMIN_TEST_DRIVES);
//         const testDriveData = await testDriveResponse.json();
//         console.log("Fetched Test Drive Requests:", testDriveData);
//         setTestDriveRequests(testDriveData);

//         const activityResponse = await fetch(API_ENDPOINTS.ADMIN_ACTIVITY_LOGS);
//         const activityData = await activityResponse.json();
//         setActivityLogs(activityData);

//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTestDriveAction = async (requestId, action) => {
//     try {
//       const response = await fetch(`${API_ENDPOINTS.ADMIN_TEST_DRIVES}/${requestId}/${action}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const updatedRequests = testDriveRequests.map(request => {
//           if (request._id === requestId){
//             return { ...request, status: action };
//           }
//           return request;
//         });
//         setTestDriveRequests(updatedRequests);
//       } else {
//         throw new Error('Failed to update test drive request');
//       }
//     } catch (err) {
//       setError('Failed to update test drive request. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="listings-container">
//       <div className="comparison-stats-section">
//         <h2 className="section-title">Comparison Statistics</h2>
//         <div className="stats-cards">
//           <div className="stat-card">
//             <div className="stat-icon">
//               <Scale size={24} />
//             </div>
//             <div className="stat-content">
//               <h3>Total Comparisons</h3>
//               <p className="stat-value">{comparisonStats.totalComparisons}</p>
//               <p className="stat-subtitle">+{comparisonStats.todayComparisons} today</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">
//               <Car size={24} />
//             </div>
//             <div className="stat-content">
//               <h3>Popular Combinations</h3>
//               <ul className="popular-combinations">
//                 {comparisonStats.popularCombinations.map((combo, index) => (
//                   <li key={index}>
//                     <span className="combo-cars">{combo.cars.join(' vs ')}</span>
//                     <span className="combo-count">{combo.count} times</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="test-drive-section">
//         <h2 className="section-title">Test Drive Requests</h2>
//         <div className="test-drive-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Car</th>
//                 <th>Customer</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Contact</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(testDriveRequests) && testDriveRequests.map((request, index) => (
//                 <tr key={request.id || index}>
//                   <td>{request.id}</td>
//                   <td>{request.car}</td>
//                   <td>{request.customer}</td>
//                   <td>{request.date}</td>
//                   <td>
//                     <span className={`status-badge ${request.status}`}>
//                       {request.status}
//                     </span>
//                   </td>
//                   <td>{request.contact}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="action-button view" title="View Details">
//                         <Eye size={16} />
//                       </button>
//                       {request.status === 'pending' && (
//                         <>
//                           <button 
//                             className="action-button approve" 
//                             title="Approve"
//                             onClick={() => handleTestDriveAction(request.id, 'approved')}
//                           >
//                             <CheckCircle size={16} />
//                           </button>
//                           <button 
//                             className="action-button reject" 
//                             title="Reject"
//                             onClick={() => handleTestDriveAction(request.id, 'rejected')}
//                           >
//                             <XCircle size={16} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="activity-logs-section">
//         <h2 className="section-title">Recent Activity</h2>
//         <div className="activity-logs">
//           {activityLogs.map(log => (
//             <div key={log.id} className="activity-log">
//               <div className="log-icon">
//                 {log.type === 'comparison' ? <Scale size={20} /> : <Car size={20} />}
//               </div>
//               <div className="log-content">
//                 <div className="log-header">
//                   <span className="log-user">{log.user}</span>
//                   <span className="log-timestamp">{log.timestamp}</span>
//                 </div>
//                 <p className="log-details">{log.details}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListingsManagement;
import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Eye,
  Scale, Car
} from 'lucide-react';

import './ListingsManagement.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const API_ENDPOINTS = {
  ADMIN_COMPARISON_STATS: `${API_BASE_URL}/admin/comparison-stats`,
  ADMIN_TEST_DRIVES: `${API_BASE_URL}/test-drives`,
  ADMIN_TEST_DRIVE_ACTION: `${API_BASE_URL}/test-drives`,
  ADMIN_ACTIVITY_LOGS: `${API_BASE_URL}/admin/activity-logs`
};

function ListingsManagement() {
  const [comparisonStats, setComparisonStats] = useState({
    totalComparisons: 0,
    todayComparisons: 0,
    popularCombinations: []
  });
  const [testDriveRequests, setTestDriveRequests] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [statsResponse, testDriveResponse, activityResponse] = await Promise.all([
          fetch(API_ENDPOINTS.ADMIN_COMPARISON_STATS),
          fetch(API_ENDPOINTS.ADMIN_TEST_DRIVES),
          fetch(API_ENDPOINTS.ADMIN_ACTIVITY_LOGS)
        ]);

        const statsData = await statsResponse.json();
        const testDriveData = await testDriveResponse.json();
        const activityData = await activityResponse.json();

        setComparisonStats(statsData);
        setTestDriveRequests(testDriveData);
        setActivityLogs(activityData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTestDriveAction = async (requestId, action) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_TEST_DRIVE_ACTION}/${requestId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setTestDriveRequests(prev =>
          prev.map(request =>
            request.id === requestId ? { ...request, status: action } : request
          )
        );
      } else {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update test drive status.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="listings-container">
      <div className="comparison-stats-section">
        <h2 className="section-title">Comparison Statistics</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">
              <Scale size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Comparisons</h3>
              <p className="stat-value">{comparisonStats.totalComparisons}</p>
              <p className="stat-subtitle">+{comparisonStats.todayComparisons} today</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Car size={24} />
            </div>
            <div className="stat-content">
              <h3>Popular Combinations</h3>
              <ul className="popular-combinations">
                {comparisonStats.popularCombinations.map((combo, index) => (
                  <li key={index}>
                    <span className="combo-cars">{combo.cars.join(' vs ')}</span>
                    <span className="combo-count">{combo.count} times</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="test-drive-section">
        <h2 className="section-title">Test Drive Requests</h2>
        <div className="test-drive-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Car</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testDriveRequests.map((request, index) => (
                <tr key={request.id || index}>
                  <td>{request.id}</td>
                  <td>{request.car}</td>
                  <td>{request.customer}</td>
                  <td>{new Date(request.date).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>{request.contact}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button view" title="View Details">
                        <Eye size={16} />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button className="action-button approve" title="Approve" onClick={() => handleTestDriveAction(request.id, 'approved')}>
                            <CheckCircle size={16} />
                          </button>
                          <button className="action-button reject" title="Reject" onClick={() => handleTestDriveAction(request.id, 'rejected')}>
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="activity-logs-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-logs">
          {activityLogs.map(log => (
            <div key={log.id} className="activity-log">
              <div className="log-icon">
                {log.type === 'comparison' ? <Scale size={20} /> : <Car size={20} />}
              </div>
              <div className="log-content">
                <div className="log-header">
                  <span className="log-user">{log.user}</span>
                  <span className="log-timestamp">{log.timestamp}</span>
                </div>
                <p className="log-details">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListingsManagement;
