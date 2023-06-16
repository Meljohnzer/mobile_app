import { SafeAreaView, ScrollView, Text, View, Dimensions, useWindowDimensions, TouchableOpacity, Keyboard, Alert,Image, RefreshControl} from 'react-native'
import React from 'react'
import img from '../../../../assets/icon.png'
import Logo1 from '../../../../assets/bg/profile2.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Universalstyles from '../../../const/Universalstyle';
import { axiosRequest,server} from '../../components/api';
import moment from 'moment'
import UserContext from '../../components/context';


//with mysql database using php for backend
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Activity = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

const [gets,setGet] = React.useState({
      post : []
     })

    React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
 await axiosRequest.get(`auth/student/activity-log/view/${user.id}`).then((response)=>{
     
setGet (prevState => ({...prevState, post: response.data}))
     
})

}

  )},[])

// console.log(gets.post)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[{}]}>
    <View style={{padding: 10, }}>
            <View  style= {Universalstyles.txt2}>
            <Text style={{ fontSize: 40, fontWeight: '500',}}>Activity log</Text>
            <Text style={{ fontSize: 12, marginLeft: 5}}>Monitor your submitted job hiring application</Text>
            </View>
             </View>
      </View>
      {gets.post != "" ? <ScrollView
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
          }
        >
        
      {gets.post.map((label,index)=>(<View key = {index} style={[Universalstyles.jobPost, {}]}>
  
       <View style={Universalstyles.jobContent}>
      
       {label.post.profile[0].profile ? <Image source={{uri:label.post.profile[0].profile }} style={Universalstyles.Jobimage}/>
     : <Image source={Logo1} style={Universalstyles.Jobimage}/>} 
   
    <View style={Universalstyles.jobContent2}>
    
    <Text style={{fontSize: 20, borderBottomWidth: 1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon2 name='person' style={{fontSize: 23, color: 'black',}}/>  {label.post.looking_for}</Text>
   {label.post.company[0] && <Text style={{opacity: .5}}><Icon name='warehouse' style={{fontSize: 20, color: 'black',}}/> {label.post.company[0].comp_name}</Text>}
    <Text style={{opacity: .5 }}><Icon name='map-marker' style={{fontSize: 20, color: 'black', }}/> {label.post.address[0].street} {label.post.address[0].city} {label.post.address[0].province} {label.post.address[0].zipcode}</Text>
    <Text style={{opacity: .5 }}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'black', }}/> {label.post.job_type}</Text>   
    <Text style={{opacity: .5 }}><Icon name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(label.post.applies[0].applied_at).startOf('seconds').fromNow()}</Text>

    
    {label.applicant[0] == null &&  <TouchableOpacity onPress={()=> navigation.navigate('Application status',{itemId:label.id})}>
      <View style={[Universalstyles.jobstatus, {}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
         Pending
      </Text>
      {console.log(label)}
      </View>
      </TouchableOpacity> }
      
    { label.applicant.map((applicant,keys)=>(<View key={keys}>
     <TouchableOpacity onPress={()=> navigation.navigate('Application status',{itemId:label.id})}>
      <View style={[Universalstyles.jobstatus, {backgroundColor:applicant.status == 'Approved' ? "green" :"red" }]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
         {applicant.status}
      </Text>
      </View>
      </TouchableOpacity>
    </View> ))}

    

    </View>
    </View>
    
    </View>))}
    </ScrollView>:<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',opacity:0.5 }}>
     <Image source={img} style={Universalstyles.Jobimage}/>
      <Text>No Activity!  </Text>
</View>}
    </SafeAreaView>
  )
}

export default Activity