interface Site {
  author: string
  baseUrl: string
  title: string
  description: string
  keywords?: string[]
  locale: string
}

interface Verify {
  google?: string
  yandex?: string
  bing?: string
}

export const site: Site = {
  author: 'Fauzira Alpiandi',
  baseUrl: 'https://nqs.zira.my.id',
  title: 'NextQuranic',
  description: 'Search and Shuffle',
  keywords: ['next', 'quranic', 'fauzira', 'alpiandi'],
  locale: 'en',
}

export const verify: Verify = {
  google: 'xuMdCxKom7IZ2YwCTzVJli3Sp_bvt-nofj8Q1iBjPf0',
}
