/// <reference types="vite/client" />
declare const __COMMIT_SHA__: string
declare const __BUILD_TIME__: string

interface ImportMetaEnv {
  /** Optional form endpoint (Formspree / Web3Forms). If empty, the contact form opens the mail app. */
  readonly VITE_FORM_ENDPOINT?: string
}
