import { ScrollView, Text, View, StyleSheet, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity, FlatList} from 'react-native'
import Input from "../../components/Input";
import {Universalstyles} from "../../../const/Universalstyle";
import Loader from "../../components/Loader";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { axiosRequest } from "../../components/api";
import RichText from "../../components/Richtext";
import UserContext from '../../components/context';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CompEdit = ({navigation,route}) => {

    React.useEffect(()=>{
 
        navigation.setOptions({
           title: "Edit Company Info",
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
  const { user } = React.useContext(UserContext);

  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() ;
    setInputs (prevState => ({...prevState, Establishdate: fDate}));
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  // const {compname,establishdate,websiteurl,compdesc} = route.params

  const {company} = route.params

  const [inputs, setInputs] = React.useState({
    Compname: company.comp_name,
    Establishdate: company.establish_date,
    WebsiteURL: company.website_url,
    Compdesc: company.comp_desc,
  });
  
 
  
  
var Data ={
  comp_name: inputs.Compname ,
  establish_date: inputs.Establishdate,
  website_url: inputs.WebsiteURL,
  comp_desc: inputs.Compdesc,
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

   
    if (!inputs.Compname){
      handleError('Please enter the company name', 'Compname');
      valid = false;
    } 
    if (!inputs.Establishdate){
        handleError('Please enter the establishment date (YYYY-MM-DD)', 'Establishdate');
      valid = false;
    }
    if (!inputs.Compdesc){
        handleError('Please enter the company description', 'Compdesc');
      valid = false;
    }
    if (!inputs.WebsiteURL){
        handleError('Please enter the Website URL', 'WebsiteURL');
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
     
axiosRequest.put('auth/company/'+user.id+ '/', JSON.stringify(Data),{
  headers: {
    'Content-Type': 'application/json'
  }
})  
      .then((response) => {
        console.log(response.data);
            Alert.alert('Succesfully Updated!',"Go Back to Profile to see the changes Made",
            [
        {
          text: "Okay!",
          onPress: () => navigation.navigate("Profile"),
          style: "yes"
        }
      ]
           ) 
           
      }).catch((error)=>{
        error.alert(error.status)
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
         justifyContent:"center",
         width: Dimensions.get('window').width,
        }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
               colors={['#F5E44C']}
            />
          }
        >

      <Loader visible={loading}/>
      <View style={[Universalstyles.signup, {height:'auto', alignSelf:"center"}]}>
  
        <View style={[Universalstyles.signupbg, { height: '100%', paddingBottom: 50, justifyContent: "center"}]}>
          
        <Text style= {{
            color: '#2f2f2f', 
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Company details
        </Text>
            <Input 
            placeholder= 'Company name' 
            iconName= 'warehouse' 
            value={inputs.Compname}
            error={errors.Compname}
            onFocus={() =>{
              handleError(null, 'Compname');
            }}
            onChangeText = {text => handleOnChange(text, 'Compname')}
            />
            <TouchableOpacity onPress={()=>{showDatePicker()
            handleError(null, 'Establishdate')
            }}>
            <Input
            value = {inputs.Establishdate}
            placeholder= 'Establish date'
            iconName= 'calendar'
            keyboardType='none'
            editable={false}
            showSoftInputOnFocus = {false}
            error={errors.Establishdate}
            onFocus = {()=>{handleError(null,'Establishdate')
            Keyboard.dismiss()
            }}

            onChange = {text => handleOnChange(text,'Establishdate')}
            />
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
              </TouchableOpacity>
          <Input 
            placeholder= 'Website URL' 
            iconName= 'link' 
            value={inputs.WebsiteURL}
            error={errors.WebsiteURL}
            onFocus={() =>{
              handleError(null, 'WebsiteURL');
            }}
            onChangeText = {text => handleOnChange(text, 'WebsiteURL')}
            />
            

{/* TEMPORAY */}

            
            <RichText
              placeholder= 'Company description...' 
              error={errors.Compdesc}
              value = {inputs.Compdesc}
              onFocus={() =>{
                handleError(null, 'Compdesc');
              }}
              onChange = {text => handleOnChange(text, 'Compdesc')}
            />
        
             
    <View style={{marginBottom: 50, alignItems: 'center',justifyContent:"flex-end", flexDirection:'row', justifyContent: 'space-around'}}>
    <TouchableOpacity  onPress={validate}>
    <View style={{backgroundColor: '#4169e1',
    alignSelf: 'center',
    width: 300,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    }}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Save and Exit</Text>
      </View>
    </TouchableOpacity>

    </View>
            
    </View>
            
        </View>
        
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default CompEdit
