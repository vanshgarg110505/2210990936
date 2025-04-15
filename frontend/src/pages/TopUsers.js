import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import { fetchTopUsers } from '../services/api';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log('Fetching top users...');
        const data = await fetchTopUsers();
        console.log('Received data:', data);
        setUsers(Array.isArray(data) ? data.slice(0, 5) : []); // Ensure data is an array
      } catch (error) {
        console.error('Failed to load top users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!users.length) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Typography variant="h6">
          No users found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Top Users
      </Typography>
      <Card>
        <List sx={{ width: '100%' }}>
          {users.map((user, index) => (
            <React.Fragment key={user.id || index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{
                      width: 56,
                      height: 56,
                      border: (theme) =>
                        index === 0 ? `2px solid ${theme.palette.primary.main}` : 'none',
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {user.name}
                      {index === 0 && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="primary"
                          sx={{ ml: 1 }}
                        >
                          (Top Contributor)
                        </Typography>
                      )}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography component="span" variant="body2" color="text.primary">
                        Total Posts: {user.posts?.length || 0}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Total Comments: {user.totalComments || 0}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < users.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
}

export default TopUsers; 