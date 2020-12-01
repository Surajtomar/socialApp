import database from '@react-native-firebase/database';
import {SET_CHAT, SET_USER_ALL_CHATS_LIST} from './action.types';

export const getUserAllChatsList = (uid) => async (dispatch) => {
  try {
    database()
      .ref('/usersChatsList/' + uid)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          dispatch({
            type: SET_USER_ALL_CHATS_LIST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_USER_ALL_CHATS_LIST,
            payload: [],
          });
        }
      });
  } catch (error) {
    console.log('Error', error);
  }
};

export const getChat = (chatId) => async (dispatch) => {
  try {
    database()
      .ref('/chats/' + chatId)
      .limitToLast(50)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          dispatch({
            type: SET_CHAT,
            payload: snapshot.val(),
          });
        } else {
          dispatch({
            type: SET_CHAT,
            payload: [],
          });
        }
      });
  } catch (error) {
    console.log('Error', error);
  }
};
