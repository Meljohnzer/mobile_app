import { ScrollView, Text, View, ImageBackground, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity} from 'react-native'
import React from 'react'
import Input from "../../components/Input";
import {Universalstyles} from "../../../const/Universalstyle";
import Loader from "../../components/Loader";
import { axiosRequest } from '../../components/api';
import UserContext from '../../components/context';




//with mysql database using php for backend
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Educbg = ({navigation, error,  onFocus=()=>{}, ...props
}) => {
    const [isFocused, setisFocused] = React.useState(false);
    const [inputs, setInputs] = React.useState({
    
    schname: '',
    schaddress: '',
    course: '',
    yearlevel: '',
   
  });
  const { user } = React.useContext(UserContext);
var Data ={
       sch_name:inputs.schname,
       sch_address:inputs.schaddress,
       course:inputs.course,
       year_level:inputs.yearlevel,
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
    
    if (!inputs.schname){
        handleError('Please enter the name of the school', 'schname');
        valid = false;
    }
    if (!inputs.schaddress){
      handleError('Please enter the school address', 'schaddress');
      valid = false;
  }
  if (!inputs.yearlevel){
    handleError('Please enter what your year & level', 'yearlevel');
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
    axiosRequest.post('auth/education/', JSON.stringify(Data), headers)  
      .then((response) => {
        console.log(response.data);
         navigation.navigate('Studentscreen')
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
    <View style={[Universalstyles.signup, {}]}>
    
  
          <View style={[Universalstyles.signupbg, { height: 'auto', paddingBottom: 50, justifyContent: 'center'}]}>
      
        
            <Text style= {{
            color: '#2f2f2f', 
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Educational background (current)
        </Text>

          <Input 
            placeholder= 'School name' 
            iconName= 'school' 
            error={errors.schname}
            onFocus={() =>{
              handleError(null, 'schname');
            }}
            onChangeText = {text => handleOnChange(text, 'schname')}
            />
          <Input 
            placeholder= 'School address' 
            iconName= 'school' 
            error={errors.schaddress}
            onFocus={() =>{
              handleError(null, 'schaddress');
            }}
            onChangeText = {text => handleOnChange(text, 'schaddress')}
            />
          <Input 
            placeholder= 'Year & level' 
            iconName= 'school' 
            error={errors.yearlevel}
            onFocus={() =>{
              handleError(null, 'yearlevel');
            }}
            onChangeText = {text => handleOnChange(text, 'yearlevel')}
            />
            
          <Input 
            
            placeholder= 'Course (if applicable)' 
            iconName= 'school' 
            
            error={errors.Course}
            onFocus={() =>{
              handleError(null, 'course');
            }}
            onChangeText = {text => handleOnChange(text, 'course')}
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
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Done</Text>
      </View>
    </TouchableOpacity>

    </View>
        </View>
        
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default Educbg