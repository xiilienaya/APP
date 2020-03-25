import React, { Component } from 'react';
import {View,Text,StyleSheet, FlatList,ToastAndroid} from 'react-native';
import {Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import Button from 'react-native-button';

export default class Publish extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
            page : 1
        }
    }
    componentDidMount(){
        this.getPage(this.state.page)
    }
    getPage=(page)=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+page).then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data : res.data
            })
        })
    }
    Pre=()=>{
        let p = this.state.page;
        if(p == 1){          
            ToastAndroid.show('已经是第一页了',100);
        }else{
            console.log("pre");
            this.setState({
                page : --this.state.page
            })
            this.getPage(this.state.page)
        }
    }
    Next=()=>{
        let p = this.state.page;
        console.log("next");
        this.setState({
            page : ++this.state.page
        })
        this.getPage(this.state.page)
        console.log(this.state.page)
    }
    back=()=>{
        Actions.pop()
    }
    render() {
        return (
            <View>
                <View style={styles.top}>
                    <Button onPress={()=>{this.back()}}>
                        <Icon name="left" color="white" style={{lineHeight:40}}/>
                    </Button>
                    <Text style={styles.text}>我的发布</Text>
                    <Icon name="ellipsis" color="white" style={{lineHeight:40}}/>
                </View>
                <View>
                    <FlatList
                        data = {this.state.data}
                        renderItem={({item})=>(
                            <View style={styles.listBox}>
                                <Text style={styles.title}>
                                    { item.title.length > 15 ? item.title.substr(0, 15) + "..." : item.title}
                                </Text>
                                <Text style={styles.date}>
                                    {item.create_at.substr(0,10)}
                                </Text>
                                    {
                                    item.create_at.substr(8,2)%2?
                                    <Text style={styles.res}>已回复</Text>:
                                    <Text style={[styles.res,styles.red]}>待回复</Text>
                                    }
                            </View>
                        )}
                    />
                </View>
                <View style={styles.pageBox}>
                    <Button style={[styles.btn]} onPress={()=>{this.Pre()}}>上一页</Button> 
                    <Text style={styles.page}>第{this.state.page}页</Text>
                    <Button style={[styles.btn]} onPress={()=>{this.Next()}}>下一页</Button>              
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top:{
        height:40,
        backgroundColor:'red',
        width:"100%",
        flexDirection:'row',
        justifyContent:"space-between"
    },
    text:{
        color:"white",
        fontSize:20,
        lineHeight:40,
        textAlign:"center",
    },
    listBox:{
        height:40,
        borderBottomColor:"lightgray",
        backgroundColor:"white",
        borderBottomWidth:1,
        flexDirection:'row'
    },
    title:{
        lineHeight:40,
        paddingLeft:20
    },
    date:{
        lineHeight:40,
        position:"absolute",
        right:90
    },
    res:{
        lineHeight:40,
        position:"absolute",
        right:20
    },red:{
        color:"red"
    },
    pageBox:{
        height:50,
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:'center'
    },btn:{
        height:40,
        width:150,
        backgroundColor:"red",
        color:"white",
        borderRadius:20,
        lineHeight:40
    },page:{
        fontSize:20,
        lineHeight:50
    }
})
