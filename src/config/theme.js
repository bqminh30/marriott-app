import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS ={
    white: "#fff",
    black: "#1c1c1c",
    grayDefault:'#f9f5f5',
    gray : "#bcbcbc",
    gray_main: "#919090",
    main: "#000000"
}

export const SIZES = {
    default: 8,
    radius: 12,
    padding: 24,
    margin: 10,
    spacing: 20,
    height: height,
    width: width
}