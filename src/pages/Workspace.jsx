import { useParams } from "react-router-dom";
import CodeEditor from "../Component/CodeEditor";
import AIChat from "../Component/AIChat";
import Whiteboard from "../Component/Whiteboard";
import WorkspaceNavbar from "../Component/WorkspaceNavbar";
export default function Workspace() {
  const { roomId } = useParams();

  return (
    <div>
      <WorkspaceNavbar />
      <Whiteboard roomId={roomId} />
      <CodeEditor roomId={roomId} />
      <AIChat roomId={roomId} />
    </div>
  );
}
