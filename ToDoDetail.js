import React, { useState, useContext } from 'react';
import { Form, Item, Text, Button, Input, Box,FormControl, Stack } from 'native-base';
import { TodosContext } from './App'
import axios from 'axios';

export default function ToDoDetail({ route, navigation }) {
    const { text } = route.params;
    const [todoText, setTodoText] = useState(text)
    const { state, dispatch } = useContext(TodosContext);
    

    const endpoint = "http://192.168.1.15:3000/todos/"

    return (
        <FormControl isRequired>
        <Stack mx="4">
          <Input placeholder="Edit Todo"
                    onChangeText={text => setTodoText(text)}
                    value={todoText}
                />
   <Button onPress={async () =>{
     await axios.patch(endpoint+ route.params.id,{text:todoText})
dispatch({
type: 'edit', payload:{...route.params,text:todoText}
});
navigation.navigate('ToDoList');
}}>
<Text>Edit</Text>
</Button>
        </Stack>
      </FormControl>


        // <Form>
        //     <Item regular>
        //         <Input placeholder="Edit Todo"
        //             onChangeText={text => setTodoText(text)}
        //             value={todoText}
        //         />
        //     </Item>
        //     <Button onPress={() => {
        //         dispatch({
        //             type: 'edit', payload: { ...route.params, text: todoText }
        //         });
        //         navigation.navigate('ToDoList');
        //     }}>
        //         <Text>Edit</Text>
        //     </Button>
        // </Form>
    );
}