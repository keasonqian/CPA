import React, { useEffect,useState } from "react";
import { Button, StyleSheet, Text, TextInput, View,
   FlatList, SafeAreaView,StatusBar,TouchableOpacity, ScrollView  } from "react-native";
import Axios from "axios";

   const DATA = [
     {
       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
       title: "bb1",
     },
     {
       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
       title: "bb2",
     },
     {
       id: "58694a0f-3da1-471f-bd96-145571e29d72",
       title: "bb3",
     },
     {
       id: "58694a0f-3da1-471f-bd96-145571e29d72",
       title: "bb3",
     },
     {
       id: "58694a0f-3da1-471f-bd96-145571e29d72",
       title: "bb3",
     },
     {
       id: "58694a0f-3da1-471f-bd96-145571e29d72",
       title: "bb3",
     },
     {
       id: "58694a0f-3da1-471f-bd96-145571e29d72",
       title: "bb3",
     },

   ];

 const Item = ({ item, onPress, backgroundColor, textColor }) => (
   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Text style={[styles.title, textColor]}>{item}</Text>
   </TouchableOpacity>
 );
 const ItemText = ({item}) => {
   return(
     <View style = {styles.dataContainer}>
       <Text style = {styles.dataBiew}>
       {item.title}
       </Text>
       <Text>
       {item.text}
       </Text>
     </View>
   )
 }


const BBBoard = () => {
  const [chooenBboard, setChooenBboard] = useState("");
  const [bboard, setBboard] = useState("");
  const [posts, setPosts] = useState([]);
  const [serverURL, setURL] = useState(
    "https://glacial-hamlet-05511.herokuapp.com"
  );
  const [newPostsNum, setNewPostsNum] = useState(0);
  const [bbNames, setBbNames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  // go out to the server and get the posts for the current bboard

  const getBbNames= async () => {
    let result = [];
    result =
      await Axios.get(
        serverURL + "/bboardNames"
      )
    console.log(result.data)
    setBbNames(result.data)
  }
  const ps = getBbNames()
  },[bboard,newPostsNum])

  const getPosts = async (itemName) => {
    setChooenBboard(itemName);
    let result = [];
    result =
      await Axios.post(
        serverURL + "/posts",
        {bboard: itemName,}
    )
    setPosts(result.data)
  }


const clearSelection = () => {
  setPosts([]);
  setChooenBboard("")
}







  const renderItem = ({ item }) => {
    const backgroundColor = "black";
    const color ='red';

  return (
    <Item
      item={item}
      onPress={() => getPosts(item)}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
    />
  );
};



  let debugView =
      <View>
          <Text> DEBUGGING </Text>
          <Text> bb: {chooenBboard} </Text>
          <Text> show: {chooenBboard == "" && "false"}
                        {chooenBboard != "" && "true"}
          </Text>
          <Text> bbs.length = {bbNames.length} </Text>
          <Text> posts = {JSON.stringify(posts)} </Text>
      </View>


  return(
    <View style={styles.container}>
      <View style = {{backgroundColor:'black',alignItems: 'center'}}>
        <Text style={styles.header}>
          BBViewer
        </Text>
      </View>
      <View style = {styles.bbButton}>
        <View style = {styles.refreshButton}>
          <Button
            color="blue"
            title="REFRESH BBOARDS"
            onPress={() => clearSelection()}
          />
        </View>
        <SafeAreaView style={styles.saveView}>
            <FlatList
              horizontal = {true}
              data={bbNames}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
        </SafeAreaView>

      </View>

      <View style = {{alignItems: 'left'}}>
        <Text style={styles.second_header}>
          Selected bborad :
          <Text style={styles.choosenBB}>
            {chooenBboard}
          </Text>
        </Text>

      </View>


      <View style = {{flex:15,}}>
      {chooenBboard != "" &&(
        <FlatList
          data={posts}
          renderItem={({ item }) => <ItemText item={item} />}
          keyExtractor={(item) => item._id}
        />
      )}

      </View>
      {debugView}
    </View>
  )




}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'left',
  },
  headerText:{
    margin:20,
    fontSize:30
  },
  dataContainer: {
    flexDirection:'column',
    backgroundColor: '#ddd',
    alignItems: 'left',
    padding:10,
    margin:10,
  },
  dataBiew: {
    fontSize:20,
    color:'black',
    margin:20,
  },
  header: {
    fontSize:30,
    color:'red',
    margin:20,
  },
  second_header: {
    fontSize:30,
    color:'black'
  },
  choosenBB: {
    fontSize:30,
    color:'red',
    backgroundColor: 'black',
    margin:10,
  },
  nextQuestion2: {
    flexDirection: "column",
    width:"30%",
  },
  restButton: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
  },
  saveView: {
    flex:1,
    marginTop: StatusBar.currentHeight || 0,
  },
  refreshButton: {
    alignItems: 'left',
  },
  bbButton: {
  flexDirection: 'row',
  alignItems: 'left',
  },
  item: {
      padding: 5,
      marginVertical: 3,
      marginHorizontal: 3,
    },
});

export default BBBoard;
