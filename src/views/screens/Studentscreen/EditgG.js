import { ScrollView, Text, View, ImageBackground, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity} from 'react-native'
import React from 'react'
import Input from "../../components/Input";
import {Universalstyles} from "../../../const/Universalstyle";
import Loader from "../../components/Loader";
import { axiosRequest } from '../../components/api';
import UserContext from '../../components/context';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const EditG = ({navigation, error, route, onFocus=()=>{}, ...props
}) => {
    const {guardian} =route.params
    const [isFocused, setisFocused] = React.useState(false);
    const { user } = React.useContext(UserContext);
    React.useEffect(()=>{
 
        navigation.setOptions({
           title: "Edit Guardian Info",
           headerTitleAlign: 'center',
           headerStyle: { backgroundColor: 'white', height: 150 },
           headerTitleStyle: { fontWeight: '100', fontSize: 25 }
          })
         
         navigation.addListener('focus',async () => {
          
    
              
        }
        
          )},[])
  const [inputs, setInputs] = React.useState({
    
    gname: guardian.g_name,
    gcontactno: guardian.g_contact_no,
    gaddress: guardian.g_address,
    
   
  });
  
var Data ={
        g_name:inputs.gname,
        g_contact_no:inputs.gcontactno,
        g_address:inputs.gaddress,
        user:user.id
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
    

if (!inputs.gname){
  handleError("Please enter your guardian's name", 'gname');
  valid = false;
} else if (inputs.gname.match(/[0-9]/)){
  handleError('Name should not have numbers', 'gname');
  valid = false;
}
if (!inputs.gcontactno){
  handleError("Please enter your guardian's contact number", 'gcontactno');
  valid = false;
}
if (!inputs.gaddress){
  handleError('Please enter your guardian address', 'gaddress');
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
axiosRequest.put('auth/guardian/'+user.id+'/', JSON.stringify(Data), headers)  
      .then((response) => {      
        console.log(response.data)
          Alert.alert("Success","Go Back to Profile to see the changes Made",
          [
      {
        text: "Okay!",
        onPress: () => navigation.navigate("Profile"),
        style: "yes"
      }
    ]
         )
        

     
        
      });
console.log(Data)
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs (prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (errorMessage, input) =>{
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  return (
    <SafeAreaView style={{}}>
    <ScrollView 
      contentContainerStyle={{
            height: '100%'
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
        <Loader visible={loading}/>
    <View style={[Universalstyles.signup, {}]}>
    
  
          <View style={[Universalstyles.signupbg, { height: 'auto', paddingBottom: 50, justifyContent: 'center'}]}>
      
          
         
          <Text style= {{
            color: '#2f2f2f', 
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Guardian information
        </Text>

         
         <Input 
            placeholder= "Guardian's name" 
            iconName= 'account-outline' 
            value={inputs.gname}
            error={errors.gname}
            onFocus={() =>{
              handleError(null, 'gname');
            }}
            onChangeText = {text => handleOnChange(text, 'gname')}
            />
         <Input 
            placeholder= 'Contact number' 
            iconName= 'phone' 
            value={inputs.gcontactno}
            keyboardType='numeric'
            error={errors.gcontactno}
            onFocus={() =>{
              handleError(null, 'gcontactno');
            }}
            onChangeText = {text => handleOnChange(text, 'gcontactno')}
            />
            <Input 
            placeholder= 'Complete address' 
            iconName= 'map-marker' 
            value={inputs.gaddress}
            error={errors.gaddress}
            onFocus={() =>{
              handleError(null, 'gaddress');
            }}
            onChangeText = {text => handleOnChange(text, 'gaddress')}
            />
        
            
            {/* <View style={{}}>
            <Button title='Next' onPress={validate}/>
            
            </View> */}
          <View style={{marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
   
    <TouchableOpacity  onPress={validate}>
    <View style={{backgroundColor: '#4169e1',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    }}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Update</Text>
      </View>
    </TouchableOpacity>

    </View>
        </View>
        
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default EditG