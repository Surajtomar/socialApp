import {SET_CHAT, SET_USER_ALL_CHATS_LIST} from '../action/action.types';

const initialState = {
  userAllChatsList: null,
  chat: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ALL_CHATS_LIST:
      return {
        ...state,
        userAllChatsList: action.payload,
        loading: false,
        error: false,
      };
    case SET_CHAT:
      return {
        ...state,
        chat: action.payload,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};
