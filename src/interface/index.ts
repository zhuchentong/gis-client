export * from './file-info.interface'
export * from './file-type.interface'

export interface IBackgroundEventListener {
  event: string
  handle: (e, args) => void
}