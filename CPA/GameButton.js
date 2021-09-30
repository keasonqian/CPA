import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function GameButton() {
  return (
   <View style={styles.direction}>
      <Button
        title = "press me"
        color= "black"
      />
    </View>
  )
};

const styles = StyleSheet.create({
  direction:{
    flexDirection:"column",
    flexWrap:'flexWrap',
  },
});
