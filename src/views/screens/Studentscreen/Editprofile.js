import { ScrollView, Text, View, ImageBackground, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity} from 'react-native'
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from '../../components/Input';
import {Universalstyles} from "../../../const/Universalstyle";
import Button from '../../components/Button';
import Loader from '../../components/Loader';
//import axios from 'axios'
import { axiosRequest } from '../../components/api'; 
import UserContext from '../../components/context';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const EditprofileS = ({navigation, route ,error,  onFocus=()=>{}, ...props
}) => {


  // const {Fname,Lname,Mname,Sname,birth,age,contact,street,city,province,zipcode} = route.params
  const {details,address} = route.params
  const { user } = React.useContext(UserContext);

  React.useEffect(()=>{
 
    navigation.setOptions({
       title: "Edit User Info",
       headerTitleAlign: 'center',
       headerStyle: { backgroundColor: 'white', height: 150 },
       headerTitleStyle: { fontWeight: '100', fontSize: 25 }
      })
     
     navigation.addListener('focus',async () => {
      

          
    }
    
      )},[])

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textt, setText] = useState('Date of birth');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() ;
    setInputs (prevState => ({...prevState, birthday: fDate}));
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    
  };

  const showDatePicker = () => {
    showMode('date');
  };

  
    const [isFocused, setisFocused] = React.useState(false);
    const [inputs, setInputs] = React.useState({
    firstname: details.first_name,
    lastname: details.last_name,
    midname: details.mid_name,
    suffname: details.suff_name,
    birthday: details.birthday,
    age: details.age,
    contactno: details.contact_no,
    street: address.street,
    city: address.city,
    province: address.province,
    zipcode: address.zipcode
    
  });
var userinfo ={
  first_name:inputs.firstname,
  last_name:inputs.lastname,
  mid_name:inputs.midname,
  suff_name:inputs.suffname,
  birthday:inputs.birthday,
  age:inputs.age,
  contact_no:inputs.contactno,
  user:user.id
        
      };
  var user_address ={
    street: inputs.street,
    city: inputs.city,
    province: inputs.province,
    zipcode: inputs.zipcode,
    user:user.id
        
      };

      var headers = {
  headers :{
    'Access-Control-Allow-Origin': 'true',
  'Content-Type': 'application/json'
}
      };
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const {height} = useWindowDimensions();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    
    Keyboard.dismiss();
    let valid = true;
    
    if (!inputs.firstname){
      handleError('Please enter your first name', 'firstname');
      valid = false;
    } else if (inputs.firstname.match(/[0-9]/)){
      handleError('Name should not have numbers', 'firstname');
      valid = false;
    }

    if (!inputs.lastname){
      handleError('Please enter your last name', 'lastname');
      valid = false;
    } else if (inputs.lastname.match(/[0-9]/)){
      handleError('Name should not have numbers', 'lastname');
      valid = false;
    }

    if (!inputs.birthday){
      handleError('Please select your birthdate', 'birthday');
      valid = false;
  }

    if (!inputs.age){
        handleError('Please enter your age', 'age');
        valid = false;
    }
    
    
    if (!inputs.contactno){
        handleError('Please enter your contact number', 'contactno');
        valid = false;
    }

    if (!inputs.street){
        handleError('Please enter your street', 'street');
        valid = false;
    }
    if (!inputs.city){
        handleError('Please enter your city', 'city');
        valid = false;
    }
    if (!inputs.province){
        handleError('Please enter your province', 'province');
        valid = false;
    }
    if (!inputs.zipcode){
        handleError('Please enter your zipcode', 'zipcode');
        valid = false;
    }

    
    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
