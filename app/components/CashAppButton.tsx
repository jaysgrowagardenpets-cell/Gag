interface CashAppButtonProps {
  amount: number;
  itemName: string;
  note?: string;
  className?: string;
}

// Simple Cash App button that directs to the user's $Cashtag page with a note
// Users complete payment manually; you will confirm order off-platform.
export default function CashAppButton({
  amount,
  itemName,
  note,
  className,
}: CashAppButtonProps) {
  const cashtag = (import.meta as any).env?.VITE_CASHAPP_TAG as
    | string
    | undefined;
  const amountStr = amount.toFixed(2);
  const description = encodeURIComponent(
    note ?? `Order: ${itemName} - $${amountStr}`
  );

  if (!cashtag) return null;

  // Cash App does not have an official universal deep link for web with amount+note.
  // We link to the profile and include instructions/description in the URL fragment.
  const href = `https://cash.app/${cashtag}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
      }
      title={`Pay $${amountStr} on Cash App`}
    >
      <span>Cash App</span>
      <span className="opacity-90">${amountStr}</span>
    </a>
  );
}
