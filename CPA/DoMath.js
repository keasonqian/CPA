import React, { useEffect,useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const mph2fps = (mph) => mph*5280/3600

const DoMath = (props) => {
  const [n, setN] = useState(10)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [getAnswer, setGetAnswer] = useState(false)
  const [percent, setPercent] = useState(0.0)
  const [result, setResult] = useState("waiting")
  const [rightAnswer, setRightAnswer] = useState(false)

  const firstNum = Math.floor(Math.random() * (n+1))
  const secondNum = Math.floor(Math.random() * (n+1))
  const thirdNum = Math.floor(Math.random() * (n+1))

  const [fNum, setFNum] = useState(firstNum)
  const [sNum, setSNum] = useState(secondNum)
  const [tNum, setTNum] = useState(thirdNum)
  const [answerNum,setAnswerNum] = useState(-10)
  const [debugging,setDebugging] = useState(false)
  let textInput = React.createRef();

  let debugView = ""

  if (debugging) {
    debugView =
      <View>
          <Text> x: {fNum} </Text>
          <Text> y: {sNum} </Text>
          {answerNum != -10? (<Text> answer: {answerNum}</Text>) : (<Text> answer: </Text>)}
          <Text> correct: {correct} </Text>
          <Text> answered: {answered} </Text>
          <Text> result: {result} </Text>
      </View>
  }


  useEffect(() => {getData()}
             ,[])


  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@pomodoros')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setCorrect(data.correct)
            setAnswered(data.answered)
            setPercent(data.percent)
            console.log('just set correct,answered, percent')
          } else {
            console.log('just read a null value from Storage')
            // this happens the first time the app is loaded
            // as there is nothing in storage...
          }
        } catch(e) {
          console.log("error in getData ")
          // this shouldn't happen, but its good practice
          // to check for errors!
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@pomodoros', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }




      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       Calculate the numbers to get the answer
    </Text>
    <Text style={styles.second_header}>
      {fNum} * {sNum} * {tNum} =
    </Text>

    <TextInput
          style={styles.textinput}
          ref = {textInput}
          placeholder="Input your answer"
          onChangeText={(input) => {
            if(input.length != 0){
              setAnswerNum(parseInt(input));
            }else{
              setAnswerNum(-10);
            }
          }}
      />

    <View style={styles.fixToText}>
      {!getAnswer && (
        <Button
            color='red'
            title='CHECK ANSWER'
            onPress = {() =>{
                            let corNum = correct
                            let ansNum = answered + 1
                            setAnswered(ansNum)
                            setGetAnswer(true)
                            if(answerNum === fNum * sNum * tNum){
                              corNum += 1
                              setCorrect(corNum)
                              setResult("correct")
                              setRightAnswer(true)
                            }else{
                              setResult("incorrect")
                              setRightAnswer(false)
                            }
                            let per = ((parseInt(corNum) / parseInt(ansNum)) * 100).toFixed(1)
                            setPercent(per)

                            let data = {correct: corNum, answered: ansNum, percent:per};
                            storeData(data);

            }}
        />
        )}
      </View>

      {getAnswer && rightAnswer === true && (
          <View style={styles.nextQuestion}>

            <View style={styles.fixToText}>
              <Button
                color="green"
                title="Next Question"
                onPress={() => {
                  setFNum(Math.floor(Math.random() * (n + 1)));
                  setSNum(Math.floor(Math.random() * (n + 1)));
                  setTNum(Math.floor(Math.random() * (n + 1)));
                  setGetAnswer(false);
                  setResult("waiting");
                  setAnswerNum(-10)
                  textInput.current.clear();
                }}
              />
            </View>
            <View style={{alignSelf: "center"}}>
                <Text style={styles.correctview}> Nice job!! It's correct!!!</Text>
            </View>

          </View>
        )}

        {getAnswer && rightAnswer === false && (
            <View style={styles.nextQuestion2}>
              <View style={{ alignSelf: "center" }}>
                <Button
                  color="green"
                  title="Next Question"
                  onPress={() => {
                    setFNum(Math.floor(Math.random() * (n + 1)));
                    setSNum(Math.floor(Math.random() * (n + 1)));
                    setGetAnswer(false);
                    setResult("waiting");
                    setAnswerNum(-10)
                    textInput.current.clear();
                  }}
                />
              </View>
              <View style={{alignSelf: "center"}}>
                <Text style={styles.correctview}>
                  You got the wrong answer, please try agrain.
                </Text>
                <Text style={styles.correctview}>
                  The correct answer is {parseInt(fNum) * parseInt(sNum)* parseInt(tNum)}
                </Text>
              </View>
            </View>
          )}
    <View style = {styles.rowContainer}>
      <Text style = {styles.dataStyle}> You got right: {correct}     </Text>
      <Text style = {styles.dataStyle}> Total Question {answered}     </Text>
      <Text style = {styles.dataStyle}> Percent: {percent}%    </Text>
    </View>
    <View style={styles.fixToText}>
      <Button
              title={"Clear the data"}
              color="midnightblue"
              onPress = {() => {clearAll()}}
              />
    </View>

  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      margin:"20px",
      padding:"20px",
    },
    textinput:{
      margin:5,
      fontSize:10,
      border:"thick solid red",
      color:"white",
    },
    correctview: {
      fontSize:10,
      color:'white',

    },
    header: {
      fontSize:23,
      color:'blue',
      margin:5,
    },
    second_header: {
      fontSize:20,
      color:'white'
    },
    nextQuestion: {
      flexDirection: "column",
    },
    nextQuestion2: {
      flexDirection: "column",
      width:"30%",
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin:"20px",
      padding:"20px",
    },
    dataStyle: {
      fontSize:10,
      color:'white'
    },

    fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  });

export default DoMath;
