const bridge = "http://localhost:47321/browser/capture";

function ensureDock() {
  if (document.getElementById("ekiek-local-sidecar")) return;

  const dock = document.createElement("button");
  dock.id = "ekiek-local-sidecar";
  dock.type = "button";
  dock.textContent = "Ekiek";
  dock.setAttribute("aria-label", "Capture page selection with Ekiek");
  Object.assign(dock.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: "2147483647",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "999px",
    background: "#101316",
    color: "#F6F2EA",
    padding: "9px 12px",
    font: "12px -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: "0 18px 40px rgba(0,0,0,0.32)"
  });

  dock.addEventListener("click", () => {
    const selection = window.getSelection()?.toString() ?? "";
    void fetch(bridge, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.title,
        url: location.href,
        selection,
        trust: "untrusted_web"
      })
    }).catch(() => undefined);
  });

  document.documentElement.appendChild(dock);
}

ensureDock();
