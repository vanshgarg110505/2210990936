import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, CircularProgress } from '@mui/material';
import { fetchFeed } from '../services/api';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchFeed();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    // Set up polling for real-time updates
    const interval = setInterval(loadPosts, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={post.user.avatar} alt={post.user.name} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {post.user.name}
                  </Typography>
                </Box>
                {post.image && (
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      mb: 2,
                      borderRadius: 1,
                    }}
                    src={post.image}
                    alt="Post"
                  />
                )}
                <Typography variant="body1">{post.content}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.comments.length} comments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Feed; 