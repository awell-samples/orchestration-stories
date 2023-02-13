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
    id: 'search-patients',
    title: 'Search patients',
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
  {
    id: 'activity-feed',
    title: 'Create an activity feed',
    description:
      'Create a chronological activity feed of everything that has happened in a pathway.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/activity-feed',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/activity-feed/index.tsx',
    categories: ['Activities', 'Pathway view'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'pathwayActivities',
      },
    ],
  },
  {
    id: 'conversational-form',
    title: 'Display a conversational form (questions one-by-one)',
    description:
      'Display a form in a conversational interface (question-by-question) and send the response back to the Awell API.',
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
    id: 'message',
    title: 'Display a message action',
    description:
      'Display a message with subject, content, and attachments to your clients. Additionally, let the Awell API known that the message was read.',
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/message',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/message/index.tsx',
    categories: ['Activities', 'Message'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'pathwayDataPointDefinitions',
      },
      {
        type: 'MUTATION',
        operationName: 'markMessageAsRead',
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
    id: 'timeline',
    title: 'Create a timeline view',
    description:
      "Construct a Gantt or Timeline-style view that gives your users a high-level view of a patient's progress through a care flow.",
    docsUrl:
      '/awell-orchestration/docs/use-cases/custom-integration/stories/timeline',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/timeline/index.tsx',
    categories: ['Elements', 'Pathway view'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'pathwayElements',
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
      'Keep clients in your environment by embedding the Awell hosted page.',
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
      'Render an activity feed or todo list for patients but use Awell Hosted Pages to interact with activities',
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
  {
    id: 'evaluate-display-logic',
    title: 'Evaluate display logic',
    description:
      'Learn how to render a form and evaluate display logic in the front-end',
    docsUrl: '#',
    codeUrl:
      'https://github.com/awell-health/orchestration-stories/blob/main/pages/stories/evaluate-display-logic/index.tsx',
    categories: ['Form'],
    operations: [
      {
        type: 'QUERY',
        operationName: 'form',
      },
    ],
  },
]
