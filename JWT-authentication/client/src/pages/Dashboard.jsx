import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user, logout, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUserData(res.data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate, logout]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="loading-state">
            <div className="spinner large" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayUser = userData || user;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="avatar">
            {displayUser?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <h1>Welcome!</h1>
          <p className="dashboard-email">{displayUser?.email || 'No email'}</p>
        </div>

        <div className="dashboard-info">
          <div className="info-row">
            <span className="info-label">User ID</span>
            <span className="info-value">{displayUser?.id || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{displayUser?.email || 'N/A'}</span>
          </div>
          {displayUser?.createdAt && (
            <div className="info-row">
              <span className="info-label">Member Since</span>
              <span className="info-value">
                {new Date(displayUser.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>

        <button onClick={logout} className="logout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
}

