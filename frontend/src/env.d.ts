/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREABASE_MESSAGE_SENDER_ID: number
    readonly VITE_FIREABASE_APP_ID: string
    readonly VITE_FIREBASE_MEASUREMENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}