import React from 'react'

export const CaseIdContexte = React.createContext({
  caseid: '',
  setCaseId: (id: string) => {},
  nextStep: (step: number) => {},
})
