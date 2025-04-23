"use client";

import React from 'react';
import AudioTest from '../../components/test/audio-test';

export default function AudioTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Audio Test Page</h1>
      <p className="mb-6">
        This page is designed to help diagnose audio issues in the application.
        Use the test panel below to check if audio is working correctly.
      </p>
      
      <AudioTest />
    </div>
  );
} 