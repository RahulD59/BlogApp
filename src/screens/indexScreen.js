import React , {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Button , TouchableOpacity} from 'react-native';
import {Context } from '../context/BlogContext';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const indexScreen=({ navigation })=>{

    
    const {state,  deleteBlogPost, getBlogPost}=useContext(Context); 
    
    useEffect(()=>{
        getBlogPost();

        const listener=navigation.addListener('didFocus',()=>{
            getBlogPost();
        });

        return ()=>{
            listener.remove();
        }
    },[]);

    return(
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost)=>blogPost.title}
                renderItem={({ item })=>{
                    return(
                    <TouchableOpacity onPress={()=>navigation.navigate('Show', {id: item.id})}>
                        <View style={styles.row}>
                        <Text style={styles.title}>{item.title}-{item.id}</Text>
                        <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
                        <Feather
                            style={styles.icon}
                            name="trash-2"/>

                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    
                    )
                }}
            />
        </View>
    );
};

indexScreen.navigationOptions= ({ navigation })=>{
    return {
        headerRight: <TouchableOpacity onPress={()=>navigation.navigate('Create')}> 
            <Feather name="plus" size={30}/>
        </TouchableOpacity>
    };
}


const styles=StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth:1,
        paddingHorizontal:10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title:{
        fontSize: 18,
       // marginVertical:5
    },
    icon:{
        fontSize:24,
       // marginVertical:5
    },
    button:{
        marginVertical: 5
    }

});

export default indexScreen;