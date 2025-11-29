# 🚀 Quick Start - Deploy Tutorial PAI Website

## ⚡ Fastest Way to Deploy (5 Minutes)

### Step 1: Create D1 Database (1 min)
```bash
wrangler login
wrangler d1 create tutorial-pai-db
```

Copy the `database_id` from output, then update `wrangler.toml`:
```toml
database_id = "YOUR_DATABASE_ID_HERE"
```

### Step 2: Initialize Database (1 min)
```bash
wrangler d1 execute tutorial-pai-db --remote --file=./database/schema.sql
```

### Step 3: Build Project (2 min)
```bash
npm install
npm run pages:build
```

### Step 4: Deploy to Cloudflare Pages (1 min)
```bash
wrangler pages deploy .vercel/output/static --project-name=tutorial-pai-upi
```

### Step 5: Configure D1 Binding
1. Go to Cloudflare Pages Dashboard
2. Select your project → Settings → Functions
3. Add D1 database binding:
   - Variable name: `DB`
   - D1 database: `tutorial-pai-db`
4. Redeploy (automatic)

---

## 🎉 Done!

Your website is now live at:
**https://tutorial-pai-upi.pages.dev**

---

## 📝 Optional: Add Sample Data

```bash
wrangler d1 execute tutorial-pai-db --remote --command="
INSERT INTO calendar_events (id, title, description, category, date, time, location, created_at, updated_at)
VALUES 
  ('evt_001', 'Kuliah Dhuha: Adab Menuntut Ilmu', 'Kajian perdana semester genap dengan tema pentingnya adab dalam menuntut ilmu', 'Kajian', '2026-02-22', '07:30 - 09:00 WIB', 'Auditorium UPI', datetime('now'), datetime('now')),
  ('evt_002', 'Seminar PAI: AI dan Pendidikan Islam', 'Diskusi tentang peran teknologi AI dalam pengembangan pendidikan Islam modern', 'Seminar', '2026-02-25', '13:00 - 15:00 WIB', 'Auditorium UPI', datetime('now'), datetime('now')),
  ('evt_003', 'Bina Kader Batch 3', 'Program pelatihan kader untuk membentuk generasi muda yang beradab dan berperadaban', 'Program', '2026-03-01', '08:00 - 16:00 WIB', 'Gedung Isola', datetime('now'), datetime('now'));
"
```

---

## 🔐 Create Admin User

Generate password hash (use bcrypt with salt rounds 10), then:

```bash
wrangler d1 execute tutorial-pai-db --remote --command="
INSERT INTO users (id, email, name, password, role, created_at)
VALUES ('admin_001', 'admin@tutorialpai.upi.edu', 'Admin Tutorial PAI', 'YOUR_HASHED_PASSWORD', 'admin', datetime('now'));
"
```

---

## 🌐 Custom Domain (Optional)

1. Cloudflare Pages → Custom domains
2. Add domain: `tutorialpai.upi.edu`
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🐛 Troubleshooting

### Build fails?
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run pages:build
```

### API returns 500?
- Check D1 binding is configured correctly
- Verify database ID in `wrangler.toml`
- Check Cloudflare Pages Functions logs

### Database empty?
```bash
# Verify schema
wrangler d1 execute tutorial-pai-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"

# Re-run schema if needed
wrangler d1 execute tutorial-pai-db --remote --file=./database/schema.sql
```

---

## 📚 Full Documentation

For detailed instructions, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **README.md** - Project overview
- **PROGRESS.md** - Development progress

---

## ✅ Deployment Checklist

- [ ] D1 database created
- [ ] Database ID updated in wrangler.toml
- [ ] Schema initialized
- [ ] Project built successfully
- [ ] Deployed to Cloudflare Pages
- [ ] D1 binding configured
- [ ] Sample data added (optional)
- [ ] Admin user created
- [ ] Custom domain configured (optional)
- [ ] Website tested and working

---

**Need Help?** Check the full DEPLOYMENT.md guide or contact the development team.
