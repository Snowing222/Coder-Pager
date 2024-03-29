import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth} from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';


const apiKey = "djhgdx6kznpw"
const client = StreamChat.getInstance(apiKey)

const cookies = new Cookies()
const authToken = cookies.get('token')

//if authToken exist, connect current user to StreamChat Client with cookie store user information
if(authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, 
  authToken)
}

//if no authToken direct to Auth Page, Otherwise render Logged in user page
const App = () => {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState('')
  const [isEditing, setIsEditing] = useState('')
  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
          <ChannelListContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
          />
          <ChannelContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
          />
      </Chat>  
    </div>
  )
}

export default App

