// Timestamp for the hidden field: when the form was loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// Open a membership modal from its card link
document.querySelectorAll("[data-modal]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

// Close with the button or by clicking the backdrop (Esc works by default)
document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    const box = dialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right ||
                    event.clientY < box.top || event.clientY > box.bottom;
    if (outside) dialog.close();
  });
});
