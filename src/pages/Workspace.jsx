import CodeEditor from '../Component/CodeEditor'
import AIChat from "../Component/AIChat";
import Whiteboard from '../Component/Whiteboard';
import WorkspaceNavbar from '../Component/WorkspaceNavbar';

export default function Workspace() {
  return (
    <div>
      <WorkspaceNavbar/>
      <Whiteboard />
      <CodeEditor />
      <AIChat />
    </div>
  );
}