import * as Contact from "./contact.mjs";

/**
 * @param {Contact[]} contacts
 */
function render(contacts) {
  const main = document.getElementById("main");

  contacts.forEach((contact) => {
    const p = document.createElement("p");
    try {
      const parsed = Contact.ContactSchema(contact);
      p.innerText = `Name: ${parsed.name}`;
    } catch (e) {
      p.innerText = e.message;
    }
    main.append(p);
  });
}

Contact.add({
  id: 2,
  name: "Benji",
  // email: "_@bentinata.com",
});
render(Contact.contacts);
