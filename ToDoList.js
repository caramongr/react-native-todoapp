import React, { useContext, useState } from 'react'
import { TodosContext } from './App'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Text, Container, Heading, VStack, Item, Input } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import uuid from 'uuid-random';




export default function ToDoList() {
    // receive state and dispatch from App.js
    const { state, dispatch } = useContext(TodosContext);
    const [todoText, setTodoText] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [editTodo, setEditTodo] = useState(null)
    const buttonTitle = editMode ? "Edit" : "Add";

    const deleteRow = (todo) => {
        dispatch({ type: 'delete', payload: todo });
    };

    const handleSubmit = () => {
        if (editMode) {
            dispatch({ type: 'edit', payload: { ...editTodo, text: todoText } })
            setEditMode(false)
            setEditTodo(null)
        } else {
            const newToDo = { id: uuid(), text: todoText };
            dispatch({ type: 'add', payload: newToDo })
        }
        setTodoText('') // to clear field after adding
    }


    const editRow = (todo, rowMap) => {
        setTodoText(todo.text)
        setEditMode(true)
        setEditTodo(todo)
        if (rowMap[todo.id]) {
            rowMap[todo.id].closeRow();
        }
    };

    const renderItem = data => (
        <View style={styles.rowFront}>
            <Text>{data.item.text}</Text>
        </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity onPress={() => editRow(data.item, rowMap)}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn]}
                onPress={() => deleteRow(data.item)}
            >
                <Text style={{ color: '#FFF' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <VStack space={4}>
            <Heading textAlign="center" mb="10" mt="10">
                <Text>ToDoList</Text></Heading>



            {<Input
                placeholder="Enter Todo"
                onChangeText={text => setTodoText(text)}
                value={todoText}
            />}

            <Button title={ buttonTitle} transparent onPress={handleSubmit} />


            <SwipeListView
                data={state.todos}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </VStack>
    );
}


const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomWidth: 0.25,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        backgroundColor: 'red',
        right: 0
    }
});