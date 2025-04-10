"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { KeyRound, CheckCircle2, XCircle } from "lucide-react";

interface ValidationResult {
  key: string;
  valid: boolean;
  error?: string;
}

export default function Home() {
  const [keys, setKeys] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKey, setCurrentKey] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);

  const validateKeys = async () => {
    const keyList = keys.split(/[\s,]+/).filter(key => key.trim());
    
    if (keyList.length === 0) return;

    setIsValidating(true);
    setResults([]);
    setProgress(0);

    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i].trim();
      setCurrentKey(key);
      setProgress((i / keyList.length) * 100);

      try {
        const response = await fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key }),
        });

        const data = await response.json();
        setResults(prev => [...prev, {
          key,
          valid: data.valid,
          error: data.error
        }]);
      } catch (error) {
        setResults(prev => [...prev, {
          key,
          valid: false,
          error: 'Network error'
        }]);
      }
    }

    setProgress(100);
    setIsValidating(false);
    setCurrentKey('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            OpenAI Key Validator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your OpenAI API keys (space or comma separated) to validate them
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter API keys..."
                value={keys}
                onChange={(e) => setKeys(e.target.value)}
                className="font-mono"
              />
            </div>
            
            <Button
              onClick={validateKeys}
              disabled={isValidating || !keys.trim()}
              className="w-full"
            >
              <KeyRound className="mr-2 h-4 w-4" />
              Validate Keys
            </Button>

            {isValidating && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Validating key: {currentKey}
                </p>
              </div>
            )}
          </div>
        </Card>

        {results.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {result.valid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-mono text-sm">
                      {result.key.slice(0, 12)}...
                    </span>
                  </div>
                  {!result.valid && (
                    <span className="text-sm text-red-500">
                      {result.error}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}