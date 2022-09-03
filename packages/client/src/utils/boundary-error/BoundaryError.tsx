import { Component, ErrorInfo, HTMLAttributes } from 'react'
import {ErrorModal} from '../../components/atoms/error-modal/ErrorModal'

export type boundError = {
  hasError: boolean

}

export class BoundaryError extends Component<HTMLAttributes<HTMLHtmlElement>> {
  state: boundError

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('COMPONENT ERROR', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal hasError={this.state.hasError}/>
    }
    return this.props.children
  }
}
