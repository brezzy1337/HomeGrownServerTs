import { generateOpenApiDocument } from 'trpc-openapi';

import trcpRouter from '@src/routes/trpcRouter';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(trcpRouter, {
  title: 'Homegrown CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Express',
  version: '1.0.0',
  baseUrl: 'http://localhost:1337/api',
  docsUrl: 'https://github.com/jlalmes/trpc-openapi',
  tags: ['auth', 'users', 'posts'],
});