'use client';

import { useEffect } from 'react';

export default function ChatPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      // @ts-ignore
      if (window.voiceflow) {
        // @ts-ignore
        window.voiceflow.chat.load({
          verify: { projectID: process.env.NEXT_PUBLIC_BOT_ID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
        });
      }
    };

    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      script.remove();
    };
  }, []);

  return <></>;
}
