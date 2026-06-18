'use client';

import { Card, CardContent, CardHeader, List, ListItem, Divider, Box } from '@mui/material';

interface NewsArticle {
  title: string;
  date: string;
  author: string;
  href: string;
}

const Minicard = ({ newsArticles }: { newsArticles: NewsArticle[] }) => {
  return (
    <Card sx={{ maxWidth: 400, border: '1px solid black', padding: 1 }}>
      <CardHeader title="News" />
      <Divider />
      <CardContent sx={{ margin: 0, padding: 1 }}>
        <List sx={{ padding: 0 }}>
          {newsArticles.map((article, index) => (
            <Box
              key={index}
              component="a"
              href={article.href}
              sx={{
                display: 'block', 
                textDecoration: 'none',
                margin: 0
              }}
            >
              <ListItem
                sx={{
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', 
                    padding: 0,
                    margin: 0,
                    '&:hover': {
                      boxShadow: 3,
                      borderRadius: '4px',
                    },
                }}
              >
                <Box sx={{ textAlign: 'left', margin: 0, padding: '0.5rem', paddingBottom: 0, fontWeight: 'bold' }}>
                  {article.title}
                </Box>
                <Box sx={{ textAlign: 'left', margin: 0, padding: '0.5rem', paddingTop: 0, paddingBottom: 0, fontSize: '1rem' }}>
                  {article.date}
                </Box>
                <Box sx={{ textAlign: 'left', margin: 0, padding: '0.5rem', paddingTop: 0, paddingBottom: 0, fontSize: '1rem' }}>
                  {article.author}
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Minicard;