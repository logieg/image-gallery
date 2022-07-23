# Stellus Image Gallery
A minimalist image gallery in NextJS with both server and client versions.

## About
More info coming soon.

## Commands
`npm install` - Install necessary dependencies for the project to run
`npm run dev` - Generate thumbnails and start the local development server
`npm run build` - Generate thumbnails and build the project for production (server version)
`npm run export` - (Not supported yet) Build the project for static-file deployment (client version)
`npm run thumbs` - Generate image thumbnails (can be used while dev server is running)

## Gallery Config
`public` - Whether the sourceDir path is relative to the "public" folder (used for client-only builds)
`sourceDir` - The source directory where images are located (can be an absolute or relative path)
`fileTypes` - An array of image file extensions to allow
