import { useState, useEffect } from "react";
import useBroadcast from "../hooks/useBroadcast";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";

export function BroadcastExample() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { subscribe, publish, clear } = useBroadcast("broadcast-example");


  // Subscribe to messages when component mounts
  useEffect(() => {
    const unsubscribe = subscribe("new-message", (data) => {
      setReceivedMessages((prev) => [
        ...prev,
        { text: data, timestamp: new Date().toLocaleTimeString() },
      ]);
    });

    return () => {
      unsubscribe();
      clear();
    };
  }, [subscribe, clear]);

  const handleSendMessage = () => {
    if (message.trim()) {
      publish("new-message", message);
      setMessage("");
    }
  };

  const handleClearMessages = () => {
    setReceivedMessages([]);
  };

  
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardBody>
          <h2 className="text-xl font-bold mb-4">
            Cross-Tab Communication Example
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Open this page in multiple tabs to test cross-tab communication.
          </p>

          <div className="flex gap-2">
            <Input
              value={message}
              onValueChange={(value) => setMessage(value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button color="primary" onPress={handleSendMessage}>
              Send
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Received Messages</h3>
            <Button size="sm" variant="light" onClick={handleClearMessages}>
              Clear
            </Button>
          </div>

          <Divider className="my-2" />

          <div className="space-y-2">
            {receivedMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet</p>
            ) : (
              receivedMessages.map((msg, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded">
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500">{msg.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
