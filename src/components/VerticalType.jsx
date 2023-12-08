import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native'
import { COLORS, SIZES } from '../config/theme'
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'

const VerticalType = ({item,filterRoomsByType,selectedType}) => {
  return (
    <TouchableOpacity  key={item?.id}  onPress={()=>filterRoomsByType(item.id)} style={[styles.component,{
      borderColor: selectedType === item.id ? 'black' :COLORS.gray
    }]}>
        <Text style={[styles.type, {
          color: selectedType === item.id ? 'black' :COLORS.gray
        }]}>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default VerticalType 

const styles = StyleSheet.create({
    component: {
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginRight: SIZES.margin,
        // height: 20
    },
    type : {
        paddingHorizontal: 20,
        paddingVertical: 4,
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 600,
        color: COLORS.gray
    }
})