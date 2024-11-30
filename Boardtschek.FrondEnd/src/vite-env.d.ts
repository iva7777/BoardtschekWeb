/// <reference types="vite/client" />
// Extend the ImportMetaEnv interface to include your custom environment variables
interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Backend API URL
    readonly VITE_APP_NAME: string; // Optional: App name
    // Add other variables as needed
}

// This ensures TypeScript knows about `import.meta.env`
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

