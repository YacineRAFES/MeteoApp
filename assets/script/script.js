import { frontcontroller } from "./frontcontroller.js";

document.getElementById('search').addEventListener('click', () => frontcontroller());
document.addEventListener("DOMContentLoaded", async () => {
    await frontcontroller();
});