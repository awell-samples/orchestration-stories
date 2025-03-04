import { type Stories } from '@/types/stories.types'

export const stories: Stories = [
  {
    id: 'start-pathway',
    title: 'List of published pathways & start a pathway',
    description:
      'Display a list of published pathway definitions, select a pathway and start it for a patient.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/start-pathway',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/start-pathway/index.tsx',
    categories: ['Pathway'],
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
    id: 'conversational-form',
    title: 'Display a conversational form (questions one-by-one)',
    description:
      'Learn how to display a form in a conversational interface (question-by-question).',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/conversational-form',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/conversational-form/index.tsx',
    categories: ['Activities', 'Form'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'form',
      },
      {
        type: 'MUTATION',
        operationName: 'evaluateFormRules',
      },
      {
        type: 'MUTATION',
        operationName: 'submitFormResponse',
      },
    ],
  },
  {
    id: 'form',
    title: 'Display an Awell form',
    description:
      'Learn how to display an Awell form and evaluate display logic',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/form',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/form/index.tsx',
    categories: ['Activities', 'Form'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'form',
      },
      {
        type: 'MUTATION',
        operationName: 'evaluateFormRules',
      },
      {
        type: 'MUTATION',
        operationName: 'submitFormResponse',
      },
    ],
  },
  {
    id: 'data-dictionary',
    title: 'Create a data dictionary',
    description:
      'Create a data dictionary displaying all data points that are collected in a given pathway version.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/data-dictionary',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/data-dictionary/index.tsx',
    categories: ['Data'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'pathwayDataPointDefinitions',
      },
    ],
  },
  {
    id: 'patient-list',
    title: 'Create a patient list',
    description:
      'Create a dashboard or list of all patients in your tenant with filters and pagination.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/patient-list',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/patient-list/index.tsx',
    categories: ['Patients'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'patients',
      },
    ],
  },
  {
    id: 'patient-profile',
    title: 'Create a patient profile page',
    description:
      'Create a patient profile page that lists all patient data and allows to update patient data.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/patient-profile',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/patient-profile/index.tsx',
    categories: ['Patients'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'patient',
      },
      {
        type: 'MUTATION',
        operationName: 'updatePatient',
      },
    ],
  },
  {
    id: 'hosted-pathway',
    title: 'Awell hosted pathway',
    description:
      'Send your clients to an Awell hosted page to complete an onboarding flow or simple pathway.',
    docsUrl: '/awell-orchestration/docs/use-cases/hosted-pathway',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/hosted-pathway/index.tsx',
    categories: ['Hosted pathway'],
    operations: [
      {
        type: 'MUTATION',
        operationName: 'startHostedPathwaySession',
      },
    ],
  },
  {
    id: 'hosted-pathway-embed',
    title: 'Awell hosted pathway (embedded)',
    description:
      'Keep users in your environment by embedding Awell Hosted Pages in your app.',
    docsUrl: '/awell-orchestration/docs/use-cases/hosted-pathway',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/hosted-pathway-embed/index.tsx',
    categories: ['Hosted pathway'],
    operations: [
      {
        type: 'MUTATION',
        operationName: 'startHostedPathwaySession',
      },
    ],
  },
  {
    id: 'hosted-activity',
    title: 'Awell hosted activity',
    description:
      'Send stakeholders to an Awell hosted page to complete activities.',
    docsUrl: '/awell-orchestration/docs/use-cases/hosted-activity',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/hosted-activity/index.tsx',
    categories: ['Hosted activity'],
    operations: [
      {
        type: 'MUTATION',
        operationName: 'startHostedActivitySession',
      },
    ],
  },
  {
    id: 'patient-activity-feed-with-hosted-pages',
    title: 'Patient activity feed with Awell Hosted Pages',
    description:
      'Render an activity feed for patients and use Awell Hosted Pages to interact with activities',
    docsUrl: '#',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/patient-activity-feed-with-hosted-pages/index.tsx',
    categories: ['Pathway', 'Activities', 'Hosted activity'],
    operations: [
      {
        type: 'MUTATION',
        operationName: 'myPendingActivities',
      },
      {
        type: 'MUTATION',
        operationName: 'startHostedActivitySession',
      },
    ],
  },
]
