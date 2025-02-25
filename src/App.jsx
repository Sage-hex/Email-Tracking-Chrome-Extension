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
//   TableSortLabel,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
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

// function App() {
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

//   // Fetch analytics and events on component mount and every 30 seconds (simulated real-time)
//   useEffect(() => {
//     fetchAnalytics();
//     fetchEvents();
//     const interval = setInterval(() => {
//       fetchAnalytics();
//       fetchEvents();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Using axios to get analytics from the backend
//   const fetchAnalytics = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/analytics');
//       setAnalytics(response.data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       // Fallback static data for demo
//       setAnalytics({ opens: 100, clicks: 15 });
//     }
//   };

//   // Using axios to get tracking events from the backend
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('https://email-tracking-server.onrender.com/events');
//       setEvents(response.data);
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
//           ip: '192.168.1.1'
//         },
//         {
//           id: 2,
//           email: 'example2@mail.com',
//           openTime: '2023-12-02T11:30:00Z',
//           browser: 'Firefox',
//           location: 'UK',
//           ip: '192.168.1.2'
//         },
//         {
//           id: 3,
//           email: 'customer@domain.com',
//           openTime: '2023-12-03T09:15:00Z',
//           browser: 'Safari',
//           location: 'Canada',
//           ip: '192.168.1.3'
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
//   // Filter events by email and date range
// const filteredEvents = sortedEvents.filter((event) => {
//   // Check if event and event.email exist before calling toLowerCase()
//   if (!event || !event.email) return false;

//   const emailMatch = event.email.toLowerCase().includes(filter.toLowerCase());
//   let dateMatch = true;
//   const eventDate = new Date(event.openTime);
  
//   if (startDate) {
//     dateMatch = dateMatch && eventDate >= startDate;
//   }
//   if (endDate) {
//     dateMatch = dateMatch && eventDate <= endDate;
//   }
//   return emailMatch && dateMatch;
// });

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
//     // Here you would normally save the alert setting to your backend
//     closeAlertDialog();
//   };

//   // Helper function to format date for input value ("YYYY-MM-DD")
//   const formatDateForInput = (date) => {
//     if (!date) return "";
//     return date.toISOString().substring(0, 10);
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Email Tracker Dashboard
//       </Typography>

//       {/* Analytics Overview */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
//           <Typography variant="h6">Analytics Overview</Typography>
//           <Typography variant="body1">Total Opens: {analytics.opens}</Typography>
//           <Typography variant="body1">Total Clicks: {analytics.clicks}</Typography>
//         </Paper>
//       </Box>

//       {/* Date Range Filter using native HTML date pickers */}
//       <Box my={2} display="flex" alignItems="center" gap="1rem">
//         <TextField
//           label="Start Date"
//           type="date"
//           value={formatDateForInput(startDate)}
//           onChange={(e) => {
//             const newDate = e.target.value ? new Date(e.target.value) : null;
//             setStartDate(newDate);
//           }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="End Date"
//           type="date"
//           value={formatDateForInput(endDate)}
//           onChange={(e) => {
//             const newDate = e.target.value ? new Date(e.target.value) : null;
//             setEndDate(newDate);
//           }}
//           InputLabelProps={{
//             shrink: true,
//           }}
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

//       {/* Chart: Opens Over Time */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
//           <Typography variant="h6" gutterBottom>
//             Opens Over Time
//           </Typography>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//               <CartesianGrid stroke="#f5f5f5" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="opens" stroke="#ff7300" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Box>

//       {/* Detailed Tracking Events Table */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
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
//                     style={{ cursor: 'pointer' }}
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
// }

// export default App;



// src/App.jsx
// src/App.jsx

// src/App.jsx

import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { Container, Typography } from '@mui/material';

function App() {
  // Load token from localStorage if available
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  // State to toggle between login and signup screens
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
  };

  const switchToSignup = () => {
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };

  return (
    <Container maxWidth="lg">
      {!token ? (
        <>
          <Typography variant="h4" component="h1" sx={{ mt: 4, textAlign: 'center' }}>
            Welcome to Email Tracker
          </Typography>
          {showSignup ? (
            <Signup switchToLogin={switchToLogin} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} switchToSignup={switchToSignup} />
          )}
        </>
      ) : (
        <Dashboard token={token} />
      )}
    </Container>
  );
}

export default App;





// import React, { useState, useEffect } from 'react';
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
//   TableSortLabel,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
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

// function App() {
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

//   // Fetching analytics and events on component mount and every 30 seconds (simulated real-time)
//   useEffect(() => {
//     fetchAnalytics();
//     fetchEvents();
//     const interval = setInterval(() => {
//       fetchAnalytics();
//       fetchEvents();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/analytics');
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
//       const response = await fetch('http://localhost:3001/events');
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
//           ip: '192.168.1.1'
//         },
//         {
//           id: 2,
//           email: 'example2@mail.com',
//           openTime: '2023-12-02T11:30:00Z',
//           browser: 'Firefox',
//           location: 'UK',
//           ip: '192.168.1.2'
//         },
//         {
//           id: 3,
//           email: 'customer@domain.com',
//           openTime: '2023-12-03T09:15:00Z',
//           browser: 'Safari',
//           location: 'Canada',
//           ip: '192.168.1.3'
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
//     // Here you would normally save the alert setting to your backend
//     closeAlertDialog();
//   };

//   // Helper function to format date for input value ("YYYY-MM-DD")
//   const formatDateForInput = (date) => {
//     if (!date) return "";
//     return date.toISOString().substring(0, 10);
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Email Tracker Dashboard
//       </Typography>

//       {/* Analytics Overview */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
//           <Typography variant="h6">Analytics Overview</Typography>
//           <Typography variant="body1">Total Opens: {analytics.opens}</Typography>
//           <Typography variant="body1">Total Clicks: {analytics.clicks}</Typography>
//         </Paper>
//       </Box>

//       {/* Date Range Filter using native HTML date pickers */}
//       <Box my={2} display="flex" alignItems="center" gap="1rem">
//         <TextField
//           label="Start Date"
//           type="date"
//           value={formatDateForInput(startDate)}
//           onChange={(e) => {
//             const newDate = e.target.value ? new Date(e.target.value) : null;
//             setStartDate(newDate);
//           }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="End Date"
//           type="date"
//           value={formatDateForInput(endDate)}
//           onChange={(e) => {
//             const newDate = e.target.value ? new Date(e.target.value) : null;
//             setEndDate(newDate);
//           }}
//           InputLabelProps={{
//             shrink: true,
//           }}
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

//       {/* Chart: Opens Over Time */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
//           <Typography variant="h6" gutterBottom>
//             Opens Over Time
//           </Typography>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//               <CartesianGrid stroke="#f5f5f5" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="opens" stroke="#ff7300" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Box>

//       {/* Detailed Tracking Events Table */}
//       <Box my={4}>
//         <Paper elevation={3} style={{ padding: '2rem' }}>
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
//                     style={{ cursor: 'pointer' }}
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
// }

// export default App;
