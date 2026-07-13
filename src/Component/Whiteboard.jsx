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
  const isRemoteUpdate = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!roomId || !ready) return;

    getWhiteboardScene(roomId).then((data) => {
      if (data && excalidrawRef.current) {
        isRemoteUpdate.current = true;
        excalidrawRef.current.updateScene({ elements: data.scene_data });
        isRemoteUpdate.current = false;
      }
    }).catch(() => {});

    const channel = subscribeToWhiteboard(roomId, (data) => {
      if (excalidrawRef.current) {
        isRemoteUpdate.current = true;
        excalidrawRef.current.updateScene({ elements: data.scene_data });
        isRemoteUpdate.current = false;
      }
    });

    return () => channel.unsubscribe();
  }, [roomId, ready]);

  return (
    <div style={{ width: "100dvw", height: "100dvh" }}>
      <Excalidraw
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
          setReady(true);
        }}
        onChange={(elements, appState) => {
          if (!roomId || isRemoteUpdate.current) return;
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
