// Exports

function sendAPIResponse(code, description, contents, responseType) {
  let message = "";
  if (code === 200) {
    message = "OK";
  } else if (code === 201) {
    message = "Created";
  } else if (code === 204) {
    message = "No Content";
  } else if (code === 400) {
    message = "Bad Request";
  } else if (code === 401) {
    message = "Unauthorized";
  } else if (code === 403) {
    message = "Forbidden";
  } else if (code === 404) {
    message = "Not Found";
  } else if (code === 500) {
    message = "Internal Server Error";
  } else if (code === 501) {
    message = "Not Implemented";
  } else if (code === 503) {
    message = "Service Unavailable";
  } else {
    message = "Unknown";
  }
  let response = {
    code: code,
    message: message,
    description: description,
    date: new Date(),
    ok: statusMessages[code].ok,
    response: {
      content_type: responseType,
      contents: contents,
    },
  };
  return response;
}

export default sendAPIResponse;
