import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button, Image, ScrollView, Linking } from 'react-native';
import app from './utilities.js';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rests : [],
      search : ''
    }
  }

  updateSearch = (search) => {
    this.setState({
      search :search
    })
  }

  fetchData = () => {
    app.query = this.state.search;
    app.getRestaurants().then((rest) => {
      this.setState({
        rests : rest.restaurants
      })
    });
  }

  render() {
    return (
      <ScrollView>
        <TextInput 
          placeholderTextColor="white"
          placeholder="Type your cuisines" 
          style={styles.textInput} 
          value={this.state.search}
          onChangeText={this.updateSearch}
        />
        <Button title="Get Restaurants" onPress={this.fetchData} />
        <View style={styles.container}>         
          {this.state.rests.map((rest,i) => (
            <View key={i} style={{flex: 1, flexDirection: 'row',borderWidth: 0.5,borderColor: 'black'}}>
              <View style={{width:'30%', height: 100}}>
                <Image source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSImVDey0r66UGjdUVMe7mqEmQgHUSkNPQe-yy0lEIPAZ1YBX-HDQ' }} style={{height:100,width:150}} />
              </View>
              <View style={{width: '70%', height: 100, alignItems:'center'}}>
                <Text style={{fontFamily:'serif'}}>{rest.restaurant.name}</Text>
                <Text>cuisines:</Text>
                <Text style={{fontFamily:'serif',fontSize:9}}>{rest.restaurant.cuisines}</Text>
                <Text onPress={() => Linking.openURL(rest.restaurant.events_url)} style={{fontFamily:'serif'}}>
                  Restaurant Website
                </Text>
                <Text style={{fontFamily:'serif'}}>
                  Rating: {rest.restaurant.user_rating.aggregate_rating}/5
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView> 
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex : 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  input: {
    width : '50%',
    marginBottom : 15,
  },
  textInput: {
    height :50,
    borderWidth : 1,
    borderColor : '#cecece',
    margin : 7,
    backgroundColor:'#5e3434'
  }
})
