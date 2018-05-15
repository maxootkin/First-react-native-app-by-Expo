import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import * as firebase from 'firebase';

async function logIn() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('502329873515021', {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
};


export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = { email: 'Test@test.com', password: '123456', error: '', loading: false };
  }
  onLoginPress() {
        
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');

            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false });

            })

  }

  onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');

            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false });

            })
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
        <View style={styles.container}>
          <Text>React Native App</Text>        
        </View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item> 
            <View style={{padding: 5}}>                  
              <Button style={styles.btn} onPress={this.onLoginPress.bind(this)} block>
                <Text style={{color: '#fff'}}>LOGIN</Text>
              </Button>
            </View>
            <View style={{padding: 5}}> 
              <Button style={styles.btn} onPress={this.onSignUpPress.bind(this)} block>
                <Text style={{color: '#fff'}}>SING UP</Text>
              </Button>
            </View>                     
          </Form>
          <View style={styles.texts}>
            <Text> or </Text>
          </View>
          <View style={{padding: 5}}> 
            <Button onPress={this.logIn} style={{color: '#fff'}} block>
              <Text style={{color: '#fff'}}>Login with Facebook</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  texts: {        
    alignItems: 'center'
  }
});