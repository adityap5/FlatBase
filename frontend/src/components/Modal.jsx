import { createPortal } from 'react-dom';

export default function Modal({ isOpen, setIsOpen, header, footer, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full rounded-lg bg-white p-6 shadow-lg"
      >
        {header && <div className="border-b pb-4">{header}</div>}
        <div className="py-6">{children}</div>
        {footer && <div className="border-t pt-4">{footer}</div>}
      </div>
    </div>,
    document.getElementById('portal')
  );
}
