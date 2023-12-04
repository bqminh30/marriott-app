import * as type from "../types";
import axios from "axios";
import { BASE_URL } from "../../config/config_url";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRooms = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://be-nodejs-project.vercel.app/api/rooms",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "content-type",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );


      if (response.status == 200) {
        const data = response.data;

        // Lấy danh sách phòng yêu thích từ AsyncStorage
        const favoriteRooms = await AsyncStorage.getItem('favoriteRooms');
        const parsedFavorites = favoriteRooms ? JSON.parse(favoriteRooms) : [];

        // So sánh từng phòng để xác định trạng thái yêu thích
        const roomsWithFavorites = data.map(room => {
          const isFavorite = parsedFavorites.some(favRoom => favRoom.id === room.id);
          return { ...room, isFavorite };
        });

        dispatch({
          type: type.SET_ROOMS_SUCCESS,
          payload: {
            rooms: roomsWithFavorites,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: type.SET_ROOMS_FAILD,
        payload: {
          rooms: [],
        },
      });
    }
  };
};

export const getTypeRooms = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          "https://be-nodejs-project.vercel.app/api/typerooms",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Headers": "content-type",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
  
        if (response.status == 200) {
          const data = response.data;
          dispatch({
            type: type.SET_TYPEROOM_SUCCESS,
            payload: {
                typerooms: data,
            },
          });
        }
      } catch (e) {
        dispatch({
          type: type.SET_TYPEROOM_FAILD,
          payload: {
            typerooms: [],
          },
        });
      }
    };
  };
export const getRoom = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `https://be-nodejs-project.vercel.app/api/rooms/${id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Headers": "content-type",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
  
        if (response.status == 200) {
          const {data, services} = response.data;
          dispatch({
            type: type.SET_ROOM_SUCCESS,
            payload: {
                room: data,
                room_images: data.roomImages,
                room_services: services,
            },
          });
        }
      } catch (e) {
        dispatch({
          type: type.SET_ROOM_FAILD,
          payload: {
            room: null,
            room_images: [],
            room_services: [],
          },
        });
      }
    };
  };
  export const getReviews = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `https://be-nodejs-project.vercel.app/api/reviews/${id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Headers": "content-type",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
  
        if (response.status == 200) {
          const data = response.data;
          dispatch({
            type: type.SET_REVIEW_ROOM_SUCCESS,
            payload: {
                reviews: data,
            },
          });
        }
      } catch (e) {
        dispatch({
          type: type.SET_REVIEW_ROOM_FAILD,
          payload: {
            reviews: [],
          },
        });
      }
    };
  };