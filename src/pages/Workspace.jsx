import React from 'react';
import AIChat from "../Component/AIChat";
import Whiteboard from '../Component/Whiteboard';

export default function Workspace() {
  return (
    <div>
      <AIChat />
      <Whiteboard />
    </div>
  );
}