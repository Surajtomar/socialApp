import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Header, Body, Right, Button, Icon, Title, Text} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation, userDetails}) => {
  return (
    <Header
      androidStatusBarColor="#0f4c75"
      style={{
        backgroundColor: '#0f4c75',
      }}>
      <Body>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Title>Social App LCO</Title>
        </TouchableOpacity>
      </Body>
      <Right>
        {authState.isAuthenticated && (
          <>
            {userDetails && (
              <Text style={{fontSize: 16, alignSelf: 'center', color: '#FFF'}}>
                {userDetails.instaUserName}
              </Text>
            )}

            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('AddPost')}>
              <Text style={{color: '#fdcb9e'}}>Add Post</Text>
            </Button>
            <Button transparent onPress={() => signOut()}>
              <Icon name="log-out-outline" style={{color: 'red'}} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.prototypes = {
  signOut: propTypes.func.isRequired,
  userDetails: propTypes.object,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
