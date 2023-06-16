
import { ScrollView, Text, View, useWindowDimensions, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView, RefreshControl, Dimensions} from 'react-native'
import React from 'react'
import Input from "../components/Input";
import {Universalstyles} from "../../const/Universalstyle";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Logo from '../../../assets/bg/Picture1.png';
import { axiosRequest } from '../components/api';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Verifyscreen = ({navigation,route}) => {

    const {email} = route.params
    
    const [inputs, setInputs] = React.useState({
        otp: ''
    
      });

    var data = {
        email : email,
        otp:inputs.otp
    }

    
      const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const {height} = useWindowDimensions();
      const [valid,setValid] = React.useState(false)
      const handleError = (errorMessage, input) =>{
        setErrors((prevState) => ({...prevState, [input]: errorMessage}))
      }
      const handleOnChange = (text, input) => {
        setInputs (prevState => ({...prevState, [input]: text}));
      };
      
      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);

      const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.otp){
          handleError('Please enter your OTP', 'otp');
          valid = false;
        } 
     if (valid) {
          Verify();
        }
      };
      const cancel = () =>{
        navigation.navigate('Loginscreen')
      }
    
      const Verify = async () => {
        setLoading(true);
        setTimeout(async() => {
          setLoading(false);
          await axiosRequest.post('auth/verify/', JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response)=>{
            const data = response.data
            if(data.message == "Something Went Wrong"){
                alert(data.data)
            }else{
                Alert.alert(data.message,"Go back To Login Page",
                [
            {
              text: "Ok",
              onPress: () => navigation.goBack()
              ,
              style: "yes"
            },   {
                  text: "Exit",
                  onPress: () => {
                }
                  ,
                  style: "cancel"
                }
          ]
               )
            }

          })
  
              
            }, 1000)
      };

      return (   
      
        <SafeAreaView style={{flex: 1,}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            height: Dimensions.get('window').height,
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

         <View style={[Universalstyles.signup, {height: 'auto', paddingVertical: 100, backgroundColor: 'white'}]}>
   
          <View style={[Universalstyles.signupbg, {height: 'auto', justifyContent: 'center'}]}>
          <Image source={Logo} style={[Universalstyles.logo, {height: height * 0.19, marginLeft: 10}]} />
          <Text style= {Universalstyles.txt}>
            Check Your Email For The OTP
            </Text>
    
            
                <Input 
                placeholder= 'OTP' 
                iconName= 'email-outline' 
                keyboardType={'numeric'}
                error={errors.otp}
                onFocus={() =>{
                  handleError(null, 'otp');
                }}
                onChangeText = {text => handleOnChange(text, 'otp')}
                />


                <Button title='Submit' onPress={validate}/>
                
                <Text 
                onPress={() => navigation.navigate('Log in')}
                style={{color: 'blue', textAlign: 'center', padding: 10}}>Cancel
                </Text>
  
                </View>
                </View>
          </ScrollView>
        </SafeAreaView>
        )


}

export default Verifyscreen;