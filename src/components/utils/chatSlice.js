import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as myConstants from './constants';

const initialState = {

    messages: [
    {
      "text": "Welcome to customer service, how can I help you?",
      "iat": Date.now(),
      "author": "ChatBot"
    }],
    status: 'idle',
    error: null
  }
  export const InsertChatBotMessageThunk = createAsyncThunk(
    'chat/InsertChatBotChatMessage',
     async (userMessage) => {

       //sends form to api
       var dataReturn
       var Message = {} 
       const endpoint = myConstants.config.API_URL + '/generate'
       const options = {
         method: 'POST',
         body: JSON.stringify({ chatMessage: userMessage }),
       }
       await fetch(endpoint, options)  
       .then(function(response) {
           if(response.status === 200)
             return response.json();
             throw new Error('Server is not working OK ' + response.status);
       })  
       .then(data => {
        data =  JSON.parse(data)

        if (!data.error){
          //stores message in chat 
          Message.text = data.result;
          console.log('chat server response: ' + data.result)
        }
        else {
          //something went wrong  
          Message.text = "Chat server error. Please try again later. (" + data.error + ")";
        } 
         //dataReturn will be the payload that will update the state on the extraReducers code snippet
         Message.iat = Date.now();
         Message.author = 'ChatBot';
         dataReturn = Message
       })          
       .catch(error => {
         //just show error to user
         console.log('error con el server : ')
         console.log(error)
         dataReturn = {error: 'Damn! I forgot what I was doing. Could you repeat?'}
        });
        return dataReturn
     }
   )

  const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        InsertUserChatMessage(state, action) {
            var Message = {} 
            //adds current message to chat
            Message.text = action.payload;
            Message.iat = Date.now();
            Message.author = 'Me';
            state.messages.push(Message)
        }
    },
    extraReducers(builder) {
      builder
      //LOGIN USER THUNK
      .addCase(InsertChatBotMessageThunk.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(InsertChatBotMessageThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
      })
      .addCase(InsertChatBotMessageThunk.fulfilled, (state, action) => {
          
          if (action.payload.error) {
            
            //status is not set to fail but rather creates chat message to display error in chat
            state.status = 'succeeded'
            var Message = {}
            Message.iat = Date.now();
            Message.author = 'ChatBot';
            Message.text = action.payload.error
            state.error = action.payload.error
            state.messages.push(Message)
          }
          else {
            state.status = 'succeeded'
            console.log('SUCEEDED chat server response: ')
            console.log(action.payload)
            state.messages.push(action.payload)
          }
      })
    }
})
  
export const {InsertUserChatMessage} = chatSlice.actions
export default chatSlice.reducer
  