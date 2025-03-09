import { useEffect } from "react";
import { Camera, ScanLine, XCircle } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import useBarcode from "../hooks/useBarcode";

export default function BarcodeExample() {
  const { isScanning, isLoading, scanResult, error, videoRef, startScanning, stopScanning } = useBarcode();

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              color="primary"
              isLoading={isLoading}
              onPress={isScanning ? stopScanning : startScanning}
            >
              {isScanning ? "Stop Scanning" : "Start Scanning"}
            </Button>
            {error && <p className="text-danger">{error}</p>}
            {scanResult && (
              <p className="text-success">
                {scanResult.type}: {scanResult.value}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
