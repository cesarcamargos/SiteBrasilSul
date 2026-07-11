const WHATSAPP_URL = "https://wa.me/5548998527340?text=Ol%C3%A1!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed right-lg bottom-lg z-fixed w-[54px] h-[54px] rounded-full bg-whatsapp text-branco grid place-items-center shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-[1.06] hover:bg-whatsapp-escuro"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.2 1.5Z" />
      </svg>
    </a>
  );
}
