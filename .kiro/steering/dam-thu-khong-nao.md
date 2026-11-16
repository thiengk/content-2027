# Dám Thử Không Nào — Phân Tích Nghiệp Vụ

## 1. Tổng Quan Sản Phẩm

**Tên:** Dám Thử Không Nào  
**Domain:** damthukhongnao.com / damthukhongnao.vn  
**Concept:** Mỗi ngày một thử thách — cấm hoặc bắt buộc — cả cộng đồng/ hoặc 1 cá nhân cùng thực hiện trong 24 tiếng.  
**Đối tượng:** Gen Z Việt Nam, 18–28 tuổi, sống ở thành phố.  
**Mô hình:** Website tạo thử thách hàng ngày + POV video chứng minh trải nghiệm thật.

---

## 2. Hai Loại Thử Thách

### LOẠI 1 — CẤM (Don't)
> "Hôm nay không được..."

- Hài hước, dễ vi phạm
- Tạo drama tự nhiên cho POV
- Người xung quanh phản ứng bất ngờ

**Ví dụ:**
- Không được nói từ "OK" cả ngày
- Không được nhìn điện thoại khi ăn
- Không được đi thang máy
- Không được dùng Google Maps
- Không được gọi xe công nghệ

### LOẠI 2 — BẮT BUỘC (Do)
> "Hôm nay phải..."

- Tích cực, ấm áp
- Cảm xúc thật cho POV
- Dễ chia sẻ, dễ lan

**Ví dụ:**
- Phải khen một người thật lòng
- Phải nói chuyện với người bán hàng rong
- Phải khám phá một con ngõ chưa từng vào
- Phải ăn ở quán chưa từng đến
- Phải đi bộ ít nhất một đoạn trong ngày

### Lịch Xen Kẽ
```
Thứ 2 — CẤM
Thứ 3 — PHẢI
Thứ 4 — CẤM
Thứ 5 — PHẢI
Thứ 6 — CẤM
Thứ 7 — PHẢI (dài hơn, cuối tuần)
Chủ nhật — ĐẶC BIỆT (khó hơn, cả ngày)
```

---

## 3. Entity

```
CHALLENGE (thử thách)
- id
- type              // CAM | PHAI
- content           // "Không được nói từ OK cả ngày"
- category          // ngôn_ngữ | di_chuyển | ăn_uống | điện_thoại | xã_hội
- difficulty        // dễ | vừa | khó
- duration          // 2h | nửa_ngày | cả_ngày
- scheduled_date    // ngày áp dụng

DAY_CHALLENGE (thử thách của ngày)
- id
- challenge_id
- date              // ngày hôm đó
- participants      // số người tham gia

USER
- id
- username
- avatar
- city
- current_streak    // chuỗi ngày liên tiếp
- longest_streak
- total_completed   // tổng số thử thách đã hoàn thành
- joined_at

USER_LOG (kết quả của user)
- id
- user_id
- day_challenge_id
- status            // DOING | COMPLETED | FAILED
- fail_count        // số lần tự báo cáo vi phạm (loại CẤM)
- note              // ghi chú ngắn cuối ngày
- media_url         // ảnh hoặc clip optional
- submitted_at
```

---

## 4. User Flow

```
[SÁNG]
Vào web
  → Xem thử thách hôm nay
  → Thấy loại: CẤM hay PHẢI
  → Thấy số người đang tham gia
  → Bấm "Tôi chấp nhận" → bắt đầu

[TRONG NGÀY]
  → Sống theo thử thách
  → Insta360 / điện thoại ghi lại khoảnh khắc

[TỐI]
Vào web báo kết quả:
  → HOÀN THÀNH ✅ hoặc THẤT BẠI ❌
  → Nếu loại CẤM: báo vi phạm mấy lần
  → Thêm note ngắn hoặc ảnh/clip
  → Xem kết quả cộng đồng hôm đó
  → Streak +1 nếu hoàn thành

[SÁNG HÔM SAU]
  → Vào xem thử thách mới
  → Vòng lặp tiếp tục
```

---

## 5. API

```
GET  /today
     → Trả về thử thách của ngày hôm nay
     → Số người đang tham gia

POST /join
     → body: { user_id }
     → Xác nhận tham gia thử thách hôm nay

POST /submit
     → body: { user_id, status, fail_count, note, media_url }
     → Lưu kết quả cuối ngày
     → Tính streak

GET  /community/today
     → Danh sách kết quả cộng đồng hôm nay
     → Ai hoàn thành, ai thất bại, vi phạm bao nhiêu lần

GET  /me
     → Thông tin user: streak, tổng hoàn thành, lịch sử

GET  /leaderboard
     → Top streak hiện tại
```

