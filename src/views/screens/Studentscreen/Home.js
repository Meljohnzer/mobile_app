import { SafeAreaView, ScrollView, StyleSheet, Pressable,  ActivityIndicator,Text, View, Dimensions,FlatList, useWindowDimensions, TouchableOpacity, Keyboard, Alert,Image, RefreshControl} from 'react-native'
import React, { useState } from 'react';
import img from '../../../../assets/icon.png'
import Logo from '../../../../assets/bg/Picture2.png';
import Logo1 from '../../../../assets/bg/profile2.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Searchbar from '../../components/Searchbar';
import OptionsMenu from "react-native-option-menu";
import Universalstyles from "../../../const/Universalstyle";
import { axiosRequest,server} from '../../components/api';
import moment from 'moment'

import UserContext from '../../components/context';
//with mysql database using php for backend

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = ({navigation}) => {

  const [gets,setGet] = React.useState({
    post : []
   })
   const [search,setSearch] = React.useState({
    post : []
   })

   const { user } = React.useContext(UserContext);

   const [loading, setLoading] = React.useState(true);

const [id,setId] = React.useState()



  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const {width} = useWindowDimensions();
  const [value,setValue] = useState();
  function updateSearch(text){
      setValue(text)
    axiosRequest.post('/api/search.php',JSON.stringify({search:text})).then((response)=>{
    //  console.log(response.data)
      setSearch (prevState => ({...prevState, post: response.data}))
           
      })
  }

  
 
  React.useEffect(()=>{
    navigation.addListener('focus',async () => {
     
      await axiosRequest.get(`auth/web/profile/${user.id}`, {
        headers: {
          'Authorization': `JWT ${user.access}`,
        }
      }).then((response)=>{
        // console.log(response.data)
        if (user.usertype === "Student") {
          if (response.data[0].userdetails.length == 0) {
            navigation.navigate('User info');
            
          } else if (response.data[0].guardian.length == 0) {
            navigation.navigate('Guardian');
          } else if (response.data[0].educationbg.length == 0) {
            navigation.navigate('Education');
          } else {
            navigation.navigate('Studentscreen');
          }
        } else if (user.usertype === "Employer") {
          if (response.data[0].userdetails.length === 0 ) {
            navigation.navigate('User info');
          } else {
            navigation.navigate('Employerscreen');
          }
        }
      }).catch(err=>{
        // console.log(err)
      })
   
   }
   
   
     )
     },[])


  

const [postID,setPostID] = React.useState()


React.useEffect(()=>{
 navigation.addListener('focus',async () => {
  
 await axiosRequest.get('auth/post/view/home',{
  headers: {
    'Authorization': `JWT ${user.access}`,
  }
}).then((response)=>{
    
setGet (prevState => ({...prevState, post: response.data}))
setLoading(false);
     
})

}


  )

},[])

  const myIcon = (<Icon name='dots-horizontal' size={30} color="black "/>)
const report = () => Alert.alert(
    "", 
    "Are you sure you want to report this post?",
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
  
  const Header = ()=>{

    return (
    <View style={{padding: 10, flexDirection: 'row', backgroundColor: '#F5E44C' }}>

  
    <Image source={Logo} style={{
      width: 45,
      height: 40,
      resizeMode: 'center',
      marginRight: 7
    }} />
  

  <Searchbar 
    IconName='search-web'
    placeholder='Search job'
    onChange = {text => updateSearch(text)}
    updateSearch={updateSearch}
    />

  <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
    <Icon
      name="bell"
      style={{ fontSize: 40, marginLeft: 5, color: 'black', }} />
  </TouchableOpacity>
</View>
    )
  }
  
  const Item = ({item})=>{
    return (
      <>
      {value ? 
      <View  style={[Universalstyles.jobPost,{}]}>
        
          <View style={Universalstyles.jobContent}>
            
          {item.profile[0].profile ? <Image source={{uri:item.profile[0].profile}} style={Universalstyles.Jobimage}/>
           : <Image source={Logo1} style={Universalstyles.Jobimage}/>} 
          
      
          <View style={Universalstyles.jobContent2}>
          <View style={{flex: 1,  flexDirection: 'row' ,alignSelf: 'flex-end', left: 5, bottom: 5}}>
          <OptionsMenu
          key={item.postID}
        customButton={myIcon}
        options={["Report", "Cancel"]}
        actions={[report]}
        
       // onPress = {()=>setId(()=>{item.postID})}
        
        
      
        />
      
          </View>
          <Text style={{fontSize: 20, borderBottomWidth: 1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon2 name='person' style={{fontSize: 23, color: 'grey',}}/>  {item.lookingfor}</Text>
          {item.company  && <Text style={{opacity: .5}}><Icon name='warehouse' style={{fontSize: 20, color: 'blue',}}/> {item.company[0].comp_name}</Text>}
          <Text style={{opacity: .5 }}><Icon name='map-marker' style={{fontSize: 20, color: 'blue', }}/> {item.address.street}, {item.address.city}, {item.address.province}, {item.address.zipcode}</Text>
          <Text style={{opacity: .5 }}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'blue', }}/> {item.jobtype}</Text>   
          <Text style={{opacity: .5 }}><Icon name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(item.created_at).add(8,'hour').startOf('seconds').fromNow()}</Text>
      
          
         {item.status == 'open' &&  <TouchableOpacity onPress={()=>{
           setPostID(item.postID)
              navigation.navigate('Job description', { itemId : item.postID, title : item.lookingfor})
          }
          }>
            <View style={[Universalstyles.jobContent3, {}]}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
                VIEW
            </Text>
            </View>
            </TouchableOpacity>}
            {item.status == 'close' &&  <TouchableOpacity disabled = {true} onPress={()=>{
           setPostID(item.postID)
              navigation.navigate('Job description', { itemId : item.postID, title : item.lookingfor})
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
        
          </View>
          
          : 
      <View style={[Universalstyles.jobPost,{}]}>
        
          <View style={Universalstyles.jobContent}>
            
          {item.profile[0].profile ? <Image source={{uri:item.profile[0].profile}} style={Universalstyles.Jobimage}/>
           : <Image source={Logo1} style={Universalstyles.Jobimage}/>} 
          {/* {console.log("177"+item.profile[0].profile)} */}
      
          <View style={Universalstyles.jobContent2}>
          <View style={{flex: 1,  flexDirection: 'row' ,alignSelf: 'flex-end', left: 5, bottom: 5}}>
          <OptionsMenu
          key={item.id}
        customButton={myIcon}
        options={["Report", "Cancel"]}
        actions={[report]}
        
       // onPress = {()=>setId(()=>{item.postID})}
        
        
      
        />
      
          </View>
          <Text style={{fontSize: 20, borderBottomWidth: 1, marginBottom: 5, borderColor: '#cbc8ce'}}><Icon2 name='person' style={{fontSize: 23, color: 'grey',}}/>  {item.looking_for}</Text>
          {item.company != "" && <Text style={{opacity: .5}}><Icon name='warehouse' style={{fontSize: 20, color: 'blue',}}/> {item.company[0].comp_name}</Text>}
          <Text style={{opacity: .5 }}><Icon name='map-marker' style={{fontSize: 20, color: 'blue', }}/> {item.street}, {item.city}, {item.province}, {item.zipcode}</Text>
          <Text style={{opacity: .5 }}><Icon name='briefcase-outline' style={{fontSize: 20, color: 'blue', }}/> {item.job_type}</Text>   
          <Text style={{opacity: .5 }}><Icon name='clock-outline' style={{fontSize: 20, color: 'black', }}/> {moment(item.created_at).startOf('seconds').fromNow()}</Text>
          <Text style={{opacity:.5}}> <Icon2 name='person' style={{fontSize:15, color: 'brown', alignContent: 'center'}}/> <Text style={{color: 'black', }}> {item.applies.length} </Text> People applied</Text>
        
      
          
         {item.status == 'open' &&  <TouchableOpacity onPress={()=>{
           setPostID(item.postID)
              navigation.navigate('Job description', { post:item})
          }
          }>
            <View style={[Universalstyles.jobContent3, {}]}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>
                VIEW
            </Text>
            </View>
            </TouchableOpacity>}
            {item.status == 'close' &&  <TouchableOpacity disabled = {true} onPress={()=>{
           setPostID(item.postID)
              navigation.navigate('Job description', { itemId : item.postID, title : item.lookingfor})
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
        
          </View>
          
          }
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

<SafeAreaView style={{flex: 1}}>
<Header/>
{/* <ScrollView
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
     
 
  </ScrollView> */}
  {loading ? ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={100} color = "yellow" />
      </View>):gets.post != "" ? (<FlatList 
  
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
  
  
  );

}

export default Home
