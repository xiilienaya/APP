import React, { Component } from 'react';
import {View,Text,StyleSheet, TextInput,ActivityIndicator,AsyncStorage,ToastAndroid} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            pwd : '',
            isloading:false
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
    login=()=>{
        console.log(this.state.name);
        console.log(this.state.pwd);
        let url = 'https://www.fastmock.site/mock/c224d362f700160d617c4d95d6ee51d3/api/login';
        if(this.state.name != "" && this.state.pwd != ""){
            this.setState({isloading:true})
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
                AsyncStorage.setItem('user',JSON.stringify(res.data))
                    .then(()=>{
                        this.setState({isloading:false})
                        Actions.home();
                    })
            })
        }else{
            ToastAndroid.show('请输入用户名和密码',100);
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
                    <Button style={styles.register} onPress={()=>{Actions.register()}}>注册账号</Button>
                    <Button onPress={this.login} style={styles.btn}>立即登录</Button>
                </View>
                {
                    this.state.isloading?
                    <View>
                    <Text>正在登录</Text>
                    <ActivityIndicator size="large" color="black" />
                    </View>
                    :null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
        width:400,
        height:250,
        backgroundColor:"white",
        marginTop:200,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
    },inp:{
        borderWidth:1,
        borderColor:"lightgray"
    },
    btn:{
        width:200,
        height:40,
        lineHeight:40,
        backgroundColor:"lightgray",
        marginTop:20,
        marginLeft:80
    },register:{
        marginLeft:280
    }
})