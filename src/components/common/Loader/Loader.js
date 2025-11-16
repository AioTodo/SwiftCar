import React from 'react';
import { Loader as MantineLoader, Center, Stack, Text } from '@mantine/core';

// Mantine-based Loader wrapper. Uses theme-based spinner and optional full-screen mode.
const Loader = ({ size = 'medium', fullScreen = false, text = '' }) => {
  const mantineSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';

  const content = (
    <Stack align="center" gap="xs">
      <MantineLoader size={mantineSize} />
      {text && (
        <Text size="sm" c="dimmed">
          {text}
        </Text>
      )}
    </Stack>
  );

  if (fullScreen) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        {content}
      </Center>
    );
  }

  return content;
};

export default Loader;
