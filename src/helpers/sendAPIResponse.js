// Exports

const { ok } = require("assert");

function sendAPIResponse(code, description, contents, responseType) {
  let response = {
    code: code,
    message: "",
    description: description,
    date: new Date(),
    ok: true,
    response: {
      content_type: responseType,
      contents: contents,
    },
  };
  if (code === 200) {
    response.message = "OK";
    response.ok = true;
  } else if (code === 201) {
    response.message = "Created";
    response.ok = true;
  } else if (code === 204) {
    response.message = "No Content";
    response.ok = true;
  } else if (code === 400) {
    response.message = "Bad Request";
    response.ok = false;
  } else if (code === 401) {
    response.message = "Unauthorized";
    response.ok = false;
  } else if (code === 403) {
    response.message = "Forbidden";
    response.ok = false;
  } else if (code === 404) {
    response.message = "Not Found";
    response.ok = false;
  } else if (code === 500) {
    response.message = "Internal Server Error";
    response.ok = false;
  } else if (code === 501) {
    response.message = "Not Implemented";
    response.ok = false;
  } else if (code === 503) {
    response.message = "Service Unavailable";
    response.ok = false;
  } else {
    response.message = "Unknown";
    response.ok = false;
  }

  return response;
}

module.exports = sendAPIResponse;
