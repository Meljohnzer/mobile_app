import React, {useState} from 'react';
import { View, useWindowDimensions, Dimensions, ActivityIndicator,RefreshControl, Text, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Universalstyles from '../../../const/Universalstyle';
import * as ImagePicker from 'expo-image-picker';
import Logo1 from '../../../../assets/bg/profile.png';
import Logo from './../../../../assets/bg/bgimage5.jpg'
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Fontisto';
import { axiosRequest,server } from '../../components/api';
import UserContext from '../../components/context';

//with mysql database using php for backend
const myIcon = (<Icon3 name='dots-three-vertical' size={30} color="black " />)
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const checkIconAlert = () => Alert.alert(
  "",
  "Are you sure you want to accept new applicant?",
  [
    {
      text: "Yes",
      onPress: () => console.log("Yes Pressed"),
      style: "yes"
    },
    { 
      text: "No", onPress: () => console.log("No Pressed") 
    }
  ]
);

const closeIconAlert = () => Alert.alert(
  "", 
  "Are you sure you want to reject the applicant?",
  [
    {
      text: "Yes",
      onPress: () => console.log("Yes Pressed"),
      style: "yes"
    },
    { 
      text: "No", onPress: () => console.log("No Pressed")
    }
  ]
);

const report = () => Alert.alert(
    "", 
    "Are you sure you want to report this applicant?",
    [
      {
        text: "Yes",
        onPress: () => console.log("Yes Pressed"),
        style: "yes"
      },
      { 
        text: "No", onPress: () => console.log("No Pressed")
      }
    ]
  );
  
  
export default function Review({navigation,route, }) {
 
  const { user } = React.useContext(UserContext);

  const profile = () => navigation.navigate('Applicant profile');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      
      allowsEditing: true,
      quality: 1,
    });


    if (!result.canceled) {
      setSelectedImage (result.assets[0].uri);
    } else{
      alert('You did not select any image.'); 
    }
  };

  const [gets,setGet] = React.useState({
    post : []
   })
   
  const [rev,setRev] = React.useState({})
   
   
const { itemId,title } = route.params
   
