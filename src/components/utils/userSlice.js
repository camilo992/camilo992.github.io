import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as myConstants from './constants';
import * as MySession from './mysession';

const initialState = {
    user: false,
    status: 'idle',
    error: null
  }
  export const LoginUserThunkFromTokenGoogle = createAsyncThunk(
    'user/LoginUserThunkFromTokenGoogle',
     async (token) => {

       //sends form to api
       var dataReturn
       const endpoint = myConstants.config.API_URL + '/checktokengoogle'
       const options = {
         method: 'POST',
         body: JSON.stringify(token),
       }
       await fetch(endpoint, options)  
       .then(function(response) {
           if(response.status === 200)
             return response.json();
             throw new Error('Server is not working OK ' + response.status);
       })  
       .then(data => {
        data = JSON.parse(data)
        if (!data.error){
          //stores token
          console.log('token validated and **VALID**!. logging user using LoginUser..')
          MySession.StoreToken(data)
        }
        else {
          //token validated, token invalid  
          console.log('token validated but  **INVALID**!. deleting token')
          MySession.DeleteToken()
        } 
         //dataReturn will be the payload that will update the state on the extraReducers code snippet
         dataReturn = data
       })          
       .catch(error => {
         //just show error to user
         dataReturn = {error: 'Server is down:' + error}
        });
        return dataReturn
     }
   )
   
   export const LoginUserThunkFromToken = createAsyncThunk(
    'user/LoginUserThunkFromToken',
     async (token) => {
       //sends form to api
       var dataReturn
       const endpoint = myConstants.config.API_URL + '/checktoken'
       const options = {
         method: 'POST',
         body: JSON.stringify(token),
       }
       await fetch(endpoint, options)  
       .then(function(response) {
           if(response.status === 200)
             return response.json();
             throw new Error('Server is not working OK ' + response.status);
       })  
       .then(data => {
        data = JSON.parse(data)
        if (!data.error){
          //stores token
          MySession.StoreToken(data)
        }
        else {
          //token validated, token invalid  
          MySession.DeleteToken()
        } 
         //dataReturn will be the payload that will update the state on the extraReducers code snippet
         dataReturn = data
       })          
       .catch(error => {
         //just show error to user
         dataReturn = {error: 'Server is down:' + error}
        });
        return dataReturn
     }
   )
 
  export const LoginUserThunk = createAsyncThunk(
   'user/LoginUserThunk',
    async (JSONdata) => {
      //sends form to api
      var dataReturn
      const endpoint = myConstants.config.API_URL + '/loginuser'
      const options = {
        method: 'POST',
        body: JSONdata,
      }
      await fetch(endpoint, options)  
      .then(response => {
          if(response.status === 200)
            return response.json();
            throw new Error('Server is not working OK ' + response.status);
      })  
      .then(data => {
        //verifies operation result
        data = JSON.parse(data)
        if (!data.error){
          //stores token
          console.log('login OK, storing token')
          MySession.StoreToken(data)
        }
        //dataReturn will be the payload that will update the state on the extraReducers code snippet
        dataReturn = data
      })          
      .catch(error=> {
        //just show error to user
        dataReturn = {error: 'Server is down:' + error}
       });
       return dataReturn
    }
  )

  export const MakeDepositThunk = createAsyncThunk(
    'user/MakeDepositThunk',
     async (JSONdata) => {
       //sends form to api
       var dataReturn
       const endpoint = myConstants.config.API_URL + '/adddeposit'
       const options = {
         method: 'POST',
         body: JSON.stringify(JSONdata),
       }
       await fetch(endpoint, options)  
       .then(response => {
           if(response.status === 200)
             return response.json();
             throw new Error('Server is not working OK ' + response.status);
       })  
       .then(data => {
         //verifies operation result
         data = JSON.parse(data)
         console.log('data from deposit server')
         console.log(data)
         if (!data.error){
          //updates current token in storage
          console.log('deposit OK, storing token')
          MySession.StoreToken(data)
         }
         else {
          if (data.error === "invalid or expired token!") {
            MySession.DeleteToken()
          }
        }
         //dataReturn will be the payload that will update the state on the extraReducers code snippet
         dataReturn = data
       })          
       .catch(error=> {
         //just show error to user
         dataReturn = {error: 'Server is down:' + error}
        });
        return dataReturn
     }
   )
 
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LogoutUser(state) { 
            console.log('logig out user')
            state.token = null
            state.user = false
        }
    },
        extraReducers(builder) {
      builder
      //LOGIN USER THUNK
      .addCase(LoginUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(LoginUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(LoginUserThunk.fulfilled, (state, action) => {
          
          if (action.payload.error) {
            state.status = 'failed'
            state.token = null
            state.user = false
            state.error = action.payload.error
          }
          else {
            state.status = 'succeeded'
            state.token = action.payload
            state.user = JSON.parse(window.atob(action.payload.split('.')[1]))
          }
        })
        //LOGIN USER FROM TOKEN
      .addCase(LoginUserThunkFromToken.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(LoginUserThunkFromToken.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(LoginUserThunkFromToken.fulfilled, (state, action) => {
          if (action.payload.error) {
            state.status = 'failed'
            state.token = null
            state.user = false
            state.error = action.payload.error
          }
          else {
            state.status = 'succeeded'
            state.token = action.payload

            state.user = JSON.parse(window.atob(action.payload.split('.')[1]))
          }
      })
      //LOGIN USER FEOM GOOGLE
      .addCase(LoginUserThunkFromTokenGoogle.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(LoginUserThunkFromTokenGoogle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(LoginUserThunkFromTokenGoogle.fulfilled, (state, action) => {
          console.log('action.payload:' + action.payload)
          console.log('action.payload.error:' + action.payload.error)
          if (action.payload.error) {
            state.status = 'failed'
            state.token = null
            state.user = false
            state.error = action.payload.error
          }
          else {
            state.status = 'succeeded'
            state.token = action.payload

            state.user = JSON.parse(window.atob(action.payload.split('.')[1]))
          }
        })        
        //MAKE DEPOSIT
      .addCase(MakeDepositThunk.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(MakeDepositThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(MakeDepositThunk.fulfilled, (state, action) => {
          console.log('***SUCCEEDED!!!')
          console.log('action.payload:' + action.payload)
          console.log('action.payload.error:' + action.payload.error)
          if (action.payload.error) {
            state.status = 'failed'
            state.error = action.payload.error
            //if token invalid or expired, delete token and user to force new login
            if (action.payload.error==='invalid or expired token!') {
              state.token = null
              state.user = false
            }
          }
          else {
            state.status = 'succeeded'
            state.token = action.payload
            state.user = JSON.parse(window.atob(action.payload.split('.')[1]))
          }
        })
        }
  })
  
  export const {LogoutUser} = userSlice.actions
  export default userSlice.reducer
  