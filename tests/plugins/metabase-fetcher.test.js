import metabaseFetcher from '~/plugins/metabase-fetcher'

describe('MetabaseFetcher', () => {
  test('it should get session id', async () => {
    // given
    const axios = {
      $post: jest.fn().mockReturnValue({ id: 'session-id' }),
    }
    const credentials = {
      username: 'username',
      password: 'password',
    }

    // when
    await metabaseFetcher(axios, credentials)

    // then
    const expectedUrl = '/metabase/api/session'
    const expectedBody = credentials
    const expectedHeaders = { headers: { 'Content-Type': 'application/json' } }
    expect(axios.$post).toHaveBeenCalledWith(
      expectedUrl,
      expectedBody,
      expectedHeaders
    )
  })
})
