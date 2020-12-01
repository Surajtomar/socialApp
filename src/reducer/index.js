import {combineReducers} from 'redux';
import auth from './auth';
import post from './post';
import chats from './chats';

export default combineReducers({
  auth,
  post,
  chats,
});
