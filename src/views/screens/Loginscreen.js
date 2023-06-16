import { ScrollView, BackHandler,Text, View, Dimensions, useWindowDimensions, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView, RefreshControl} from 'react-native'
import React, { useContext } from 'react';
import Logo from '../../../assets/bg/Picture1.png';
import Input from "../components/Input";
import {Universalstyles} from "../../const/Universalstyle";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Ggl from "../../../assets/bg/Google-Logo-PNG3.png";
import Fb from "../../../assets/bg/Facebook-Logo-PNG4.png";
import Apl from "../../../assets/bg/Apple-Logo-PNG5.png";
import UserContext from '../components/context';
import { axiosRequest } from "../components/api";
import * as Network from 'expo-network';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Loginscreen = ({navigation}) => {
  
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',

  });

  const {setUser} = React.useContext(UserContext)
  const { user } = React.useContext(UserContext);


  const [check,setCheck] = React.useState({})
  
      var Data ={
        email: inputs.email,
        password: inputs.password
      };

      var headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  


  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const {height} = useWindowDimensions();
  
  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email){
     await  handleError('Please enter your email', 'email');
      valid = false;
    } 
    else if (!inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      await handleError('Please enter valid email address', 'email');
      valid = false;
    }

    if (!inputs.password){
     await  handleError('Please enter your password', 'password');
    valid = false;
}   
    
    if (valid) {
     await login();
    }
    
    
  };

  const login = async () => { 
    setLoading(true);
      setTimeout( async() => {
      setLoading(false);
  //     await axiosRequest.post('auth/login/', JSON.stringify(Data), {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })  
  //     .then(async (response) => {
  //        setCheck(response.data)
  //       const data = response.data
  //       console.log(response.data)
  //        if(data.message == 'Check Your Email For Verification'){
  //         // alert(data.message)
  //         navigation.navigate('Verifyscreen',{email:data.email})
  //        }else{
  //         setUser({usertype:data.usertype,id:data.id,email:data.email})
  //         console.log(data.data)
  //          if(data.data == "No User Details"){
  //           navigation.navigate('User info')
  //          }
  //          if(data.data == "No Guardian"){
  //           navigation.navigate('Guardian')
  //          }
  //          if(data.data == "No Education"){
  //           navigation.navigate('Education')
  //          }
  //          if(data.data == "READY"){
  //                 if(data.usertype == "Student"){
  //           navigation.navigate('Studentscreen')
  //             }
  //             if(data.usertype == "Employer"){
  //           navigation.navigate('Employerscreen')
  //          }
  //          }
        
        
          
  //        }
  //        if(data.data == 'Incorrect Email Or password'){
  //         alert(data.data)
  //        }
      
  //     }
  //     ).catch(error=>
  //       Alert.alert(error.data,"Try Again",
  //       [
  //   {
  //     text: "Reload",
  //     onPress: () => {login()}
  //     ,
  //     style: "yes"
  //   },   {
  //         text: "Exit",
  //         onPress: () => {BackHandler.exitApp()
  //             NavigationContainer.navigate('')
  //       }
  //         ,
  //         style: "cancel"
  //       }
  // ]
  //      )
  //     )

  axiosRequest.post('auth/api/jwt/create/',JSON.stringify(Data),headers).then((response)=>{
    // console.log(response.data)
   axiosRequest.post('auth/api/jwt/refresh/',{"refresh" : response.data.refresh},headers)
   .then(resp =>{
    axiosRequest.get('auth/api/users/me/',{headers:{
      'Authorization': `JWT ${ resp.data.access}`,
    }}).then(res=>{
      setUser({usertype:res.data.usertype,id:res.data.id,email:res.data.email,access:resp.data.access})
      // console.log("line 153 :" + resp.data.access)
      if(res.data.usertype == "Student"){
        navigation.navigate("Studentscreen")
      }else{
        navigation.navigate("Employerscreen")
      }
    })
   })

  }).catch((err)=>{
    Alert.alert("Error","Unauthorized Account",
    [
{
  text: "Okay!",
  onPress: () => console.log('Do nothing'),
  style: "yes"
}
]
   )  
  })
        }, 3000)
        
  };
  


  

  const handleOnChange = async  (text, input) => {

  
    setInputs(prevState => ({ ...prevState, [input]: text }));
 

  };
  
  const handleError = async (errorMessage, input) =>{
   setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
  }
   
 // console.log(moment("2023-01-02 11:31:27").local().startOf('seconds').fromNow());
  return (
    <SafeAreaView>
    
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
      // height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Loader visible={loading}/>
    <View
    style={[Universalstyles.signup, {}]}>

      
        
          <View style={[Universalstyles.signupbg, {height: 'auto'}]}>
          <Image source={Logo} style={[Universalstyles.logo, {height: height * 0.19, marginLeft: 10}]} />
      <Text style= {Universalstyles.txt}>
        Login account
        </Text>

        
            <Input 
            placeholder= 'Email' 
            iconName= 'email-outline' 
            
            error={errors.email}
            onFocus={() =>{
              handleError(null, 'email');
            }}
            onChangeText = {text => handleOnChange(text, 'email')}
            />
            

            <Input 
            
            placeholder= 'Password' 
            iconName= 'lock-outline' 
            password
            error={errors.password}
            onFocus={() =>{
              handleError(null, 'password');
            }}
            
            onChangeText = {text => handleOnChange(text, 'password')}
            />
           <Text 
            onPress={() => navigation.navigate('Forgotscreen')}
            style={{color: 'blue', textAlign: "center", marginBottom: 10}}>Forgot Password</Text>
          
          
            <Button title='Login' onPress={validate}/>
            
            <View style={{height: 120, marginTop: 10}}>
              <Text style={Universalstyles.signwith}>Sign in with</Text>
              <View style={Universalstyles.Signwith}>
                <TouchableOpacity  onPress={''}>
                  <Image source={Ggl} style={Universalstyles.Ggl}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={''}>
                  <Image source={Fb} style={Universalstyles.Fb}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={''}>
                  <Image source={Apl} style={Universalstyles.Apl}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Apple</Text>
                </TouchableOpacity>
              </View>
             
            </View>
            <Text 
           
            style={{textAlign: 'center', fontSize: 16, marginVertical: 20}}> Doesn't have an account? 
              {' '}
            <Text 
            onPress={() => navigation.navigate('Sign up')}
            style={{color: 'blue'}}>Register</Text>
            </Text>
            </View>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

export default Loginscreen