axiosRequest.put('/auth/userdetails/'+user.id+'/', JSON.stringify(userinfo), {
  headers: {
    'Content-Type': 'application/json'
  }
})  
      .then((response) => {
        // console.log(response.data)
        axiosRequest.put('/auth/address/'+user.id+'/', JSON.stringify(user_address), {
          headers: {
            'Content-Type': 'application/json'
          }
        })  
      .then((response) => {
        
        Alert.alert("Information Updated Succesfully!","Go Back to Profile to see the changes Made",
        [
    {
      text: "Okay!",
      onPress: () => navigation.navigate("Profile"),
      style: "yes"
    }
  ]
       )
      

      }).catch((error) => {
        alert(error.data)
      })
      

      }).catch((error)=>{
        alert(error.status)
      })
      

    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs (prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (errorMessage, input) =>{
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  
  return (
    <SafeAreaView style={{flex: 1,  }}>
    <ScrollView 
      contentContainerStyle={{
       
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
        <Loader visible={loading}/>
    <View style={[Universalstyles.signup, {height: 'auto'}]}>
    
  
          <View style={[Universalstyles.signupbg, { height: 'auto', paddingBottom: 50, justifyContent: 'center'}]}>
      
          
          <Text style= {{
            color: '#2f2f2f', 
            marginTop: 10,
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Personal information
        </Text>

        
          <Input 
            placeholder= 'First name' 
            iconName= 'account-outline' 
            value={inputs.firstname}
            error={errors.firstname}
            onFocus={() =>{
              handleError(null, 'firstname');
            }}
            onChangeText = {text => handleOnChange(text, 'firstname')}
            />

          <Input 
            placeholder= 'Middle name (if applicable)' 
            iconName= 'account-outline' 
            value={ inputs.midname}
            error={errors.midname}
            onFocus={() =>{
              handleError(null, 'midname');
            }}
            onChangeText = {text => handleOnChange(text, 'midname')}
            />

          <Input 
            placeholder= 'Last name' 
            iconName= 'account-outline' 
            value={inputs.lastname}
            error={errors.lastname}
            onFocus={() =>{
              handleError(null, 'lastname');
            }}
            onChangeText = {text => handleOnChange(text, 'lastname')}
            />

          <Input 
            placeholder= 'Suffix name (if applicable)' 
            iconName= 'account-outline' 
            value={inputs.suffname}
            error={errors.suffname}
            onFocus={() =>{
              handleError(null, 'suffname');
            }}
            onChangeText = {text => handleOnChange(text, 'suffname')}
            />
            <TouchableOpacity onPress = {()=>{showDatePicker()
            handleError(null, 'birthday')}
            }>
          <Input 
            placeholder= {"Birthday"}
            value = {inputs.birthday}
            iconName= 'calendar' 
            keyboardType= 'none'
            editable={false}
            error={errors.birthday}
            showSoftInputOnFocus = {false}
            onFocus = {() =>{
              handleError(null, 'birthday')
              Keyboard.dismiss()
            }}
            onChangeText = {text => handleOnChange(text, 'birthday')}
            />
           
            </TouchableOpacity>
            {show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
              />
              )}

          <Input 
            placeholder= 'Age' 
            iconName= 'numeric' 
            value={inputs.age}
            keyboardType= 'numeric'
            error={errors.age}
            onFocus={() =>{
              handleError(null, 'age');
            }}
            onChangeText = {text => handleOnChange(text, 'age')}
            />

          <Input 
            placeholder= 'Contact number' 
            value={inputs.contactno}
            iconName= 'phone' 
            keyboardType= 'numeric'
            error={errors.contactno}
            onFocus={() =>{
              handleError(null, 'contactno');
            }}
            onChangeText = {text => handleOnChange(text, 'contactno')}
            />

      <Text style= {{
            color: '#2f2f2f', 
            marginTop: 10,
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Complete Address
        </Text>

          <Input 
            placeholder= 'Street' 
            iconName= 'map-marker' 
            value={inputs.street}
            error={errors.street}
            onFocus={() =>{
              handleError(null, 'street');
            }}
            onChangeText = {text => handleOnChange(text, 'street')}
            />
            
  <Input 
            placeholder= 'City' 
            iconName= 'map-marker' 
            value={inputs.city}
            error={errors.city}
            onFocus={() =>{
              handleError(null, 'city');
            }}
            onChangeText = {text => handleOnChange(text, 'city')}
            />
            
  <Input 
            placeholder= 'Province' 
            iconName= 'map-marker' 
            value={inputs.province}
            error={errors.province}
            onFocus={() =>{
              handleError(null, 'province');
            }}
            onChangeText = {text => handleOnChange(text, 'province')}
            />
  <Input 
            placeholder= 'Zipcode' 
            iconName= 'map-marker' 
            keyboardType= 'numeric'
            value={inputs.zipcode}
            error={errors.zipcode}
            onFocus={() =>{
              handleError(null, 'zipcode');
            }}
            onChangeText = {text => handleOnChange(text, 'zipcode')}
            />
         
            <View style={{}}>
            <Button title='Save' onPress={validate}/>
            
            
            </View>
        </View>
        
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default EditprofileS