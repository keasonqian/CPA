import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

import Games from './Games'

import DoMath from "./DoMath"

import Note from "./Note"

import GitHub from "./GitHub"


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Record Everything!"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="CurrentTime" component={CurrentTimeScreen} />

        <Stack.Screen name="Notes" component={Note} />

        <Stack.Screen name="GitHub" component={GitHub} />

        <Stack.Screen name="DoMath" component={DoMath} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <View style={{flexDirection:"column",
                      alignItems:"center",justifyContent: 'space-between',}}>
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
            title="Make Plan!"
            onPress={() =>
              navigation.navigate('Notes')
                 // we're passing a parameter name:'Jane' to the Profile component!
            }
          />

          <Button
            color= "black"
            title="Do some Math"
            onPress={() =>
              navigation.navigate('DoMath')
            }
          />

          <Button
            color= "black"
            title="Check your GitHub"
            onPress={() =>
              navigation.navigate('GitHub')
            }
          />

        </View>
        <View style={styles.horizontal}>
          <Image
             style={{width:"100%",height:"70%"}}
             source={{uri:'https://ae01.alicdn.com/kf/H16575818d272401d8f0db9dd80e645bfM.jpg'}}/>
        </View>
    </View>




  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const CurrentTimeScreen = ({ navigation, route }) => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return (
    <View style={styles.timePageWord}>
        <Text style={{color: 'white',
                      fontWeight: 'bold',
                      fontSize: 30,}}>
                {date}
        </Text>
        <Text style={{color: 'white',
                      fontWeight: 'bold',
                      fontSize: 30,}}>
                {time}
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
