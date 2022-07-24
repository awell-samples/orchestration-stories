import { type Stories } from '@/types/stories.types'

export const stories: Stories = [
  {
    id: 'start-pathway',
    title: 'List of published pathways & start a pathway',
    description:
      'Display a list of published pathways, select a pathway and start it for an anonymous patient.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/start-pathway',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/start-pathway/index.tsx',
    categories: ['Start pathway'],
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
  {
    id: 'create-patient',
    title: 'Create patient',
    description:
      'Learn how to create a page that allows you to create a new patient in Awell.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/create-patient',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/create-patient/index.tsx',
    categories: ['Patients'],
    operations: [
      {
        type: 'MUTATION',
        operationName: 'createPatient',
      },
    ],
  },
  {
    id: 'patient-search',
    title: 'Patient search',
    description:
      'Learn how to create a search on patient code or national registry number',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/patient-search',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/patient-search/index.tsx',
    categories: ['Patients'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'searchPatientsByPatientCode',
      },
      {
        type: 'QUERY',
        operationName: 'searchPatientsByNationalRegistryNumber',
      },
    ],
  },
]
