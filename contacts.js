const fs = require('fs').promises
const path = require('path')
const contactsPath = path.basename('.\\db\\contacts.json')
console.log(contactsPath);
async function listContacts() {
     try {
        const data = await fs.readFile(contactsPath)
        return JSON.parse(data)
     } catch (error) {
        console.log(error);
     }
     
  }
  
 async function getContactById(contactId) {
    const contacts = await listContacts();
  const id = contacts.find(({id}) => id === contactId.toString());
  return id
  }

 async function removeContact(contactId) {
   const contacts = await listContacts();
   const deleteContacts = contacts.filter(({id})=> id !== contactId.toString())
   return deleteContacts
  }
 
 async function addContact(name, email, phone) {
    let contacts = await listContacts();
    const contact = {
        name,
        email, 
        phone
    }
    contacts.push(contact)
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts))
    } catch (error) {
        console.log(error);
    }
  }
// addContact('gal', 'fas@gm.com', '56378')
 module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
 }