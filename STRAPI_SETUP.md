# Strapi 5 Setup Guide

Complete guide to setting up Strapi 5 API access and live updates for your SolarTech website.

---

## Quick Start Checklist

- [ ] Start Strapi: `cd backend && npm run develop`
- [ ] Create admin account at http://localhost:1337/admin
- [ ] Enable public API permissions for blog-posts
- [ ] Create a webhook for live revalidation
- [ ] Add sample blog content

---

## Step 1: Start Strapi Backend

```bash
npm run setup   # first-time install (repo root)
npm run dev     # starts frontend + backend

# Or backend only:
cd backend && npm run develop
```

First run will prompt you to create an admin account.

---

## Step 2: Create Admin Account

1. Go to: **http://localhost:1337/admin**
2. Fill in the registration form:
   - First name
   - Last name  
   - Email
   - Password (min 8 characters)
3. Click **"Let's start"**

---

## Step 3: Enable Public API Access

This allows the Next.js frontend to fetch blog posts without authentication.

1. In Strapi admin, go to: **Settings** (gear icon in sidebar)
2. Click: **Users & Permissions Plugin → Roles**
3. Click on: **Public**
4. Expand: **Blog-post**
5. Enable these permissions:
   - ✅ **find** (fetch all posts)
   - ✅ **findOne** (fetch single post by slug)
6. Click **Save**

> **Security Note**: Only enable `find` and `findOne` for public access. Never enable `create`, `update`, or `delete` for the Public role.

---

## Step 4: Set Up Webhook for Live Updates

This makes your Next.js site update automatically when you edit content in Strapi.

### 4.1 Add Environment Variable

Add to your Next.js `.env.local` file:

```env
REVALIDATE_SECRET=your-super-secret-token-here
```

### 4.2 Configure Webhook in Strapi

1. In Strapi admin, go to: **Settings → Webhooks**
2. Click: **Create new webhook**
3. Configure:

| Field | Value |
|-------|-------|
| **Name** | Next.js Revalidation |
| **URL** | `http://localhost:3000/api/revalidate` |
| **Headers** | `Authorization: Bearer your-super-secret-token-here` |

4. Select events to trigger on:
   - ✅ Entry: `create`
   - ✅ Entry: `update`
   - ✅ Entry: `delete`
   - ✅ Entry: `publish`
   - ✅ Entry: `unpublish`

5. Click **Save**

### 4.3 For Production

When deploying, update the webhook URL to your production domain:

```
https://your-domain.com/api/revalidate
```

---

## Step 5: Create Blog Content

1. In Strapi admin sidebar, click: **Content Manager**
2. Click: **Blog Post**
3. Click: **Create new entry**
4. Fill in the fields:

| Field | Description |
|-------|-------------|
| **title** | Article headline |
| **slug** | Auto-generated from title (URL-friendly) |
| **excerpt** | Short summary (shown in listing) |
| **content** | Full article content (supports rich text) |
| **featuredImage** | Upload a cover image |
| **author** | Author name |
| **category** | Select from dropdown |

5. Click **Save**
6. Click **Publish** to make it live

---

## API Endpoints

Once configured, these endpoints are available:

| Endpoint | Description |
|----------|-------------|
| `GET /api/blog-posts` | Fetch all published posts |
| `GET /api/blog-posts?filters[slug][$eq]=my-post` | Fetch single post by slug |
| `GET /api/blog-posts?populate=featuredImage` | Include images |
| `GET /api/blog-posts?sort=publishedAt:desc` | Sort by newest |

### Example API Call

```bash
curl http://localhost:1337/api/blog-posts?populate=featuredImage
```

### Response Format (Strapi 5)

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "My Blog Post",
      "slug": "my-blog-post",
      "excerpt": "Short description...",
      "content": "Full content...",
      "author": "John Doe",
      "publishedAt": "2025-12-11T10:00:00.000Z",
      "featuredImage": {
        "url": "/uploads/image.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## How Live Updates Work

```
┌──────────────┐     Webhook POST     ┌──────────────────┐
│              │ ─────────────────────▶│                  │
│   Strapi     │  Content Changed     │  Next.js API     │
│   Admin      │                      │  /api/revalidate │
│              │                      │                  │
└──────────────┘                      └────────┬─────────┘
                                               │
                                               │ revalidatePath()
                                               ▼
                                      ┌──────────────────┐
                                      │                  │
                                      │  Next.js Pages   │
                                      │  /blog, /blog/*  │
                                      │                  │
                                      └──────────────────┘
```

1. You edit content in Strapi
2. Strapi sends webhook to Next.js
3. Next.js revalidates affected pages
4. Users see updated content immediately

---

## Troubleshooting

### API returns 403 Forbidden
- **Cause**: Public permissions not enabled
- **Fix**: Go to Settings → Roles → Public and enable `find`/`findOne`

### Webhook not triggering
- **Cause**: Wrong URL or missing authorization header
- **Fix**: Verify URL is correct and Bearer token matches `.env.local`

### Content not updating
- **Cause**: Post is in draft status
- **Fix**: Click "Publish" button in Strapi admin

### Images not loading
- **Cause**: CORS or wrong URL
- **Fix**: Verify `NEXT_PUBLIC_STRAPI_URL` in your environment

---

## Production Deployment Tips

1. **Strapi Cloud**: Easy hosting at https://cloud.strapi.io
2. **Database**: Switch from SQLite to PostgreSQL for production
3. **Media**: Use Cloudinary or AWS S3 for image uploads
4. **Secrets**: Use proper environment variables, never commit secrets

### Required Environment Variables

**Next.js (.env.local)**
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.cloud.strapi.io
REVALIDATE_SECRET=your-secret-token
```

**Strapi (.env)**
```
DATABASE_URL=postgresql://...
CLOUDINARY_API_KEY=...
```
