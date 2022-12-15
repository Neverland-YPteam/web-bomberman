import React from 'react'
import { create } from 'react-test-renderer'
import { SubmitButton } from '@atoms/submit-button/index'


it('SubmitButton snapshot', () => {
  const actualSnapshot = create(<SubmitButton>Text</SubmitButton>)
    .toJSON()

  expect(actualSnapshot).toMatchSnapshot()
})
