const {
  query,
  createRecord,
  updateRecord,
  deleteRecord,
  upsertRecord
} = require('../lib/jsforce')
const { mapRecordsToFields } = require('../lib/utils')

module.exports = org => {
  return {
    async getAccounts() {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c, ExtId__c from Account`
      )
      return response.records
    },

    async getAccountById(id) {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c, ExtId__c from Account WHERE Id = '${id}'`
      )
      return response.records
    },

    async getAccountByName(name) {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c, ExtId__c from Account WHERE Name = '${name}'`
      )
      return response.records
    },

    async createAccount(record) {
      const response = await createRecord(org, 'Account', record)
      record.Id = response.id
      return record
    },

    async updateAccount(record) {
      const response = await updateRecord(org, 'Account', record)
      return record
    },

    async deleteAccount(recordId) {
      const response = await deleteRecord(org, 'Account', recordId)
      response.Id = response.id
      return response
    },

    async upsertAccount(record, externalIdFieldName) {
      const response = await upsertRecord(org, 'Account', record, externalIdFieldName)
      record.Id = response.id
      return record
    },

    async createMultipleAccounts(records) {
      const response = await createRecord(org, 'Account', records)
      const recordsWithId = records.map((record, index) => {
        record.Id = response[index].id
        return record
      })
      return recordsWithId
    },

    async updateMultipleAccounts(records) {
      const response = await updateRecord(org, 'Account', records)
      return records
    },

    async deleteMultipleAccounts(recordIds) {
      const response = await deleteRecord(org, 'Account', recordIds)
      const recordsWithId = recordIds.map((recordId, index) => {
        return {
          Id: recordId
        }
      })
      return recordsWithId
    }
  }
}
