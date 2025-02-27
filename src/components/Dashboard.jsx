// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const Dashboard = ({ token }) => {
//   const [analytics, setAnalytics] = useState({ opens: 0, clicks: 0 });
//   const [events, setEvents] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   // Fetch analytics data from the backend
//   const fetchAnalytics = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/analytics', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAnalytics(response.data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       // Fallback data for demo purposes
//       setAnalytics({ opens: 100, clicks: 15 });
//     }
//   };

//   // Fetch events data from the backend
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/events', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents(response.data);
//       prepareChartData(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       setEvents([]);
//       setChartData([]);
//     }
//   };

//   // Prepare data for the chart: group events by date and count opens
//   const prepareChartData = (eventsData) => {
//     const dataMap = {};
//     eventsData.forEach((event) => {
//       const date = new Date(event.timestamp).toLocaleDateString();
//       if (dataMap[date]) {
//         dataMap[date] += 1;
//       } else {
//         dataMap[date] = 1;
//       }
//     });
//     const formattedData = Object.keys(dataMap).map((date) => ({
//       date,
//       opens: dataMap[date],
//     }));
//     // Optionally, sort the data by date
//     formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
//     setChartData(formattedData);
//   };

//   useEffect(() => {
//     if (token) {
//       fetchAnalytics();
//       fetchEvents();
//       const interval = setInterval(() => {
//         fetchAnalytics();
//         fetchEvents();
//       }, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [token]);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Email Tracker Dashboard
//       </Typography>

//       {/* Analytics Overview */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6">Analytics Overview</Typography>
//           <Typography variant="body1">Total Opens: {analytics.opens}</Typography>
//           <Typography variant="body1">Total Clicks: {analytics.clicks}</Typography>
//           <Button variant="contained" onClick={fetchAnalytics} sx={{ mt: 2 }}>
//             Refresh Analytics
//           </Button>
//         </Paper>
//       </Box>

//       {/* Line Chart of Opens Over Time */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Opens Over Time
//           </Typography>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                 <CartesianGrid stroke="#f5f5f5" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="opens" stroke="#ff7300" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <Typography>No data available for chart.</Typography>
//           )}
//         </Paper>
//       </Box>

//       {/* Events Table */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Tracking Events
//           </Typography>
//           {events.length > 0 ? (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Open Time</TableCell>
//                     <TableCell>Browser</TableCell>
//                     <TableCell>Location</TableCell>
//                     <TableCell>IP</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {events.map((event) => (
//                     <TableRow key={event._id}>
//                       <TableCell>{event.email || 'N/A'}</TableCell>
//                       <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
//                       <TableCell>{event.browser || 'N/A'}</TableCell>
//                       <TableCell>{event.location || 'N/A'}</TableCell>
//                       <TableCell>{event.ip || 'N/A'}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography>No events recorded.</Typography>
//           )}
//           <Button variant="contained" onClick={fetchEvents} sx={{ mt: 2 }}>
//             Refresh Events
//           </Button>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;


// src/components/Dashboard.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const Dashboard = ({ token }) => {
//   const [analytics, setAnalytics] = useState({ opens: 0, clicks: 0 });
//   const [events, setEvents] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/analytics', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAnalytics(response.data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       setAnalytics({ opens: 0, clicks: 0 });
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/events', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents(response.data);
//       prepareChartData(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       setEvents([]);
//       setChartData([]);
//     }
//   };

//   const prepareChartData = (eventsData) => {
//     const dataMap = {};
//     eventsData.forEach((event) => {
//       const date = new Date(event.timestamp).toLocaleDateString();
//       dataMap[date] = (dataMap[date] || 0) + 1;
//     });
//     const formattedData = Object.keys(dataMap).map((date) => ({
//       date,
//       opens: dataMap[date],
//     }));
//     formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
//     setChartData(formattedData);
//   };

//   useEffect(() => {
//     if (token) {
//       fetchAnalytics();
//       fetchEvents();
//       const interval = setInterval(() => {
//         fetchAnalytics();
//         fetchEvents();
//       }, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [token]);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Email Tracker Dashboard
//       </Typography>

