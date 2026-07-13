import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import CodeEditor from "../Component/CodeEditor";
import AIChat from "../Component/AIChat";
import Whiteboard from "../Component/Whiteboard";
import WorkspaceNavbar from "../Component/WorkspaceNavbar";
 
export default function Workspace() {
  const { roomId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    } ;
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} >
      <WorkspaceNavbar roomId={roomId} />
      <Whiteboard roomId={roomId} />
      <CodeEditor roomId={roomId} />
      <AIChat roomId={roomId} />
    </div>
  );
}
