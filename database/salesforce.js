const {
  query,
  createRecord,
  updateRecord,
  deleteRecord,
  upsertRecord
} = require('../lib/nforce')
const { mapRecordsToFields } = require('../lib/utils')

module.exports = org => {
  return {
    async getAccounts() {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c from Account`,
        null
      )
      return mapRecordsToFields(response)
    },

    async getAccountById(id) {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c from Account WHERE Id = '${id}'`,
        null
      )
      return mapRecordsToFields(response)
    },

    async getAccountByName(name) {
      const response = await query(
        org,
        `select Id, Name, Description, SLA__c from Account WHERE Name = '${name}'`,
        null
      )
      return mapRecordsToFields(response)
    },

    async createAccount(record) {
      const response = await createRecord(org, 'Account', record, null)
      record.id = response.id
      return record
    },

    async updateAccount(record) {
      const response = await updateRecord(org, 'Account', record, null)
      return record
    },

    async deleteAccount(record) {
      const response = await deleteRecord(org, 'Account', record, null)
      record.id = response.id
      return record
    },

    async upsertAccount(record) {
      const response = await upsertRecord(org, 'Account', record, null)
      record.id = response.id
      return record
    }
  }
}
