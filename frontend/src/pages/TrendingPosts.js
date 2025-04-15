import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { fetchTrendingPosts } from '../services/api';

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchTrendingPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={post.user.avatar} alt={post.user.name} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {post.user.name}
                  </Typography>
                  <Chip
                    icon={<CommentIcon />}
                    label={`${post.comments.length} comments`}
                    color="primary"
                    sx={{ ml: 'auto' }}
                  />
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
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Top Comments
                </Typography>
                <List>
                  {post.comments.slice(0, 3).map((comment) => (
                    <ListItem key={comment.id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={comment.user.avatar} alt={comment.user.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.user.name}
                        secondary={comment.content}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TrendingPosts; 