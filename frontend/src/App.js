import "./App.css";
import { Button } from "antd";
import { DatePicker } from "antd";
import {Layout} from "antd";
import NewHelp from "./pages/newHelp";

const {Header, Footer, Sider, Content} = Layout

function App() {
  return (
    <div className="App">
        <NewHelp />
    </div>
  );
}

export default App;
