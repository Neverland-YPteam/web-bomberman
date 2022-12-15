import React from 'react'
import { create } from 'react-test-renderer'
import { FormLink } from './index'
import { BrowserRouter } from 'react-router-dom'

const props = {
  to: 'link',
  text: 'test link'
}

it('MainMenuItem snapshot', () => {
  const actualSnapshot = create(
    <BrowserRouter>
      <FormLink to={props.to} text={props.text} />
    </BrowserRouter>).toJSON()

  expect(actualSnapshot).toMatchSnapshot()
})
