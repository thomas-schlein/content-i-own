'use client';

import { BrowserMultiFormatReader } from '@zxing/library';
import { useRef, useEffect } from 'react';

const reader = new BrowserMultiFormatReader();

let videoElement: HTMLVideoElement;

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment',
        },
      },
      videoRef.current,
      (result, error) => {
        if (result) console.log(result);
        if (error) console.log(error);
      }
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return <video ref={videoRef} />;
}
