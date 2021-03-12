import React, { useState } from 'react';
import { View, Text, CheckBox } from 'react-native';

export default function MaterialCheckbox() {
  const [isSelected, setSelection] = useState(false);
  return (
    <CheckBox
      value={isSelected}
      onValueChange={setSelection}
      //   style={{ width: 40, height: 40 }}
    />
  );
}
