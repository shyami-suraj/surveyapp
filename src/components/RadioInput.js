// App.js 

import React, { useState } from 'react'; 
import { 
	View, Text, TouchableOpacity, 
	StyleSheet 
} from 'react-native'; 



const CustomRadioButton = ({ label, selected, onSelect }) => ( 
	<TouchableOpacity 
	
		style={[styles.radioButton, 
		{ backgroundColor: selected ? '#007BFF' : '#FFF' }]} 
		onPress={onSelect} 
	> 
		<Text style={[styles.radioButtonText, 
		{ color: selected ? '#FFF' : '#000' }]}> 
			{label} 
		</Text> 
	</TouchableOpacity> 
); 

const styles = StyleSheet.create({ 
	container: { 
	
	}, 
	radioButton: { 
		paddingVertical: 12, 
		paddingHorizontal: 16, 
		borderRadius: 8, 
		marginVertical: 8, 
		borderWidth: 1, 
		borderColor: '#007BFF', 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		width: '100%',
		
	}, 
	radioButtonText: { 
		fontSize: 16, 
	}, 
}); 

const RadioInput = (props) => { 
	const [selectedValue, setSelectedValue] = useState(null); 
    const [data, setData] = useState([]);

    React.useEffect(()=>{
        console.log('data', props.data);
        const data = props.data;
        const row_data = data.split('|')
        console.log('row_data', row_data);
        let arr = [];
        row_data.map(item=>{
            const each_item = item.split(':');
            arr.push({option:each_item[0],value:each_item[1],} )
        })
    
        console.log('arr', arr);
        setData(arr)
    }, [])
	return ( 
		<View style={styles.container}> 


{
          data.map((item, key) => (
            
			<CustomRadioButton 
            label={item.option}
			key={key}
          
            selected={selectedValue === item.value} 
            onSelect={() => setSelectedValue(item.value)} 
        /> 

            ))
        }
		</View> 
	); 
}; 

export default RadioInput;
