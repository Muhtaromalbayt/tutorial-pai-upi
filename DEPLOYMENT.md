# 🚀 Deployment Guide - Tutorial PAI UPI Website

## Prerequisites
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- Git repository connected to Cloudflare Pages

---

## 📦 Step 1: Setup D1 Database

### 1.1 Create D1 Database
```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create tutorial-pai-db
```

### 1.2 Update wrangler.toml
Copy the `database_id` from the output and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "tutorial-pai-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID
```

### 1.3 Initialize Database Schema
```bash
# Run schema locally first
wrangler d1 execute tutorial-pai-db --local --file=./database/schema.sql

# Then run on production
wrangler d1 execute tutorial-pai-db --remote --file=./database/schema.sql
```

### 1.4 Seed Sample Data (Optional)
```bash
# Create sample events
wrangler d1 execute tutorial-pai-db --remote --command="
INSERT INTO calendar_events (id, title, description, category, date, time, location)
VALUES 
  ('evt_001', 'Kuliah Dhuha: Adab Menuntut Ilmu', 'Kajian perdana semester genap', 'Kajian', '2026-02-22', '07:30 - 09:00 WIB', 'Auditorium UPI'),
  ('evt_002', 'Seminar PAI: AI dan Pendidikan Islam', 'Diskusi teknologi AI dalam pendidikan Islam', 'Seminar', '2026-02-25', '13:00 - 15:00 WIB', 'Auditorium UPI'),
  ('evt_003', 'Bina Kader Batch 3', 'Program pelatihan kader', 'Program', '2026-03-01', '08:00 - 16:00 WIB', 'Gedung Isola');
"
```

---

## 🔧 Step 2: Configure Cloudflare Pages

### 2.1 Build Settings
In Cloudflare Pages dashboard:
- **Framework preset**: Next.js
- **Build command**: `npm run pages:build`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/`
- **Node version**: 18 or higher

### 2.2 Environment Variables
Add these in Cloudflare Pages → Settings → Environment Variables:

**Production:**
- `NODE_VERSION`: `18`
- `NEXT_PUBLIC_APP_URL`: `https://your-domain.pages.dev`

### 2.3 Bind D1 Database
In Cloudflare Pages → Settings → Functions:
- Add D1 database binding
- Variable name: `DB`
- D1 database: Select `tutorial-pai-db`

---

## 🌐 Step 3: Deploy to Cloudflare Pages

### Option A: Deploy via Git (Recommended)
1. Push your code to GitHub/GitLab
2. Connect repository to Cloudflare Pages
3. Cloudflare will auto-deploy on every push

### Option B: Deploy via Wrangler CLI
```bash
# Build the project
npm run pages:build

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=tutorial-pai-upi
```

---

## 🧪 Step 4: Test Deployment

### 4.1 Test API Endpoints
```bash
# Test calendar API
curl https://your-domain.pages.dev/api/calendar

# Test kuliah dhuha API
curl https://your-domain.pages.dev/api/kuliah-dhuha
```

### 4.2 Test Admin Pages
1. Visit `https://your-domain.pages.dev/admin/login`
2. Login with admin credentials
3. Test CRUD operations for:
   - Calendar events (`/admin/calendar`)
   - Kuliah Dhuha schedules (`/admin/kuliah-dhuha`)

---

## 🔐 Step 5: Setup Admin User

### Create First Admin User
```bash
# Generate password hash (use bcrypt online tool or Node.js)
# Then insert admin user
wrangler d1 execute tutorial-pai-db --remote --command="
INSERT INTO users (id, email, name, password, role)
VALUES ('admin_001', 'admin@tutorialpai.upi.edu', 'Admin Tutorial PAI', 'HASHED_PASSWORD_HERE', 'admin');
"
```

---

## 📝 Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Go to Cloudflare Pages → Custom domains
2. Add your domain (e.g., `tutorialpai.upi.edu`)
3. Update DNS records as instructed

### 6.2 Update Environment Variables
Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## 🐛 Troubleshooting

### Build Fails
- Check Node version is 18+
- Ensure all dependencies are installed
- Check build logs in Cloudflare Pages

### Database Connection Issues
- Verify D1 binding is configured correctly
- Check database ID in `wrangler.toml`
- Ensure schema is initialized

### API Returns 500 Error
- Check Cloudflare Pages Functions logs
- Verify D1 database binding name is `DB`
- Test locally with `npm run dev`

---

## 🔄 Local Development with D1

### Run with Local D1 Database
```bash
# Start local dev server with D1
npm run dev

# In another terminal, run local D1
wrangler d1 execute tutorial-pai-db --local --file=./database/schema.sql
```

---

## 📊 Monitoring

### View Logs
```bash
# View deployment logs
wrangler pages deployment list --project-name=tutorial-pai-upi

# View function logs
wrangler pages deployment tail --project-name=tutorial-pai-upi
```

### Database Queries
```bash
# Query database
wrangler d1 execute tutorial-pai-db --remote --command="SELECT * FROM calendar_events LIMIT 10;"
```

---

## ✅ Deployment Checklist

- [ ] D1 database created and configured
- [ ] Database schema initialized
- [ ] Sample data seeded (optional)
- [ ] Cloudflare Pages project created
- [ ] Build settings configured
- [ ] D1 binding added to Functions
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] API endpoints tested
- [ ] Admin user created
- [ ] Custom domain configured (optional)

---

## 🎉 Success!

Your Tutorial PAI UPI website should now be live at:
- **Pages URL**: `https://tutorial-pai-upi.pages.dev`
- **Custom Domain**: `https://your-domain.com` (if configured)

**Admin Panel**: `https://your-domain.com/admin/login`

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
