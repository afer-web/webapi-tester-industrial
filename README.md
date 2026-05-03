![WebAPI](https://img.shields.io/badge/WebAPI-0052CC?style=for-the-badge&logo=api&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-00A86B?style=for-the-badge&logo=css3&logoColor=white)

# WebAPI Tester for Industrial Devices

**WebAPI Tester for Industrial Devices** is a single‑page tool developed in HTML, CSS, and JavaScript, designed to test industrial WebAPIs and generic REST endpoints.

## Overview

The interface is designed with a modern technical‑dashboard style: fast to use, clear in reading results, and useful for validating endpoints during OT/IT integration activities, commissioning, and troubleshooting.

<img width="1108" height="885" alt="immagine" src="https://github.com/user-attachments/assets/545bf78d-9211-49c8-9fa1-affd8ed8100d" />

## Main Features

- Sending HTTP requests with `GET`, `POST`, `PUT`, `DELETE` methods
- JSON body support for `POST` and `PUT` requests
- Status code display with color indicators:
  - Green for `2xx`
  - Yellow for `3xx`
  - Red for `4xx/5xx`
- Response time measurement in milliseconds
- Automatic formatting of JSON responses with syntax highlighting
- Saving, loading, and deleting requests via `localStorage`
- Mandatory URL validation and JSON body validation
- Clear error messages in case of invalid input or network errors
- Responsive layout for desktop and mobile devices

## Technologies Used

- **HTML5** for semantic structure
- **CSS3** for the industrial/futuristic responsive design
- **Vanilla JavaScript (ES6+)** for application logic and local state management
- **Fetch API** for HTTP communication
- **localStorage** for persistence of saved requests

## ## Project Structure

```text
/webapi-tester
  index.html
  style.css
  app.js
  README.md
```

## How to Run the Project

1. Clone or download the repository.
2. Open the `webapi-tester` folder.
3. Launch `index.html` in the browser (double‑click or via a local static server).

No build steps, dependencies, or installations are required.

## How to Save a Request

1. Enter the endpoint URL.
2. Select the HTTP method.
3. (Optional) Enter the JSON body for `POST`/`PUT`.
4. Press **Save Request**.
5. Select the request from the **Saved Requests** sidebar to reload it into the form.
6. Use **Delete** to remove it from the list.

## Possible Future Extensions

- Editor for custom headers (Authorization, API Key, custom token)
- Request history with filters and timestamps
- Environment management (Dev / Test / QA / Production)
- Export/Import of saved requests in JSON format
- Periodic endpoint monitoring mode (health check)
- Preconfigured test collections for industrial devices

---

This project can be evolved into a complete API testing suite for industrial scenarios, system integration, and advanced diagnostics.
