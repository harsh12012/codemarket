import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputField = ({
    label,
    onChangeText,
    value,
    placeholder,
    viewStyle={},
    error=false,
    errorStyle={},
    inputStyle={},
    number=false
}) => {
    return (
        <View style={[styles.inputContainer]}>
            <Text style={styles.labelText}>{label}</Text>
            {
                number ?

                    <TextInput 
                    placeholder={placeholder}
                    value={value}
                    style={error ? [styles.errorStyle] : [styles.inputStyle]}
                    onChangeText={text => onChangeText(text)}
                    keyboardType="number-pad"
                    />
                    
                    :

                    <TextInput 
                    placeholder={placeholder}
                    value={value}
                    style={error ? [styles.errorStyle] : [styles.inputStyle]}
                    onChangeText={text => onChangeText(text)}
                
                    />
            }
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:8,
    },
    labelText:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
    },
    inputStyle:{
        borderWidth:1,
        borderColor:'#cecece',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:5
    },
    errorStyle:{
        borderWidth:1,
        borderColor:colors.error,
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:5
    }
})

