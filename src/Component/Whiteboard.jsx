
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css"; 

export default function Whiteboard() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Excalidraw>
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.SaveToActiveFile />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
        </MainMenu>
    
      </Excalidraw>
    </div>
  );
}

