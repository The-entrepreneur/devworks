'use client';

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";

type OAuthProvider = "github" | "google";

interface OAuthButtonProps {
  provider: OAuthProvider;
  onSignIn: (provider: OAuthProvider) => Promise<void>;
  className?: string;
}

const providerIcons = {
  github: FaGithub,
  google: FaGoogle,
};

const providerNames = {
  github: "GitHub",
  google: "Google",
};

function OAuthButton({ provider, onSignIn, className = "" }: OAuthButtonProps) {
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
      <span>Continue with {providerNames[provider]}</span>
    </Button>
  );
}

export function OAuthSignInButtons() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleOAuthSignIn = async (provider: OAuthProvider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in:", error);
      return;
    }

    // Generate a unique ID for the user
    const uniqueId = `0x${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`.toUpperCase();
    
    // Update the user's metadata with the unique ID
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.auth.updateUser({
        data: { unique_id: uniqueId }
      });
    }

    router.refresh();
  };

  return (
    <div className="space-y-4">
      <OAuthButton provider="google" onSignIn={handleOAuthSignIn} />
      <OAuthButton provider="github" onSignIn={handleOAuthSignIn} />
    </div>
  );
} 