import React, { useReducer } from 'react';
import { NativeBaseProvider, Box, Button, VStack , Text, Center } from 'native-base';


const initialState = {
  count: 0
}



export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <NativeBaseProvider>
      <VStack alignItems="center"  mt="10"  space={3} >
          <Box>
          <Text>Count: {state.count}</Text>
          </Box>
     
      <Center>
      <Button onPress={() => dispatch({ type: 'increment' })}>
        <Text>Increment</Text>
      </Button>
      </Center>
      <Button success onPress={() => dispatch({ type: 'decrement' })}>
        <Text>Decrement</Text>
      </Button>
      <Button warning onPress={() => dispatch({ type: 'reset' })}>
        <Text>Reset</Text>
      </Button>
    </VStack>
    </NativeBaseProvider>
  );
}
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    case "reset":
      return initialState
    default:
      return initialState
  }
}