import React, { useRef } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Camera } from "lucide-react";

export function AvatarInput({
  value,
  preview = "",
  onChange,
  size = "w-24 h-24",
  ...props
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar
        src={value || preview}
        className={size}
        isBordered
        color="primary"
        {...props}
      />
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        className="absolute bottom-0 right-0 rounded-full bg-background"
        onPress={handleClick}
      >
        <Camera className="w-4 h-4" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}