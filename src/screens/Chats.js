import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Icon, Container, H1, Title} from 'native-base';

// redux
import {getChat, getUserAllChatsList} from '../action/chats';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import database from '@react-native-firebase/database';
import MiniCard from '../componenets/MiniCard';

const Chats = ({
  userAllChatsList,
  navigation,
  userDetails,
  getUserAllChatsList,
  getChat,
}) => {
  const {uid} = userDetails;

  const onPressFun = async (chatId) => {
    navigation.navigate('ShowChat');
    getChat(chatId);
  };

  useEffect(() => {
    if (uid) {
      getUserAllChatsList(uid);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Chats List</Title>
      <FlatList
        data={userAllChatsList}
        keyExtractor={(userAllChatsList) => userAllChatsList.chatId}
        renderItem={({item, index, separators}) => (
          <MiniCard
            item={item.friendDetails}
            key={item.chatId}
            onPressFun={onPressFun}
            chatId={item.chatId}
          />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found</H1>
          </Container>
        )}
      />

      <TouchableOpacity
        style={styles.addChatButton}
        onPress={() => navigation.navigate('AddChat')}>
        <Icon
          name="plus"
          style={{color: 'pink'}}
          type={'MaterialCommunityIcons'}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  userAllChatsList: state.chats.userAllChatsList,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getUserAllChatsList,
  getChat,
};

Chats.propTypes = {
  getUserAllChatsList: propTypes.func.isRequired,
  getChat: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chats);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  addChatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#0f4c75',
    borderRadius: 100,
  },
  title: {
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
