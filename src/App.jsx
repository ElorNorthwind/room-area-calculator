import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BlockList from "./components/BlockList/BlockList";
import DropBackground from "./components/DropBackground/DropBackground";
import FileSelector from "./components/FileSelector/FileSelector";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DropBackground>
          <FileSelector />
          <BlockList />
        </DropBackground>
      </DndProvider>
    </>
  );
}

export default App;
