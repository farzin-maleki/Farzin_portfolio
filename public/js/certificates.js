// Add certificates here. Paths are relative to skills.html, not this script.
// type: "link", "pdf" or "image". Optional: thumbnail, verifyUrl, issuer,
// issued (YYYY-MM-DD), program, skills and credentialId. See README for examples.
const certificates = [
  {
    title: "AI-Assisted Frontend Developer",
    program: "Mayerfeld Practicum Program®",
    issuer: "Mayerfeld Consulting",
    issued: "2026-09-26",
    type: "link",
    url: "https://credsverse.com/credentials/0d4d7d69-54da-4b66-b894-e28e642595ed?preview=1",
    thumbnail: "./public/media/certificates/mayerfeld-frontend-development.png",
    skills: [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Git & Github",
      "Teamwork",
      "AI Tools",
    ],
    credentialId: "0d4d7d69-54da-4b66-b894-e28e642595ed",
  },
  {
    title: "AI Frontend Engineer",
    program: "Building Web Applications with Modern AI Tools",
    issuer: "Mayerfeld Consulting",
    issued: "2026-08-30",
    type: "link",
    url: "https://credsverse.com/credentials/3fcc6721-54e3-4d12-9ff6-adbe7958e7e0?preview=1",
    thumbnail: "./public/media/certificates/mayerfeld-ai-frontend-engineer.png",
    skills: [
      "Frontend Development",
      "AI Tools",
      "Web Applications",
      "V0",
      "Claude Code",
    ],
    credentialId: "3fcc6721-54e3-4d12-9ff6-adbe7958e7e0",
  },
];

