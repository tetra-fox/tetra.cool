import "../scss/style.scss";
import App from "../svelte/App.svelte";

export default new App({
  target: document.body,
  props: {title: "tetra"}
});