//       {/* Analytics Overview */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6">Analytics Overview</Typography>
//           <Typography variant="body1">Total Opens: {analytics.opens}</Typography>
//           <Typography variant="body1">Total Clicks: {analytics.clicks}</Typography>
//           <Button variant="contained" onClick={fetchAnalytics} sx={{ mt: 2 }}>
//             Refresh Analytics
//           </Button>
//         </Paper>
//       </Box>

//       {/* Line Chart of Opens Over Time */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Opens Over Time
//           </Typography>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                 <CartesianGrid stroke="#f5f5f5" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="opens" stroke="#ff7300" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <Typography>No data available for chart.</Typography>
//           )}
//         </Paper>
//       </Box>

//       {/* Events Table */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Tracking Events
//           </Typography>
//           {events.length > 0 ? (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Open Time</TableCell>
//                     <TableCell>Browser</TableCell>
//                     <TableCell>Location</TableCell>
//                     <TableCell>IP</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {events.map((event) => (
//                     <TableRow key={event._id}>
//                       <TableCell>{event.email || 'N/A'}</TableCell>
//                       <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
//                       <TableCell>{event.browser || 'N/A'}</TableCell>
//                       <TableCell>{event.location || 'N/A'}</TableCell>
//                       <TableCell>{event.ip || 'N/A'}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography>No events recorded.</Typography>
//           )}
//           <Button variant="contained" onClick={fetchEvents} sx={{ mt: 2 }}>
//             Refresh Events
//           </Button>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;










// // src/components/Dashboard.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Avatar,
// } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// // Helper function to decode a JWT (without verifying signature)
// function parseJwt(token) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Failed to decode token", error);
//     return null;
//   }
// }

// const Dashboard = ({ token }) => {
//   // Decode token to extract user info
//   const userData = parseJwt(token);
//   const firstName = userData && userData.username
//     ? userData.username.split(' ')[0]
//     : 'User';

//   // State for analytics overview
//   const [analytics, setAnalytics] = useState({ opens: 0, clicks: 0 });
//   // All tracking events data
//   const [events, setEvents] = useState([]);
//   // Sorting state for table
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('openTime');
//   // Text filter for email
//   const [filter, setFilter] = useState('');
//   // Date range filters stored as Date objects or null
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   // For detailed modal view
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   // Alert threshold dialog state
//   const [alertDialogOpen, setAlertDialogOpen] = useState(false);
//   const [alertThreshold, setAlertThreshold] = useState('');

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('jwtToken');
//     window.location.reload(); // or set token state to null if using state lifting
//   };

