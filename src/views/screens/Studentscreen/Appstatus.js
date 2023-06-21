import React from 'react';
import { View, useWindowDimensions, Dimensions, RefreshControl, ActivityIndicator,Text, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Universalstyles from '../../../const/Universalstyle';
import Logo from './../../../../assets/bg/bgimage5.jpg'
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Fontisto';
import { axiosRequest , server} from '../../components/api';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

//with mysql database using php for backend
const myIcon = (<Icon3 name='dots-three-vertical' size={30} color="black " />)

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default function Appstatus({navigation,route}) {
 
  
  const {height, width} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
 
 const{ itemId } = route.params
 const [gets,setGet] = React.useState({})
 
 
  React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
navigation.setOptions({
   title: "Application Status",
   headerTitleAlign: 'center',
   headerStyle: { backgroundColor: 'white', height: 100, },
   headerTitleStyle: { fontWeight: '100', fontSize: 25, }
  })
  
 await axiosRequest.get(`auth/activity/${itemId}/`).then((response)=>{
    //  console.log(response.data)
setGet (response.data)
     
})

}

  )},[])
 
 if(gets.posts === undefined){
  return  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
   
   {gets.posts.map((label,index)=>(<View key={index}>
    {label.image ? <Image 
     source= {{uri:label.image}}
      style={[{  
       width: 'auto',
       height: 100,
       resizeMode: 'cover', height: height * 0.20, 
       }]} 
       /> :<Image 
     source= {Logo}
      style={[{  
       width: 'auto',
       height: 100,
       resizeMode: 'cover', height: height * 0.20, 
       }]} 
       /> }
    
    <View style={{borderWidth: 2, borderColor: '#e8e8e8', margin: 5, borderRadius: 10, padding: 5}}>
      <Text style={Universalstyles.text2}><Icon4 name='person' style={{fontSize: 25, color: 'grey',}}/>  {label.looking_for}</Text>
    { label.user__company__comp_name && <Text style={Universalstyles.text}><Icon name='warehouse' style={{fontSize: 20, color: 'blue', marginRight: 10}}/> {label.user__company__comp_name}</Text>}
      <Text style={Universalstyles.text}><Icon name='account' style={{fontSize: 20, color: 'blue', marginRight: 10}}/> {label.user__userdetails__last_name}, {label.user__userdetails__first_name} {label.user__userdetails__mid_name} {label.user__userdetails__suff_name}</Text>
      <Text style={Universalstyles.text}><Icon name='map-marker' style={{fontSize: 20, color: 'blue', marginRight: 10}}/> {label.street} {label.city} {label.province} {label.zipcode}</Text>
    <Text style={Universalstyles.text}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'blue', }}/> {label.job_type}</Text> 
    <Text style={Universalstyles.text}><Icon name='currency-php' style={{fontSize: 20, color: 'blue', }}/> {label.salary} {label.rate}</Text>

      
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={Universalstyles.text}><Icon name='calendar-month' style={{fontSize: 20, color: 'green', marginRight: 10}}/> Hiring start in:</Text> 
      <Text style={{ paddingHorizontal: 80, paddingBottom: 5, fontSize: 15,opacity:.5}}><Icon name='calendar-month' style={{fontSize: 20, color: 'red', marginRight: 10}}/> Hiring end on: </Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={{ paddingHorizontal: 25,  fontSize: 15, opacity:.5, color: "blue"}}> {label.start_date}</Text>
      <Text style={{ paddingHorizontal: 105,  fontSize: 15, opacity:.5, color: "red"}}>{label.end_date}</Text>
      </View>
      <Text style={Universalstyles.text}></Text>
     </View>

    
   
   
   <View style={{borderWidth: 2, borderColor: '#e8e8e8', margin: 5, borderRadius: 10, padding: 5}}>
   <Text style={Universalstyles.text3}><Text style={{fontSize: 20, fontWeight: '500'}}>Applicant Information</Text></Text>
    

    <Text style={Universalstyles.text}><Icon name='account-outline' style={{fontSize: 20, color: 'blue',}}/> {label.apply__user__userdetails__last_name}, {label.apply__user__userdetails__first_name} {label.apply__user__userdetails__mid_name} {label.apply__user__userdetails__suff_name}</Text>
    <Text style={Universalstyles.text}><Icon name='email-outline' style={{fontSize: 20, color: 'blue',}}/> {label.apply__user__email}</Text>
    <Text style={Universalstyles.text}><Icon name='phone-outline' style={{fontSize: 20, color: 'blue',}}/> {label.apply__user__userdetails__contact_no}</Text>
    <Text style={Universalstyles.text}><Icon name='map-marker' style={{fontSize: 20, color: 'blue',}}/> {label.apply__user__address__street} {label.apply__user__address__city} {label.apply__user__address__province} {label.apply__user__address__zipcode}</Text>
    </View>
    <View style={{borderWidth: 2, borderColor: '#e8e8e8', margin: 5, borderRadius: 10, padding: 5}}>
   <Text style={Universalstyles.text3}><Text style={{fontSize: 20, fontWeight: '500'}}>Interview Information</Text></Text>
    
  {label.apply__applicant__status == 'Approved' && label.apply__applicant__schedule__id == null && <View style={[Universalstyles.jobstatus, {backgroundColor:"green"}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
         No Schedule Yet
      </Text>
      </View> }

   {label.apply__applicant__status == 'Decline' && <View style={[Universalstyles.jobstatus, {backgroundColor:"red"}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
         Decline
      </Text>
      </View> }
  {label.apply__applicant__status == null && <View style={[Universalstyles.jobstatus, {}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
         Pending
      </Text>
      </View> }
      {/* {console.log(label.Astatus)} */}
  
  {label.apply__applicant__schedule__id && <View style={[Universalstyles.jobstatus, {backgroundColor:'#C7F9B5'}]}>
  <Text style ={[Universalstyles.text,{width:'100%'}]}><Icon name='web' style={{fontSize: 20, color: 'blue',}}/> {label.interviewType}</Text>
  {label.applicant.method == "Online" && <Text onPress={()=>{Linking.openURL(label.applicant.method)}} style ={[Universalstyles.text,{width:'100%'}]}><Icon name='link' style={{fontSize: 20, color: 'blue',}}/> {label.apply__applicant__schedule__method}</Text>}
  { label.applicant.method == "Face to face" && <Text style ={[Universalstyles.text,{width:'100%'}]}><Icon name='map-marker' style={{fontSize: 20, color: 'red',}}/> {label.apply__applicant__schedule__interview_type}</Text>}
    <Text style ={[Universalstyles.text,{width:'100%'}]} ><Icon name='calendar-month' style={{fontSize: 20, color: 'green', marginRight: 10}}/> {label.apply__applicant__schedule__start_date} -- <Icon name='calendar-month' style={{fontSize: 20, color: 'red', marginRight: 10}}/> {label.apply__applicant__schedule__end_date} </Text> 
    <Text style ={[Universalstyles.text,{width:'100%'}]}><Icon name='clock-outline' style={{fontSize: 20, color: 'green', marginRight: 10}}/> {label.apply__applicant__schedule__start_time} -- <Icon name='clock-outline' style={{fontSize: 20, color: 'red', marginRight: 10}}/>{label.apply__applicant__schedule__end_time}</Text> 
        
      </View> }
      
  
      
    
    </View>
    
    </View>))}
   </ScrollView>

</SafeAreaView>
  );
}
