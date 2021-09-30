import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

import Games from './Games'



const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Clock time!"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="CurrentTime" component={CurrentTimeScreen} />

        <Stack.Screen name="SetTime" component={SetTimeScreen} />

        <Stack.Screen name="Games" component={Games} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <View style={{flex:5,flexDirection:"row",
                      alignItems:"center",justifyContent: 'space-around',}}>
          <Button
            color= "black"
            title="Check Current Time!"
            onPress={() =>
              navigation.navigate('CurrentTime')
                 // we're passing a parameter name:'Jane' to the Profile component!
            }
          />

          <Button
            color= "black"
            title="Set Your Alarm!"
            onPress={() =>
              navigation.navigate('SetTime')
                 // we're passing a parameter name:'Jane' to the Profile component!
            }
          />

          <Button
            color= "black"
            title="Choose The Game To Stop The Alarm!"
            onPress={() =>
              navigation.navigate('Games')
            }
          />
        </View>
        <View style={styles.horizontal}>
          <Image
             style={{width:"50%",height:"100%"}}
             source={{uri:'https://ae01.alicdn.com/kf/H16575818d272401d8f0db9dd80e645bfM.jpg'}}/>
        </View>
    </View>




  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const CurrentTimeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.timePageWord}>
        <Text style={{color: 'white',
                      fontWeight: 'bold',
                      fontSize: 50,}}>
                Current Time: 13 : 30 : 00
        </Text>
    </View>
  )
       // we're using the parameter name passed in from the HomeScreen
};

const SetTimeScreen = ({ navigation, route }) => {
      return (
        <View style={styles.timePageWord}>
            <Text style={{color:"white",
                          fontWeight: "bold",
                          fontSize: 50,}}>
                In the future, you can set up your alarm here by choosing time and date.
            </Text>
        </View>
      )
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"white",
    margin:"25px",
    padding:'10px',
    justifyContent: 'space-around',
  },



  horizontal: {
    flex:30,
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },

  timePageWord:{
    flex: 10,
    backgroundColor:"black",
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ButtonStyle:{


  }
});

export default MyStack;
