import { View, Text, Image, useWindowDimensions,ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl, Dimensions} from 'react-native'
import React from 'react'
import { axiosRequest,server } from '../../components/api';
import Universalstyles from '../../../const/Universalstyle';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto'
import Logo1 from '../../../../assets/bg/profile2.png'
import moment from 'moment'
import img from '../../../../assets/icon.png'
import UserContext from '../../components/context';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

//with mysql database using php for backend

const Notif = ({navigation}) => {
  const { user } = React.useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const [gets,setGet] = React.useState({
   })

React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
  await navigation.setOptions({
   title: "Notification",
   headerTitleAlign: 'center',
   headerStyle: { backgroundColor: 'white', height: 150 },
   headerTitleStyle: { fontWeight: '100', fontSize: 25 }
  })

  await axiosRequest.get(`auth/notif/${user.id}/`,{
    headers: {
      'Authorization': `JWT ${user.access}`,
    }
  }).then((response)=>{
    setGet (response.data)
         
    })
    

}

  )},[])

  if (gets.posts === undefined) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size={100} color = "yellow" />
  </View>
  }

  return (
    <SafeAreaView style={{flex:1}}>
      { gets.posts != "" ? <ScrollView
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


  {  gets.posts.map((label,index)=>( <TouchableOpacity key={index} onPress={() =>  navigation.navigate('Manage', {post:label.id})}>
 <View style={[Universalstyles.jobPost,{}]}>
      <View style={[Universalstyles.jobContent,{backgroundColor:"#83e0f8"}]}>
          {label.apply__user__userdetails__profile ? <Image source={{uri:server + label.apply__user__userdetails__profile}} style={Universalstyles.Jobimage}/>: <Image source={Logo1} style={Universalstyles.Jobimage}/>}
          
          <View style={Universalstyles.jobContent2}>
          <Text style={{fontSize: 17, }}><Icon3 name='person' style={{fontSize: 20, color: 'black',}}/>
          <Text style={{color: 'black', }}>  {label.apply__user__userdetails__last_name}, {label.apply__user__userdetails__first_name} {label.apply__user__userdetails__mid_name} {label.apply__user__userdetails_suff_name}</Text></Text>
          <Text style={{fontSize: 17, opacity: 0.6}}>
          <Text style={{color: 'black',}}>Send an Application For <Text>{label.looking_for}</Text></Text></Text>
          <Text style={{fontSize: 17,}}>See more...</Text>
          <View style={{flex: 1,  flexDirection: 'row' ,alignSelf: 'flex-end', left: 5, bottom: 5}}>
          <Text style={{opacity: .5 }}><Icon2 name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(label.apply__applied_at ).startOf('seconds').fromNow()}</Text>
            </View>
    </View>
    </View>
    </View> 
    </TouchableOpacity>))
    
    } 

    
    </ScrollView>: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',opacity:0.5 }}>
    <Image source={img} style={Universalstyles.Jobimage}/>
    <Text>  No New Notification!  </Text>
</View> }
    </SafeAreaView>
  )
}

export default Notif