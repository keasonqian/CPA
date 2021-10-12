import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameButton from "./GameButton.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoMath from "./DoMath"

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Game Choose!"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="domath" component={DoMath} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
// const App = () => {...}
const HomeScreen = ({ navigation }) =>{
  return (
    <View style={styles.container}>

      <View style={{flex:8, flexDirection:'column'}}>

        <View style={{flex:3, backgroundColor:"green"}}>
          <Text style={styles.title}>
              Use the numbers to calculate 24
          </Text>
          <Button
            color= "rad"
            title="Do the Math!"
            onPress={() =>
              navigation.navigate('domath')
                 // we're passing a parameter name:'Jane' to the Profile component!
            }
          />
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

export default MyStack
