'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";

type OAuthProvider = "github" | "google" | "azure";

interface OAuthButtonProps {
  provider: OAuthProvider;
  onSignIn: (provider: OAuthProvider) => Promise<void>;
  className?: string;
}

const providerIcons = {
  github: FaGithub,
  google: FaGoogle,
  azure: FaMicrosoft,
};

const providerNames = {
  github: "GitHub",
  google: "Google",
  azure: "Microsoft",
};

export function OAuthButton({ provider, onSignIn, className = "" }: OAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const Icon = providerIcons[provider];

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await onSignIn(provider);
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center gap-2 justify-center ${className}`}
      onClick={handleSignIn}
      disabled={isLoading}
      type="button"
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span>Sign in with {providerNames[provider]}</span>
    </Button>
  );
} 