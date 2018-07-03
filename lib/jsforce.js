/**
 * Perform a SOQL Query
 * @param {object} org         - Salesforce org
 * @param {string} queryString - SOQL query
 * @return {Promise}           - Returns a response containing the queried records
 */
const query = (org, queryString) => org.query(queryString)

/**
 * Create a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordData  - Key value pair of Field Names and Field Values
 * @return {Promise}           - Returns a response containing the inserted record
 */
const createRecord = (org, sobjectName, recordData) =>
  org.sobject(sobjectName).create(recordData)
    

/**
 * Update a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @return {Promise}           - Returns a response containing the updated record
 */
const updateRecord = (org, sobjectName, recordDataWithID) =>
  org.sobject(sobjectName).update(recordDataWithID)

/**
 * Delete a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordId    - Id of record to be deleted
 * @return {Promise}           - Returns a response containing the deleted record
 */
const deleteRecord = (org, sobjectName, recordId) =>
  org.sobject(sobjectName).destroy(recordId)


/**
 * Upsert a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} externalIdField  - External Id Field of record to be upserted
 * @return {Promise}           - Returns a response containing the upserted record
 */
const upsertRecord = (org, sobjectName, recordDataWithID, externalIdField) =>
  org.sobject(sobjectName).upsert(recordDataWithID, externalIdField)

module.exports = {
  query,
  createRecord,
  updateRecord,
  deleteRecord,
  upsertRecord
}