---

## 6. Vòng Lặp Tăng Trưởng

```
Bạn đăng POV thực hiện thử thách hôm nay
          ↓
Người xem tò mò thử thách của mình sẽ thế nào
          ↓
Vào web nhận thử thách
          ↓
Thực hiện → check in kết quả
          ↓
Xem người khác trong cộng đồng làm thế nào
          ↓
Sáng mai vào xem thử thách mới
          ↓
Thấy video POV mới → xem tiếp
```

---

## 7. Cơ Chế Giữ Người Dùng

| Cơ chế | Mô tả |
|---|---|
| **Thử thách thay đổi mỗi ngày** | Lý do vào web mỗi sáng |
| **Streak** | Không muốn mất chuỗi ngày liên tiếp |
| **Kết quả cộng đồng** | Tò mò người khác làm thế nào |
| **Leaderboard** | Ai streak dài nhất |
| **Thử thách Chủ nhật đặc biệt** | Sự kiện hàng tuần |

---

## 8. Gamification

```
STREAK
  → Làm liên tiếp 7 ngày  → badge "Tuần Đầu"
  → Làm liên tiếp 30 ngày → badge "Tháng Vàng"
  → Mất streak → reset về 0

THÀNH TÍCH
  → Hoàn thành 10 thử thách loại CẤM → "Kẻ Kỷ Luật"
  → Hoàn thành 10 thử thách loại PHẢI → "Người Tử Tế"
  → Hoàn thành 1 thử thách Chủ nhật đặc biệt → "Dám Thật Sự"

SHARE
  → Sau khi submit → tạo card kết quả để share story
  → Card hiển thị: tên thử thách + streak + badge
```

---

## 9. Kho Thử Thách — Categories

### Ngôn Ngữ
- Không được nói "OK", "ừ", "được"
- Phải nói "cảm ơn" với mọi người phục vụ
- Không được dùng emoji khi nhắn tin

### Di Chuyển
- Không được gọi xe công nghệ
- Không được đi thang máy
- Phải đi bộ ít nhất 1 đoạn
- Không được dùng Google Maps

### Ăn Uống
- Phải ăn ở quán chưa từng đến
- Không được order đồ ăn online
- Gọi món không nhìn menu
- Không được nhìn điện thoại khi ăn

### Điện Thoại
- Không được mở TikTok
- Không được check điện thoại trong 2 tiếng đầu buổi sáng
- Phải để điện thoại màn hình úp xuống khi ăn

### Xã Hội
- Phải nói chuyện với người lạ
- Phải khen một người thật lòng
- Không được phàn nàn bất cứ điều gì
- Phải mỉm cười với người lạ đầu tiên nhìn vào mắt

---

## 10. Lộ Trình Phát Triển

### Giai Đoạn 1 — Validate (2–3 tuần)
- Bạn tự tạo 20–30 thử thách
- Làm POV thực hiện 4–5 thử thách đầu tiên
- Landing page đơn giản: hiển thị thử thách hôm nay
- Thu thập email người muốn tham gia

### Giai Đoạn 2 — MVP (4–6 tuần)
- Auth (Google / email)
- Hiển thị thử thách hàng ngày
- Join + Submit kết quả
- Streak cơ bản
- Feed cộng đồng đơn giản

### Giai Đoạn 3 — Mở Rộng
- Leaderboard
- Badge / gamification
- Share card
- User submit thử thách
- Thử thách theo nhóm bạn bè

---

## 11. Kết Nối POV — Website

| POV | Website |
|---|---|
| Bạn thực hiện thử thách hôm nay | Người xem vào web nhận thử thách |
| Video kết thúc bằng câu hỏi mở | Người xem tò mò thử thách của mình |
| Đăng ngắn hàng ngày (Insta360) | Mỗi ngày có thử thách mới để vào xem |
| Video dài cuối tuần (thử thách CN) | Thử thách Chủ nhật đặc biệt giữ user |

---

## 12. Nguyên Tắc Thiết Kế

> **Website phải hữu ích ngay cả khi không có video của bạn.**  
> **Video phải hấp dẫn ngay cả khi người xem chưa biết website.**

- Thử thách phải đủ cụ thể để thực hiện được ngay
- Không có phần thưởng vật chất — giá trị là cộng đồng và streak
- Tính trung thực là một phần của trải nghiệm — không cần verify phức tạp
- Mỗi thử thách phải làm được trong lịch đi làm bình thường

---

## 13. Công Nghệ Triển Khai

### Stack Chính

