import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import InputField from "../components/InputField";
import { TouchableOpacity } from "react-native";
import Textarea from "../components/Textarea";
import DropDown from "../components/DropDown";
import FileUpload from "../components/Fileupload";
import Checkbox from "../components/Checkbox";
import RadioInput from "../components/RadioInput";
import DatePicker from "../components/DatePicker";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";



const { height, width } = Dimensions.get("window");
const Questions = () => {
  const [textfield, setTextField] = useState('');
  const [textarea, setTextArea] = useState('');
  const [selectoption, setSelectedOption] = useState('');
  const [checkbox, setCheckBox] = useState('');
  const [radio, setRadio] = useState('');



  const sendData = () => {

    const answer_column =' A1';
    const payload = {
      [answer_column]: {
        textarea,
        textfield,
        selectoption,
        checkbox,
        radio
      }
      
      
    };
    console.log('answer',payload);
    fetch('http://192.168.1.75:8000/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent successfully!', data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }
  //checkbox

  //end
  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(1);
  // const [isSelected, setSelection] = useState(false);
  const [question, setQuestion] = useState("");
  async function getDataFromApi() {
   let user_id= await AsyncStorage.getItem("userId");
   console.log('user_id',user_id);
    const apiResponse = await fetch("http://192.168.1.75:8000/api/questions/"+user_id);
    const finalData = await apiResponse.json();
    console.log("question:", finalData);
    setQuestion(finalData.data);
  }
  useEffect(() => {
    getDataFromApi();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#007260', }}>
      <Text style={{ fontSize: 25, color: 'white', paddingLeft: 10 }}>Questions: {"" + currentIndex + "/" + question.length} </Text>

      <FlatList
        style={{ backgroundColor: '#007260', }}
        ref={listRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x / width;
          setCurrentIndex((x + 1).toFixed(0));

        }}
        data={question}
        renderItem={({ item, index }) => (
          <View >
            <View style={styles.container}>
              <View style={styles.imagebox}>

                <Image
                  source={{
                    uri: "http://192.168.1.75:8000/images/" + item.image,
                  }}
                  style={styles.Q_image}
                />
              </View>
              <View style={styles.questioncontainer}>
                <View style={styles.questionbox}>
                  <Text style={{ fontSize: 25, color: 'white' }}>{item.question}</Text>
                  {item.type == "textfield" ? (
                    <InputField placeholder="Enter Answer " name={item.answer_column} onChangeText={text => setTextField(text)} />
                  ) : item.type == "textarea" ? (
                    <Textarea placeholder="Enter Answer " name={item.answer_column} onChangeText={text => setTextArea(text)} />
                  ) : item.type == "selectbox" ? (
                    <DropDown data={item.option} onPress={() => setSelectedOption(option.value)} />
                  ) : item.type == "checkbox" ? (
                    <Checkbox data={item.option} value={item.answer_column} onPress={() => setCheckBox(option.value)} />
                  ) :
                    item.type == "radio" ? (
                      <RadioInput data={item.option} onSelect={() => setRadio(option.value)} />
                    ) : // ''
                      item.type == "date" ? (
                        <DatePicker />
                      ) : item.type == "fileupload" ? (
                        <FileUpload />
                      ) : (
                        ""
                      )}
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          // justifyContent: 'space-between',
          // alignItems: "center",
          // position: "absolute",
          bottom: 50,
          width: "100%",
        }}
      >
        {currentIndex >= 2 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginLeft: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (currentIndex > 1) {
                listRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex - 2,
                });
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Previous</Text>
          </TouchableOpacity>) : ('')
        }
        {currentIndex == question.length ? (
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 'auto'
            }}

            onPress={sendData}

          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 'auto'
            }}
            onPress={() => {
              if (currentIndex < question.length) {
                listRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex,
                });
              }
            }}
          >
            <Text style={{ color: "#fff" }}>next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
  },
  Q_image: {
    resizeMode: 'contain',
    width: width,
    height: 250,
    margin: 'auto',

  },
  imagebox: {
    width: width,
    height: 250,
    display: 'felx',
    alignItems: 'center'

  },
  questionbox: {
    width: '100%',
  },
  questioncontainer: {
    alignSelf: 'center',
    width: '90%'

  }

})
export default Questions;
