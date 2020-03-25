import React, { Component } from 'react';
import {View,Text,StyleSheet,ToastAndroid,BackHandler, AsyncStorage,Image,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';

export default class SwiperPage extends Component {
    start=()=>{
        AsyncStorage.setItem('isInstall','false',()=>{
            this.props.afterInstall();
        });
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                <Image
                    style={styles.img}
                    source={require('../img/bg.jpg')}
                />
                </View>
                <View style={styles.slide1}>
                <Image
                    style={styles.img}
                    source={require('../img/bg2.jpg')}
                />
                </View>
                <View style={styles.slide1} >
                <Image
                    style={styles.img}
                    source={require('../img/bg3.jpg')}
                />
                <TouchableOpacity style={styles.start}  onPress={this.start}>
                    <Text style={{color: '#fff'}}>开始体验</Text>
                </TouchableOpacity>
                </View>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    img: {
      width: '100%',
      height: '100%',
    },
    slide1: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
    },
    start: {
        position: 'absolute',
      bottom: 150,
      width: 120,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      borderRadius: 20,
    },
  });