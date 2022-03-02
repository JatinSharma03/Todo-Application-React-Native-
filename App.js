import React,{useState, useRef} from 'react';
import { KeyboardAvoidingView,StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Dimensions,ImageBackground  } from 'react-native';
import Tasks from './comonent/Tasks';

export default function App() {

  const [task,setTask] = useState();
  const [editIndex,setEditIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [taskkItems,setTaskItems] = useState([]);
  const [high, setHigh] = useState(Dimensions.get('window').height-270)

  const handleTask = ()=>{
    if(!isEdit && task && task.length > 0){
      setTaskItems([...taskkItems,task])
      Keyboard.dismiss();
    }
    if(isEdit){
      taskkItems.splice(editIndex,1,task);
      Keyboard.dismiss();
      setIsEdit(false);
    }
    setEditIndex(null);
    setTask(null);
  }

  const completeTask = (index)=>{
    const copyItems = [...taskkItems];
    copyItems.splice(index,1);
    setTaskItems(copyItems);
  }

  const editTask = (index)=>{
    inputRef.current.focus();
    Keyboard
    const editItem = taskkItems[index];
    setTask(editItem);
    setEditIndex(index);
    setIsEdit(true);
  }

  const image = {uri: "https://img.freepik.com/free-vector/dark-low-poly-background_1048-7971.jpg?size=626&ext=jpg"};

  const inputRef = useRef();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={image}
        resizeMode="cover"
        style={{width:"100%",height:"100%"}}
      >


      <View style={styles.taskWrapper}>
        <Text style={styles.title}>Jin Tasks</Text>
        <View style={{marginTop:30,height:high}}>
        <ScrollView>
          {
            taskkItems.map((item,index)=>(
                <Tasks item={item} key={index} index={index} completeTask={completeTask} editTask={editTask}/>
            ))
          }
        </ScrollView>
        </View>
        
      </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding":"height"}
          style={styles.writeBox}
          >
          <TextInput placeholder={"Insert Task"} ref={inputRef} placeholderTextColor="gray" style={styles.input}  onChangeText={text=>setTask(text)} value={task}/>
          <TouchableOpacity onPress={()=>handleTask()}>
            <View style={styles.addTask}>
              <Text style={styles.addButton}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
          </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color:"#fff",
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  title:{
    color:"#fff",
    fontSize:25,
    fontWeight:"bold",
    fontFamily:"Roboto",
  },
  // items:{
  //   marginTop:30,
  //   // overflow:"scroll",
  //   height:400,
  // },
  writeBox:{
    position:"absolute",
    bottom:60,
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  input:{
    backgroundColor:"rgba(90,90,90,.5)",
    color:"#fff",
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    borderRadius:20,
    borderWidth:1,
    borderColor:"#fff",
    fontSize:16,
  },
  addTask:{
    width:60,
    height:60,
    borderRadius:60,
    borderWidth:1,
    borderColor:"#fff",
    backgroundColor:"rgb(80,80,80)",
  },
  addButton:{
    fontSize:40,
    position:"absolute",
    top:-4,
    left:16,
  },
});
