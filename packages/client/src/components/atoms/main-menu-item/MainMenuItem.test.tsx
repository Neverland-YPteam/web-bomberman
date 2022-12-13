import React from 'react'
import { create } from 'react-test-renderer'
import { MainMenuItem } from './index'
import { BrowserRouter } from 'react-router-dom'

const item = {
  title: 'Title',
  path: 'title'
}

it('MainMenuItem snapshot', () => {
  const actualSnapshot = create(
    <BrowserRouter>
      <MainMenuItem item={item} />
    </BrowserRouter>).toJSON()

  expect(actualSnapshot).toMatchSnapshot()
})
