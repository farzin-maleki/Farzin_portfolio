# Farzin_portfolio

My personal developer portfolio, hand-coded with HTML, CSS & JavaScript.

Five pages: Home, About, Skills, Work and Contact. Shared navigation uses relative paths, so the site works at a domain root or in a subdirectory.

- Light and dark themes follow the system preference until changed. The theme button saves the choice in localStorage under `theme`.
- Font Awesome 7.3.1 icons, scroll reveals, animated skill bars and hover interactions, with reduced-motion support.
- EmailJS contact form, with a direct email alternative if the service is unavailable.

Serve this directory with any static HTTP server to preview the site. No build step or package installation is needed. Fonts, Font Awesome and EmailJS load from their existing external services.

## Vercel deployment

Keep the Vercel project's Root Directory at the repository root (leave it blank). `vercel.json` selects the Other framework preset, skips the build step, and sets the Output Directory to `.` so the five HTML pages and their `public/` assets are published together. Without this override, Vercel defaults to publishing only `public/`, which contains no homepage and causes a 404. Commit and push configuration changes to trigger a new deployment.

`public/js/theme.js` applies the theme before first paint. `public/js/pages.js` connects the existing project renderer to the Work page and updates the home-page count. The **work articles** section of `public/js/script.js` is preserved unchanged.

## Certificates

The Skills page includes a Certificates section at `skills.html#certificates`. Edit the array at the top of `public/js/certificates.js` to add or update a certificate. No changes to `script.js` are needed.

Store certificate files in `public/media/certificates/`. All paths in the array are relative to the HTML page. The Mayerfeld Practicum and AI Frontend Engineer entries use their published certificate images and link to the original Credsverse credentials. Issuer and issue dates were read from those credentials.

Each entry needs `title`, `type` and `url`. Supported types:

- `link`: opens the original credential website in a new tab.
- `pdf`: opens a PDF in a new tab using the visitor’s browser PDF viewer.
- `image`: opens an accessible image dialog. Escape, the Close button or clicking outside the dialog closes it and restores focus. An Open original link is also available.

Optional fields are `program`, `issuer`, `issued` (YYYY-MM-DD), `skills` (array), `credentialId`, `thumbnail` (an image, never a PDF), and `verifyUrl` (the issuer’s verification page). A thumbnail can be enlarged for any format. Without one, link and PDF cards show a format icon. Verification is a link to the issuer, not an automatic verification claim.

Example entries to copy into the array after replacing the sample details and adding the actual files:

```js
{
  title: "Your course title",
  issuer: "Issuing organisation",
  issued: "2026-09-26",
  type: "pdf",
  url: "./public/media/certificates/your-certificate.pdf",
  thumbnail: "./public/media/certificates/your-certificate-preview.png",
  skills: ["Relevant skill"],
  verifyUrl: "https://issuer.example/verify/your-credential",
},
{
  title: "Your other course title",
  type: "image",
  url: "./public/media/certificates/your-certificate.jpg",
},
{
  title: "Your online credential",
  type: "link",
  url: "https://issuer.example/credentials/your-credential",
},
```

Adding an entry means editing the site files; there is no upload service or admin dashboard. Keep the fallback link in `skills.html` up to date if you replace the featured credential, so it also works without JavaScript.
