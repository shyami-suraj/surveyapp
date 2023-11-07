import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';


const Checkbox = (props) => {
    const [data, setData] = useState([]);


  React.useEffect(()=>{
    console.log('data', props.data);
    const data = props.data;
    const row_data = data.split('|')
    console.log('row_data', row_data);
    let arr = [];
    row_data.map(item=>{
        const each_item = item.split(':');
        arr.push({id:each_item[0],key:each_item[1],checked:false} )
    })

    console.log('arr', arr);
    setData(arr)
}, [])

const onCheckChanged = (id) => {
  setData(prevData => prevData.map(item => {
      if (item.id === id) {
          return { ...item, checked: !item.checked };
      }
      return item;
  }));
}

return (
  <View>
      {
          data.map((item, key) => (   
              <CheckBox containerStyle={styles.checkbox}
                  title={item.key}
                  key={key}
                  checked={item.checked}
                  onPress={() => onCheckChanged(item.id)}
                  onChangeText={ props.onChangeText}
              />
          ))
      }
  </View>
);
}

export default Checkbox;
const styles = StyleSheet.create({
    checkbox:{
    width:'90%',
    marginLeft:0
    
    }
    



});  
