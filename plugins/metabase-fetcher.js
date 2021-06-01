async function _getMetabaseSessionId(axios, credentials) {
  const sessionUrl = '/metabase/api/session'
  const headers = { 'Content-Type': 'application/json' }
  const response = await axios.$post(sessionUrl, credentials, { headers })

  return response.id
}

export default async function (axios, credentials) {
  const sessionId = await _getMetabaseSessionId(axios, credentials)

  return {
    async getCard() {
      const headers = {
        'X-Metabase-Session': sessionId,
      }

      const response = await axios.$post(
        '/metabase/api/card/950/query/json',
        null,
        {
          headers,
        }
      )

      return response.reduce(
        (acc, current) => {
          acc.value.push(current['Nombre de lignes'])
          acc.label.push(current['Created At'])
          return acc
        },
        { value: [], label: [] }
      )
    },
  }
}
