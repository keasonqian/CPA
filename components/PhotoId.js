import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,View, Button, }


const PhotoID = ({name,imageurl}) => {

  const [image, setImage] = useState(imageurl)
  const [editing,setEditing] = React.useState()

    return (
      <View style ={{flexDirection:row,flex:2 }}>
         <view style= {{flex:1, alignItems: 'center', jutifyContent:'center',}}>
          <Text style = {{fontSize:32}}>PhotoID.name</Text>
          {editing?editView:""}
          <Buton title="edit?" onPress = {() => }
          </view>
          <View style= {{flex:1, alignItems: 'center', jutifyContent:'center'}}>
              <Image source = {{uri:iamge}}
                  style = {{width:'100%', heigh:'100%'}}/>
          </View>

      </View>
    )}