//   // Fetching analytics and events on component mount and every 30 seconds
//   useEffect(() => {
//     fetchAnalytics();
//     fetchEvents();
//     const interval = setInterval(() => {
//       fetchAnalytics();
//       fetchEvents();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [token]);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch('https://emailtracking-server.onrender.com/analytics', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setAnalytics(data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       // Fallback static data for demo
//       setAnalytics({ opens: 100, clicks: 15 });
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('https://emailtracking-server.onrender.com/events', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       // Dummy data for demonstration
//       setEvents([
//         {
//           id: 1,
//           email: 'example1@mail.com',
//           openTime: '2023-12-01T10:00:00Z',
//           browser: 'Chrome',
//           location: 'USA',
//           ip: '192.168.1.1',
//         },
//         {
//           id: 2,
//           email: 'example2@mail.com',
//           openTime: '2023-12-02T11:30:00Z',
//           browser: 'Firefox',
//           location: 'UK',
//           ip: '192.168.1.2',
//         },
//         {
//           id: 3,
//           email: 'customer@domain.com',
//           openTime: '2023-12-03T09:15:00Z',
//           browser: 'Safari',
//           location: 'Canada',
//           ip: '192.168.1.3',
//         },
//       ]);
//     }
//   };

//   // Handle sorting on table headers
//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   // Sort events based on the selected column and order
//   const sortedEvents = events.sort((a, b) => {
//     if (order === 'asc') {
//       return a[orderBy] < b[orderBy] ? -1 : 1;
//     } else {
//       return a[orderBy] > b[orderBy] ? -1 : 1;
//     }
//   });

//   // Filter events by email and date range
//   const filteredEvents = sortedEvents.filter((event) => {
//     const emailMatch = event.email.toLowerCase().includes(filter.toLowerCase());
//     let dateMatch = true;
//     const eventDate = new Date(event.openTime);
//     if (startDate) {
//       dateMatch = dateMatch && eventDate >= startDate;
//     }
//     if (endDate) {
//       dateMatch = dateMatch && eventDate <= endDate;
//     }
//     return emailMatch && dateMatch;
//   });

//   // Prepare data for the chart: group by date and sum opens
//   const chartData = filteredEvents.reduce((acc, event) => {
//     const date = new Date(event.openTime).toLocaleDateString();
//     const existing = acc.find((d) => d.date === date);
//     if (existing) {
//       existing.opens += 1;
//     } else {
//       acc.push({ date, opens: 1 });
//     }
//     return acc;
//   }, []);

//   // Export filtered events as CSV
//   const exportCSV = () => {
//     const header = "ID,Email,Open Time,Browser,Location,IP\n";
//     const rows = filteredEvents.map(event => 
//       `${event.id},${event.email},${event.openTime},${event.browser},${event.location},${event.ip}`
//     ).join("\n");
//     const csvContent = header + rows;
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "tracking_events.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Open detailed modal when a row is clicked
//   const handleRowClick = (event) => {
//     setSelectedEvent(event);
//   };

//   const closeDetailDialog = () => {
//     setSelectedEvent(null);
//   };

//   // Alert dialog handlers (dummy implementation)
//   const openAlertDialog = () => {
//     setAlertDialogOpen(true);
//   };

//   const closeAlertDialog = () => {
//     setAlertDialogOpen(false);
//   };

//   const saveAlertThreshold = () => {
//     console.log("Alert threshold set to:", alertThreshold);
//     closeAlertDialog();
//   };

//   // Helper function to format date for input value ("YYYY-MM-DD")
//   const formatDateForInput = (date) => {
//     if (!date) return "";
//     return date.toISOString().substring(0, 10);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {/* Header with user's first name avatar and logout */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Avatar>{firstName.charAt(0)}</Avatar>
//           <Typography variant="h6">Hello, {firstName}</Typography>
//         </Box>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>
//           Logout
//         </Button>
//       </Box>

//       <Typography variant="h4" component="h1" gutterBottom>
//         Email Tracker Dashboard
//       </Typography>

//       {/* Analytics Overview */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6">Analytics Overview</Typography>
//           <Typography variant="body1">Total Opens: {analytics.opens}</Typography>
//           <Typography variant="body1">Total Clicks: {analytics.clicks}</Typography>
//           <Button variant="contained" onClick={fetchAnalytics} sx={{ mt: 2 }}>
//             Refresh Analytics
//           </Button>
//         </Paper>
//       </Box>

//       {/* Date Range Filter */}
//       <Box my={2} display="flex" alignItems="center" gap="1rem">
//         <TextField
//           label="Start Date"
//           type="date"
//           value={formatDateForInput(startDate)}
//           onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="End Date"
//           type="date"
//           value={formatDateForInput(endDate)}
//           onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <Button variant="outlined" onClick={() => { setStartDate(null); setEndDate(null); }}>
//           Clear Dates
//         </Button>
//       </Box>

//       {/* Email Filter, Export & Alert Settings */}
//       <Box my={2} display="flex" alignItems="center" gap="1rem">
//         <TextField
//           label="Filter by Email"
//           variant="outlined"
//           size="small"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={() => setFilter('')}>
//           Clear Filter
//         </Button>
//         <Button variant="contained" color="secondary" onClick={exportCSV}>
//           Export CSV
//         </Button>
//         <Button variant="outlined" onClick={openAlertDialog}>
//           Set Alert
//         </Button>
//       </Box>

//       {/* Line Chart: Opens Over Time */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Opens Over Time
//           </Typography>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                 <CartesianGrid stroke="#f5f5f5" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="opens" stroke="#ff7300" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <Typography>No data available for chart.</Typography>
//           )}
//         </Paper>
//       </Box>

//       {/* Detailed Tracking Events Table */}
//       <Box my={4}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Detailed Tracking Events
//           </Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === 'email'}
//                       direction={orderBy === 'email' ? order : 'asc'}
//                       onClick={() => handleRequestSort('email')}
//                     >
//                       Email
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === 'openTime'}
//                       direction={orderBy === 'openTime' ? order : 'asc'}
//                       onClick={() => handleRequestSort('openTime')}
//                     >
//                       Open Time
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>Browser</TableCell>
//                   <TableCell>Location</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredEvents.map((event) => (
//                   <TableRow
//                     key={event.id}
//                     hover
//                     onClick={() => handleRowClick(event)}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell>{event.email}</TableCell>
//                     <TableCell>{new Date(event.openTime).toLocaleString()}</TableCell>
//                     <TableCell>{event.browser}</TableCell>
//                     <TableCell>{event.location}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>

