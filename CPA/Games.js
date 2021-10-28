import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameButton from "./GameButton.js";

// const App = () => {...}
export default function App() {
  return (
    <View style={styles.container}>

      <View style={{flex:8, flexDirection:'column'}}>

        <View style={{flex:3, backgroundColor:"green"}}>
          <Text style={styles.title}>
              Use the numbers to calculate 24
          </Text>
          <GameButton/>
        </View>

        <View style={{flex:3,backgroundColor:"blue"}}>

        <Text style={styles.title}>
            Solve the Puzzle
        </Text>

          <GameButton />
        </View>

        <View style={{flex:3,backgroundColor: "red"}}>
          <Text style={styles.title}>
              Give the answer of the riddle
          </Text>

            <GameButton/>
        </View>

      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexDirection:'row',
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
    justifyContent: 'center',
    alignItems: 'center',
 },

});
