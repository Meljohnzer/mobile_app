import { View, Text, Image, useWindowDimensions, TouchableOpacity,ActivityIndicator, FlatList,ScrollView, SafeAreaView, RefreshControl, Dimensions} from 'react-native'
import Logo1 from '../../../../assets/bg/profile2.png';
import img from '../../../../assets/icon.png'
import React from 'react'
import Universalstyles from '../../../const/Universalstyle'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto'
import Icon4 from 'react-native-vector-icons/Octicons'
//import axios from 'axios'
import moment from 'moment'
import { axiosRequest,server } from '../../components/api';
import UserContext from '../../components/context';
//with mysql database using php for backend
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const Applicant = ({navigation}) => {
  // navigation.setOptions({
  //   title: "Applicants",
  //   headerTitleAlign: 'center',
  //   headerStyle: { backgroundColor: 'white', height: 150 },
  //   headerTitleStyle: { fontWeight: '100', fontSize: 25 }
  //  })
  
    const {height} = useWindowDimensions();
    const { user } = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

     const [gets,setGet] = React.useState([])
const [postID,setPostID] = React.useState()

// var Data ={
//       postID : postID
//       };

//       var headers = {
//         'Access-Control-Allow-Origin': 'true',
//         'Content-Type': 'application/json',
//       };
  


React.useEffect(()=>{
  navigation.addListener('focus',async () => {
   
  await axiosRequest.get(`auth/user/posts/${user.id}/`,{
   headers: {
     'Authorization': `JWT ${user.access}`,
   }
 }).then((response)=>{
      // console.log(response.data)
 setGet(response.data)
 setLoading(false);

//  console.log(`line : ${gets}`)
 })
 
 
 
 }
 
   )},[])

const Header = ()=>{

  return (
    <View style={[{}]}>
    <View style={{padding: 10, }}>
            <View  style= {Universalstyles.txt2}>
            <Text style={{ fontSize: 40, fontWeight: '500',}}>Applicants</Text>
            <Text style={{ fontSize: 12, marginLeft: 5}}>You can review and set the interview type and schedule here</Text>
            </View>
             </View>
      </View>
  )

}

const Item = ({item})=>{
  return (
  <>
   <View  style={[Universalstyles.jobPost,{}]}>
  
  <View style={Universalstyles.jobContent}>
  {item.user__userdetails__profile ? <Image source={{uri : server+item.user__userdetails__profile}} style={Universalstyles.Jobimage}/> :  <Image source={Logo1} style={Universalstyles.Jobimage}/>}
  <View style={Universalstyles.jobContent2}>
{console.log(item.user__userdetails__profile)}
  <Text style={{fontSize: 20, borderBottomWidth:1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon3 name='person' style={{fontSize: 23, color: 'black',}}/><Text style={{color: 'black', }}>  {item.looking_for}</Text></Text>
  
  { item.status == "open"  && <Text style={{opacity:.5}}><Icon4 name='dot-fill' style={{fontSize: 20, color: 'green', alignContent: 'center'}}/>  Open</Text> }
  { item.status == "close"  &&<Text style={{opacity:.5}}><Icon4 name='dot-fill' style={{fontSize: 20, color: 'red', alignContent: 'center'}}/>  Close</Text>}

<Text style={{opacity:.5}}><Icon2 name='account-group' style={{fontSize: 20, color: 'brown', alignContent: 'center'}}/> <Text style={{color: 'black', }}>{item.noApprove} </Text> Approved applicant</Text>
<Text style={{opacity: .5 }}><Icon2 name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(item.created_at).startOf('seconds').fromNow()}</Text>

  <TouchableOpacity onPress={()=>{
   setPostID(item.postID)
      navigation.navigate('Review', { itemId : item,title:item.looking_for })

  }
  }>
  <View style={Universalstyles.jobContent3}>
    
    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
        Review
    </Text>
    </View>
    </TouchableOpacity>
    </View>
  
  
  
  </View>
  
</View>
 
  </>
  )
  }

const ItemSeparatorView = () => {
  return (
    //Item Separator
    <View
      style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8',}}
    />
  );
};

  return (
    <SafeAreaView style={{flex: 1, }}>
 <Header/>
 {loading ? ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={100} color = "yellow" />
      </View>) : gets.posts  != "" ? (<FlatList 
  
  data={gets.posts}
  ItemSeparatorComponent={ItemSeparatorView}
  //Item Separator View
  renderItem={Item}
  keyExtractor={(item, index) => index.toString()}
  />): <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,opacity:0.5}}>
    <Image source={img} style={Universalstyles.Jobimage}/>
  <Text >Nothing To Display! </Text>
</View>}
    </SafeAreaView>
  )
}

export default Applicant