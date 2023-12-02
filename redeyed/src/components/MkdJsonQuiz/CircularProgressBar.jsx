import React from "react";
import { RingProgress, Text } from "@mantine/core";

function CircularProgressBar({ percentage = 0 }) {
  return (
    <RingProgress
      size={170}
      thickness={16}
      roundCaps
      label={
        <Text color="blue" weight={700} align="center" size="xl">
          {percentage}%
        </Text>
      }
      sections={[{ value: percentage, color: "blue" }]}
    />
  );
}

export default CircularProgressBar;
