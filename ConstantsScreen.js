import React from 'react';
import { View, Text } from 'react-native';

export default function ConstantsScreen({ route }) {
  const { idname } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{`Constants for ${idname}`}</Text>
    </View>
  );
}