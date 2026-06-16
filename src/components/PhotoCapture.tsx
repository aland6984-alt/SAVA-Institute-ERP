'use client';

import { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface PhotoCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function PhotoCapture({ onCapture, onClose }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (error) {
      toast.error('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleUploadPhoto = async () => {
    if (capturedImage) {
      const blob = await (await fetch(capturedImage)).blob();
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      onCapture(file);
      toast.success('Photo captured successfully');
      onClose();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(file);
      toast.success('Photo uploaded successfully');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Capture Photo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {isCameraActive ? (
            <div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
              />
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="hidden"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sava-primary hover:bg-sava-secondary text-white rounded-lg transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : capturedImage ? (
            <div>
              <img src={capturedImage} alt="Captured" className="w-full rounded-lg" />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleUploadPhoto}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Use Photo
                </button>
                <button
                  onClick={() => setCapturedImage(null)}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  Retake
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={startCamera}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sava-primary hover:bg-sava-secondary text-white rounded-lg transition-colors font-medium"
              >
                <Camera className="w-5 h-5" />
                Start Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                <Upload className="w-5 h-5" />
                Upload from Device
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
