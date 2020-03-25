import React, { Component } from 'react';
import {View,Text,StyleSheet,ToastAndroid,BackHandler, AsyncStorage} from 'react-native';
import {Router,Scene,Tabs} from 'react-native-router-flux';
import Home from './task/Home';
import Login from './task/Login';
import Class from './task/Class';
import SwiperPage from './task/SwiperPage';
import My from './task/My';
import {Icon} from '@ant-design/react-native';
import Publish from './task/Publish';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import Register from './task/Register';


console.disableYellowBox = true;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isLogin : true,
      install : true
    }
  }
    componentDidMount(){
        //AsyncStorage.clear();

        SplashScreen.hide();
        
        AsyncStorage.getItem("user").then(
          res=>{
            console.log(res);
            if(res){
              this.setState({
                isLogin: false
              })
            }
          }
        )

      console.log(AsyncStorage.getItem("isInstall"));
      let is = AsyncStorage.getItem("isInstall").then(res=>{
        console.log(res);
        if(res){
          this.setState({
            install : JSON.parse(res)
          })
        }
      })
    }
    render() {
        let now = 0;
        let afterInstall = ()=>{
          console.log('after install')
          this.setState({
            install : false
          })
        }
        if(this.state.install){
          return(
            <View style={{flex:1}}>
              <SwiperPage afterInstall={afterInstall} />
            </View>
          )
        }else{
          return (
            <Router backAndroidHandler={()=>{
                if(Actions.currentScene != 'login'){
                  Actions.pop();
                  return true;
                }else{
                  if(new Date().getTime()-now<2000){
                    BackHandler.exitApp();
                  }else{
                    ToastAndroid.show('确定要退出吗',100);
                    now = new Date().getTime();
                    return true;
                  }
                }
                
              }}>
                <Scene key='root'>
                <Tabs 
                    key='tabbar'
                    hideNavBar
                    activeTintColor="red"
                    inactiveTintColor="grey"
                    tabBarStyle={{backgroundColor:"white"}}
                    >
                    <Scene key='home' title="首页"
                    icon={
                    ({focused})=><Icon color={focused?'red':'grey'} name="home" />
                    }
                    hideNavBar
                    >
                        <Scene component={Home} />
                    </Scene>

                    <Scene key='clas' title="分类"
                    icon={
                    ({focused})=><Icon color={focused?'red':'grey'} name="appstore" />
                    }
                    hideNavBar
                    >
                        <Scene component={Class} />
                    </Scene>

                    <Scene key='my' title="个人中心"
                    icon={
                    ({focused})=><Icon color={focused?'red':'grey'} name="user" />
                    }
                    hideNavBar
                    >
                        <Scene component={My} />
                        
                    </Scene>
                </Tabs>
                <Scene key="publish" hideNavBar component={Publish} />
                <Scene key="login" initial={this.state.isLogin} hideNavBar component={Login} />
                <Scene key="register"  hideNavBar component={Register} />
                </Scene>
            </Router>
        )
        }
    }
}

const styles = StyleSheet.create({

})

