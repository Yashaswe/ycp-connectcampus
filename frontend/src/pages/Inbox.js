import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import { redirect } from 'react-router-dom';
import Profile from './Profile'

const apiKey = "48kmaj4gqgva";

const user = {
  id: localStorage.getItem("email").replace(/[^a-z0-9@]/g, ''),
  name: localStorage.getItem("name")
}
const userId = user.id; 

const chatClient = StreamChat.getInstance(apiKey);

if (typeof window !== 'undefined') {
  chatClient.connectUser({ id: userId }, chatClient.devToken(userId));
}
const channel = chatClient.channel('messaging', 'gfcch', {
  name: 'Awesome channel about traveling',
  members: [userId]
});
// Here, 'travel' will be the channel ID
await channel.watch();
// if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
//   chatClient.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
// }
const filters = { type: 'messaging', members: {$in: [userId]}  };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1, updated_at: -1 };

const Inbox = () => (
  <Chat client={chatClient}>
    <ChannelList filters={filters} options={options} showChannelSearch sort={sort} />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput focus />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default Inbox;
//     useEffect(async() => {

//         const apiKey = "48kmaj4gqgva";

//         if (!localStorage.getItem("email") || !localStorage.getItem("name")) {
//             console.log(localStorage.getItem("name"));
//             return redirect('/login')
//         }
//         setUser({
//             id: localStorage.getItem("email").replace(/[^a-z0-9@]/g, ''),
//             name: localStorage.getItem("name")
//           })
//           console.log(localStorage.getItem("name"));
        
//         const userId = user.id; 
        
//         setChatClient(StreamChat.getInstance(apiKey));
        
//         if (typeof window !== 'undefined') {
//           chatClient.connectUser({ id: userId }, chatClient.devToken(userId));
//         }
//         const channel = chatClient.channel('messaging', 'gfc', {
//           name: 'Awesome channel about traveling',
//           members: [userId]
//         });
//         // Here, 'travel' will be the channel ID
//         await channel.watch();
//         // if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
//         //   chatClient.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
//         // }
//         setFilters({ type: 'messaging', members: {$in: [userId]} });
//         setOptions({ state: true, presence: true, limit: 10 }) 
//         setSort({ last_message_at: -1, updated_at: -1 });
//     }, []);

//     console.log(localStorage.getItem("name"));
//     return (
//         <Chat client={chatClient}>
//             <ChannelList filters={filters} options={options} showChannelSearch sort={sort} />
//             <Channel>
//             <Window>
//                 <ChannelHeader />
//                 <MessageList />
//                 <MessageInput focus />
//             </Window>
//             <Thread />
//             </Channel>
//         </Chat>
//     )
  
// };

// export default Inbox;