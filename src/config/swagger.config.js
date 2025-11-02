const { application } = require("express");
const swaggerJSDocs = require("swagger-jsdoc");
const { object } = require("zod");
const { required } = require("zod/mini");
const { response } = require("../../app");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Note APP CRUD API",
      version: "1.0.0",
      description: "Simple CRUD API documented with OpenAPI",
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Server",
      },
    ],

    paths: {
      "/notes": {
        get: {
          summary: "Get all notes",
          tags: ["Notes"],
          responses: {
            200: {
              description: "A list of notes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Note" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new note",
          tags: ["Notes"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Note" },
              },
            },
          },
          responses: {
            201: { description: "Note created successfully" },
          },
        },
      },

      "/notes/{id}": {
        get: {
          summary: "Get an item by ID",
          tags: ["Notes"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Item found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Note",
                  },
                },
              },
            },
            404: {
              description: "Item not found",
            },
          },
        },

        put: {
          summary: "Update an existing item",
          tags: ["Notes"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewItem",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Item",
                  },
                },
              },
            },
          },
        },

        delete: {
          summary: "Delete an item",
          tags: ["Notes"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            204: {
              description: "Item deleted",
            },
          },
        },
      },

      "/auth/register": {
        post: {
          summary: "Register a new user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["emaili", "password"],
                  properties: {
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "mypassword" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "User registered successfully",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          username: { type: "string", example: "John Doe" },
                          email: {
                            type: "string",
                            example: "john@example.com",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { description: "Invalid input or user already exists" },
          },
        },
      },

      "/auth/login": {
        post: {
          summary: "Login user and return JWT",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "mypassword123" },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description: "Login successful, returns JWT token",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Login successful" },
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Invalid credentials" },
          },
        },
      },
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        Note: {
          type: "object",
          required: ["title", "content", "owner"],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated ID of the code",
            },
            title: {
              type: "string",
              description: "The title of the note",
            },
            content: {
              type: "string",
              description: "The content of the note",
            },
            owner: {
              type: "string",
              description: "The user ID who owns the note",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the note was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the note was last updated",
            },
          },
          example: {
            _id: "64bfa65e1f7a5d4a5b1e8f7a",
            title: "Meeting Notes",
            content: "Discuss project goals",
            owner: "64bf9d8d1f6b5d9a2c7b9f3e",
            createdAt: "2025-11-01T12:00:00.000Z",
            updatedAt: "2025-11-01T12:10:00.000Z",
          },
        },
      },
    },
  },
  apis: ["../routes/**/*.js"],
};

const swaggerDocs = swaggerJSDocs(options);

module.exports = swaggerDocs;
