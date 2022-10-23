const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

const updateContactsFile = async data => {
	await fs.writeFile(contactsPath, JSON.stringify(data));
};

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const parseData = JSON.parse(data);
	console.table(parseData);
	return parseData;
};

const getContactById = async contactId => {
	const data = await fs.readFile(contactsPath);
	const pardeData = JSON.parse(data);
	const result = pardeData.find(contact => contact.id == contactId);
	console.table(result);
	return result;
};

const removeContact = async contactId => {
	const data = await listContacts();
	const updatedContacts = data.filter(contact => contact.id != contactId);
	await updateContactsFile(updatedContacts);
	console.table(updateContactsFile);
	return updatedContacts;
};

const addContact = async (name, email, phone) => {
	const data = await listContacts();
	const newContact = {
		name,
		email,
		phone,
	};
	data.push(newContact);
	await updateContactsFile(data);
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
