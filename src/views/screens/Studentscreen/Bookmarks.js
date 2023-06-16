import { SafeAreaView, ScrollView, Text, View, Dimensions, useWindowDimensions, TouchableOpacity, Keyboard, Alert,Image, RefreshControl} from 'react-native'
import React from 'react'
import img from '../../../../assets/icon.png'
import Logo from '../../../../assets/bg/Picture2.png';
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




const Bookmarks = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
   const [gets,setGet] = React.useState({
      post : []
     })
const [postID,setPostID] = React.useState()

React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
 await axiosRequest.get('auth/student/bookmark/view/'+user.id).then((response)=>{
     
setGet (prevState => ({...prevState, post: response.data}))
     
})



}

  )},[])

  console.log(gets.post)

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={[{}]}>
    <View style={{padding: 10, }}>
            <View  style= {Universalstyles.txt2}>
            <Text style={{ fontSize: 40, fontWeight: '500',}}>Bookmarks</Text>
            <Text style={{ fontSize: 12, marginLeft: 5}}>Your saved job will be place here for you to review</Text>
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
        
  

      {gets.post.map((label,index)=>( 
<View key = {index} style={[Universalstyles.jobPost, {}]}>
  
  <View style={Universalstyles.jobContent}>
      
    {label.post.profile[0].profile ? <Image source={{uri:label.post.profile[0].profile}} style={Universalstyles.Jobimage}/>
     : <Image source={Logo1} style={Universalstyles.Jobimage}/>} 
   
    <View style={Universalstyles.jobContent2}>
   
    <Text style={{fontSize: 20, borderBottomWidth: 1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon2 name='person' style={{fontSize: 23, color: 'black',}}/>  {label.post.looking_for}</Text>
    {label.post.company != "" && <Text style={{opacity: .5}}><Icon name='warehouse' style={{fontSize: 20, color: 'black',}}/> {label.post.company[0].comp_name}</Text>}
    <Text style={{opacity: .5 }}><Icon name='map-marker' style={{fontSize: 20, color: 'black', }}/> {label.post.street} {label.post.city} {label.post.province} {label.post.zipcode}</Text>
    <Text style={{opacity: .5 }}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'black', }}/> {label.post.job_type}</Text>   
    <Text style={{opacity: .5 }}><Icon name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(label.post.created_at).startOf('seconds').fromNow()}</Text>

    
    {label.post.status == 'open' &&  <TouchableOpacity onPress={()=>{
     setPostID(label.postID)
        navigation.navigate('Job description', {post:label.post})
    }
    }>
      <View style={[Universalstyles.jobContent3, {}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
          VIEW
      </Text>
      </View>
      </TouchableOpacity>}
      {label.post.status == 'close' &&  <TouchableOpacity disabled = {true} onPress={()=>{
     setPostID(label.postID)
        navigation.navigate('Job description', { itemId : label.postID, title : label.lookingfor})
    }
    }>
      <View style={[Universalstyles.jobContent3, {backgroundColor:"red"}]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
      Application is Now Closed
      </Text>
      </View>
      </TouchableOpacity>}
    </View>
    </View>
    
    </View>))}
     
    </ScrollView>:  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',opacity:0.5 }}>
     <Image source={img} style={Universalstyles.Jobimage}/>
      <Text>  No Bookmarks!  </Text>
</View>}
    </SafeAreaView>
  )
}

export default Bookmarks