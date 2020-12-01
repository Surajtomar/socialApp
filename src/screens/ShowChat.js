import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {Button, Container, Input, Left, Right, H1} from 'native-base';

// redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import database from '@react-native-firebase/database';
import {FlatList} from 'react-native-gesture-handler';

const ShowChat = ({chat, userDetails}) => {
  const [message, setMessage] = useState(null);

  const sendMessage = async () => {
    try {
      database()
        .ref('chats/' + chat.chatId)
        .push({
          message,
          senderId: userDetails.uid,
        });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.chatContainer}>
        {chat ? (
          <>
            <FlatList
              data={Object.entries(chat)}
              inverted={-1}
              keyExtractor={(keys) => {
                console.log('Chat', keys[0]);

                return keys[0];
              }}
              renderItem={({item}) => {
                var messageDetails = item[1];

                if (item[0] === 'users' || item[0] === 'chatId') {
                  console.log('Item[0', item[0]);
                  return null;
                } else {
                  console.log('messageDetails', messageDetails.message);

                  return (
                    <View
                      style={{
                        height: 40,
                        backgroundColor: 'transparent',
                        margin: 5,
                      }}>
                      {messageDetails.senderId === userDetails.uid ? (
                        <View
                          style={{
                            position: 'absolute',
                            right: 5,
                            marginVertical: 2,
                            backgroundColor: 'green',
                            padding: 10,
                            borderRadius: 10,
                          }}>
                          <Text style={{color: 'pink'}}>
                            {messageDetails.message}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            position: 'absolute',
                            left: 5,
                            marginVertical: 2,
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 10,
                          }}>
                          <Text style={{color: 'black'}}>
                            {messageDetails.message}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                }
              }}
            />
          </>
        ) : null}
      </Container>

      <Container style={styles.sendMessageContainer}>
        <Input
          keyboardType="default"
          placeholder="enter your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
        />

        <Button rounded block onPress={sendMessage} style={styles.button}>
          <Text style={{color: '#fff'}}>Send</Text>
        </Button>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chats.chat,
  userDetails: state.auth.user,
});

export default connect(mapStateToProps)(ShowChat);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  sendMessageContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: 'white',
    flex: 4,
    marginRight: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
  chatContainer: {
    marginBottom: 80,
    backgroundColor: 'transparent',
  },
});