| Layer | Công nghệ | Lý do |
|---|---|---|
| **Frontend** | Next.js (App Router) | SEO tốt, server components, deploy dễ |
| **Backend** | Node.js + Express / Fastify | Quen thuộc, nhanh build |
| **Database** | Supabase (PostgreSQL) | Managed, free tier, Auth built-in |
| **Auth** | Supabase Auth (Google OAuth) | Không cần tự build, Gen Z dùng Google nhiều |
| **Deploy FE** | Cloudflare Pages | Free, CDN toàn cầu, auto deploy từ Git |
| **Deploy BE** | Render | Đơn giản, free tier ban đầu |
| **Media** | Cloudflare R2 | Free 10GB/tháng, lưu ảnh/clip user upload |
| **Scheduler** | node-cron (trên Render) | Tự động đổi thử thách lúc 00:00 mỗi ngày |

---

### Kiến Trúc Hệ Thống

```
[User]
  ↓
[Next.js — Cloudflare Pages]
  ↓                    ↓
[Supabase Client]   [Node.js API — Render]
  ↓                    ↓
[Supabase DB]       [node-cron scheduler]
                        ↓
                    [Supabase DB]
                    [Cloudflare R2]
```

**Nguyên tắc phân chia:**
- CRUD đơn giản (đọc thử thách, join, xem feed) → gọi thẳng Supabase client từ Next.js
- Logic phức tạp (tính streak, đổi thử thách hàng ngày, xử lý media) → qua Node.js API

---

### Chi Phí Vận Hành

| Dịch vụ | Giai đoạn 1 (MVP) | Giai đoạn 2 (Scale) |
|---|---|---|
| Cloudflare Pages | Free | Free |
| Render | Free (cold start ~30s) | $7/tháng (no cold start) |
| Supabase | Free (500MB) | $25/tháng (8GB) |
| Cloudflare R2 | Free (10GB) | $0.015/GB |
| **Tổng** | **$0/tháng** | **~$32/tháng** |

> **Lưu ý:** Cold start của Render free tier (~30s) xảy ra khi server idle. Với daily challenge — user vào buổi sáng đông → nên nâng lên paid tier $7/tháng sớm.

---

### Lộ Trình Upgrade Khi Scale

```
Giai đoạn 1 — MVP
  Render free + Supabase free
  Đủ cho ~1,000 user đầu tiên

Giai đoạn 2 — Tăng trưởng
  Render $7/tháng → hết cold start
  Supabase free vẫn đủ đến ~10,000 user

Giai đoạn 3 — Scale lớn
  Migrate backend sang Cloudflare Workers (edge, nhanh hơn)
  Supabase Pro $25/tháng
  Xem xét Redis cho caching leaderboard / streak
```

---

## 14. Thiết Kế Giao Diện

### Nguyên Tắc
- **Mobile-first** — thiết kế cho điện thoại trước, responsive lên desktop
- **Tối giản** — 1 màn hình 1 mục đích duy nhất
- **Bottom navigation** — điều hướng bằng ngón tay cái
- **Dark mode friendly** — Gen Z thích dark mode

---

### Màn Hình 1 — HOME / TODAY

```
┌─────────────────────────┐
│  Dám Thử Không Nào  🔥  │
├─────────────────────────┤
│                         │
│   THỨ 3 — 13/11         │
│                         │
│  ┌───────────────────┐  │
│  │      PHẢI         │  │  ← badge xanh (PHẢI) / đỏ (CẤM)
│  │                   │  │
│  │  Hôm nay phải     │  │
│  │  nói chuyện với   │  │
│  │  một người lạ     │  │
│  │                   │  │
│  │  ⏱ Cả ngày       │  │
│  └───────────────────┘  │
│                         │
│   👥 342 người đang thử │
│                         │
│  ┌───────────────────┐  │
│  │  TÔI CHẤP NHẬN   │  │  ← CTA chính, full width
│  └───────────────────┘  │
│                         │
│  🔥 Streak: 5 ngày      │
│                         │
└─────────────────────────┘
   [🏠 Home] [👥 Feed] [👤 Profile]
```

**Logic hiển thị:**
- Chưa join hôm nay → hiện nút "Tôi chấp nhận"
- Đã join, chưa submit → hiện nút "Báo kết quả"
- Đã submit → hiện kết quả của mình + nút "Xem cộng đồng"

---

### Màn Hình 2 — SUBMIT (Báo Kết Quả)

