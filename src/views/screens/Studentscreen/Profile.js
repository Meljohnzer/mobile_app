import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, RefreshControl, Dimensions,Alert} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Universalstyles from '../../../const/Universalstyle'
import Logo1 from '../../../../assets/bg/profile.png';
import { axiosRequest,server} from '../../components/api';
import * as DocumentPicker from "expo-document-picker"
import UserContext from '../../components/context';

//with mysql database using php for backend

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Profile = ({navigation,}) => {
 
  const [gets,setGet] = React.useState({
   profile: []
  })

  const { user } = React.useContext(UserContext);
  const PickFile = async (file) => {


    let File = await DocumentPicker.getDocumentAsync({
     copyToCacheDirectory : false,
      type: 'image/*'
    })
    if(File.type === 'cancel'){
      console.log("cancel")
    }else{

      var config = {
        headers:{
     'Content-type':'multipart/form-data'
        }
       };
       var formData = new FormData();
       formData.append('profile',{type:File.mimeType,uri:File.uri,name:File.name})
      Alert.alert(
        "", 
        "You Want To Apply This As Profile Picture?",
        [
          {
            text: "Yes",
            onPress: () => { axiosRequest.put('auth/userdetails/profile/picture/'+user.id+'/',formData,config).then((response) => {
              console.log(response.status)
              Alert.alert("Profile Picture Added","Change screen to see the changes made",
              [
          {
            text: "Okay!",
            onPress: () => Profile,
            style: "yes"
          }
        ]
             )
      
           
                 })},
            style: "yes"
          },
          { 
            text: "No", onPress: () => console.log("No Pressed")
          }
        ]
      )
    }
}


  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
 
  React.useEffect(()=>{
 
    navigation.addListener('focus',async () => {
  
      await axiosRequest.get('auth/profile/student/'+user.id+'/').then((response)=>response.data).then((data)=>{
     setGet (prevState => ({...prevState, profile: data}))
      })
       
      })
     
      
       },[])
       
       
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <ScrollView style={{}}
     contentContainerStyle={{
      justifyContent: 'center',
      width: Dimensions.get('window').width,
     }}
     refreshControl={
       <RefreshControl
         refreshing={refreshing}
         onRefresh={onRefresh}
         colors={['#F5E44C']}
       />
     }>
  {gets.profile.map((profiles,index) => (
      <View key = {index} style={[Universalstyles.studprofile, {borderWidth: 2,}]}>
      
        <View style={{flex: 1, margin:10, flexDirection: 'row', alignSelf: 'flex-end',}}>
      
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',  }}> 
        
          <Text style={{ opacity: 0.6}}>
          Email: <Text style={{fontWeight: 'bold',}}>{profiles.email}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Contact no: <Text style={{fontWeight: 'bold',}}>{profiles.userdetails[0].contact_no}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Address: <Text style={{fontWeight: 'bold',}}>{profiles.address[0].street} {profiles.address[0].city} {profiles.address[0].province} {profiles.address[0].zipcode}</Text>
        </Text>
        </View>
       
        <TouchableOpacity onPress={PickFile}>
      
     { profiles.userdetails[0].profile ? <Image source={{uri:profiles.userdetails[0].profile}} style={{
     marginTop: 10,
     marginBottom: 20,
     marginLeft: 0,
     borderRadius: 65, 
     width: 130, 
     height: 130, 
     resizeMode: 'cover'
    }}/> : <Image source={Logo1} style={{
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 0,
      borderRadius: 65, 
      width: 130, 
      height: 130, 
      resizeMode: 'cover'
     }}/> }
  </TouchableOpacity>
        </View>
        <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative'}}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit profile S',{details:profiles.userdetails[0],address:profiles.address[0]})}>
        <View>
       <Text style={{fontSize: 20, fontWeight: '500'}}> Personal information <Icon 
            name= 'pencil'
            style={{fontSize: 20, marginRight: 10}}
            color='black'
        />
        </Text>
        </View>
        </TouchableOpacity> 
        <View style={{padding: 5}}>
        <Text style={{opacity: 0.6}}>Name: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.userdetails[0].last_name}, {profiles.userdetails[0].first_name} {profiles.userdetails[0].mid_name} {profiles.userdetails.suff_name}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>Date of birth: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.userdetails[0].birthday}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>Age: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.userdetails[0].age}</Text>
        </Text>
        
       
        
        </View>
      </View>
      <View>

      </View>
      <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative'}}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit guardian',{guardian:profiles.guardian[0]})}>
        <View>
       <Text style={{fontSize: 20, fontWeight: '500'}}> Guardian information <Icon 
            name= 'pencil'
            style={{fontSize: 20, marginRight: 10}}
            color='black'
        />
        </Text>
        </View>
        </TouchableOpacity> 
        <View style={{padding: 5}}>
        
        <Text style={{opacity: 0.6}}>Guardian name: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.guardian[0].g_name}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>Address: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.guardian[0].g_address}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>Contact no: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.guardian[0].g_contact_no}</Text>
        </Text>
        </View>
      </View>
      <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative', }}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit educBG',{school:profiles.school[0]})}>
        <View>
       <Text style={{fontSize: 20, fontWeight: '500'}}> <Text style={{fontSize: 20, fontWeight: '500'}}>Educational background (current)</Text> <Icon 
            name= 'pencil'
            style={{fontSize: 20, marginRight: 10}}
            color='black'
        />
        </Text>
        </View>
        </TouchableOpacity> 
        <View style={{padding: 5}}>
        <Text style={{opacity: 0.6}}>School name: <Text style={{fontWeight: 'bold'}}>{profiles.school[0].sch_name}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>School address: <Text style={{fontWeight: 'bold'}}>{profiles.school[0].sch_address}</Text>
        </Text>
        <Text style={{opacity: 0.6}}>Year & level: <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{profiles.school[0].year_level}</Text>
        </Text>
        <Text style={{opacity: 0.6}}><Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{profiles.school[0].course}</Text>
        </Text>
        </View>
      </View>
      
      </View>))}
      
      {/* <View style={Universalstyles.studprofile}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'uppercase'}}>samuel george y. dela cruz</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>name</Text>
      </View>
      <View style={[Universalstyles.studprofile, {marginVertical: 20}]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8',  width: 'auto', textTransform: 'uppercase'}}>25 years old</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Age</Text>
      </View>
      <View style={[Universalstyles.studprofile]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8',  width: 'auto', textTransform: 'uppercase'}}>0123-456-7890</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Contact number</Text>
      </View>
      <View style={[Universalstyles.studprofile, {marginVertical: 20}]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'capitalize'}}>C.M. Recto Avenue Lapasan, Cagayan de Oro City 9000</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Address</Text>
      </View>
      <View style={[Universalstyles.studprofile]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'capitalize'}}>University of science and technology of the philippines</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>School name</Text>
      </View>
      <View style={[Universalstyles.studprofile, {marginVertical: 20}]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'uppercase'}}>College</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Education stage</Text>
      </View>
      <View style={[Universalstyles.studprofile]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'uppercase'}}>1st year college</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Year & level</Text>
      </View>
      <View style={[Universalstyles.studprofile, {marginVertical: 20}]}>
          <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 20, borderBottomWidth: 2, borderColor: '#e8e8e8', width: 'auto', textTransform: 'uppercase'}}>BS - Information technology</Text>
          <Text style={{textAlign: 'center', fontWeight: '500', textTransform: 'capitalize', color: 'blue'}}>Course</Text>
      </View> */}
    
   
    </ScrollView>
    </SafeAreaView>
  )
}

export default Profile