import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";


// const mph2fps = (mph) => mph*5280/3600

const Counter = ({start, name}) => {
  const [count, setcount] = useState(start);


      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       <Text style= {{frontSize: 100}}> {name}: </Text>
       Count = {Count}
    </Text>
    <Button
          color='red' title='Imcrement'
          onPress = {() =>
               setTip(count+1)          }
      />

    <Text> The tip is {tip} </Text>
  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
      margin:20,
      fontSize:20
    },
    header: {
      fontSize:40,
      color:'blue'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default Counter;
