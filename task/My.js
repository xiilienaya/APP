import React, { Component } from 'react'
import {View,Text,StyleSheet,Dimensions,Image, FlatList,ScrollView, AsyncStorage} from 'react-native';
import { Icon } from '@ant-design/react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const {width} = Dimensions.get('window');
const s = width/640;

const dataA=[{text:"账户管理",name:"setting"},
{text:"收货地址",name:"home"},
{text:"我的信息",name:"idcard"},
{text:"我的订单",name:"switcher"},
{text:"我的二维码",name:"qrcode"},
{text:"我的积分",name:"database"},
{text:"我的收藏",name:"star"}]

const dataB=[{text:"居家维修保养",name:"tool"},
{text:"出行接送",name:"car"},
{text:"我的受赠人",name:"user"},
]

const dataC = [
    {text:"我的住宿优惠",name:"home"},
{text:"我的活动",name:"qrcode"},
{text:"我的发布",name:"form"}
]

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class My extends Component {
    constructor(){
        super();
        this.state = {
            imgUrl : require("../img/my.png")
        }
    }
    componentDidMount(){
        
    }
    //拍照
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                
            const source = { uri: response.uri };
            this.setState({
                imgUrl : source
            })
            console.log(source);
            AsyncStorage.setItem("imgUrl",source);
            }
          });
    }
    exit=()=>{
        AsyncStorage.setItem("user","");
        Actions.login();
    }
    render() {
        return (
            <View>
                <ScrollView>
                <View style={styles.top}>
                    <Button onPress={()=>{this.takephoto()}}>
                        <Image style={{width:100,height:100}} resizeMode="contain" source={this.state.imgUrl} />
                    </Button>                    
                    <Text style={{color:"white",fontSize:20}}>BINNU DHILLON</Text>
                </View>
                {/* 个人中心 */}
                <View style={{width:"100%",height:465*s,backgroundColor:"white"}}>
                    <View style={{flexDirection:"row",
                    borderBottomColor:"grey",
                    borderBottomWidth:1,
                    height:80*s
                    }}>
                        <Icon style={{lineHeight:80*s,marginLeft:10}} size="lg"  name="user" />
                        <Text style={{lineHeight:80*s,fontSize:16,marginLeft:10}}>我的个人中心</Text>
                    </View>
                    <View style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        <FlatList 
                            data={dataA}
                            numColumns={3}
                            renderItem={({item})=>(
                                <View style={styles.myli}>
                                    <Icon name={item.name} />
                                    <Text>{item.text}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
                                {/* E族活动 */}
                <View style={{width:"100%",height:365*s,backgroundColor:"white",marginTop:20}}>
                    <View style={{flexDirection:"row",
                    borderBottomColor:"grey",
                    borderBottomWidth:1,
                    height:80*s
                    }}>
                        <Icon style={{lineHeight:80*s,marginLeft:10}} size="lg"  name="tag" />
                        <Text style={{lineHeight:80*s,fontSize:16,marginLeft:10}}>E族活动</Text>
                    </View>
                    <View>
                       <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                       {
                           dataB.map((item,index)=>{
                               return <View style={styles.hd}>
                                            <Icon name={item.name} />
                                            <Text>{item.text}</Text>
                                        </View>
                           })
                       }
                       </View>
                       <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                       {
                           dataC.map((item,index)=>{
                               if(item.text=="我的发布"){
                                return <Button onPress={()=>{Actions.publish()}}>
                                    <View style={styles.hd}>
                                        <Icon name={item.name} />
                                        <Text>{item.text}</Text>
                                    </View></Button>
                               }else{
                                return <View style={styles.hd}>
                                        <Icon name={item.name} />
                                        <Text>{item.text}</Text>
                                       </View>
                               }    
                           })
                       }
                       </View>
                    </View>
                </View>
                
                <View style={{width:"100%",height:96*s,justifyContent:"center",alignItems:"center",flexDirection:'row'}}>
                    <Text>BINNU DHILLON &nbsp; |&nbsp;</Text>
                    <Button style={styles.exit} onPress={this.exit}>退出</Button>             
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top:{
        height:350*s,
        width:"100%",
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center"
    },myli:{
        width:205*s,
        height:120*s,
        justifyContent:"center",
        alignItems:'center'
    },hd:{
        width:100,
        height:50,
        alignItems:"center",
        marginTop:35
    },
    exit:{
        fontSize:14,
        color:"black"
    }
})
