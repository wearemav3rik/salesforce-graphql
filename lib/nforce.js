const nforce = require('nforce')

/**
 * Perform a SOQL Query
 * @param {object} org         - Salesforce org
 * @param {string} queryString - SOQL query
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}           - Returns a response containing the queried records
 */
const query = (org, queryString, oauth) =>
  new Promise((resolve, reject) => {
    org.query(
      {
        query: queryString,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          resolve(response.records)
        } else {
          reject(error)
        }
      }
    )
  })

/**
 * Create a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordData  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}           - Returns a response containing the inserted record
 */
const createRecord = (org, sobjectName, recordData, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordData)
  return new Promise((resolve, reject) => {
    org.insert(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          recordData.id = response.id
          resolve(recordData)
        } else {
          reject(error)
        }
      }
    )
  })
}

/**
 * Update a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}           - Returns a response containing the updated record
 */
const updateRecord = (org, sobjectName, recordDataWithID, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordDataWithID)
  return new Promise((resolve, reject) => {
    org.update(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          // resolve(response)
          resolve(recordDataWithID)
        } else {
          reject(error)
        }
      }
    )
  })
}

/**
 * Delete a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}           - Returns a response containing the deleted record
 */
const deleteRecord = (org, sobjectName, recordDataWithID, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordDataWithID)
  return new Promise((resolve, reject) => {
    org.delete(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          // resolve(response)
          resolve(recordDataWithID)
        } else {
          reject(error)
        }
      }
    )
  })
}

/**
 * Upsert a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}           - Returns a response containing the upserted record
 */
const upsertRecord = (org, sobjectName, recordDataWithID, oauth) => {
  const sobj = nforce.createSObject(sobjectName)
  const recordId = !!recordDataWithID.id ? recordDataWithID.id : ''
  sobj.setExternalId('Id', recordId)
  Object.entries(recordDataWithID).map(([key, value]) => {
    sobj.set(key, value)
  })
  return new Promise((resolve, reject) => {
    org.upsert(
      {
        sobject: sobj,
        oauth: oauth,
        requestOpts: {
          method: !recordId ? 'POST' : 'PATCH'
        }
      },
      (error, response) => {
        if (!error) {
          if(!recordId) {
            resolve(response)
          } else {
            resolve(recordDataWithID)
          }
        } else {
          reject(error)
        }
      }
    )
  })
}

module.exports = {
  query,
  createRecord,
  updateRecord,
  deleteRecord,
  upsertRecord
}