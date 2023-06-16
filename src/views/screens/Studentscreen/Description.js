import React, {useState} from 'react';
import { View, useWindowDimensions, Dimensions, Text, SafeAreaView, ScrollView, Image,Alert, TouchableOpacity} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Logo from '../../../../assets/bg/bgimage5.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Universalstyles from '../../../const/Universalstyle';
import Logo1 from '../../../../assets/bg/profile2.png';
import HTMLView from 'react-native-htmlview';
import { axiosRequest,server} from '../../components/api';
import UserContext from '../../components/context';





//with mysql database using php for backend
const FirstRoute = ({navigation, arr,bookmark,Remove,save,apply,applied}) => (
    <ScrollView style={{}}>
   { arr.map((post,index)=>(<View key={index}>
   <View style={{borderWidth: 2, borderColor: '#e8e8e8', margin: 5, borderRadius: 10, padding: 5}}>
      <Text style={Universalstyles.text2}><Icon4 name='person' style={{fontSize: 30, color: 'grey', }}/> {post.looking_for}</Text>
      {post.company != "" && <Text style={Universalstyles.text}><Icon name='warehouse' style={{fontSize: 20, color: 'blue',}}/> {post.company[0].comp_name}</Text>}
      <Text style={Universalstyles.text}><Icon name='account' style={{fontSize: 20, color: 'blue', }}/> {post.profile[0].last_name}, {post.profile[0].first_name} {post.profile[0].midname} {post.profile[0].suff_name}</Text>
      <Text style={Universalstyles.text}><Icon name='map-marker' style={{fontSize: 20, color: 'blue', }}/> {post.street}, {post.city}, {post.province}, {post.zipcode}</Text>
      <Text style={Universalstyles.text}><Icon name='currency-php' style={{fontSize: 20, color: 'blue', }}/> {post.salary} {post.rate} </Text>
      
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={Universalstyles.text}><Icon name='calendar-month' style={{fontSize: 20, color: 'green', marginRight: 10}}/> Hiring start in: </Text>
      <Text style={{ paddingHorizontal: 80, paddingBottom: 5, fontSize: 15,opacity:.5}}><Icon name='calendar-month' style={{fontSize: 20, color: 'red', marginRight: 10}}/> Hiring end on: </Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'flex-start'}}>
      <Text style={{ paddingHorizontal: 25,  fontSize: 15, opacity:.5, color: "blue"}}> {post.start_date}</Text>
      <Text style={{ paddingHorizontal: 105,  fontSize: 15, opacity:.5, color: "red"}}>{post.end_date}</Text>
      </View>
      <Text style={Universalstyles.text}></Text>
     </View>

    
     <View style={{height: 'auto', borderWidth: 2, borderColor: '#e8e8e8', borderRadius: 10, margin: 5}}>
   
   <View style={{padding: 10, margin: 10, borderBottomWidth: 1, borderColor: '#cbc8ce'}}>
    <Text style={{fontSize:20, textAlign: 'center', fontWeight: '500'}}>Job Description</Text>
    </View>
    <View style={{paddingHorizontal: 50,paddingVertical:20}}>
       
    <HTMLView
    
    value = {post.job_desc}
  />
    </View>
    </View>
    <View style={{marginTop: 15, marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
   { post.bookmark[0] ? <TouchableOpacity  onPress={()=>{
     axiosRequest.delete('auth/student/bookmark/'+ post.bookmark[0].id) 
     .then((response) => {
      Alert.alert(
        "Post Unsave", 
        "Check Your Bookmark ",
        [
          {
            text: "Yes",
            onPress: () => {navigation.navigate('Bookmarks')},
            style: "yes"
          },
          { 
            text: "Home", onPress: () => navigation.navigate('Home')
          }
        ]
      )

      })
   }}>
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
      <Text style={{color: 'black', fontWeight: '400', fontSize: 18}}>unsaved</Text>
    </View>
    </TouchableOpacity> : <TouchableOpacity  onPress={bookmark}>
    <View style={{borderColor: 'orange',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,}}>
      <Text style={{color: 'black', fontWeight: '400', fontSize: 18}}>save</Text>
      </View>
    </TouchableOpacity>}
    
   
    {applied ? <TouchableOpacity onPress={() =>   Alert.alert(
         "Abort", 
         "Do you want to Abort the Application for " + post.looking_for,
          [
            {
              text: "Yes",
              onPress: () => {axiosRequest.delete(`auth/abort/${applied.id}`)
              .then((response) => {
               Alert.alert("Application Aborted","You Have Aborted The Application!",
                [
            {
              text: "Okay!",
              onPress: () => navigation.navigate("Home"),
              style: "yes"
            }
          ]
               )
                  
              })},
              style: "yes"
            },
            { 
              text: "Home", onPress: () => navigation.navigate('Home')
            }
          ]
        )
          }  >
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
      <Text style={{color: 'black', fontWeight: 'light', fontSize: 18}}>Abort</Text>
      </View>
    </TouchableOpacity> : <TouchableOpacity  onPress={() =>   Alert.alert(
         "Apply", 
         "Do you want to Apply for " + post.looking_for,
          [
            {
              text: "Yes",
              onPress: () => {navigation.navigate('Apply',{postID:post.id})},
              style: "yes"
            },
            { 
              text: "Home", onPress: () => navigation.navigate('Home')
            }
          ]
        )
          }>
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
      <Text style={{color: 'black', fontWeight: 'light', fontSize: 18}}>Apply</Text>
      </View>
    </TouchableOpacity> } 
    
    </View>
    </View>))}
   </ScrollView>
 );


