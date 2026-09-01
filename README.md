# SkillBridge Connect

Build a complete, responsive, modern web application called SkillPulse for Smart India Hackathon problem statement SIH26134 ("Challenges in aligning skill development programs with industry requirements and emerging job market demands", Theme: Miscellaneous, PS Category: Software).

Goal: a genuinely clickable working prototype demonstrating Student Skills → Skill Gap Analysis → Industry Requirements → Recommended Learning → Job Readiness. Not just a static UI — every major feature must have a visible, working output.

TECH: React + Vite + Tailwind CSS + TypeScript, Recharts for charts, Lucide React for icons, LocalStorage for demo persistence, mock JSON data files for jobs/skills/industry requirements/courses/careers/students/assessments/notifications. No real backend or paid API needed for the core demo — everything is rule-based/local. Clean reusable components, organized folder structure (e.g. src/data/skills.js, jobs.js, courses.js, industryDemand.js, etc).

DESIGN: Professional SIH-level dashboard — white background, light blue accents, dark blue text, blue gradients used minimally, rounded cards, clean typography, responsive layout, professional charts, minimal animations, strong desktop presentation, mobile responsive. Avoid excessive gradients, huge text, unnecessary animation, clutter.

BUILD THE FOLLOWING PAGES/FEATURES:

1. LANDING PAGE: Navbar (SkillPulse logo, Home, Features, How It Works, About, Login, Get Started). Hero with heading "Bridge the Gap Between Skills and Industry Demand", subtitle "SkillPulse intelligently maps student skills with evolving industry requirements to identify skill gaps and recommend personalized learning paths.", buttons "Get Started" and "Explore Demo", and a visual illustration of Student Skills → AI Analysis → Skill Gap → Career Recommendations. Six feature cards: Skill Assessment, AI Skill Gap Analysis, Industry Demand Mapping, Personalized Learning Path, Job Readiness Score, Career Recommendations.

2. LOGIN/DEMO ACCESS: Email + Password fields, "Login" and "Continue as Demo Student" buttons. Auth simulated via LocalStorage. Demo credentials: demo@skillpulse.com / demo123.

3. STUDENT DASHBOARD: Sidebar (Dashboard, My Skills, Skill Assessment, Skill Gap, Learning Path, Job Match, Industry Trends, Progress, Profile). Top bar with search, notifications, profile. Dashboard cards: Job Readiness (72%), Skill Match (68%), Skills (8), Recommended Skills (4). Skill Progress radar/bar chart (JavaScript, React, Python, SQL, Git, Communication). Skill Gap Overview table with progress bars (React 65/85/20, SQL 50/80/30, Python 70/75/5, Git 60/80/20 — current/required/gap).

4. SKILL ASSESSMENT: Interactive questions rating JavaScript, React, Python, SQL, Git, Communication as Beginner/Intermediate/Advanced. On submit, calculate a demo skill score, show "Assessment Completed ✓", and automatically update the student's skill profile.

5. AI SKILL GAP ANALYSIS (main feature): Page showing Selected Career "Full Stack Developer", industry-required skills (HTML/CSS, JavaScript, React, Node.js, SQL, Git, REST APIs, Communication) compared to student's current skills with Current → Required → Gap → Priority (e.g. React 65/85/20/High, SQL 50/80/30/Critical, Node.js 30/75/45/Critical). Recharts visual comparing current vs required. "Generate Learning Path" button.

6. RULE-BASED RECOMMENDATION ENGINE (no fake external AI API): reads current skills, reads required skills, calculates gaps, sorts by priority (gap>=40 Critical, >=20 High, >=10 Medium, else Low), recommends resources, calculates job-readiness score. Show recommendation text like "Your highest priority skill is Node.js." and "Improving SQL and REST APIs can significantly increase your Full Stack Developer job readiness."

7. PERSONALIZED LEARNING PATH: Week-by-week roadmap (Week 1 JavaScript Advanced, Week 2 React, Week 3 Node.js, Week 4 SQL, Week 5 REST APIs, Week 6 Git + Deployment). Each card: skill, current level, target level, estimated time, progress, recommended resources, "Start Learning" button. Allow marking modules complete, persisted in LocalStorage.

