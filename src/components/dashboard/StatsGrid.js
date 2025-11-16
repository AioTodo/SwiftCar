import React from 'react';
import { Paper, SimpleGrid, Group, Text } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * data: [
 *  { title: string, icon: React.ComponentType<{ size?: number }>, value: string | number, diff: number }
 * ]
 */
const StatsGrid = ({ data }) => {
  const items = data.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff >= 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        className="stats-grid__card"
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className="stats-grid__title">
            {stat.title}
          </Text>
          {Icon && <Icon className="stats-grid__icon" size={22} strokeWidth={1.5} />}
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className="stats-grid__value">{stat.value}</Text>
          <Text
            c={stat.diff >= 0 ? 'teal' : 'red'}
            fz="sm"
            fw={500}
            className="stats-grid__diff"
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} strokeWidth={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month (mock)
        </Text>
      </Paper>
    );
  });

  return (
    <div className="stats-grid">
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{items}</SimpleGrid>
    </div>
  );
};

export default StatsGrid;