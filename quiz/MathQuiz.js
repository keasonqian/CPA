import React, { useEffect,useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Random from "expo-random"
import AsyncStorage from "@react-native-async-storage/async-storage";


// const mph2fps = (mph) => mph*5280/3600

const MathQuiz = (props) => {
  const [n, setN] = useState(props.n)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [getAnswer, setGetAnswer] = useState(false)
  const [percent, setPercent] = useState(0.0)
  const [result, setResult] = useState("waiting")
  const [rightAnswer, setRightAnswer] = useState(false)

  const firstNum = Math.floor(Math.random() * (n+1))
  const secondNum = Math.floor(Math.random() * (n+1))

  const [fNum, setFNum] = useState(firstNum)
  const [sNum, setSNum] = useState(secondNum)

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
       Math Quiz for numbers between 0 and {n}
    </Text>
    <Text style={styles.second_header}>
       Calculate the product of the following two numbers:
    </Text>
    <Text style={styles.second_header}>
      {fNum} * {sNum} =
      <TextInput
            style={styles.textinput}
            ref = {textInput}
            placeholder="???"
            onChangeText={(input) => {
              if(input.length != 0){
                setAnswerNum(parseInt(input));
              }else{
                setAnswerNum(-10);
              }
            }}
        />
    </Text>

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
                            if(answerNum === fNum * sNum){
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
            <View>
                <Text style={styles.correctview}> Correct!!!</Text>
            </View>
            <View style={styles.fixToText}>
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
          </View>
        )}

        {getAnswer && rightAnswer === false && (
            <View style={styles.nextQuestion2}>
            <View>
              <Text style={styles.correctview}>
                Sorry, answer was {parseInt(fNum) * parseInt(sNum)}, try again!
              </Text>
            </View>
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
            </View>
          )}

    <Text> Correct: {correct} </Text>
    <Text> Answered {answered} </Text>
    <Text> Percent Correct: {percent} </Text>

    <View style={styles.fixToText}>
      <Button
          title={(debugging?'hide':'show')+" debug info" }
          color="green"
          onPress = {() => setDebugging(!debugging)}
          />
    </View>
        {debugView}
        
  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'left',
      margin:"20px",
      padding:"20px",
    },
    textinput:{
      margin:20,
      fontSize:30
    },
    correctview: {
      fontSize:25,
      color:'red'
    },
    header: {
      fontSize:40,
      color:'blue'
    },
    second_header: {
      fontSize:30,
      color:'black'
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
    },
    fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  });

export default MathQuiz;
