import { useEffect } from "react";
import { X } from "lucide-react";

export default function AccessRequestModal({
  asset,
  reason,
  onReasonChange,
  onSubmit,
  onClose,
}) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!asset) return null;

  return (
    <div
      className="modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
    >
      {/* backdrop */}
      <button
        type="button"
        className="modal-backdrop block w-full min-h-screen cursor-pointer border-0 p-0"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* modal */}
      <div className="modal-panel max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="relative p-5">
          {/* close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          <h2
            id="access-modal-title"
            className="text-xl font-bold text-neutral-900 mb-2 pr-10"
          >
            Access required
          </h2>

          <p className="text-sm text-slate-600 mb-4">
            You don’t currently have access to this asset.
          </p>

          <p className="text-sm font-medium text-neutral-800 mb-2">
            {asset.title}
          </p>

          <label
            htmlFor="access-reason"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1"
          >
            Reason for request
          </label>

          <textarea
            id="access-reason"
            rows={4}
            value={reason}
            placeholder="Explain why you need access..."
            onChange={(e) => onReasonChange(e.target.value)}
            className="w-full mb-4 resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
}