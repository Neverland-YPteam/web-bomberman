import React, { Component } from 'react'
import './ErrorModal.css'
import { boundError } from '../../../utils/boundary-error/BoundaryError'


export class ErrorModal extends Component<boundError> {

  componentWillUnmount() {
    console.log('123421')
  }

  render = () => {
    return (
        <div className='error'>
          <div className='modal_error'>
            Упс! Что-то пошло не так.
          </div>
        </div>
    )
  }
}
