function showSuccess() {
  document.getElementById("success-dialog").style.display = "flex";
}
function closeSuccess() {
  document.getElementById("success-dialog").style.display = "none";
}

// Exports

export { showSuccess, closeSuccess };
