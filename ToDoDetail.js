import React, { useState, useContext } from 'react';
import { Form, Item, Text, Button, Input, Box,FormControl, Stack } from 'native-base';
import { TodosContext } from './App'


export default function ToDoDetail({ route, navigation }) {
    const { text } = route.params;
    const [todoText, setTodoText] = useState(text)
    const { state, dispatch } = useContext(TodosContext);
    
    return (
        <FormControl isRequired>
        <Stack mx="4">
          <Input placeholder="Edit Todo"
                    onChangeText={text => setTodoText(text)}
                    value={todoText}
                />
     <Button onPress={() =>{
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