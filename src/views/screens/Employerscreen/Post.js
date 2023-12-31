import { ScrollView, Text, View, StyleSheet, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity, FlatList} from 'react-native'
import Input from "../../components/Input";
import {Universalstyles} from "../../../const/Universalstyle";
import Loader from "../../components/Loader";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Selectlist2 from "../../components/Selectlist2";
import Selectlist3 from "../../components/Selectlist3";
import { axiosRequest } from "../../components/api";
import RichText from "../../components/Richtext";
import UserContext from '../../components/context';


//with mysql database using php for backend

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Post = ({navigation,route}) => {
 

     
    

  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);
  const { user } = React.useContext(UserContext);

  const onChange1 = (event, selectedDate) => {
    
    const currentDate = selectedDate || event;
    setShow1(false);
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() ;
    setInputs (prevState => ({...prevState, startdate: fDate}));
   
  };

  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showDatePicker1 = () => {
    showMode1('date');
  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event1, selectedDate1) => {
    
    const currentDate1 = selectedDate1 || event1;
    setShow(false);
    setDate(currentDate1);
    let tempDate1 = new Date(currentDate1);
    let fDate1 = tempDate1.getFullYear() + '-' + (tempDate1.getMonth() + 1) + '-' + tempDate1.getDate() ;
    setInputs (prevState1 => ({...prevState1, enddate: fDate1}));
   
  };

  
  const showMode = (currentMode1) => {
    setShow(true);
    setMode(currentMode1);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const [inputs, setInputs] = React.useState({
    
    Lookingfor: '',
    street: '',
    city: '',
    province: '',
    zipcode: '',
    Jobdesc: '',
    Jobtype: '',
    startdate: '',
    enddate:'',
    rate: '',
    salary:'',

  });
  
  
  
var Data ={
       looking_for:inputs.Lookingfor,
       street:inputs.street,
       city:inputs.city,
       province:inputs.province,
       zipcode:inputs.zipcode,
       job_desc:inputs.Jobdesc,
       job_type:inputs.Jobtype,
       start_date:inputs.startdate,
       end_date:inputs.enddate,
       rate:inputs.rate,
       salary:inputs.salary,
       user: user.id
      };

      var headers = {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json',
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

    
    if (!inputs.street){
      handleError('Please enter the street', 'street');
      valid = false;
    }
    if (!inputs.city){
      handleError('Please enter the city', 'city');
      valid = false;
    }
    if (!inputs.province){
      handleError('Please enter the province', 'province');
      valid = false;
    }
    if (!inputs.zipcode){
      handleError('Please enter the zipcode', 'zipcode');
      valid = false;
    }
    if (inputs.Jobtype == ""){
      handleError('Please choose what type of job', 'Jobtype');
      valid = false;
    }
    if (!inputs.salary){
      handleError('Please enter the salary', 'salary');
      valid = false;
    }
    if (!inputs.rate){
      handleError('Please choose ratings', 'rate');
      valid = false;
    }
    if (!inputs.Lookingfor){
      handleError('Please enter the vacant job position', 'Lookingfor');
      valid = false;
    } else if (inputs.Lookingfor.match(/[0-9]/)){
      handleError('This field should not have numbers', 'Lookingfor');
      valid = false;
    }
    if (!inputs.Jobdesc){
      handleError('Please enter the job description', 'Jobdesc');
      valid = false;
    } 
    
    if (!inputs.startdate){
      handleError('Please Input Hiring Start Date', 'startdate');
      valid = false;
    }
    if (!inputs.enddate){
      handleError('Please Input Hiring End Date', 'enddate');
      valid = false;
    }
    else if(inputs.enddate < inputs.startdate){
      handleError('Hiring end date must be greater than starting date', 'enddate');
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
     axiosRequest.post('auth/post/'+user.id+'/', JSON.stringify(Data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })  
      .then((response) => {
        console.log(response.data);
         if(response.data){
          Alert.alert("Post Created Successfully","See Home Screen to See Your post",
          [
      {
        text: "Okay!",
        onPress: () => navigation.navigate("Home"),
        style: "yes"
      }
    ]
         )
          // navigation.navigate("Home");
         }else{
          alert(response.data)
         }
      });
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs (prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (errorMessage, input) =>{
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView
        contentContainerStyle={{ 
         
        }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
               colors={['#F5E44C']}
            />
          }
        >
          
    <View
    style={[Universalstyles.signup, {height: 'auto'}]}>

      <Loader visible={loading}/>
  
   
          <View style={{height: 'auto', padding: 5, flex: 1,  }}>
            <View  style= {[Universalstyles.txt2, {}]}>
            <Text style={{ fontSize: 40, fontWeight: '500',}}>Create post</Text>
            <Text style={{ fontSize: 12, marginLeft: 5}}>Create a job hiring application with valid information</Text>
            </View>

            <Text style={{fontSize: 20, fontWeight: '500' ,opacity:0.6, marginBottom: 10}}> Job information</Text>
            <Selectlist2
            error={errors.Jobtype}
            
            onFocus={() =>{
              
                handleError(null, 'Jobtype');
              }}
              
            onChange = {item => handleOnChange(item.label, 'Jobtype')}
            
            />
            <Input 
            placeholder= 'Vacant job position' 
            iconName= 'account-outline' 
            value={inputs.Lookingfor}
            error={errors.Lookingfor}
            onFocus={() =>{
              handleError(null, 'Lookingfor');
            }}
            onChangeText = {text => handleOnChange(text, 'Lookingfor')}
            />
            <Input 
            placeholder= 'Salary of employee' 
            iconName= 'currency-php' 
            keyboardType= 'numeric'
            error={errors.salary}
            onFocus={() =>{
              handleError(null, 'salary');
            }}
            onChangeText = {text => handleOnChange(text, 'salary')}
            
            />
             <Selectlist3
            error={errors.rate}
            onFocus={() =>{ 
                handleError(null, 'rate');
              }}
            onChange = {item => handleOnChange(item.label, 'rate')}
            />
             {/* <Input 
            placeholder= 'Job description' 
            iconName= 'newspaper-variant-outline' 
            error={errors.Jobdesc}
            onFocus={() =>{
              handleError(null, 'Jobdesc');
            }}
            onChangeText = {text => handleOnChange(text, 'Jobdesc')}
            /> */}
            <RichText
            
              placeholder= 'Job description...' 
              error={errors.Jobdesc}
              onFocus={() =>{
                handleError(null, 'Jobdesc');
              }}
              onChange = {text => handleOnChange(text, 'Jobdesc')}
            />
 <Text style={{fontSize: 20, fontWeight: '500' ,opacity:0.6, marginBottom: 10}}> Job Location</Text>
            
           <View style = {{}}>
           
            <Input 
            placeholder= 'Street' 
            iconName= 'map-marker' 
            error={errors.street}
            onFocus={() =>{
              handleError(null, 'street');
            }}
            onChangeText = {text => handleOnChange(text, 'street')}
            
            />
             <Input 
            placeholder= 'City' 
            iconName= 'map-marker' 
            
            error={errors.city}
            onFocus={() =>{
              handleError(null, 'city');
            }}
            onChangeText = {text => handleOnChange(text, 'city')}
           
            />
             <Input 
            placeholder= 'Province' 
            iconName= 'map-marker' 
            
            error={errors.province}
            onFocus={() =>{
              handleError(null, 'province');
            }}
            onChangeText = {text => handleOnChange(text, 'province')}
            
            />
             <Input 
            placeholder= 'Zipcode' 
            iconName= 'map-marker' 
            
            error={errors.zipcode}
            onFocus={() =>{
              handleError(null, 'zipcode');
            }}
            onChangeText = {text => handleOnChange(text, 'zipcode')}
           
            />
           
           </View>
            

          <Text style={{fontSize: 20, fontWeight: '500' ,opacity:0.6, marginBottom: 10}}> Hiring start and end</Text>

             
          <TouchableOpacity onPress={()=>{showDatePicker1()
            handleError(null, 'startdate')
            }}>
            <Input 
            placeholder= 'Hiring Start Date (YYYY-MM-DD)' 
            iconName= 'calendar-month' 
            editable={false}
            value = {inputs.startdate}
            error={errors.startdate}
            onFocus={() =>{
              handleError(null, 'startdate');
            }}
            onChangeText = {text => handleOnChange(text, 'startdate')}
            />
            </TouchableOpacity>
              {show1 && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date1}
              minimumDate={(new Date())}
              mode={mode1}
              is24Hour={true}
              display='default'
              onChange={onChange1}
              />
              )}
         {inputs.startdate &&     <TouchableOpacity onPress={()=>{showDatePicker()
            handleError(null, 'enddate')
            }}>
            <Input 
            placeholder= 'Hiring End Date (YYYY-MM-DD)' 
            iconName= 'calendar-month' 
            editable={false}
            value = {inputs.enddate}
            error={errors.enddate}
            onFocus={() =>{
              handleError(null, 'enddate');
            }}
            onChangeText = {text => handleOnChange(text, 'enddate')}
            /></TouchableOpacity> }
              {show && (
              <DateTimePicker
              testID="dateTimePicker"
              minimumDate={(new Date()).valueOf() + 1000*3600*24}
              value={date}
             
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
              />
              )}
              
              
              
              {/* <Input 
            placeholder= 'Hiring End Date (YYYY-MM-DD)' 
            iconName= 'calendar-month' 
            keyboardType='numeric'
            error={errors.enddate}
            onFocus={() =>{
              handleError(null, 'enddate');
            }}
            onChangeText = {text => handleOnChange(text, 'enddate')}
           
            /> */}
           
     
<View style={{marginBottom: 50, alignItems: 'center'}}>
    <TouchableOpacity  onPress={validate}>
      <View style={[Universalstyles.logout, {height: 'auto'}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Post</Text>
      </View>
    </TouchableOpacity>
    </View>
            
        </View>
        
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default Post
