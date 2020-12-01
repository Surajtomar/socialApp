import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Container, H1} from 'native-base';

// redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import database from '@react-native-firebase/database';
import MiniCard from '../componenets/MiniCard';

const AddChat = ({userDetails}) => {
  const [allUsers, setAllUsers] = useState(null);

  const getAllUsers = async () => {
    console.log('Get All Users called');
    try {
      database()
        .ref('/users/')
        .once('value', (snapshot) => {
          if (snapshot.val()) {
            setAllUsers(Object.values(snapshot.val()));
          } else {
            setAllUsers([]);
          }
        });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const onPressFun = async (friendDetails) => {
    try {
      var databaseRef = database().ref();

      var chatId = databaseRef.push({}).key;

      var updatedMessageData = {};
      updatedMessageData[
        '/usersChatsList/' + friendDetails.uid + '/' + chatId
      ] = {
        chatId,
        friendDetails: userDetails,
      };
      updatedMessageData[
        '/usersChatsList/' + userDetails.uid + '/' + chatId
      ] = {
        chatId,
        friendDetails,
      };

      updatedMessageData['/chats/' + chatId] = {
        users: {
          uid1: friendDetails.uid,
          uid2: userDetails.uid,
        },
        chatId,
      };

      databaseRef
        .update(updatedMessageData, function (error) {
          if (error) {
            alert('Error updating data:', error);
          }
        })
        .then(() => {
          alert(' Request Send');
        });
    } catch (error) {
      console.log('ERROR ', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allUsers}
        keyExtractor={(allUsers) => allUsers.uid}
        renderItem={({item, index, separators}) => (
          <>
            {item.uid === userDetails.uid ? null : (
              <MiniCard item={item} key={item.uid} onPressFun={onPressFun} />
            )}
          </>
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found</H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.auth.user,
});

AddChat.propTypes = {
  userDetails: propTypes.object,
};

export default connect(mapStateToProps)(AddChat);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
