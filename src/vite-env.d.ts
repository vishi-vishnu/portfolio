/// <reference types="vite/client" />
declare const __COMMIT_SHA__: string
declare const __BUILD_TIME__: string

interface ImportMetaEnv {
  /** Optional web3forms.com access key. When set, contact messages go straight to my inbox. */
  readonly VITE_WEB3FORMS_KEY?: string
  /** Optional JSON form endpoint (e.g. Formspree). Used when no Web3Forms key is set. */
  readonly VITE_FORM_ENDPOINT?: string
}
