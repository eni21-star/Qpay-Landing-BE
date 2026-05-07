# Qpay Landing Backend API Guide

This document is for frontend integration with the deployed Qpay landing backend.

Base URL:
`https://landingpageqpay.mythriftpayments.cc`

OpenAPI file:
[docs/openapi.yaml](/Users/eniolacaleb/Documents/Qpay%20Landing%20BE/docs/openapi.yaml:1)

## Authentication

All protected requests must include the `x-api-key` header.

Important:
The current backend expects the value in bearer-style format, not just the raw key.

Use:

```http
x-api-key: Bearer YOUR_SERVER_API_KEY
```

## Endpoints

### 1. Health Check

`GET /health`

Use this to confirm the API is reachable.

Example request:

```bash
curl --request GET \
  --url https://landingpageqpay.mythriftpayments.cc/health
```

Success response:

```json
{
  "success": true,
  "message": "Server is healthy."
}
```

### 2. Submit Contact Question

`POST /api/v1/contact`

This endpoint accepts a user email and question text and stores the submission.

Request headers:

```http
Content-Type: application/json
x-api-key: Bearer YOUR_SERVER_API_KEY
```

Request body:

```json
{
  "email": "user@example.com",
  "question": "I want to know more about Qpay pricing and onboarding."
}
```

Validation rules:

- `email` must be a valid email address.
- `question` is required.
- `question` must be at least 10 characters.
- `question` must not exceed 2000 characters.
- Unknown extra fields are rejected by validation.

Success response:

```json
{
  "success": true,
  "message": "Question submitted successfully.",
  "data": {
    "id": "681a24c6ef51f18b39c25cab",
    "email": "user@example.com",
    "question": "I want to know more about Qpay pricing and onboarding.",
    "createdAt": "2026-05-06T14:40:12.923Z"
  }
}
```

## Error Handling

### 401 Unauthorized

Returned when the API key is missing or invalid.

Example:

```json
{
  "success": false,
  "message": "Missing API key."
}
```

or

```json
{
  "success": false,
  "message": "Invalid API key."
}
```

### 422 Validation Error

Returned when `email` or `question` fails validation.

Example:

```json
{
  "success": false,
  "message": "email must be an email"
}
```

Possible validation messages include:

- `email must be an email`
- `question should not be empty`
- `question must be longer than or equal to 10 characters`
- `question must be shorter than or equal to 2000 characters`

### 429 Too Many Requests

The server uses rate limiting. If the client sends too many requests in a short period, the API may reject the request.

Typical response shape:

```json
{
  "message": "Too many requests, please try again later."
}
```

### 500 Server Error

Returned for unexpected server errors or missing server configuration.

Example:

```json
{
  "success": false,
  "message": "Internal server error."
}
```

## Frontend Usage Example

### Fetch Example

```ts
const apiKey = 'YOUR_SERVER_API_KEY';

const response = await fetch('https://landingpageqpay.mythriftpayments.cc/api/v1/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    email: 'user@example.com',
    question: 'I want to know more about Qpay pricing and onboarding.',
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Request failed');
}

console.log(data);
```

## Integration Notes

- Do not send the API key as a query parameter.
- Always send JSON for the contact submission endpoint.
- Use the `message` field from error responses for frontend notifications.
- Use the `data` object from the success response to confirm submission details.
- If you want a Swagger UI later, this OpenAPI file can be used directly as the source.
