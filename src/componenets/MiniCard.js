import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

const MiniCard = ({item, onPressFun, chatId}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (chatId) {
          onPressFun(chatId);
        } else {
          onPressFun(item);
        }
      }}>
      <Card
        style={{
          backgroundColor: '#0f4c75',
          borderColor: '#0f4c75',
        }}>
        <CardItem
          style={{
            backgroundColor: 'transparent',
          }}>
          <Left>
            <Thumbnail source={{uri: item.image}} small />
            <Body>
              <Text
                style={{
                  color: '#fdcb9e',
                }}>
                {item.name}
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default MiniCard;
