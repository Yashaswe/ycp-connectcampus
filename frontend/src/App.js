import React from 'react';
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

const apiKey = "48kmaj4gqgva";

const user = {
  id: 'thuc',
  name: "thuc"
}
const userId = user.id; 

const chatClient = StreamChat.getInstance(apiKey);

if (typeof window !== 'undefined') {
  chatClient.connectUser({ id: userId }, chatClient.devToken(userId));
}
const channel = chatClient.channel('messaging', 'travel', {
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
  
const App = () => (
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

export default App;
