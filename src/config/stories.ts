import { type Stories } from '@/types/stories.types'

export const stories: Stories = [
  {
    id: 'published_pathways_and_start_pathway',
    title: 'List of published pathways & start a pathway',
    description:
      'Display a list of published pathways, select a pathway and start it for an anonymous patient.',
    docsUrl: 'https://developers.awellhealth.com/',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/start-pathway/index.tsx',
    path: '/stories/start-pathway',
    operations: [
      {
        type: 'QUERY',
        operationName: 'publishedPathwayDefinitions',
      },
      {
        type: 'MUTATION',
        operationName: 'createPatient',
      },
      {
        type: 'MUTATION',
        operationName: 'startPathway',
      },
    ],
  },
]
