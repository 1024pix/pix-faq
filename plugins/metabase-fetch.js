export default function ($axios) {
  return {
    async getCard() {
      const headers = {
        'X-Metabase-Session': '',
      }

      const response = await $axios.$post(
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
