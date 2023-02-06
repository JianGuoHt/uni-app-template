/**
 * 格式化数据 query staring Parameters
 * @param {object} params
 * @returns
 */
export function formatDataByQuery(params) {
  const entriesCode = Object.entries(params)
  const lengthNum = entriesCode.length
  let query = "?"
  entriesCode.forEach((item, index) => {
    query += `${item[0]}=${item[1]}${index === lengthNum - 1 ? "" : "&"}`
  })
  return query
}
