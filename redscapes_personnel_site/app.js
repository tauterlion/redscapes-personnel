(() => {
  "use strict";

  const app = document.getElementById("app");
  const DATA = window.REDSCAPES_PERSONNEL || {};

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[ch]);

  function getRequestedId() {
    const queryId = new URLSearchParams(location.search).get("id");
    if (queryId) return queryId.trim().toUpperCase();

    const match = location.pathname.match(/\/personnel\/([^/?#]+)/i);
    if (match) return decodeURIComponent(match[1]).trim().toUpperCase();

    const hash = location.hash.replace(/^#/, "").trim();
    if (/^RS-[A-Z0-9-]+$/i.test(hash)) return hash.toUpperCase();

    return null;
  }

  function renderDirectory(message = "") {
    app.innerHTML = `
      <section class="directory-panel">
        <p class="eyebrow">Secure Personnel Archive</p>
        <h1>Personnel<br>Database</h1>
        <p>Enter a valid personnel identifier to retrieve an authorized Redscapes record.</p>

        <form class="lookup-form" id="lookupForm">
          <label for="personnelLookup">Personnel ID</label>
          <input id="personnelLookup" name="id" autocomplete="off" spellcheck="false"
                 inputmode="text" placeholder="RS-XXXX" aria-describedby="lookupMessage">
          <button class="primary-button" type="submit">Open</button>
        </form>

        <div id="lookupMessage" class="template-note">
          ${escapeHTML(message || "Template mode: no personnel records have been added yet.")}
        </div>
      </section>
    `;

    const form = document.getElementById("lookupForm");
    const input = document.getElementById("personnelLookup");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const id = input.value.trim().toUpperCase();
      if (!id) return;
      navigateToPersonnel(id);
    });
  }

  function navigateToPersonnel(id) {
    if (location.protocol === "file:") {
      location.href = `?id=${encodeURIComponent(id)}`;
      return;
    }
    location.href = `/personnel/${encodeURIComponent(id)}`;
  }

  function renderError(id) {
    app.innerHTML = `
      <section class="error-panel">
        <p class="eyebrow">Record Retrieval Failure</p>
        <h1>Record<br>Unavailable</h1>
        <p>No personnel record is currently registered for <strong>${escapeHTML(id)}</strong>.</p>
        <p class="template-note">This is expected while the database is still in template mode.</p>
        <a class="back-link" href="/">← Return to personnel lookup</a>
      </section>
    `;
  }

  function field(label, value, extraClass = "") {
    if (!value) return "";
    return `
      <div>
        <span class="field-label">${escapeHTML(label)}</span>
        <span class="field-value ${extraClass}">${escapeHTML(value)}</span>
      </div>`;
  }

  function photoMarkup(person) {
    if (person.photo) {
      return `<img src="${escapeHTML(person.photo)}" alt="Personnel portrait of ${escapeHTML(person.name || person.personnelId)}">`;
    }
    return `<div class="photo-placeholder">PORTRAIT<br>PENDING</div>`;
  }

  function renderProfile(person) {
    const id = person.personnelId || getRequestedId() || "RS-XXXX";
    document.title = `${person.name || id} // Redscapes Personnel`;

    app.innerHTML = `
      <article class="profile">
        <section class="profile-top">
          <div class="clearance-banner">
            <span>Authorized Personnel</span>
            <span>//</span>
          </div>

          <div class="identity-layout">
            <div class="photo-card">
              ${photoMarkup(person)}
              <div class="verified-strip">ID VERIFIED</div>
            </div>

            <div class="identity-main">
              <span class="field-label">Name</span>
              <h1 class="person-name">${escapeHTML(person.name || "PERSONNEL NAME")}</h1>
              <p class="person-id">${escapeHTML(id)}</p>

              <div class="field-grid">
                ${field("Role", person.role)}
                ${field("Division", person.division)}
                ${field("Facility", person.facility)}
                ${field("Clearance", person.clearance, "clearance")}
                ${field("Status", person.status)}
                ${field("Expiration", person.expiration)}
                ${field("Callsign", person.codename)}
              </div>
            </div>
          </div>
        </section>

        <section class="profile-body">
          ${person.quote ? `
            <section class="module quote-module">
              <h2 class="module-title">Selected Quote</h2>
              <p class="quote-text">${escapeHTML(person.quote)}</p>
            </section>` : ""}
        </section>

        <footer class="record-footer">
          <span>RECORD // <b>${escapeHTML(id)}</b></span>
          <span>REDSCAPES RESEARCH FACILITY</span>
        </footer>
      </article>

      <a class="back-link" href="/">← Return to personnel lookup</a>
    `;
  }

  const requestedId = getRequestedId();
  if (!requestedId) {
    renderDirectory();
    return;
  }

  const person = DATA[requestedId];
  if (!person) {
    renderError(requestedId);
    return;
  }

  renderProfile({ ...person, personnelId: person.personnelId || requestedId });
})();
