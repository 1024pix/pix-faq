import mutations from '../../store/mutations'

describe('Mutations', () => {
  let state = {}

  beforeEach(() => {
    state = {
      hotNews: null,
      host: null,
      mainNavigations: [],
      mainFooters: [],
    }
  })

  it('sets the navigations from Prismic to state.mainNavigations', () => {
    // Given
    const navigations = [
      { id: 'X1ihHBEAGDVZKD-e5', type: 'main_navigation' },
      { id: 'C2ihJDFTEBDIZAPDLX-s9', type: 'main_navigation' },
    ]
    // When
    mutations.updateMainNavigations(state, navigations)
    // Then
    expect(state.mainNavigations).toEqual(navigations)
  })

  it('sets the footers from Prismic to state.mainFooters', () => {
    // Given
    const footers = [
      { id: 'X4WhtRIAACIAMkQp', type: 'main_footer' },
      { id: 'HUDKZOS7WhtRIp', type: 'main_footer' },
    ]
    // When
    mutations.updateMainFooters(state, footers)
    // Then
    expect(state.mainFooters).toEqual(footers)
  })

  describe('hot news', () => {
    it('sets the news from Prismic to state.hotNews when there are news', () => {
      // Given
      const news = {
        data: {
          description: [{ id: 1 }, { id: 2 }],
        },
      }
      // When
      mutations.updateHotNews(state, news)
      // Then
      expect(state.hotNews).toEqual(news.data.description)
    })

    it('sets state.hotNews to null when there are no new from Prismic', () => {
      const news = null
      // When
      mutations.updateHotNews(state, news)
      // Then
      expect(state.hotNews).toEqual(null)
    })
  })
})
