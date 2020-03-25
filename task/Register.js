import React, { Component } from 'react';
import {View,Text,StyleSheet, TextInput,ActivityIndicator,AsyncStorage,ToastAndroid} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            pwd : ''
        }
    }
    getName=(text)=>{
        this.setState({
            name : text
        })
    }
    getPwd=(text)=>{
        this.setState({
            pwd : text
        })
    }
    register=()=>{
        if(this.state.name != "" && this.state.pwd != "" ){
            ToastAndroid.show("注册成功",200);
            let url = 'https://www.fastmock.site/mock/c224d362f700160d617c4d95d6ee51d3/api/login';
            fetch(url,{
                method:"POST",
                headers:{
                    "Accept":'application/json',
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:this.state.name,
                    pwd : this.state.pwd
                })
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                AsyncStorage.setItem('userRegister',JSON.stringify(res.data))
                    .then(()=>{
                        Actions.login();
                    })
            })
        }else{
            ToastAndroid.show("请输入用户名和密码",200)
        }
    }
    render() {
        return (
            <View style={{justifyContent:'center',alignItems:"center"}}>
                <View style={styles.box}>
                    <Text>用户名</Text>
                    <TextInput style={styles.inp} onChangeText={this.getName} />
                    <Text>密码</Text>
                    <TextInput style={styles.inp} onChangeText={this.getPwd} secureTextEntry={true} />
                    <Button style={styles.register} onPress={()=>{Actions.login()}}>返回登录</Button>
                    <Button onPress={this.register} style={styles.btn}>立即注册</Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
        width:400,
        height:250,
        backgroundColor:"lightgray",
        marginTop:200,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
    },inp:{
        borderWidth:1,
        borderColor:"grey"
    },
    btn:{
        width:200,
        height:40,
        lineHeight:40,
        backgroundColor:"grey",
        marginTop:20,
        marginLeft:80,
        color:"black"
    },register:{
        marginLeft:280
    }
})