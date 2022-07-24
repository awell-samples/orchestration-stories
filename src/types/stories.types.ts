export type Story = {
  id: string
  title: string
  description: string
  docsUrl: string
  codeUrl: string
  categories?: string[]
  operations?: { type: 'QUERY' | 'MUTATION'; operationName: string }[]
}

export type Stories = Array<Story>
