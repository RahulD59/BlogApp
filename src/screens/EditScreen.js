import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import { TextInput } from 'react-native-gesture-handler';
import BlogPostForm from '../components/BlogPostForm';
import { NavigationActions } from 'react-navigation';
const EditScreen=({navigation})=>{
    const {state, editBlogPost }=useContext(Context);

    const blogPost=state.find((blogPost)=>blogPost.id===navigation.getParam('id'));
    const id= navigation.getParam('id');
  
    return <BlogPostForm
    initialValues={{title: blogPost.title, content: blogPost.content}}
    onSubmit={(title,content)=>{
        editBlogPost(id,title,content,()=>navigation.pop())
    }}
    />
};

const styles=StyleSheet.create({});
export default EditScreen;