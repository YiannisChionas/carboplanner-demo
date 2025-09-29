// DetailDialog: accessible modal (portal) that locks scroll, traps focus, and closes on backdrop click or Esc.
// Modal dialog rendered via portal outside the component tree.
'use client';

import { useEffect, useRef } from 'react';
import type { PlanItem } from '@/app/lib/types';
import * as ReactDOM from 'react-dom';

export default function DetailDialog({ item, onClose }: { item: PlanItem; onClose: () => void }) {
  // Backdrop ref; used to detect outside (overlay) clicks.
  const overlayRef = useRef<HTMLDivElement>(null);
  // Dialog container ref (focus-trap scope).
  const dialogRef = useRef<HTMLDivElement>(null);
  // Ref for initial focus (Close button).
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Lock page scroll while the modal is open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Set initial focus to the Close button.
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close on Esc (global keydown listener).
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab') {
        // Trap focus within the dialog on Tab/Shift+Tab.
        trapTab(e);
      }
    };
    document.addEventListener('keydown', onKey);
    // Restore original scroll and remove key listener.
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener('keydown', onKey);
    };

  }, []);
  // Focus trap: cycle focus between the first and last focusable elements.
  const trapTab = (e: KeyboardEvent) => {
    const root = dialogRef.current!;
    const focusables = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter((el) => !el.hasAttribute('disabled'));
    if (list.length === 0) return;

    const first = list[0];
    const last = list[list.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const dialog = (
    <div
      ref={overlayRef}
      // Close when clicking the backdrop (outside the dialog).
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', zIndex: 1000 }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        // Associate accessible name/description with the dialog (aria-labelledby/aria-describedby).
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        style={{ background: '#fff', padding: 16, borderRadius: 8, minWidth: 320, maxWidth: 560, width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,.2)' }}
        // Stop propagation so clicks inside the dialog don’t close it.
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" style={{ marginTop: 0 }}>{item.title}</h2>
        <p id="dialog-desc" style={{ marginTop: 0, color: '#555' }}>
          Detailed information about the selected plan item.
        </p>

        <div style={{ display: 'grid', gap: 6 }}>
          <div><b>Type:</b> {item.type}</div>
          <div><b>kcal:</b> {item.kcal}</div>
          <div><b>Tags:</b> {item.tags.join(', ')}</div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close details">Close</button>
        </div>
      </div>
    </div>
  );


  const mount = typeof window !== 'undefined' ? document.body : null;
  // Render via portal into document.body to escape parent stacking contexts/z-index.
  return mount ? ReactDOM.createPortal(dialog, mount) : null;
}
