import * as schema from "./schema.mjs";

/**
 * @typedef {ReturnType<typeof ContactSchema>} Contact
 */
export const ContactSchema = schema.define({
  id: schema.number,
  name: schema.string,
  email: schema.email,
  phone: schema.phone,
});

/** @type {Contact[]} */
export const contacts = [
  {
    id: 1,
    name: "John Balatro",
    email: "john.doe@example.com",
    phone: +6281234567,
  },
];

/**
 * @param {Contact} contact
 * @returns {Contact[]}
 */
export function add(contact) {
  contacts.push(contact);
  return contacts;
}
