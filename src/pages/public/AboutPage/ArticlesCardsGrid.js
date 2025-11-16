import React from 'react';
import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';

const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  },
];

const ArticlesCardsGrid = () => {
  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} radius="md" alt={article.title} />
      </AspectRatio>
      <Text className={classes.date}>{article.date}</Text>
      <Text className={classes.title}>{article.title}</Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: 'md' }}>
        {cards}
      </SimpleGrid>
    </Container>
  );
};

export default ArticlesCardsGrid;
