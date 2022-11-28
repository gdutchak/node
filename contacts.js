const fs = require('fs').promises
const path = require('path')
const contactsPath = path.format({
   dir: '.\\db',
   base: 'contacts.json'
 });

async function listContacts() {
     try {
        const data = await fs.readFile(contactsPath)
        return JSON.parse(data)
     } catch (error) {
        console.log(error.message);
     }
     
  }

 async function getContactById(contactId) {
   try {
   const contacts = await listContacts();
  const id = contacts.find(({id}) => id === contactId.toString());
  return id
   } catch (error) {
      console.log(error.message);
   }
    
  }

 async function removeContact(contactId) {
   try {
      const contacts = await listContacts();
   const deleteContacts = contacts.filter(({id})=> id !== contactId.toString())
   return deleteContacts
   } catch (error) {
      console.log(error.message);
   }
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
        return contact
    } catch (error) {
        console.log(error.message);
    }
  }

 module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
 }