const SecondRoute = ({arr}) => (
 
<ScrollView style={{}}>
  <View >
    <View style={{borderWidth: 2, borderColor: '#e8e8e8', margin: 5, borderRadius: 10, }}>
    <View style={{borderBottomWidth: 2, borderColor: '#e8e8e8', backgroundColor: '#e5e6e6', borderTopEndRadius: 10, borderTopStartRadius: 10}}>
    <View style={{
      backgroundColor: '#F5E44C',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 0,
      borderRadius: 67.5, 
      width: 135, 
      height: 135, 
      alignSelf: 'center',
      }}>
        
   {arr.profile[0].profile ? <Image source={{uri:arr.profile[0].profile}} style={{
     marginTop: 2.5,
     borderRadius: 65, 
     width: 130, 
     height: 130, 
     resizeMode: 'contain',
     alignSelf: 'center',
    }}/>: <Image source={Logo1} style={{
     marginTop: 2.5,
     borderRadius: 65, 
     width: 130, 
     height: 130, 
     resizeMode: 'contain',
     alignSelf: 'center',
    }}/>}
    </View>
    </View>
     <Text style= {{
            color: '#2f2f2f', 
            paddingVertical: 10, 
            paddingHorizontal: 5,  
            fontSize: 20, 
            fontWeight: '500',
          }}>
            Employer information
        </Text>
      <Text style={Universalstyles.text}><Icon name='account-outline' style={{fontSize: 20, color: 'blue', }}/> {arr.profile[0].last_name}, {arr.profile[0].first_name} {arr.profile[0].mid_name} {arr.profile[0].suff_name}</Text>
      <Text style={Universalstyles.text}><Icon name='map-marker' style={{fontSize: 20, color: 'blue', }}/> {arr.address[0].street}, {arr.address[0].city}, {arr.address[0].province}, {arr.address[0].zipcode}</Text>
      
      {arr.company.comp_name && <Text style={Universalstyles.text}><Icon name='warehouse' style={{fontSize: 25, color: 'blue',}}/> {arr.company.comp_name} </Text>}
      {arr.company.establish_date &&<Text style={Universalstyles.text}><Icon name='medal-outline' style={{fontSize: 20, color: 'blue', }}/>  Since {arr.company.establish_date} </Text>}
      
     </View>

    
     {arr.company != "" && <View style={{height: 'auto', borderWidth: 2, borderColor: '#e8e8e8', borderRadius: 10, margin: 5}}>
   <View style={{padding: 10, margin: 10, borderBottomWidth: 1, borderColor: '#cbc8ce'}}>
    <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '500'}}>Company Description</Text>
    </View>
    <View style={{padding: 5, paddingBottom: 10, margin: 3, fontSize: 20, alignSelf: 'center', fontWeight: '500',height:'auto'}}>
    {/* <Text style={{paddingBottom: 10, margin: 3, fontSize: 20, alignSelf: 'center', fontWeight: '500'}}>
      {label.compdesc}
    </Text> */}
    <HTMLView
    value = {arr.company[0].comp_desc}
    />
    </View>
    </View>}
    </View>

  </ScrollView>
);


  const renderTabBar = props => (
    <TabBar
        {...props}
        activeColor={'black'}
        inactiveColor={'black'}
        style={{marginTop:0,backgroundColor:'white', textTransform: 'lowercase'}}
        indicatorStyle={{ backgroundColor: 'blue' }}
        getLabelText={({ route }) => route.title}
    />
);




