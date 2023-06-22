import { View, Text, Image, useWindowDimensions, ActivityIndicator,TouchableOpacity, FlatList,ScrollView, SafeAreaView, RefreshControl, Alert,Dimensions} from 'react-native'
import Logo from '../../../../assets/bg/Picture3.png'
import Logo1 from '../../../../assets/bg/profile2.png';
import img from '../../../../assets/icon.png'
import React from 'react'
import Universalstyles from '../../../const/Universalstyle'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto'
import Icon4 from 'react-native-vector-icons/Octicons'
import OptionsMenu from "react-native-option-menu";
import UserContext from '../../components/context';
import moment from 'moment'

import { axiosRequest,server } from '../../components/api';



//with mysql database using php for backend


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const Home = ({navigation}) => {
    const {height} = useWindowDimensions();
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = React.useContext(UserContext);

    const [loading, setLoading] = React.useState(true);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

     const [gets,setGet] = React.useState({
      post : []
     })
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
   
    await axiosRequest.get(`auth/web/profile/${user.id}`, {
      headers: {
        'Authorization': `JWT ${user.access}`,
      }
    }).then((response)=>{
      if (user.usertype === "Student") {
        if (response.data[0].userdetails.length == 0) {
          navigation.navigate('User info');
          
        } else if (response.data[0].guardian.length == 0) {
          navigation.navigate('Guardian');
        } else if (response.data[0].educationbg.length == 0) {
          navigation.navigate('Education');
        } else {
          navigation.navigate('/Studentscreen');
        }
      } else if (user.usertype === "Employer") {
        if (response.data[0].userdetails.length === 0 ) {
          navigation.navigate('User info');
        } else {
          navigation.navigate('Employerscreen');
        }
      }
    }).catch(err=>{
      console.log(err)
    })
 
 }
 
 
   )},[])

React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
 await axiosRequest.get(`auth/post/view/${user.id}/`,{
  headers: {
    'Authorization': `JWT ${user.access}`,
  }
}).then((response)=>{
    //  console.log(response.data)
setGet (prevState => ({...prevState, post: response.data}))
setLoading(false);
     
}).catch(() =>{Alert.alert(
  "No Network!", 
  "Check Your connection",
  [
    {
      text: "Exit",
      onPress: () => navigation.navigate(''),
      style: "yes"
    },
  ]
);})



}

  )},[])
  const myIcon = (<Icon2 name='dots-horizontal' size={30} color="black "/>)

  const Header  = ()=>{
    return(
      <View style={[Universalstyles.HomeEmp, {backgroundColor: '#F5E44C', paddingVertical: 5, paddingHorizontal: 10}]}>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Icon
        name="navicon"
        style={{ fontSize: 50,  color: 'black', }} />
        </TouchableOpacity>
      
        <Image source={Logo} style={[Universalstyles.Logo1, {height: height * 0.1,resizeMode:'center'}]} />
      
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Icon
        name="bell"
        style={{ fontSize: 50,  color: 'black', }} />
        </TouchableOpacity>    
      </View>
    )

  }

  const Item = ({item}) =>{
    return(
      <>
       
 {/* {console.log(item)} */}
<View style={[Universalstyles.jobPost,{}]}>
    <View style={Universalstyles.jobContent}>
    {item.profile[0].profile  ? <Image source={{uri : item.profile[0].profile}} style={[Universalstyles.Jobimage,{resizeMode:'cover'}]}/> : <Image source={Logo1} style={Universalstyles.Jobimage}/>}
    <View style={[Universalstyles.jobContent2,{resizeMode:'cover'}]}>
    <View style={{flex: 1,  flexDirection: 'row' ,alignSelf: 'flex-end', left: 5, bottom: 5}}>
    {/* {console.log(item.profile[0].profile)} */}
   <OptionsMenu
  customButton={myIcon}

  options={["Remove", item.status == "open" ? "close" : "open", "Cancel"]}
  actions={[() => Alert.alert(
    "", 
    "Are you sure you want to remove this post?",
    [
      {
        text: "Yes",
        onPress: () => { axiosRequest.delete(`auth/post/${item.id}/${user.id}/`).then((response) => {
          
          Alert.alert("Deleted","Change screen to see the changes made",
          [
      {
        text: "Okay!",
        onPress: () => console.log("NO ACCTION"),
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
  ), () => Alert.alert(
    "", 
    item.status == "open" ? "Disable The post for applicants??" :  "Enable The post for applicants?",
    [
      {
        text: "Yes",
        onPress: () => {axiosRequest.patch(`auth/post/${item.id}/${user.id}/`,JSON.stringify({status: item.status == "open" ?"close":"open"}), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          Alert.alert("Done","Change screen to see the changes made",
          [
      {
        text: "Okay!",
        onPress: () => console.log("NO ACCTION"),
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
  )]}
  /> 
  </View>
    <Text style={{fontSize: 20, borderBottomWidth: 1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon3 name='person' style={{fontSize: 23, color: 'black',}}/><Text style={{color: 'black', }}>  {item.looking_for}</Text></Text>
    
    { item.status == "open" && <Text style={{opacity:.5}}><Icon4 name='dot-fill' style={{fontSize: 20, color: 'green', alignContent: 'center'}}/>  Open</Text> }
    { item.status == "close" && <Text style={{opacity:.5}}><Icon4 name='dot-fill' style={{fontSize: 20, color: 'red', alignContent: 'center'}}/>  Close</Text>}
  
    <Text style={{opacity:.5}}><Icon2 name='account-group' style={{fontSize: 20, color: 'brown', alignContent: 'center'}}/> <Text style={{color: 'black', }}> {item.applies.length} </Text> People applied</Text>
  
<Text style={{opacity: .5 }}><Icon2 name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(item.created_at).startOf('seconds').fromNow()}</Text>

    <TouchableOpacity onPress={()=>{
     setPostID(item.postID)
        navigation.navigate('Manage', { post:item.id})

    }
    }>
    <View style={Universalstyles.jobContent3}>
      
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
          Manage
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
   {/* <ScrollView style={{}}
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
 


  

    </ScrollView> */}

{loading ? ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={100} color = "yellow" />
      </View>) : gets.post != "" ? (<FlatList 
  
  data={gets.post}
  ItemSeparatorComponent={ItemSeparatorView}
  //Item Separator View
  renderItem={Item}
  keyExtractor={(item, index) => index.toString()}
  />):( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',opacity:0.5 }}>
     <Image source={img} style={Universalstyles.Jobimage}/>
      <Text>  No Post To display create One Now!  </Text>
</View>)}
    </SafeAreaView>
  )
}

export default Home