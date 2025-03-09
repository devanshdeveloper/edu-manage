/**
 * @typedef {Object} BroadcastHookReturn
 * @property {(eventName: string, callback: (data: any) => void) => () => void} subscribe - Function to subscribe to an event
 * @property {(eventName: string, data: any) => void} publish - Function to emit an event
 * @property {() => void} clear - Function to clear all events in the namespace
 */

import { useCallback, useEffect, useMemo } from 'react';
import BroadcastHelper from '../helpers/BroadcastHelper';

/**
 * A custom hook for cross-tab communication using the Broadcast Channel API
 * @param {string} [namespace='edu-manage'] - Namespace for the broadcast channel
 * @returns {BroadcastHookReturn} Object containing broadcast control functions
 */
export default function useBroadcast(namespace = 'edu-manage') {
  // Create a memoized instance of BroadcastHelper
  const broadcast = useMemo(() => new BroadcastHelper(namespace), [namespace]);

  // Cleanup on unmount
  useEffect(() => {
    return () => broadcast.destroy();
  }, [broadcast]);

  // Subscribe to an event
  const subscribe = useCallback(
    (eventName, callback) => {
      return broadcast.on(eventName, callback);
    },
    [broadcast]
  );

  // Emit an event
  const publish = useCallback(
    (eventName, data) => {
      broadcast.emit(eventName, data);
    },
    [broadcast]
  );

  // Clear all events in the namespace
  const clear = useCallback(() => {
    broadcast.clear();
  }, [broadcast]);

  return {
    subscribe,
    publish,
    clear,
  };
}

/* Usage Example:

import { useBroadcast } from './hooks/useBroadcast';

function TabSyncComponent() {
  const { subscribe, publish, clear } = useBroadcast('my-app');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to messages from other tabs
    const unsubscribe = subscribe('new-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      unsubscribe(); // Cleanup subscription
      clear(); // Clear all events when component unmounts
    };
  }, []);

  const sendMessage = (text) => {
    const message = { text, timestamp: Date.now() };
    publish('new-message', message); // Broadcast message to other tabs
    setMessages(prev => [...prev, message]); // Update local state
  };

  return (
    <div>
      <h2>Cross-Tab Messages</h2>
      <button onClick={() => sendMessage('Hello from this tab!')}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text} - {new Date(msg.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
*/