var Data ={
    postID : itemId
    };

    var headers = {
     "headers":{
      'Access-Control-Allow-Origin': 'true',
      'Content-Type': 'application/json',
     }
    };
   
     
      const [refreshing, setRefreshing] = React.useState(false);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    
      React.useEffect(()=>{
        navigation.addListener('focus',async () => {
         
         navigation.setOptions({
   title: itemId.looking_for,
   headerTitleAlign: 'center',
   headerStyle: { backgroundColor: 'white', height: 150 },
   headerTitleStyle: { fontWeight: '100', fontSize: 25 }
  })
 
            await axiosRequest.get(`auth/user/applicant/${itemId.id}/`, JSON.stringify(Data), headers)  
                 .then((response) => {
             //console.log(response.data)     
           setRev (response.data)
                 })
           }
           
             )},[])
  const layout = useWindowDimensions();
  const {height, width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
 

  if (rev.posts === undefined) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size={100} color = "yellow" />
  </View>
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{}}
        contentContainerStyle={{
          
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
<View  key = {index} style={{ borderColor: '#e8e8e8'}}>
<Image
    source= {itemId.image != "" ? {uri:server+itemId.image} : Logo}
    style={[{  
     width: 'auto',
     height: 100,
     resizeMode: 'cover', height: height * 0.20, 
     }]} 
     />
     {console.log(itemId)}
      <Text style={Universalstyles.text2}><Icon4 name='person' style={{fontSize: 25, color: 'black',}}/>  {itemId.looking_for}</Text>
      {/* <Text style={{ paddingHorizontal: 5, paddingBottom: 5, fontSize: 30}}>Company name:</Text>
      <Text style=style={Universalstyles.text}><Icon name='email' style={{fontSize: 20, color: 'black', marginRight: 10}}/> Company email address: </Text> */}
     { itemId.user__company__comp_name && <Text style={Universalstyles.text}><Icon name='warehouse' style={{fontSize: 20, color: 'black', marginRight: 10}}/> {itemId.user__company__comp_name}</Text>}
      {/* <Text style={{ paddingHorizontal: 5, paddingBottom: 5, fontSize: 15,opacity:.5,}}><Icon name='map-marker' style={{fontSize: 20, color: 'black', }}/> Workplace address </Text> */}
      <Text style={Universalstyles.text}><Icon name='account' style={{fontSize: 20, color: 'blue', marginRight: 10}}/> {itemId.user__userdetails__last_name}, {itemId.user__userdetails__first_name} {itemId.user__userdetails__mid_name} {itemId.user__userdetails__suff_name}</Text>
      <Text style={Universalstyles.text}><Icon name='map-marker' style={{fontSize: 20, color: 'red', marginRight: 10}}/> {itemId.user__address__street}, {itemId.user__address__city}, {itemId.user__address__province}, {itemId.user__address__zipcode}</Text>
      {/* <Text style={Universalstyles.text}><Icon name='calendar-month' style={{fontSize: 20, color: 'black', marginRight: 10}}/> Year company started: </Text>
      <Text style={Universalstyles.text}><Icon name='account-group' style={{fontSize: 20, color: 'black', marginRight: 10}}/> Employees hired: </Text>
      <Text style={Universalstyles.text}><Icon name='account-group' style={{fontSize: 20, color: 'black', marginRight: 10}}/> Number of customers serve: </Text> */}
    <Text style={Universalstyles.text}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'black', }}/> {itemId.job_type}</Text> 
    <Text style={Universalstyles.text}><Icon name='currency-php' style={{fontSize: 20, color: 'red', }}/> {itemId.salary} {itemId.rate} </Text>

      
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={Universalstyles.text}><Icon name='calendar-month' style={{fontSize: 20, color: 'blue', marginRight: 10}}/> Hiring start in:</Text> 
      <Text style={{ paddingHorizontal: 80, paddingBottom: 5, fontSize: 15,opacity:.5}}><Icon name='calendar-month' style={{fontSize: 20, color: 'red', marginRight: 10}}/> Hiring end on: </Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={{paddingHorizontal: 25, fontSize: 15, opacity:.5}}>{itemId.start_date}</Text>
      <Text style={{paddingHorizontal: 100,fontSize: 15, opacity:.5}}>{itemId.end_date}</Text>
      </View>
      <Text style={Universalstyles.text}></Text>
     </View>

    
    <View  style={{height: 'auto', borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 10, }}>
   
   <View style={{margin: 10, borderColor: '#cbc8ce'}}>
    <Text style={{fontSize:20, textAlign: 'center', fontWeight: '500'}}>Approved applicants</Text>
    </View>
    <View  style={{height: 'auto', borderWidth: 2, borderColor: '#e8e8e8', borderRadius: 0, margin: 0}}>
    
    
   {rev.posts.map((label,index)=>(  <View key = {index} style={{paddingVertical: 1}}>
   { label.apply__applicant__status == 'Approved' && <View style={{backgroundColor: 'white',
    borderColor: '#e8e8e8',
    padding: 5,
    borderWidth:  2,
    flexDirection: 'row',
    borderRadius: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('Applicant profile' ,{
      profile:label
      })}>
    {label.apply__user__userdetails__profile != "" ? <Image source={{uri:server+label.apply__user__userdetails__profile}} style={{
      marginTop: 15,
      width: 70,
      height: 70,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      marginRight: 7,
      borderRadius: 35,
      alignSelf: 'center',
      resizeMode:'cover'
      
    }}/> :<Image source={Logo1} style={{
      marginTop: 15,
      width: 70,
      height: 70,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      marginRight: 7,
      borderRadius: 35,
      alignSelf: 'center',
      resizeMode:'cover'
      
    }}/>}
    </TouchableOpacity>
    <View style={{padding: 10,
    flex: 1,
    borderColor: '#e8e8e8',
    borderLeftWidth: 1.5,
    marginLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center'}}>
    <Text style={{ marginBottom: 0, fontSize: 15}}>{label.apply__user__userdetails__last_name}, {label.apply__user__userdetails__first_name} {label.apply__user__userdetails__mid_name} {label.apply__user__userdetails__suff_name}<Text style={{color: 'blue', textTransform: 'capitalize'}}> </Text> </Text>
    <Text style={{ opacity: .5, fontSize: 12}}>
    {label.apply__user__address__street} {label.apply__user__address__city} {label.apply__user__address__province} {label.apply__user__address__zipcode}
    <Text style={{color: 'green', textTransform: 'capitalize'}}></Text> </Text>
    <Text style={{ opacity: .5}}>{label.apply__user__userdetails__age} Years old <Text style={{color: 'green', textTransform: 'capitalize'}}></Text> </Text>
        </View>
      
      <View style={{ flex: 1, flexDirection: 'row',  alignSelf: 'center' , }}>
      
      
      <View style={{alignItems: 'center', flexDirection: 'row',justifyContent:"flex-end", width:"100%" }}>
      <TouchableOpacity  onPress={() => label.apply__applicant__schedule__id ? navigation.navigate('Edit schedule',{edit:label}): navigation.navigate('Interview schedule',{itemId:label.apply__applicant__id})}>
      <Text style={{color: label.apply__applicant__schedule__id ? "blue":'green', fontSize: 18, marginHorizontal: 10}}>{label.apply__applicant__schedule__id ? "Edit Schedule":"Schedule Interview"}</Text>
      </TouchableOpacity>
      

     
      </View>
      {/* {label.scheduleID && <View style={{alignItems: 'center', flexDirection: 'row',justifyContent:"flex-end", width:"100%" }}>
      <TouchableOpacity  onPress={() => navigation.navigate('Edit schedule',{scheduleID:label.scheduleID,interviewType:label.interviewType,
        method:label.method,
        startdate:label.startdate,
        startdate:label.startdate,
        enddate:label.enddate,
       starttime:label.starttime,
       endtime:label.endtime})}>
      <Text style={{color: 'blue', fontSize: 18, marginHorizontal: 10}}>Edit Schedule</Text>
      </TouchableOpacity>
      
     
      </View>} */}
      </View>
      
  
   
    </View> }
    </View>))}
    
    </View>
    </View>
    <View style={{marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
    
   {/* <TouchableOpacity onPress={() => navigation.navigate('Interview schedule')}>
    <View style={{backgroundColor: '#4169e1',
    alignSelf: 'center',
    width: '150%',
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    }}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Set schedule</Text>
      </View>
    </TouchableOpacity>*/}

    </View>
    
   </ScrollView>

     

</SafeAreaView>
  );
}
