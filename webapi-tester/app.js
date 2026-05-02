const STORAGE_KEY = "webapiTesterSavedRequests";

const requestForm = document.getElementById("requestForm");
const urlInput = document.getElementById("urlInput");
const methodSelect = document.getElementById("methodSelect");
const bodyInput = document.getElementById("bodyInput");
const saveRequestBtn = document.getElementById("saveRequestBtn");
const clearBtn = document.getElementById("clearBtn");
const errorMessage = document.getElementById("errorMessage");
const statusCodeEl = document.getElementById("statusCode");
const responseTimeEl = document.getElementById("responseTime");
const responseOutput = document.getElementById("responseOutput");
const savedRequestsList = document.getElementById("savedRequestsList");

requestForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await sendRequest();
});

saveRequestBtn.addEventListener("click", saveRequest);
clearBtn.addEventListener("click", clearForm);
methodSelect.addEventListener("change", toggleBodyInputByMethod);

document.addEventListener("DOMContentLoaded", () => {
  loadSavedRequests();
  toggleBodyInputByMethod();
});

function setError(message) {
  errorMessage.textContent = message || "";
}

function resetResultBox() {
  statusCodeEl.textContent = "-";
  statusCodeEl.className = "status-chip status-neutral";
  responseTimeEl.textContent = "- ms";
}

function setStatusCode(status) {
  statusCodeEl.textContent = String(status);
  statusCodeEl.className = "status-chip";

  if (status >= 200 && status < 300) {
    statusCodeEl.classList.add("status-success");
  } else if (status >= 300 && status < 400) {
    statusCodeEl.classList.add("status-warning");
  } else {
    statusCodeEl.classList.add("status-error");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function syntaxHighlightJson(jsonText) {
  const escaped = escapeHtml(jsonText);
  const tokenPattern =
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?)|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;

  return escaped.replace(tokenPattern, (match) => {
    if (match.startsWith('"') && match.endsWith(":")) {
      return `<span class="token-key">${match}</span>`;
    }
    if (match.startsWith('"')) {
      return `<span class="token-string">${match}</span>`;
    }
    if (/true|false/.test(match)) {
      return `<span class="token-boolean">${match}</span>`;
    }
    if (/null/.test(match)) {
      return `<span class="token-null">${match}</span>`;
    }
    return `<span class="token-number">${match}</span>`;
  });
}

function formatJSON(value) {
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    const formatted = JSON.stringify(parsed, null, 2);
    return { ok: true, formatted, highlighted: syntaxHighlightJson(formatted) };
  } catch (error) {
    return {
      ok: false,
      error: `Invalid JSON: ${error.message}`,
      highlighted: `<span class="status-error">${escapeHtml(value)}</span>`,
    };
  }
}

function toggleBodyInputByMethod() {
  const method = methodSelect.value;
  const allowsBody = method === "POST" || method === "PUT";
  bodyInput.disabled = !allowsBody;
  bodyInput.placeholder = allowsBody
    ? '{"deviceId":"PLC-01","status":"active"}'
    : "Body is disabled for this HTTP method";
}

function getSavedRequests() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to parse saved requests:", error);
    return [];
  }
}

function setSavedRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function renderResponse(message, asHtml = false) {
  if (asHtml) {
    responseOutput.innerHTML = message;
  } else {
    responseOutput.textContent = message;
  }
}

function validateFormData() {
  const url = urlInput.value.trim();
  const method = methodSelect.value;
  const body = bodyInput.value.trim();

  if (!url) {
    return { ok: false, error: "Please enter a valid URL before sending the request." };
  }

  const isBodyRequiredMethod = method === "POST" || method === "PUT";
  if (isBodyRequiredMethod && body) {
    const parsedBody = formatJSON(body);
    if (!parsedBody.ok) {
      return { ok: false, error: parsedBody.error };
    }
  }

  return { ok: true };
}

async function sendRequest() {
  setError("");
  resetResultBox();

  const validation = validateFormData();
  if (!validation.ok) {
    setError(validation.error);
    return;
  }

  const url = urlInput.value.trim();
  const method = methodSelect.value;
  const body = bodyInput.value.trim();
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if ((method === "POST" || method === "PUT") && body) {
    options.body = body;
  }

  renderResponse("Sending request...");
  const startedAt = performance.now();

  try {
    const response = await fetch(url, options);
    const elapsed = Math.round(performance.now() - startedAt);
    responseTimeEl.textContent = `${elapsed} ms`;
    setStatusCode(response.status);

    const rawText = await response.text();
    if (!rawText) {
      renderResponse("No response body returned.");
      return;
    }

    const formatted = formatJSON(rawText);
    if (formatted.ok) {
      renderResponse(formatted.highlighted, true);
    } else {
      renderResponse(escapeHtml(rawText), true);
    }
  } catch (error) {
    const elapsed = Math.round(performance.now() - startedAt);
    responseTimeEl.textContent = `${elapsed} ms`;
    setStatusCode(500);
    setError(`Network error: ${error.message}`);
    renderResponse("Request failed. Check the endpoint and your network connection.");
  }
}

function saveRequest() {
  setError("");
  const validation = validateFormData();
  if (!validation.ok) {
    setError(validation.error);
    return;
  }

  const url = urlInput.value.trim();
  const method = methodSelect.value;
  const body = bodyInput.value.trim();

  const requests = getSavedRequests();
  const duplicate = requests.find(
    (request) => request.url === url && request.method === method && request.body === body
  );

  if (duplicate) {
    setError("This request is already saved.");
    return;
  }

  requests.unshift({
    id: crypto.randomUUID(),
    url,
    method,
    body,
    savedAt: new Date().toISOString(),
  });

  setSavedRequests(requests);
  loadSavedRequests();
}

function deleteSavedRequest(id) {
  const requests = getSavedRequests();
  const filtered = requests.filter((request) => request.id !== id);
  setSavedRequests(filtered);
  loadSavedRequests();
}

function loadSavedRequests() {
  const requests = getSavedRequests();
  savedRequestsList.innerHTML = "";

  if (!requests.length) {
    const item = document.createElement("li");
    item.className = "saved-item";
    item.textContent = "No saved requests yet.";
    savedRequestsList.appendChild(item);
    return;
  }

  requests.forEach((request) => {
    const item = document.createElement("li");
    item.className = "saved-item";

    const main = document.createElement("div");
    main.className = "saved-main";

    const loadBtn = document.createElement("button");
    loadBtn.className = "saved-btn";
    loadBtn.type = "button";
    loadBtn.innerHTML = `<strong>${request.method}</strong><span>${escapeHtml(request.url)}</span>`;
    loadBtn.addEventListener("click", () => {
      urlInput.value = request.url;
      methodSelect.value = request.method;
      bodyInput.value = request.body || "";
      toggleBodyInputByMethod();
      setError("");
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", () => deleteSavedRequest(request.id));

    main.appendChild(loadBtn);
    main.appendChild(removeBtn);
    item.appendChild(main);
    savedRequestsList.appendChild(item);
  });
}

function clearForm() {
  urlInput.value = "";
  methodSelect.value = "GET";
  bodyInput.value = "";
  toggleBodyInputByMethod();
  setError("");
  resetResultBox();
  renderResponse("No response yet.");
}
