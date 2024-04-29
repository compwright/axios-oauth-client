export function fakeAxios (actualConfig, expectedData = {}) {
  return async function (config) {
    Object.assign(actualConfig, config)
    return { data: expectedData }
  }
}
