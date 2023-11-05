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


const Inbox = () => {
   
    const [filters, setFilters] = useState(null)
    const [options, setOptions] = useState(null)
    const [sort, setSort] = useState(null)
    const [chatClient, setChatClient] = useState(null)

    useEffect(async() => {

        const apiKey = "48kmaj4gqgva";

        if (!localStorage.getItem("email") || !localStorage.getItem("name")) {
            throw new Error("asdasd");
        }
        
        const user = {
          id: localStorage.getItem("email").replace(/[^a-z0-9@]/g, ''),
          name: localStorage.getItem("name")
        }
        const userId = user.id; 
        
        setChatClient(StreamChat.getInstance(apiKey));
        
        if (typeof window !== 'undefined') {
          chatClient.connectUser({ id: userId }, chatClient.devToken(userId));
        }
        const channel = chatClient.channel('messaging', 'gfc', {
          name: 'Awesome channel about traveling',
          members: [userId]
        });
        // Here, 'travel' will be the channel ID
        await channel.watch();
        // if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
        //   chatClient.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
        // }
        setFilters({ type: 'messaging', members: {$in: [userId]} });
        setOptions({ state: true, presence: true, limit: 10 }) 
        setSort({ last_message_at: -1, updated_at: -1 });
    }, []);

    console.log(localStorage.getItem("name"));
    return (
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
    )
  
};

export default Inbox;