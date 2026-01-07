# ☕ CafeApp – QR Tabanlı Akıllı Kafe Sipariş Sistemi

CafeApp, bir kafede masaya oturur oturmaz garsonun gelip sipariş beklemesi,
müşterinin karar veremediğinde garsonun masada beklemesi gibi
**rahatsız edici ve verimsiz süreçleri ortadan kaldırmak** amacıyla geliştirilmiş
uçtan uca bir sipariş ve yönetim sistemidir.

Bu sistemde müşteri tamamen **kendi temposunda** sipariş verir,
ekip ise siparişleri **net, düzenli ve senkron** şekilde yönetir.

---

## 🎯 Amaç

- Müşteri masaya oturduğunda **garsonun hemen gelmesini zorunlu kılmamak**
- Müşterinin QR kod üzerinden menüyü inceleyip **rahatça sipariş oluşturmasını sağlamak**
- Sipariş sürecini mutfak, garson ve kasa arasında **net şekilde ayırmak**
- Kafe operasyonlarını daha **hızlı, sessiz ve düzenli** hale getirmek

---

## 🧠 Sistem Nasıl Çalışır?

### 1️⃣ Müşteri Deneyimi
- Müşteri masada bulunan **QR kodu** telefonuyla okutur
- QR kod, masaya özel olarak CafeApp sitesini açar
- Müşteri:
  - Menüyü inceler
  - Ürünleri sepete ekler
  - Siparişini oluşturur
- Sipariş sonrası:
  - Sipariş durumunu (hazırlanıyor / hazır) canlı olarak takip edebilir
- Ödeme:
  - Müşteri kasaya gider
  - Garson ile birlikte **masa numarasına göre ödeme** alınır (nakit / kart)

> 🎯 Amaç:  
> Garson sipariş beklemez, müşteri acele etmez.

---

### 2️⃣ Mutfak Dashboard
- Mutfak ekranında **aktif siparişler** listelenir
- Siparişler durum bazlı yönetilir:
  - Yeni
  - Hazırlanıyor
  - Hazır
- Sipariş “Hazır” durumuna çekildiğinde garson ekranına otomatik yansır

---

### 3️⃣ Garson Dashboard
- Garson:
  - Hazır siparişleri görür
  - Siparişi servise götürür
- Ödeme aşamasında:
  - Masa numarasına göre siparişi açar
  - Ödeme alınır
  - Sipariş kapatılır

---

## 🧩 Sistem Mimarisi

Proje **Clean Architecture** yaklaşımıyla geliştirilmiştir.

---

## 🛠️ Kullanılan Teknolojiler

### 🔹 Frontend
- **Next.js 16**
- React 19
- TypeScript
- Tailwind CSS
- Recharts (Dashboard grafikler)
- Axios
- Zod
- Sonner (Toast & bildirimler)

### 🔹 Backend
- **.NET 9**
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- MediatR (CQRS)
- FluentValidation
- JWT Authentication
- Generic Repository Pattern

---

- Rol bazlı ekranlar:
  - Admin
  - Mutfak
  - Garson

---

## 🔐 Güvenlik & Yetkilendirme

- JWT tabanlı authentication
- Rol bazlı erişim kontrolü
- Yetkisiz kullanıcılar için:
  - 401 / 403 özel sayfaları
- Müşteri tarafı login gerektirmez (QR bazlı erişim)

---

## 🚀 Kurulum

### Backend

```bash
dotnet restore
dotnet ef database update
dotnet run
```
### Frontend

```bash
npm install
npm run dev


