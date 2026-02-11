interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+6281234567",
  },
];

function addContact(contact: Contact): Contact[] {
  contacts.push(contact);
  return contacts;
}

function render(contacts: Contact[]) {
  // const main = document.getElementById("main")!;

  contacts.forEach((contact) => {
    const p = document.createElement("p");
    p.innerText = `Name: ${contact.name}`;
    main.append(p);
  });
}

render(contacts);
