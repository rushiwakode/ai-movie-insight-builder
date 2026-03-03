# 🎬 AI Movie Insight Builder

An AI-powered web application that fetches movie details using an IMDb ID and generates intelligent audience insights using OpenAI.

Built as part of a Full-Stack Internship Assignment to demonstrate API integration, AI usage, and modern UI development with Next.js.

---

## 🚀 Features

- 🔍 Fetch movie details using IMDb ID
- 🎥 Display movie title, poster, cast, release year & rating
- 📝 Show short plot summary
- 🌍 Fetch real audience reviews (via TMDB API)
- 🤖 AI-generated insight summary
- 📊 Sentiment classification (Positive / Mixed / Negative)
- ✅ Final recommendation (Good to Watch / Average / Not Recommended)
- ✍️ Users can submit their own reviews
- 🎨 Premium UI with animations

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Movie Data API:** OMDb API
- **Reviews API:** TMDB API
- **AI Analysis:** OpenAI API (gpt-4o-mini)

---

## 📂 Project Structure

ai-movie-insight-builder/
│
├── app/
│ ├── api/
│ │ ├── movie/
│ │ ├── reviews/
│ │ ├── sentiment/
│ │ └── summary/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
│
├── components/
│ ├── MovieCard.tsx
│ └── ReviewSummary.tsx
│
├── .env.local
├── tailwind.config.ts
├── postcss.config.js
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

````bash
git clone <your-repository-url>
cd ai-movie-insight-builder

### 2️⃣ Install Dependencies

```bash
npm install

### 3️⃣ Create Environment File

Create a file named:

```code
.env.local

Add the following keys:

```code
OMDB_API_KEY=your_omdb_key
TMDB_API_KEY=your_tmdb_key
OPENAI_API_KEY=your_openai_key


### 🔑 How to Get API Keys

## OMDb API

    Visit: http://www.omdbapi.com/apikey.aspx

    Generate and activate your key.

## TMDB API

    Visit: https://www.themoviedb.org/settings/api

    Create a Developer API key (v3).

## OpenAI API

    Visit: https://platform.openai.com/api-keys

    Generate a secret key.

## 4️⃣ Run Development Server

```bash
npm run dev

Open in your browser:

```code
http://localhost:3000

---

##🎯 How It Works

1. User enters an IMDb ID (e.g., tt0133093).

2. The app fetches movie details from OMDb.

3. Reviews are fetched from TMDB.

4. Reviews are sent to OpenAI for sentiment analysis.

5. AI generates:

    - Insight Summary

    - Audience Sentiment Classification

    - Highlights

    - Final Recommendation

## 📊 Sentiment Logic

- Positive → Movie is good to watch.

- Mixed → Movie is average; depends on viewer preference.

- Negative → Movie is generally not recommended.

## 🧠 AI Capabilities

* The AI analyzes:

    - Audience tone

    - Common praise points

    - Frequent complaints

    - Overall emotional trend

* And generates:

    - AI summary paragraph

    - Sentiment classification

    - Highlight points

    - Clear recommendation statement

## 💡 Example IMDb IDs

- tt0133093 — The Matrix

- tt0468569 — The Dark Knight

-- tt1375666 — Inception

- tt0816692 — Interstellar

## 🔮 Future Improvements

- Store user reviews in a database (MongoDB / Supabase)

- Add user authentication

- Add star rating system

- Add sentiment score visualization

- Deploy to Vercel for production

---

## 👨‍💻 Author

👤 **Rushikesh Parmeshwar Wakode**

* Github: [@rushiwakode](https://github.com/rushiwakode)
* LinkedIn: [@rushikesh-wakode](https://linkedin.com/in/rushikesh-wakode)


## Show your support

Give a ⭐️ if this project helped you!

***

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.
````
