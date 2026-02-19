import * as Contact from "./contact.mjs";

/**
 * @param {Contact[]} contacts
 */
function render(contacts) {
  const main = document.getElementById("main");

  contacts.forEach((contact) => {
    const p = document.createElement("p");
    p.innerText = `Name: ${contact.name}`;
    main.append(p);
  });
}

render(Contact.contacts);