//       {/* Event Detail Modal */}
//       <Dialog open={Boolean(selectedEvent)} onClose={closeDetailDialog}>
//         <DialogTitle>Tracking Event Details</DialogTitle>
//         <DialogContent>
//           {selectedEvent && (
//             <>
//               <Typography>Email: {selectedEvent.email}</Typography>
//               <Typography>
//                 Open Time: {new Date(selectedEvent.openTime).toLocaleString()}
//               </Typography>
//               <Typography>Browser: {selectedEvent.browser}</Typography>
//               <Typography>Location: {selectedEvent.location}</Typography>
//               <Typography>IP Address: {selectedEvent.ip}</Typography>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetailDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Alert Settings Modal */}
//       <Dialog open={alertDialogOpen} onClose={closeAlertDialog}>
//         <DialogTitle>Set Alert Threshold</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter a threshold for email opens. You will be alerted when total opens exceed this value.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Alert Threshold"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={alertThreshold}
//             onChange={(e) => setAlertThreshold(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeAlertDialog}>Cancel</Button>
//           <Button onClick={saveAlertThreshold}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress, // Import LinearProgress here
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Helper function to decode a JWT (without verifying signature)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
}

const Dashboard = ({ token }) => {
  const userData = parseJwt(token);
  const firstName = userData && userData.username ? userData.username.split(' ')[0] : 'User';

  const [analytics, setAnalytics] = useState({ opens: 0, clicks: 0 });
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('openTime');
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState('');

  // Loading states for analytics and events
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  useEffect(() => {
    fetchAnalytics();
    fetchEvents();

    const interval = setInterval(() => {
      fetchAnalytics();
      fetchEvents();
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true); // Show loading indicator for analytics
    try {
      const response = await fetch('https://emailtracking-server.onrender.com/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics({ opens: 100, clicks: 15 }); // Fallback static data for demo
    } finally {
      setLoadingAnalytics(false); // Hide loading indicator after fetch completes
    }
  };

  const fetchEvents = async () => {
    setLoadingEvents(true); // Show loading indicator for events
    try {
      const response = await fetch('https://emailtracking-server.onrender.com/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([
        { id: 1, email: 'example1@mail.com', openTime: '2023-12-01T10:00:00Z', browser: 'Chrome', location: 'USA', ip: '192.168.1.1' },
        { id: 2, email: 'example2@mail.com', openTime: '2023-12-02T11:30:00Z', browser: 'Firefox', location: 'UK', ip: '192.168.1.2' },
        { id: 3, email: 'customer@domain.com', openTime: '2023-12-03T09:15:00Z', browser: 'Safari', location: 'Canada', ip: '192.168.1.3' },
      ]);
    } finally {
      setLoadingEvents(false); // Hide loading indicator after fetch completes
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEvents = events.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const filteredEvents = sortedEvents.filter((event) => {
    const emailMatch = event.email.toLowerCase().includes(filter.toLowerCase());
    let dateMatch = true;
    const eventDate = new Date(event.openTime);
    if (startDate) dateMatch = dateMatch && eventDate >= startDate;
    if (endDate) dateMatch = dateMatch && eventDate <= endDate;
    return emailMatch && dateMatch;
  });

  const chartData = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.openTime).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.opens += 1;
    } else {
      acc.push({ date, opens: 1 });
    }
    return acc;
  }, []);

  const exportCSV = () => {
    const header = 'ID,Email,Open Time,Browser,Location,IP\n';
    const rows = filteredEvents
      .map(
        (event) =>
          `${event.id},${event.email},${event.openTime},${event.browser},${event.location},${event.ip}`
      )
      .join('\n');
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tracking_events.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRowClick = (event) => {
    setSelectedEvent(event);
  };

  const closeDetailDialog = () => {
    setSelectedEvent(null);
  };

  const openAlertDialog = () => {
    setAlertDialogOpen(true);
  };

  const closeAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const saveAlertThreshold = () => {
    console.log('Alert threshold set to:', alertThreshold);
    closeAlertDialog();
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    return date.toISOString().substring(0, 10);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Hello, {firstName}</Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5">Analytics Overview</Typography>
        {loadingAnalytics && <LinearProgress />} {/* Show progress bar while loading analytics */}
        {!loadingAnalytics && (
          <>
            <Typography>Total Opens: {analytics.opens}</Typography>
            <Typography>Total Clicks: {analytics.clicks}</Typography>
          </>
        )}
      </Paper>

      {/* Date Range Filter */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Start Date"
          type="date"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={formatDateForInput(endDate)}
          onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
          InputLabelProps={{ shrink: true }}
        />
        <Button onClick={() => { setStartDate(null); setEndDate(null); }}>Clear Dates</Button>
      </Box>

      {/* Email Filter, Export & Alert Settings */}
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Filter by Email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => setFilter('')}>Clear Filter</Button>
        <Button onClick={exportCSV}>Export CSV</Button>
        <Button onClick={openAlertDialog}>Set Alert</Button>
      </Box>

      {/* Line Chart: Opens Over Time */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5">Opens Over Time</Typography>
        {loadingEvents && <LinearProgress />} {/* Show progress bar while loading events */}
        {!loadingEvents && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="opens" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartData.length === 0 && !loadingEvents && <Typography>No data available for chart.</Typography>}
      </Paper>

      {/* Detailed Tracking Events Table */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5">Detailed Tracking Events</Typography>
        {loadingEvents && <LinearProgress />} {/* Show progress bar while loading events */}
        {!loadingEvents && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel active={orderBy === 'email'} direction={order} onClick={() => handleRequestSort('email')}>
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={orderBy === 'openTime'} direction={order} onClick={() => handleRequestSort('openTime')}>
                      Open Time
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Browser</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id} onClick={() => handleRowClick(event)} sx={{ cursor: 'pointer' }}>
                    <TableCell>{event.email}</TableCell>
                    <TableCell>{new Date(event.openTime).toLocaleString()}</TableCell>
                    <TableCell>{event.browser}</TableCell>
                    <TableCell>{event.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {filteredEvents.length === 0 && !loadingEvents && <Typography>No tracking events found.</Typography>}
      </Paper>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onClose={closeDetailDialog}>
        <DialogTitle>Tracking Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography>Email: {selectedEvent.email}</Typography>
              <Typography>Open Time: {new Date(selectedEvent.openTime).toLocaleString()}</Typography>
              <Typography>Browser: {selectedEvent.browser}</Typography>
              <Typography>Location: {selectedEvent.location}</Typography>
              <Typography>IP Address: {selectedEvent.ip}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetailDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Alert Settings Modal */}
      <Dialog open={alertDialogOpen} onClose={closeAlertDialog}>
        <DialogTitle>Set Alert Threshold</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a threshold for email opens.</DialogContentText>
          <TextField
            label="Threshold"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlertDialog}>Cancel</Button>
          <Button onClick={saveAlertThreshold}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;