8. JOB MATCHING: Mock jobs — Software Developer (React, JavaScript, SQL, Git — 82% match), Frontend Developer (HTML, CSS, JavaScript, React — 88%), Full Stack Developer (React, Node.js, SQL, Git, REST API — 68%), Data Analyst (Python, SQL, Excel, Power BI — 55%). Cards show title, company, required skills, match %, missing skills, "View Details". Sort by match %.

9. INDUSTRY TRENDS DASHBOARD: clearly labeled as demo/simulated data. Skills: AI/ML, React, Python, Cloud, Cybersecurity, Data Analytics, SQL. Bar chart "Most Demanded Skills", line chart "Skill Demand Trend", Emerging Skills cards (Generative AI, Cloud Computing, Data Engineering, Cybersecurity, AI Agents). Filters: Technology, Data, Cloud, Security, AI.

10. CAREER RECOMMENDATIONS: 🥇 Frontend Developer 88%, 🥈 Full Stack Developer 78%, 🥉 Software Developer 74%. Each shows match score, required skills, missing skills, recommended learning path, job opportunities.

11. ADMIN/INSTITUTION DASHBOARD (separate demo dashboard): Sidebar (Overview, Students, Skill Gaps, Industry Demand, Courses, Reports). Cards: Total Students 1,250; Average Job Readiness 67%; Critical Skill Gaps 342; Industry-Aligned Students 58%. Charts: Skill Gap Distribution, Industry Demand, Student Readiness, Course Effectiveness. Student table (Name, Course, Readiness, Skill Gap, Status) with filters.

12. INSTITUTION SKILL GAP HEATMAP: rows = courses/departments, columns = React, Python, SQL, Cloud, AI, Communication, colored intensity cells from demo values, to visualize curriculum-industry mismatches.

13. NOTIFICATIONS (demo): new skill recommendation, skill gap detected, learning module completed, new job match, industry demand updated.

14. PROFILE: name, education, branch, skills, career goal, resume, assessment score. Allow editing skills and career goal.

WORKING INTERACTIONS — these must all actually function, no dead buttons: login, demo login, navigation, skill assessment submission and score update, skill gap calculation, generate learning path, mark course complete, job filtering, job match calculation, career recommendation, dashboard charts, profile editing, LocalStorage persistence, logout.

CALCULATION LOGIC:
- Skill gap = max(0, requiredLevel - currentLevel), never negative.
- Job match % = (matched skills / required skills) × 100.
- Job readiness = weighted score: technical skills 70%, soft skills 20%, assessment 10% — label this clearly as a prototype/demo scoring model.

DEFAULT DEMO STUDENT (used automatically in Demo Mode): Rahul Kumar, B.Tech CSE, Career Goal: Full Stack Developer. Skills: JavaScript 70, React 65, Python 60, SQL 50, Git 60, Node.js 35, REST API 40, Communication 75.

DEMO FLOW to optimize for a 3-5 minute hackathon presentation: Landing Page → Demo Login → Student Dashboard → Skill Assessment → AI Skill Gap Analysis → Industry Requirement Comparison → Generate Learning Path → Job Match → Career Recommendation → Admin Dashboard → Institution Skill Gap Heatmap. Make this flow visually impressive and easy to demo live.

UI COMPONENTS to use throughout: responsive sidebar, cards, progress bars, radar chart, bar chart, line chart, donut chart, tables, badges, tooltips, empty states, loading states, success notifications/toasts. Subtle transitions only, keep performance fast.

IMPORTANT: This must be a working prototype, not a static landing page. Clearly label all mock/simulated data as demo data and never imply real-time industry data unless a real API is actually integrated (it isn't here). Make sure the whole project builds and runs cleanly with no broken imports or build errors.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://skillpulse-career-connect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9967d53a-546b-4399-9423-460b395c53b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
