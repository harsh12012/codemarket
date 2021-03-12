import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function LoadingSpinner({ size = 'large', color = colors.secondary, style = {} }) {
  return <ActivityIndicator style={{ ...style }} size={size} color={color} />;
}
