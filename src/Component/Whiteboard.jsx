import { useRef, useEffect, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import {
  getWhiteboardScene,
  saveWhiteboardScene,
  subscribeToWhiteboard,
  broadcastWhiteboard,
} from "../api";

export default function Whiteboard({ roomId }) {
  const excalidrawRef = useRef(null);
  const skipNextChange = useRef(false);
  const [ready, setReady] = useState(false);

  const updateFromRemote = (data) => {
    if (!excalidrawRef.current) return;
    skipNextChange.current = true;
    excalidrawRef.current.updateScene({ elements: data.scene_data });
  };

  useEffect(() => {
    if (!roomId || !ready) return;

    getWhiteboardScene(roomId).then((data) => {
      if (data) updateFromRemote(data);
    }).catch(() => {});

    subscribeToWhiteboard(roomId, (data) => {
      updateFromRemote(data);
    });
  }, [roomId, ready]);

  return (
    <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
      <Excalidraw
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
          setReady(true);
        }}
        onChange={(elements, appState) => {
          if (!roomId) return;
          if (skipNextChange.current) {
            skipNextChange.current = false;
            return;
          }
          clearTimeout(window._wbTimer);
          window._wbTimer = setTimeout(async () => {
            try {
              const saved = await saveWhiteboardScene(roomId, elements);
              await broadcastWhiteboard(roomId, saved);
            } catch (e) {
              console.error(e);
            }
          }, 500);
        }}
      >
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
