const apiBaseUrl = "http://localhost:3000/contacts"; // Backend API base URL

document.addEventListener("DOMContentLoaded", () => {
    fetchContacts();
    document.getElementById("contactForm").addEventListener("submit", addContact);
});

// Fetch all contacts
function fetchContacts() {
    fetch(`${apiBaseUrl}/list`)
        .then((response) => response.json())
        .then((data) => {
            const contactList = document.getElementById("contactList");
            contactList.innerHTML = "";
            data.forEach((contact) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.address}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <button onclick="deleteContact(${contact.id})">Delete</button>
                        <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.address}', '${contact.phone}')">Edit</button>
                    </td>
                `;
                contactList.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching contacts:", error));
}

// Add a new contact
function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    fetch(`${apiBaseUrl}/new-contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, address, phone })
    })
    .then((response) => response.json())
    .then(() => {
        fetchContacts();
        document.getElementById("contactForm").reset();
    })
    .catch((error) => console.error("Error adding contact:", error));
}

// Edit a contact
function editContact(id, currentName, currentAddress, currentPhone) {
    const newName = prompt("Enter new name:", currentName);
    const newAddress = prompt("Enter new address:", currentAddress);
    const newPhone = prompt("Enter new phone:", currentPhone);

    if (newName && newAddress && newPhone) {
        fetch(`${apiBaseUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newName, address: newAddress, phone: newPhone })
        })
        .then(() => fetchContacts())
        .catch((error) => console.error("Error updating contact:", error));
    }
}

// Delete a contact
function deleteContact(id) {
    fetch(`${apiBaseUrl}/delete/${id}`, {
        method: "DELETE"
    })
    .then(() => fetchContacts())
    .catch((error) => console.error("Error deleting contact:", error));
}


