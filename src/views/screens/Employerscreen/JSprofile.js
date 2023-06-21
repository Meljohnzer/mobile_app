import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, RefreshControl, Dimensions,Linking,Alert} from 'react-native'
import React from 'react'
import Universalstyles from '../../../const/Universalstyle'
import Logo1 from '../../../../assets/bg/profile.png';
import { axiosRequest, server } from '../../components/api';



//with mysql database using php for backend

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Profile = ({navigation,route}) => {
 
 //const server = 'http://localhost:8080/api/'
 
//  const {itemId,postID} = route.params
const {profile} = route.params
 const [app,setApp] = React.useState({
  post: []
 })
// var Data ={
//       userID : itemId,
//       postID : postID
//       };
 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
    React.useEffect(()=>{
 
navigation.setOptions({
   title: profile.apply__user__userdetails__first_name,
   headerTitleAlign: 'center',
   headerStyle: { backgroundColor: 'white', height: 150 },
   headerTitleStyle: { fontWeight: '100', fontSize: 25 }
  })
 
//  navigation.addListener('focus',async () => {
  
//  await axiosRequest.post('/api/profile.php', JSON.stringify(Data))  
//       .then((response) => {
//         console.log(response.data)
//     setApp (prevState => ({...prevState, post: response.data}))

//       })
 
// }

//   )

// console.log(profile.user.email)
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
      
    
      
      <View>
      <View  style={[Universalstyles.studprofile, {borderWidth: 2,}]}>
      
        <View style={{flex: 1, margin:10, flexDirection: 'row', alignSelf: 'flex-end',}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',  }}> 
          <Text style={{ opacity: 0.6}}>
          Email: {profile.apply__user__email}<Text style={{fontWeight: 'bold',}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Contact number: {profile.apply__user__userdetails__contact_no}<Text style={{fontWeight: 'bold',}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Address: {profile.apply__user__address__street} {profile.apply__user__address__city} {profile.apply__user__address__province} {profile.apply__user__address__zipcode}<Text style={{fontWeight: 'bold',}}></Text>
        </Text>
        </View>
       
        <TouchableOpacity onPress={() => {Linking.openURL(server+profile.profile)}}>
       {profile.apply__user__userdetails__profile != "" ? <Image source={{uri:server +profile.apply__user__userdetails__profile}} style={{
     marginTop: 10,
     marginBottom: 20,
     marginLeft: 0,
     borderRadius: 65, 
     width: 130, 
     height: 130, 
     resizeMode: 'cover'
    }}/>: <Image source={Logo1} style={{
     marginTop: 10,
     marginBottom: 20,
     marginLeft: 0,
     borderRadius: 65, 
     width: 130, 
     height: 130, 
     resizeMode: 'cover'
    }}/>}
  </TouchableOpacity>
        </View>
        
        <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative'}}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '500'}}> Personal information</Text>
        <View style={{padding: 5}}>
        <Text style={{opacity: 0.6}}>
          Full name: {profile.apply__user__userdetails__last_name}, {profile.apply__user__userdetails__first_name} {profile.apply__user__userdetails__mid_name} {profile.apply__user__userdetails__suff_name}<Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Birthday: {profile.apply__user__userdetails__birthday}<Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Age: {profile.apply__user__userdetails__age}<Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        
        </View>
      </View>
      <View>

      </View>
      <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative'}}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '500'}}> Guardian information</Text>
        <View style={{padding: 5}}>
        
        <Text style={{opacity: 0.6}}>
          Guardian name: {profile.apply__user__guardian__g_name}<Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Contact number: {profile.apply__user__guardian__g_contact_no}<Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        </View>
      </View>
      <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative', }}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '500'}}> Educational background (current)</Text>
        <View style={{padding: 5}}>
        <Text style={{opacity: 0.6}}>
          School name: {profile.apply__user__educationbg__sch_name}<Text style={{fontWeight: 'bold', }}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          School address: {profile.apply__user__educationbg__sch_address}<Text style={{fontWeight: 'bold', }}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
          Year & level: {profile.apply__user__educationbg__year_level} <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        <Text style={{opacity: 0.6}}>
        <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}></Text>
        </Text>
        </View>
      </View>
  
      <View style={{borderWidth: .3, borderColor: '#aba9ab', marginHorizontal: 10, position: 'relative'}}></View>
        <View style={{paddingHorizontal: 5, paddingVertical: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '500'}}> Submitted requirements</Text>
        <View style={{padding: 5}}>
        <View style={{ flex: 1, flexDirection: 'row',  alignSelf: 'center' , }}>
      
      <View style={{}}>
      <TouchableOpacity onPress={() => Linking.openURL(server+profile.apply__cov_let)}>
      <View style={[Universalstyles.jobContent3, {flexDirection: 'column',height: 45, alignItems: 'center' }]}>
      <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Cover letter</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(server+profile.apply__cor)}>
      <View style={[Universalstyles.jobContent3, {flexDirection: 'column',height: 45 }]}>
      <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Certificate of Registration</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL( server+profile.apply__school_id)}>
      <View style={[Universalstyles.jobContent3, {flexDirection: 'column',height: 45 }]}>
      <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Student ID</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
      {console.log(profile.id)}
      </View>
   { profile.apply__applicant__status == null &&   <View style={{marginTop: 15, marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
    <TouchableOpacity  onPress={()=>Alert.alert(
  "", 
  "Are you sure you want to reject the applicant?",
  [
    {
      text: "Yes",
      onPress: () => {
        axiosRequest.post('auth/applicant/view/app/atay',JSON.stringify({status: "Decline",apply:profile.apply__id}),{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          Alert.alert("Declined","Application Successfully Decline",
          [
      {
        text: "Okay!",
        onPress: () => navigation.goBack(),
        style: "yes"
      }
    ]
         )
            })
        },
      style: "yes"
    },
    { 
      text: "No", onPress: () => console.log("No Pressed")
    }
  ]
)}>
    <View style={{borderColor: 'red',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,}}>
      <Text style={{color: 'black', fontWeight: '400', fontSize: 18}}>Decline</Text>
      </View>
    </TouchableOpacity>
  <TouchableOpacity  onPress={() => Alert.alert(
  "", 
  "Are you sure you want to Approved the applicant?",
  [
    {
      text: "Yes",
      onPress: () => {
        axiosRequest.post('auth/applicant/view/app/atay',JSON.stringify({apply:label.apply__id,status:"Approved"}), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
       
          Alert.alert(response.data,"Go to Applicant to Manage Approved Applicants",
            [
        {
          text: "Okay!",
          onPress: () => navigation.navigate('Applicant'),
          style: "yes"
        },{
          text:"Stay",
          onPress: ()=>navigation.goBack(),
          style:'cancel' 
        }
      ]
           ) 
            })
        },
      style: "yes"
    },
    { 
      text: "No", onPress: () => console.log("No Pressed")
    }
  ]
)}>
      <View style={{borderColor: '#4169e1',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,}}>
      <Text style={{color: 'black', fontWeight: 'light', fontSize: 18}}>Approve</Text>
      </View>
    </TouchableOpacity>
    </View>}
    
    
    { profile.apply__applicant__status == "Approved"  && profile.apply__applicant__schedule__id == null &&  <View style={{marginTop: 15, marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
  <TouchableOpacity onPress ={() => navigation.navigate('Interview schedule',{itemId:profile.applicantID})}>
      <View style={{backgroundColor: '#2175b6',
    alignSelf: 'center',
    width: 300,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,}}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Set Schedule</Text>
      </View>
    </TouchableOpacity>
    </View>}
    { profile.apply__applicant__schedule__id &&  <View style={{marginTop: 15, marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
  <TouchableOpacity onPress ={() => navigation.navigate('Edit schedule',{edit:profile})}>
      <View style={{backgroundColor: '#7eeebc',
    alignSelf: 'center',
    width: 300,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,}}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Edit Schedule</Text>
      </View>
    </TouchableOpacity>
    </View>}
    
</View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Profile