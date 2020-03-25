import React, { Component } from 'react';
import {View,Text,StyleSheet,TextInput, Dimensions,Image, FlatList} from 'react-native';
import {Icon, Flex,Button} from '@ant-design/react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');
const s = width/640;

const data=[{img:require("../img/h2.png"),text:'居家维修保养'},
{img:require("../img/h3.png"),text:'住宿优惠'},
{img:require("../img/h4.png"),text:'出行接送'},
{img:require("../img/h5.png"),text:'E族活动'},
];

console.log(data[0].img);

export default class home extends Component {
    constructor(){
        super();
        this.state={
            
        }
    }
    render() {
        return (
            <View>
                <View style={styles.top}>
                    <View style={styles.inp}>
                        <Icon name="search" size="lg" color="white" style={{marginLeft:15,lineHeight:52*s}} />
                        <TextInput placeholder="请输入你要搜索的关键字" placeholderTextColor="white" />
                    </View>
                    <Icon name="shopping-cart" size="lg" color="white" />   
                </View>
                <View style={styles.slide}>
                    {/* <Image source={require("../img/h1.png")} style={{height:275*s,width:640*s}} /> */}
                    <Swiper autoplay={true}>
                        <View>
                            <Image source={require("../img/h1.png")} style={{height:275*s,width:640*s}} />
                        </View>
                        <View>
                            <Image source={require("../img/h1.png")} style={{height:275*s,width:640*s}} />
                        </View>
                        <View>
                            <Image source={require("../img/h1.png")} style={{height:275*s,width:640*s}} />
                        </View>
                    </Swiper>
                </View>
                <FlatList 
                    data={data}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Image style={{height:100*s}} resizeMode="contain" source={item.img} />
                            <Text>{item.text}</Text>
                        </View>
                    )}
                />
                <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:10}}>
                    <Button style={styles.btn}>
                        <Text style={{color:"white"}}>发布需求</Text>
                    </Button>
                    <Text style={{color:"grey",marginTop:20}}>©E族之家 版权所有</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top:{
        height:74*s,
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    inp:{
        width:525*s,
        height:52*s,
        flexDirection:'row',
        backgroundColor:"#fbb8b8",
        borderRadius:45,
    },slide:{
        height:275*s,
        width:"100%",
        backgroundColor:"red"
    },list:{
        width:"100%",
        height:120*s,
        backgroundColor:"white",
        marginTop:10,
        flexDirection:'row',
        alignItems:"center"
    },btn:{
        width:546*s,
        height:65*s,
        backgroundColor:"red"
    }
})
