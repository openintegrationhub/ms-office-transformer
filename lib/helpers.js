/**
 * Copyright 2019 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const uuid = require('uuid');

function newMessage(body) {
  const msg = {
    id: uuid.v4(),
    attachments: {},
    body,
    headers: {},
    metadata: {},
  };

  return msg;
}

function mergeArrays(newArray, oldArray){
  let result = oldArray;
  let hash = {};
  let index;
  for(index in oldArray) {
    if(typeof oldArray[index] === 'object') {
      hash[oldArray[index].address] = 1;
    } else {
      hash[oldArray[index]] = 1;
    }
  }

  for(index in newArray) {
    if(typeof newArray[index] === 'object') {
      if(!(newArray[index].address in hash)) result.push(newArray[index]);
    } else {
      if(!(newArray[index] in hash)) result.push(newArray[index]);
    }
  }

  return result;
}


function transformOIHAddressToMicrosoft(address) {
  const result = {
    street: `${address.street} ${address.streetNumber}`,
    city: address.city,
    state: address.district,
    countryOrRegion: address.country,
    postalCode: address.zipcode
  };

  return result;
}

function transformOIHContactToMicrosoftContact(entry, oldEntry){

  const newEntry = {};

  // Adding / updating simple fields
  const simpleFields = ['displayName', 'middleName', 'nickName', 'jobTitle', 'birthday', 'title'];
  let index;
  for(index in simpleFields) {
    if(simpleFields[index] in entry && entry[simpleFields[index]] !== ''){
      newEntry[simpleFields[index]] = entry[simpleFields[index]].trim();
    }
  }

  // Handling date format
  if('birthday' in newEntry) {
    try {
      let formattedDate = newEntry['birthday'].trim().split('.');
      if(formattedDate.length === 3) {
        const year = (formattedDate[2].length === 4)? formattedDate[2] : `${19}${formattedDate[2]}`;
        let month;
        let day;
        if(parseInt(formattedDate[1], 10) > 13) {
          day = formattedDate[1];
          month = formattedDate[0];
        } else {
          day = formattedDate[0];
          month = formattedDate[1];
        }

        formattedDate = `${year}-${month}-${day}T00:00:00Z`;
        if(formattedDate.length === 20) {
          newEntry['birthday'] = formattedDate;
        } else {
          delete newEntry['birthday'];
        }
      } else {
        delete newEntry['birthday'];
      }
    } catch(e) {
      console.log(e);
      delete newEntry['birthday'];
    }
  }

  // Map OrganizationToPerson relation 1 to companyName

  if(entry.relations && entry.relations.length > 0) {
    for(index in entry.relations) {
      if(entry.relations[index].type === 'OrganizationToPerson') {
        newEntry.companyName = entry.relations[index].partner.name;
        break;
      }
    }
  }

  // contactData
  let mobile = false;
  let homePhones = [];
  let businessPhones = [];
  let emailAddresses = []; // [{ name: 'folder@email.com', address: 'folder@email.com' }]
  let imAddresses = []; // []
  let businessHomePage = false;

  if('contactData' in entry){
    for(index in entry.contactData) {
      if(entry.contactData[index].type === 'email'){
        emailAddresses.push({ name: entry.contactData[index].value, address: entry.contactData[index].value });
      } else if(entry.contactData[index].type === 'mobil'){

        if(mobile === false && (!oldEntry || oldEntry.mobilePhone === null || oldEntry.mobilePhone.trim() === '' || oldEntry.mobilePhone === 'null')) {
          mobile = entry.contactData[index].value;
        } else if(oldEntry && oldEntry.mobilePhone === entry.contactData[index].value) {
          // skip if ident
          continue;
        } else {
          businessPhones.push(entry.contactData[index].value);
        }
      } else if(entry.contactData[index].type === 'phone'){
        let phoneType = 'home';
        if('categories' in entry.contactData[index] && entry.contactData[index].categories.length > 0) {
          let subIndex;
          for(subIndex in entry.contactData[index].categories) {
            const label = entry.contactData[index].categories[subIndex].label.toLowerCase();
            if(
              label.indexOf('work') > -1
              || label.indexOf('business') > -1
              || label.indexOf('arbeit') > -1
              || ('contextRef' in entry.contactData[index] && typeof entry.contactData[index].contextRef === 'string' && entry.contactData[index].contextRef.trim() !== '')
            ) {
              phoneType = 'business';
              break;
            }
          }
        }

        if(phoneType === 'home') {
          homePhones.push(entry.contactData[index].value);
        } else {
          businessPhones.push(entry.contactData[index].value);
        }

      } else if(entry.contactData[index].type === 'fax'){
        businessPhones.push(entry.contactData[index].value);
      } else if(entry.contactData[index].type === 'skype'){
        imAddresses.push(entry.contactData[index].value);
      } else if(entry.contactData[index].type === 'xing'){
        imAddresses.push(entry.contactData[index].value);
      } else if(entry.contactData[index].type === 'facebook'){
        imAddresses.push(entry.contactData[index].value);
      } else if(entry.contactData[index].type === 'website'){
        if(businessHomePage === false) {
          businessHomePage = entry.contactData[index].value
        } else {
          imAddresses.push(entry.contactData[index].value);
        }
      }

    }
  }

  if(mobile !== false) {
    newEntry.mobilePhone = mobile;
  }

  if(businessHomePage !== false) {
    newEntry.businessHomePage = businessHomePage;
  }

  // Adresses

  let homeAddress = false;
  let businessAddress = false;
  let otherAddress = false;
  if('addresses' in entry){
    for(index in entry.addresses) {
      let addressType = 'home';
      if(homeAddress !== false && otherAddress === false) addressType = 'other';
      if(homeAddress !== false && businessAddress !== false) addressType = 'business';

      let subIndex;
      for(subIndex in entry.addresses[index].categories) {
        const label = entry.addresses[index].categories[subIndex].label.toLowerCase();
        if(
          label.indexOf('work') > -1
          || label.indexOf('business') > -1
          || label.indexOf('arbeit') > -1
          || ('contextRef' in entry.addresses[index] && typeof entry.addresses[index].contextRef === 'string' && entry.addresses[index].contextRef.trim() !== '')
        ) {
          addressType = 'business';
          break;
        }
      }

      if(addressType === 'home') {
        if(homeAddress === '') {
          homeAddress = entry.addresses[index];
        } else if(businessAddress === '') {
          businessAddress = entry.addresses[index];
        } else {
          otherAddress = entry.addresses[index];
        }
      }

      if(addressType === 'business') {
        if(businessAddress === '') {
          businessAddress = entry.addresses[index];
        } else {
          otherAddress = entry.addresses[index];
        }
      }

      if(addressType === 'other') {
        if(otherAddress === '') {
          otherAddress = entry.addresses[index];
        } else {
          console.log(entry.addresses[index]);
          console.log('Skipped because target does not accept that many addresses');
        }
      }
    }
  }

  // add new array values to old array (is ignoring deletes)

  if(!oldEntry || typeof oldEntry !== 'object') {
    newEntry.homePhones = homePhones;
    newEntry.businessPhones = businessPhones;
    newEntry.emailAddresses = emailAddresses;
    newEntry.imAddresses = imAddresses;
  } else {
    newEntry.homePhones = mergeArrays(homePhones, oldEntry.homePhones);
    newEntry.businessPhones = mergeArrays(businessPhones, oldEntry.businessPhones);
    newEntry.emailAddresses = mergeArrays(emailAddresses, oldEntry.emailAddresses);
    newEntry.imAddresses = mergeArrays(imAddresses, oldEntry.imAddresses);
  }


  // Update / add Address if any change

  if(oldEntry && typeof oldEntry === 'object') {
    if(homeAddress !== oldEntry.homeAddress){
      newEntry.homeAddress = (homeAddress === false)? oldEntry.homeAddress : transformOIHAddressToMicrosoft(homeAddress);
    }

    if(businessAddress !== oldEntry.businessAddress){
      newEntry.businessAddress = (businessAddress === false)? oldEntry.businessAddress : transformOIHAddressToMicrosoft(businessAddress);
    }

    if(otherAddress !== oldEntry.otherAddress){
      newEntry.otherAddress = (otherAddress === false)? oldEntry.otherAddress : transformOIHAddressToMicrosoft(otherAddress);
    }
  } else {
    newEntry.homeAddress = (homeAddress === false)? {} : transformOIHAddressToMicrosoft(homeAddress);
    newEntry.businessAddress = (businessAddress === false)? {} : transformOIHAddressToMicrosoft(businessAddress);
    newEntry.otherAddress = (otherAddress === false)? {} : transformOIHAddressToMicrosoft(otherAddress);
  }


  if(!oldEntry || typeof oldEntry !== 'object') {
    newEntry.givenName = entry.firstName;
    newEntry.surname = entry.lastName;
  }

  return newEntry;
}


function transformMicrosoftContactToOIHContact(contact) {
    const mapping = {
    assistantName: 'ignore',
    birthday: 'birthday',
    businessAddress: 'addresses',
    businessHomePage: ['contactData', 'website'],
    businessPhones: ['contactData', 'phone'],
    categories: 'categories',
    changeKey: 'ignore',
    children: 'ignore',
    companyName: 'name',
    createdDateTime: 'ignore',
    department: 'categories',
    displayName: 'displayName',
    emailAddresses: ['contactData', 'email'],
    fileAs: 'ignore',
    generation: 'ignore',
    givenName: 'firstName',
    homeAddress: 'addresses',
    homePhones: ['contactData', 'phone'],
    id: 'ignore',
    imAddresses: ['contactData', 'social'],
    initials: 'ignore',
    jobTitle: 'jobTitle',
    lastModifiedDateTime: 'ignore',
    manager: 'ignore',
    middleName: 'ignore',
    mobilePhone: ['contactData', 'mobil'],
    nickName: 'nickname',
    officeLocation: 'ignore',
    otherAddress: 'addresses',
    parentFolderId: 'ignore',
    personalNotes: 'notes',
    profession: 'title',
    spouseName: 'ignore',
    surname: 'lastName',
    title: 'ignore',
    yomiCompanyName: 'ignore',
    yomiGivenName: 'ignore',
    yomiSurname: 'ignore',
    photo: 'photo',
    folder: 'categories',
  };

  const addressMapping = {
    city: ['addresses', 'city'],
    countryOrRegion: ['addresses', 'country'],
    postalCode: ['addresses', 'zipcode'],
    state: ['addresses', 'state'],
    street: ['addresses', 'street'], // contains streetNumber too
    streetNumber: ['addresses', 'streetNumber'],
  };

  const newContact = {
    firstName: '',
    lastName: '',
    gender: '',
    jobTitle: '',
    nickname: '',
    displayName: '',
    middleName: '',
    salutation: '',
    title: '',
    birthday: '',
    addresses: [],
    contactData: [],
    categories: [],
  };

  let key;
  for(key in contact) {
    if(key in mapping) {
      if(mapping[key] !== 'ignore') {
        if(Array.isArray(mapping[key])) {
          if(mapping[key][0] === 'contactData') {
            if(key === 'emailAddresses') {
              for(let i=0; i<contact[key].length; i+=1) {
                newContact.contactData.push({"type": mapping[key][1],"value": contact[key][i].address});
              }
            } else if(key === 'homePhones' || key === 'businessPhones') {
              for(let i=0; i<contact[key].length; i+=1) {
                newContact.contactData.push({"type": mapping[key][1],"value": contact[key][i]});
              }
            }
          }
        } else if(mapping[key] === 'addresses'){
          let subKey;
          const newAddress = {};
          for(subKey in contact[key]) {
            if(subKey in addressMapping) {
              if(subKey === 'street') {
                let street = contact[key][subKey].trim().replace(/[\n]{2,}/u, '\n');
                street = street.split(' ');
                streetNumber = street.pop();
                street = street.join('\n');

                newAddress['street'] = street;
                newAddress['streetNumber'] = streetNumber;
              } else {
                newAddress[addressMapping[subKey][1]] = contact[key][subKey];
              }
            }
          }
          if(Object.keys(newAddress).length > 0) newContact.addresses.push(newAddress)
        } else if(mapping[key] === 'categories'){
          newContact[mapping[key]].push({"label": contact[key]});
        } else {
          newContact[mapping[key]] = contact[key];
        }
      }
    }
  }
  return newContact;
}

module.exports = {
  newMessage,
  mergeArrays,
  transformOIHAddressToMicrosoft,
  transformOIHContactToMicrosoftContact,
  transformMicrosoftContactToOIHContact,
};
