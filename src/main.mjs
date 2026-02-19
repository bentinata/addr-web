/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  email: string,
 *  phone: number,
 * }} Contact
 */

/** @type {Contact[]} */
const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+6281234567",
  },
];

/**
 * @param {Contact} contact
 * @returns {Contact[]}
 */
function addContact(contact) {
  contacts.push(contact);
  return contacts;
}

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

render(contacts);