```
┌─────────────────────────┐
│  ← Báo kết quả hôm nay  │
├─────────────────────────┤
│                         │
│  "Nói chuyện với        │
│   người lạ"             │  ← nhắc lại thử thách
│                         │
│  Bạn đã làm được chưa?  │
│                         │
│  ┌────────┐ ┌────────┐  │
│  │   ✅   │ │   ❌   │  │  ← 2 lựa chọn lớn
│  │ XONG  │ │CHƯA ĐC│  │
│  └────────┘ └────────┘  │
│                         │
│  [Nếu CẤM: vi phạm?]    │
│  Số lần: [ - ] 0 [ + ]  │  ← stepper
│                         │
│  Ghi chú (không bắt buộc)│
│  ┌───────────────────┐  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  📷 Thêm ảnh/clip       │  ← optional
│                         │
│  ┌───────────────────┐  │
│  │      NỘP          │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

---

### Màn Hình 3 — COMMUNITY FEED

```
┌─────────────────────────┐
│  Cộng đồng hôm nay      │
├─────────────────────────┤
│                         │
│  "Nói chuyện với        │
│   người lạ"             │  ← thử thách hôm nay
│                         │
│  ✅ 287  ❌ 55           │  ← tổng kết nhanh
│                         │
├─────────────────────────┤
│ 🔥12  @minhtu_hcm       │
│ ✅ Xong! Hỏi chú bảo    │
│    vệ tên gì, ổng kể    │
│    cả đời luôn 😂        │
│                    5p   │
├─────────────────────────┤
│ 🔥7   @hanoi_girl       │
│ ✅ Khó nhưng làm được.  │
│    Cô bán bánh mì       │
│    super friendly ❤️     │
│                   12p   │
├─────────────────────────┤
│ 🔥3   @saigon_boy99     │
│ ❌ Tạch. Ngại quá trời  │
│    không dám mở miệng😅  │
│                   20p   │
├─────────────────────────┤
│        Load more        │
└─────────────────────────┘
   [🏠 Home] [👥 Feed] [👤 Profile]
```

---

### Màn Hình 4 — PROFILE

```
┌─────────────────────────┐
│         👤              │
│      @username          │
│      Hà Nội             │
├─────────────────────────┤
│                         │
│   🔥 Streak hiện tại    │
│        12 ngày          │
│                         │
│   🏆 Dài nhất: 23 ngày  │
│   ✅ Tổng hoàn thành: 34 │
│                         │
├─────────────────────────┤
│  BADGE ĐÃ ĐẠT           │
│  ┌────┐ ┌────┐ ┌────┐   │
│  │ 7  │ │ 🗣 │ │ 🚶 │   │
│  │ngày│ │Kỷ  │ │Di  │   │
│  │    │ │Luật│ │chuyển   │
│  └────┘ └────┘ └────┘   │
├─────────────────────────┤
│  LỊCH SỬ                │
│                         │
│  13/11 ✅ Nói chuyện... │
│  12/11 ✅ Không OK...   │
│  11/11 ❌ Không thang.. │
│  10/11 ✅ Khen người... │
│                         │
│         Xem thêm        │
└─────────────────────────┘
   [🏠 Home] [👥 Feed] [👤 Profile]
```

---

### Màn Hình 5 — SHARE CARD (Sau khi Submit)

```
┌─────────────────────────┐
│                         │
│   DÁM THỬ KHÔNG NÀO     │
│                         │
│   Hôm nay tôi đã thử:   │
│                         │
│  "Nói chuyện với        │
│   một người lạ"         │
│                         │
│        ✅ XONG          │
│                         │
│      🔥 12 ngày streak  │
│                         │
│   damthukhongnao.com    │
│                         │
└─────────────────────────┘
     [Lưu ảnh] [Chia sẻ]
```

---

### Desktop Layout

Trên desktop — chia 3 cột:

```
┌──────────┬──────────────────┬──────────┐
│          │                  │          │
│  Streak  │   TODAY CARD     │  Feed    │
│  Profile │   (center)       │  (right) │
│  Nav     │                  │          │
│          │  [CTA Button]    │          │
│          │                  │          │
└──────────┴──────────────────┴──────────┘
```

- Center column: nội dung chính (max-width 480px — giống mobile)
- Left: profile / streak / navigation
- Right: community feed

---

### Color Scheme (Gợi ý)

```
Background:  #0F0F0F (dark) / #FFFFFF (light)
Primary:     #FF4D4D (đỏ — CẤM)
Secondary:   #00C896 (xanh — PHẢI)
Accent:      #FFB800 (vàng — streak / badge)
Text:        #FFFFFF / #0F0F0F
Card:        #1A1A1A (dark) / #F5F5F5 (light)
```

### Typography
```
Font: Inter hoặc Be Vietnam Pro (hỗ trợ tiếng Việt tốt)
Heading: 700 weight
Body: 400 weight
CTA button: 600 weight, full width trên mobile
```
