import CodeEditor from '../Component/CodeEditor'
import AIChat from "../Component/AIChat";
import Whiteboard from '../Component/Whiteboard';

export default function Workspace() {
  return (
    <div>
      <AIChat />
      <Whiteboard />
      <CodeEditor />
    </div>
  );
}