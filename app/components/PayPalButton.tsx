import { useEffect, useRef, useState } from "react";

interface PayPalButtonProps {
  amount: number;
  itemName: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

// Lightweight wrapper around PayPal JS SDK Buttons without adding a new dependency
export default function PayPalButton({
  amount,
  itemName,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const clientId = (import.meta as any).env?.VITE_PAYPAL_CLIENT_ID as
    | string
    | undefined;

  useEffect(() => {
    let isMounted = true;

    async function loadAndRender() {
      try {
        if (!clientId) {
          console.warn("VITE_PAYPAL_CLIENT_ID is not set");
          setIsLoading(false);
          return;
        }

        // If SDK already loaded, reuse it
        const existingScript = document.querySelector<HTMLScriptElement>(
          'script[src^="https://www.paypal.com/sdk/js"]'
        );

        if (!existingScript) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error("Failed to load PayPal SDK"));
            document.body.appendChild(script);
          });
        } else {
          if (!(window as any).paypal) {
            await new Promise<void>((resolve, reject) => {
              existingScript.addEventListener("load", () => resolve());
              existingScript.addEventListener("error", () =>
                reject(new Error("Failed to load PayPal SDK"))
              );
            });
          }
        }

        if (!isMounted) return;

        // Render PayPal Buttons
        const paypal = (window as any).paypal;
        if (paypal && containerRef.current) {
          containerRef.current.innerHTML = "";
          paypal
            .Buttons({
              style: { layout: "horizontal", height: 35 },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: amount.toFixed(2) },
                      description: itemName,
                    },
                  ],
                });
              },
              onApprove: async (_data: any, actions: any) => {
                const details = await actions.order.capture();
                if (onSuccess) onSuccess(details);
              },
              onError: (err: any) => {
                console.error("PayPal error", err);
                if (onError) onError(err);
              },
            })
            .render(containerRef.current);
        }
      } catch (e) {
        console.error(e);
        if (onError) onError(e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAndRender();

    return () => {
      isMounted = false;
    };
  }, [amount, itemName, clientId, onSuccess, onError]);

  if (!clientId) {
    return null;
  }

  return (
    <div className="inline-block align-middle">
      <div ref={containerRef} />
      {isLoading && (
        <div className="text-xs text-gray-500">Loading PayPal…</div>
      )}
    </div>
  );
}
