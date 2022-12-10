interface IPreloadedState {
  user: IUserState
}

declare const __SERVER_PORT__: number

declare interface Window {
  __PRELOADED_STATE__?: IPreloadedState
}
