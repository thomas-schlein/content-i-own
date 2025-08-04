'use client';

import { BrowserMultiFormatReader } from '@zxing/library';
import { useRef, useEffect, useState } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  const [text, setText] = useState('nothing yet');

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
        if (result) setText(result.toString());
        if (error) setText(error.message);
      }
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return (
    <>
      <h1>{text}</h1>
      <video ref={videoRef} />
    </>
  );
}
