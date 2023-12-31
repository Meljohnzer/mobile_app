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
import HTMLView from 'react-native-htmlview';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const EditP = ({navigation,route}) => {

    // const { postID,jobtype,jobtitle,salary,rate,jobdesc,street,city,province,zipcode,enddate,startdate } = route.params
      const {post} = route.params
    React.useEffect(()=>{
 
        navigation.setOptions({
           title: "Edit Post",
           headerTitleAlign: 'center',
           headerStyle: { backgroundColor: 'white', height: 150 },
           headerTitleStyle: { fontWeight: '100', fontSize: 25 }
          })
         
         navigation.addListener('focus',async () => {
          

              
        }
        
          )},[])
 

     
    

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
    
    Lookingfor: post.looking_for,
    street: post.street,
    city: post.city,
    province: post.province,
    zipcode: post.zipcode,
    Jobdesc: post.job_desc,
    Jobtype: post.job_type,
    startdate: post.start_date,
    enddate:post.end_date,
    rate: post.rate,
    salary:post.salary,

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
        headers: {
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
     axiosRequest.put('auth/post/'+post.id+'/'+user.id+'/', JSON.stringify(Data), headers)  
      .then((response) => {
        console.log(response.data);
            Alert.alert("Post Edited Successfully","Check your post to see the changes!!",
            [
        {
          text: "Okay!",
          onPress: () => navigation.navigate("Home"),
          style: "yes"
        }
      ]
           )
         
      }).catch((err)=>{
        alert(err.status)
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
          

            <Text style={{fontSize: 20, fontWeight: '500' ,opacity:0.6, marginBottom: 10}}> Job information</Text>
            <Selectlist2
            error={errors.Jobtype}
            value= {inputs.Jobtype}
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
            value={inputs.salary}
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
            value={inputs.rate}
            onFocus={() =>{ 
                handleError(null, 'rate');
              }}
            onChange = {item => handleOnChange(item.label, 'rate')}
            />
   


           { <RichText
            
              placeholder= 'Job description...'
              value={inputs.Jobdesc} 
              error={errors.Jobdesc}
              onFocus={() =>{
                handleError(null, 'Jobdesc');
                
              }}
              onChange = {text => handleOnChange(text, 'Jobdesc')}
            />}
 <Text style={{fontSize: 20, fontWeight: '500' ,opacity:0.6, marginBottom: 10}}> Job Location</Text>
            
           <View style = {{}}>
           
            <Input 
            placeholder= 'Street' 
            value = {inputs.street}
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
            value={inputs.zipcode}
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
            value={inputs.startdate}
            editable={false}
            error={errors.startdate}
            onFocus={() =>{
              handleError(null, 'startdate');
            }}
            onChangeText = {text => handleOnChange(text, 'startdate')}
            /></TouchableOpacity>
              {show1 && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date1}
              mode={mode1}
              minimumDate={(new Date())}
              is24Hour={true}
              display='default'
              onChange={onChange1}
              />
              )}
              <TouchableOpacity onPress={()=>{showDatePicker()
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
            />
            
            </TouchableOpacity>
              {show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              minimumDate={(new Date()).valueOf() + 1000*3600*24}
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
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Done</Text>
      </View>
    </TouchableOpacity>
    </View>
            
        </View>
        
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default EditP