(() => {
  const list = document.getElementById("certificatesList");
  if (!list) return;

  const viewer = document.getElementById("certificateViewer");
  const viewerImage = document.getElementById("certificateViewerImage");
  const viewerError = document.getElementById("certificateViewerError");
  const viewerOriginal = document.getElementById("certificateViewerOriginal");
  const formats = {
    link: {
      label: "Online credential",
      icon: "arrow-up-right-from-square",
      action: "View credential",
    },
    pdf: { label: "PDF certificate", icon: "file-pdf", action: "View PDF" },
    image: {
      label: "Image certificate",
      icon: "image",
      action: "View certificate",
    },
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function icon(name) {
    const node = element("i", `fa-solid fa-${name}`);
    node.setAttribute("aria-hidden", "true");
    return node;
  }

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (["https:", "http:"].includes(url.protocol)) return url.href;
      // Also allow local files when previewing the portfolio directly from disk.
      if (
        url.protocol === "file:" &&
        new URL(document.baseURI).protocol === "file:"
      )
        return url.href;
    } catch {
      /* Invalid entries do not create broken or unsafe links. */
    }
    return null;
  }

  function externalLink(label, url, className = "btn btn--primary") {
    const link = element("a", className, label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(
      icon("arrow-up-right-from-square"),
      element("span", "sr-only", " (opens in a new tab)"),
    );
    return link;
  }

  function previewLink(link, imageUrl, certificate, originalUrl) {
    link.addEventListener("click", (event) => {
      // Modified clicks still open the underlying image in a new tab.
      if (
        !viewer?.showModal ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      document.getElementById("certificateViewerTitle").textContent =
        `${certificate.title} — certificate`;
      viewerImage.hidden = false;
      viewerError.hidden = true;
      viewerImage.alt = `${certificate.title}${certificate.issuer ? `, issued by ${certificate.issuer}` : ""}`;
      viewerImage.src = imageUrl;
      viewerOriginal.href = originalUrl;
      viewer.showModal();
      document.body.classList.add("certificate-open");
    });
  }

  viewerImage?.addEventListener("error", () => {
    viewerImage.hidden = true;
    viewerError.hidden = false;
  });
  viewer
    ?.querySelector("button")
    .addEventListener("click", () => viewer.close());
  viewer?.addEventListener("click", (event) => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      viewer.close();
  });
  viewer?.addEventListener("close", () =>
    document.body.classList.remove("certificate-open"),
  );

  const fragment = document.createDocumentFragment();
  for (const certificate of certificates) {
    const format = formats[certificate.type];
    const url = safeUrl(certificate.url);
    if (!format || !url || !certificate.title) continue;

    const card = element("article", "certificate reveal");
    const imageUrl = safeUrl(
      certificate.type === "image" ? certificate.url : certificate.thumbnail,
    );
    const visual = element("div", "certificate__visual");
    const placeholder = element("div", "certificate__placeholder");
    placeholder.append(icon(format.icon), element("span", "", format.label));
    visual.append(placeholder);
    if (imageUrl) {
      const preview = element("a", "certificate__preview");
      preview.href = imageUrl;
      preview.target = "_blank";
      preview.rel = "noopener noreferrer";
      preview.setAttribute(
        "aria-label",
        `Enlarge ${certificate.title} certificate`,
      );
      const image = element("img");
      image.src = imageUrl;
      image.alt = `${certificate.title} certificate preview`;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        preview.remove();
        placeholder.hidden = false;
      });
      placeholder.hidden = true;
      const caption = element(
        "span",
        "certificate__enlarge",
        "Enlarge certificate",
      );
      caption.prepend(icon("expand"));
      preview.append(image, caption);
      previewLink(preview, imageUrl, certificate, url);
      visual.append(preview);
    }

    const body = element("div", "certificate__body");
    const badge = element("span", "certificate__format", format.label);
    badge.prepend(icon("award"));
    body.append(badge, element("h3", "", certificate.title));
    if (certificate.program)
      body.append(element("p", "certificate__program", certificate.program));

    const metadata = element("dl", "certificate__meta");
    if (certificate.issuer) {
      const group = element("div");
      group.append(
        element("dt", "", "Issued by"),
        element("dd", "", certificate.issuer),
      );
      metadata.append(group);
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(certificate.issued || "")) {
      const date = new Date(`${certificate.issued}T00:00:00Z`);
      if (
        !Number.isNaN(date.valueOf()) &&
        date.toISOString().slice(0, 10) === certificate.issued
      ) {
        const group = element("div");
        const value = element("dd");
        const time = element(
          "time",
          "",
          new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          }).format(date),
        );
        time.dateTime = certificate.issued;
        value.append(time);
        group.append(element("dt", "", "Issued"), value);
        metadata.append(group);
      }
    }
    body.append(metadata);
    if (certificate.skills?.length) {
      const skills = element("ul", "certificate__skills");
      skills.setAttribute("aria-label", "Related skills");
      certificate.skills.forEach((skill) =>
        skills.append(element("li", "chip", skill)),
      );
      body.append(skills);
    }
    const actions = element("div", "certificate__actions");
    const primary = externalLink(format.action, url);
    if (certificate.type === "image") {
      primary.textContent = format.action;
      primary.append(icon("expand"));
      previewLink(primary, url, certificate, url);
    }
    actions.append(primary);
    const verifyUrl = safeUrl(certificate.verifyUrl);
    if (verifyUrl && verifyUrl !== url)
      actions.append(
        externalLink("Verify credential", verifyUrl, "btn btn--ghost"),
      );
    body.append(actions);
    if (certificate.credentialId)
      body.append(
        element(
          "p",
          "certificate__id",
          `Credential ID: ${certificate.credentialId}`,
        ),
      );
    card.append(visual, body);
    fragment.append(card);
  }

  if (!fragment.childElementCount) return; // Keep the HTML fallback if data is missing.
  list.replaceChildren(fragment);
  list.querySelectorAll(".reveal").forEach((card, index) => {
    card.style.setProperty("--d", `${Math.min(index, 4) * 0.08}s`);
    if (typeof revealObserver !== "undefined") revealObserver.observe(card);
    else card.classList.add("reveal--visible");
  });
})();
