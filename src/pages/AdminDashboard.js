import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/api/complaints', {
          headers: { 'Authorization': token }
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints', error);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleStatusChange = async (id) => {
    try {
      await axios.put(`/api/complaints/${id}`, { status }, {
        headers: { 'Authorization': token }
      });
      // Refresh complaints list after status update
      const updatedComplaints = complaints.map(complaint => 
        complaint._id === id ? { ...complaint, status } : complaint
      );
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error('Error updating complaint status', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.category}</td>
              <td>{complaint.status}</td>
              <td>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button onClick={() => handleStatusChange(complaint._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
