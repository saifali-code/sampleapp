/* Tiny global toast bus: toast("Saved", "success") from anywhere; <Toast /> renders it. */
export function toast(message, type = "") {
  window.dispatchEvent(new CustomEvent("mak:toast", { detail: { message, type } }));
}
export default toast;
