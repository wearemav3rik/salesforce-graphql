/**
 * Map salesforce response records to its fields
 * @param {list} records - list of records from salesforce response
 * @return {list} list of records which correspond to their fields
 */
const mapRecordsToFields = records => (
  records.reduce((result, record) => ([...result, record._fields]), [])
)

module.exports = {
  mapRecordsToFields
}