export default function Description({navigation,route}) {
 const [gets,setGet] = React.useState({
      post : []
     })
     
     const [save,setSave] = React.useState()
     const [apply,setApply] = React.useState()
     const { user } = React.useContext(UserContext);
     const[applied,setApplied] = React.useState([])
     const { post } = route.params
     

    
var Data ={
      post : post.id,
      user: user.id
      };

      var headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
    
    // const [myimg,setMyimg] = React.useState()


    // const Chimg = async() =>{
    //   let File = await DocumentPicker.getDocumentAsync({
    //     type: 'image/*'
    //   })
    //   if(File.type === 'cancel'){
    //     console.log("cancel")
    //   }else{
    //   setMyimg(()=> File.uri);
    //   console.log(File.uri)
    //   }


    // }
    
 const Bookmark = () => {
 axiosRequest.post('auth/student/bookmark', JSON.stringify(Data), headers) 
      .then((response) => {
        //  console.log(response.data)
         setSave(current => !current)
        Alert.alert(
          "Post Save", 
          "Check Your Bookmark ",
          [
            {
              text: "Yes",
              onPress: () => {navigation.navigate('Bookmarks')},
              style: "yes"
            },
            { 
              text: "Home", onPress: () => navigation.navigate('Home')
            }
          ]
        )
         
      })


 }
 
 const Remove = () => {
  
  ()=>{
   
   }
 }
 
 
React.useEffect(()=>{

navigation.setOptions({
   title: post.looking_for,
   headerTitleAlign: 'center',
   headerStyle: { backgroundColor: 'white', height: 100, },
   headerTitleStyle: { fontWeight: '100', fontSize: 25, }
  })
 
 
 
 
 navigation.addListener('focus',async () => {
  
  axiosRequest.get('auth/student/post/description/'+ post.id).then((response)=>{
    setGet((prev) => ({...prev,post:response.data}))     
    axiosRequest.get('auth/apply/create/'+user.id+'/'+post.id).then((res)=>{
      setApplied(res.data)
      // console.log(res.data)
     
    }) .catch((err)=>{
      setApplied(null)
    })
     })
      
}


  )

},[])

 
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
    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <FirstRoute applied = {applied} bookmark = {Bookmark} Remove = {Remove} save = {save} navigation={navigation} arr = {gets.post} apply = {apply}/>;
          case 'second':
            return <SecondRoute arr={post} />;
          default:
            return null;
        }
      };
  const layout = useWindowDimensions();
  const {height, width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Job overview' },
    { key: 'second', title: 'Employer overview' },
  ]
  );

  return (
    <SafeAreaView style={{flex: 1}}>
        
   {    post.image ? <Image  
    source= {{uri: post.image}}
    style={[{  
     width: 'auto',
     height: 100,
     resizeMode: 'cover', height: height * 0.20, 
     }]} 
     /> :  <Image 
     source= {Logo}
      style={[{  
       width: 'auto',
       height: 100,
       resizeMode: 'cover', height: height * 0.20, 
       }]} 
       /> }

    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    renderTabBar={renderTabBar}
    onIndexChange={setIndex}
    initialLayout={{ width: Dimensions.get('window').width }}
    />
</SafeAreaView>
  );
}