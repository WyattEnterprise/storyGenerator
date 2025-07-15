### **👢Epic 1: Development Environment & Bootstrapping**

### **🧱 Feature 1: Project Structure & Toolchain Bootstrapping**

**Goal**: Establish a clean foundation for both frontend and backend projects, with consistent tooling and structure for TypeScript development across both, containerized in Docker, and runnable inside WSL2.

---

#### **User Story 1.1 — Set Up Folder Structure for Frontend and Backend Projects**

**Description**  
 As a developer, I want to scaffold a `frontend` and `backend` folder using the recommended file structures so that all team members start with consistent organization and know where to add new code.

**Context**  
 This will enable Claude Code Sonnet Max to work efficiently across separated domains. Each folder should include an initial `README.md`, placeholder `src/` structure, and project-specific tooling configs.

**Acceptance Criteria**

* A root `project/` folder contains:

  * `frontend/` with `src/components/`, `src/pages/`, `src/hooks/`, etc.

  * `backend/` with `src/modules/`, `src/middlewares/`, `src/utils/`, etc.

* Each has:

  * A `README.md` describing purpose and entry point

  * A placeholder `index.tsx` (frontend) and `index.ts` (backend)

  * Empty `.gitkeep` or starter files in core folders

* Folder structure matches the diagrams provided

**Implementation Notes**

* Use functional React structure for frontend with TypeScript

* Backend should assume Worker-based setup but mimic Express layering

* Claude Code should use `mcp.context7.fs()` to scaffold directories and write boilerplate files

---

#### **User Story 1.2 — Create and Configure `tsconfig.json` for Frontend and Backend**

**Description**  
 As a developer, I want to configure strict TypeScript settings in both the frontend and backend so we ensure type safety and clear developer expectations.

**Context**  
 We are using Context7 MCP and Sonnet Max to generate code. Enabling strict mode and common compiler options ensures early type checking and better autocompletion.

**Acceptance Criteria**

* `tsconfig.json` exists in both `/frontend` and `/backend`

* Includes:

  * `"strict": true`

  * Module resolution for Node/ESNext

  * Path aliasing with `baseUrl: "./src"` (optional but helpful)

* No compiler warnings/errors on initial startup

**Implementation Notes**

* Use MCP context API: `mcp.context7.fs().writeTsConfig(...)`

* Add example interfaces in `/types/` to validate settings

* Use consistent `include`/`exclude` settings: exclude `node_modules`, `build`, etc.

---

#### **User Story 1.3 — Configure ESLint and Prettier with TypeScript Support**

**Description**  
 As a developer, I want both ESLint and Prettier set up with TypeScript plugins so that all code written is consistent and automatically formatted.

**Context**  
 This keeps Claude’s output clean and makes diffs readable for human developers.

**Acceptance Criteria**

* `.eslintrc.js` or `.eslintrc.cjs` in both frontend and backend

* `.prettierrc` or config block in `package.json`

* Linting works with `npx eslint .`

* Formatting works with `npx prettier --check .`

* Both support `.ts`, `.tsx`, and modern syntax

**Implementation Notes**

* Use recommended ESLint config for TypeScript:

  * `@typescript-eslint/eslint-plugin`

  * `eslint:recommended`

* Claude should use `mcp.context7.npm().installDev(...)` to install plugins

---

#### **User Story 1.4 — Add Basic Yarn 4 Workspaces and Volta Configuration**

**Description**  
 As a developer, I want to use Yarn 4 with Volta pinning to lock down our node and tooling versions and use Yarn workspaces to manage monorepo tooling.

**Context**  
 This helps Claude Code and human devs keep tool versions stable and ensure dependencies are fast and shared when appropriate.

**Acceptance Criteria**

`package.json` in root enables Yarn workspaces:

 json  
CopyEdit  
`{`  
  `"workspaces": ["frontend", "backend"]`  
`}`

*   
* `.yarnrc.yml` enables Plug'n'Play and sets nodeLinker

`volta` field in root `package.json` pins:

 json  
CopyEdit  
`"volta": {`  
  `"node": "20.10.0",`  
  `"yarn": "4.0.2"`  
`}`

*   
* Running `yarn install` in root installs deps for both projects

**Implementation Notes**

* Use `mcp.context7.cmd()` to run `yarn init`, `yarn set version berry`, etc.

* Document version pinning in root `README.md`

* Add `.yarnrc.yml` with `nodeLinker: node-modules` if PnP causes friction

---

#### **User Story 1.5 — Create a Shared `.env.example` and Config Pattern**

**Description**  
 As a developer, I want a shared `.env.example` file and reusable config pattern in both projects so everyone knows what secrets/configs are needed without checking in real keys.

**Context**  
 We will use PostHog, RevenueCat, Firestore, etc. This lets Claude Code prompt for the right keys at runtime and ensures portable environments.

**Acceptance Criteria**

* `.env.example` exists in both `frontend/` and `backend/`

* Lists keys for:

  * `REVENUECAT_KEY`, `FIREBASE_PROJECT_ID`, etc.

* `dotenv` or equivalent loads it

* Add `.env` to `.gitignore`

* Add `config/` folder with one example loader (`config/index.ts`)

**Implementation Notes**

* Claude Code will later prompt user for values

* For frontend, recommend using `expo-constants` or `expo-env` abstraction

---

#### **User Story 1.6 — Dockerize Frontend and Backend Projects**

**Description**  
 As a developer, I want to run both frontend and backend in Docker containers so that I don't need to set up Node or dependencies manually in my WSL environment.

**Context**  
 All devs use WSL2. Running everything in containers ensures parity, and Claude Code Sonnet Max can spawn/mount containers during development and testing.

**Acceptance Criteria**

* `frontend/Dockerfile` builds Expo app in development mode

* `backend/Dockerfile` runs wrangler or cloudflare-worker-dev server

* `docker-compose.yml` runs both services, exposes ports, mounts volumes

* Instructions in root `README.md` for `docker-compose up`

**Implementation Notes**

* Use `mcp.context7.fs().writeDockerfile()` to scaffold base images

* For frontend: use `node:20`, mount volume, expose 8081 or 19000

* For backend: use `wrangler`, watch for changes

---

#### **User Story 1.7 — Add GitHub Actions CI for Lint \+ Type Checks**

**Description**  
 As a developer, I want CI checks for both frontend and backend to lint code and ensure types are valid so that no one merges broken code.

**Context**  
 Claude Code should lint and type-check each PR. We'll add EAS Build & Deployment later.

**Acceptance Criteria**

* `.github/workflows/ci.yml` runs on PRs and pushes

* Runs:

  * `yarn lint`

  * `yarn type-check`

* Separate steps for `frontend` and `backend`

* Fails if there are TypeScript or lint errors

**Implementation Notes**

* Claude Code will use `mcp.context7.github().writeWorkflow(...)`

* Later workflows will add E2E tests and builds

### **📱 Feature 2: React Native & Expo Environment Setup**

**Goal**: Configure and run a live React Native (Expo) frontend environment inside Docker/WSL2 that supports fast iteration, iPad testing, and seamless integration with our toolchain.

---

#### **User Story 2.1 — Scaffold React Native App with TypeScript Template**

**Title**  
 Create React Native App with TypeScript

**Description**  
 As a developer, I want to initialize a new Expo React Native app using the TypeScript template so that our project is set up correctly from the start.

**Context**  
 We're using Expo SDK 52, Yarn 4, Volta, and TypeScript. This will be the base app that loads in Expo Go and starts rendering components.

**Acceptance Criteria**

* App initialized with `npx create-expo-app frontend --template`

* TypeScript selected during scaffold

* Initial screen renders basic `Text` element

* App compiles and runs via Expo DevTools or `npx expo start`

**Implementation Notes**

* Claude Code: use `mcp.context7.cmd().run('npx create-expo-app frontend --template')`

* Place in `/frontend` folder

* Use Node 20 and Yarn 4 pinned via Volta

---

#### **User Story 2.2 — Add Expo App Entry Point with Navigation Stub**

**Title**  
 Create App Entry Point with Navigation

**Description**  
 As a developer, I want a minimal App entry file (`App.tsx`) with basic navigation using `react-navigation` so the app is ready to grow.

**Context**  
 The app will have screens for onboarding, library, reader, etc. We’ll use stack or tab navigation.

**Acceptance Criteria**

* `App.tsx` renders a screen with text `“Hello, Storytime!”`

* React Navigation installed and integrated

* Navigation file (`navigation/index.ts`) created with 1 screen

* Navigation works in iPad Expo Go

**Implementation Notes**

* Claude: `mcp.context7.fs().writeReactNavigationStack()`

* Install `@react-navigation/native`, `stack`, `react-native-screens`, etc.

* Enable gestureHandler and link navigation correctly

---

#### **User Story 2.3 — Dockerize Expo App for Dev in WSL2**

**Title**  
 Run Expo App in Docker for WSL2

**Description**  
 As a developer, I want to run the Expo app in a container so I don’t need to install dependencies manually.

**Context**  
 We’re running everything in Docker, using WSL2 \+ Docker Desktop \+ Cursor IDE.

**Acceptance Criteria**

* `frontend/Dockerfile` builds and runs Expo CLI

* Dev server accessible on tunnel or LAN mode

* `yarn start` or `npm run dev` starts Expo DevTools inside container

* iPad can access story app in Expo Go

**Implementation Notes**

* Claude: use `mcp.context7.fs().writeDockerfile('frontend')`

* Use `node:20-slim`, mount `/app`, expose port 19000

* Document network setup for iPad testing (tunnel, LAN IP)

---

#### **User Story 2.4 — Configure Expo Dev Tools Tunnel for iPad Testing**

**Title**  
 Enable Tunnel Access to Expo App on iPad

**Description**  
 As a developer, I want to test the app on a physical iPad by scanning the QR code or using a direct tunnel.

**Context**  
 iPads will run production builds later. For now, we need fast testing via Expo Go.

**Acceptance Criteria**

* App loads in iPad Expo Go via tunnel

* Expo QR code scanned on device opens app

* Tunnels work behind WSL2 firewall/NAT

**Implementation Notes**

* Use `expo start --tunnel` or `--lan` as fallback

* Claude: check local IP address with `mcp.context7.net().getLocalIp()`

* Note: We may later use EAS for internal builds

---

#### **User Story 2.5 — Add React Native Testing Library \+ Sample Test**

**Title**  
 Install Testing Library and Write Sample Test

**Description**  
 As a developer, I want a working test environment for React Native so that I can validate screen logic.

**Context**  
 We'll use Jest and React Native Testing Library for component testing. This is a dev sanity check.

**Acceptance Criteria**

* Installed `@testing-library/react-native`, `jest`, `ts-jest`

* `App.test.tsx` created and passes a test for “Hello, Storytime\!”

* Test command added: `yarn test`

* Test runs in Docker container

**Implementation Notes**

* Claude: use `mcp.context7.fs().addReactNativeTestConfig()`

* Configure Jest in root and map modules with `tsconfig.json`

* Add test coverage scripts later in CI

---

#### **User Story 2.6 — Add Sentry & PostHog Setup in Dev Mode**

**Title**  
 Setup Sentry & PostHog Dev SDKs

**Description**  
 As a developer, I want basic logging via Sentry and PostHog in dev mode so I can trace issues early and see telemetry.

**Context**  
 We use Sentry for crash reporting and PostHog for product analytics.

**Acceptance Criteria**

* `@sentry/react-native` and `posthog-react-native` installed

* Initial config file (`src/utils/telemetry.ts`) initialized

* Logs sent only if environment is `development`

* Placeholder `POSTHOG_API_KEY` and `SENTRY_DSN` in `.env.example`

**Implementation Notes**

* Claude: `mcp.context7.fs().writeTelemetrySetup()`

* Wrap root navigation with Sentry error boundary

* Use PostHog’s dev mode log output to verify events

### **☁️ Feature 3: Backend Services Setup & Worker Development**

**Goal**: Configure and build the backend using Cloudflare Workers with Context7 MCP. The worker assembles prompts, interacts with GPT-4/DALL·E, handles credit logic, and talks to Firestore and R2.

---

#### **User Story 3.1 — Scaffold Cloudflare Worker Project with TypeScript**

**Title**  
 Create Cloudflare Worker Project with TypeScript

**Description**  
 As a developer, I want to scaffold a Cloudflare Worker backend using the TypeScript starter template so we can begin writing logic for prompt assembly and story generation.

**Context**  
 We'll run the worker locally with Wrangler and deploy to Cloudflare. Code will use Context7 MCP for logic and structure.

**Acceptance Criteria**

* Worker initialized using `wrangler init backend --ts`

* `src/index.ts` is the main entry point

* `wrangler.toml` configures routes and environment bindings

* Worker builds and runs with `npx wrangler dev`

**Implementation Notes**

* Claude: use `mcp.context7.cmd().run('npx wrangler init backend --ts')`

* Add comment scaffolds for:

  * `/generateStory`

  * `/status`

* Ensure TypeScript strict mode is enabled

---

#### **User Story 3.2 — Setup Dev Routing with Wrangler and Local Emulation**

**Title**  
 Enable Local Route Testing in Wrangler

**Description**  
 As a developer, I want to run our Worker with mock inputs on localhost so I can test endpoints for story generation and health.

**Context**  
 Routes like `/generateStory` will receive POST requests from the iPad app.

**Acceptance Criteria**

* `wrangler.toml` defines `routes` with `/generateStory`, `/health`

* Running `npx wrangler dev` exposes endpoints on `localhost:8787`

* A test request to `/health` returns 200

**Implementation Notes**

* Claude: use `mcp.context7.fs().writeWranglerConfig()`

* Add test request using `curl` or `httpie`

* Document route list in `README.md`

---

#### **User Story 3.3 — Create Basic Prompt Assembler Service**

**Title**  
 Implement Prompt Assembler with Inputs

**Description**  
 As a developer, I want a service that receives story settings and character metadata and assembles a prompt that can be sent to GPT-4.

**Context**  
 Input includes age, tone sliders, branches, character JSON. This logic belongs in `prompt.service.ts`.

**Acceptance Criteria**

* `prompt.service.ts` file created in `/src/modules/prompt/`

* Function accepts structured JSON and returns a string

* Unit test added with sample input

* Service is used in `/generateStory` handler

**Implementation Notes**

* Claude: use `mcp.context7.service().define('prompt')`

* Add TypeScript interfaces for input shape

* Test with `mcp.context7.test().run(...)`

---

#### **User Story 3.4 — Call OpenAI API with Structured Prompt**

**Title**  
 Integrate GPT-4 API for Story Text

**Description**  
 As a developer, I want to send the assembled prompt to OpenAI’s GPT-4 API and receive the full story text so it can be chunked and rendered.

**Context**  
 We use GPT-4o with 10k token context. Each path is \~15 minutes of story (one full pass per branch).

**Acceptance Criteria**

* `openai.service.ts` handles the POST request

* Accepts prompt string, returns structured story JSON

* Errors handled gracefully (timeout, latency)

* API key read from environment

**Implementation Notes**

* Claude: use `mcp.context7.ai().openaiRequest(...)`

* Use `fetch` inside Worker context

* Remind user to provide `OPENAI_API_KEY` (TODO)

---

#### **User Story 3.5 — Chunk Story and Send DALL·E Image Jobs**

**Title**  
 Split Story into Pages and Queue Image Requests

**Description**  
 As a developer, I want to chunk the returned story into \~250-word pages and generate image prompts for each using DALL·E 3 so each page gets an illustration.

**Context**  
 The Worker should emit requests to DALL·E, one per page, and stream results back via WebSocket.

**Acceptance Criteria**

* `image.service.ts` splits story and queues image jobs

* Each page has: `text`, `imagePrompt`, `imageUrl`

* DALL·E requests sent one at a time

* Progress events are sent back to client

**Implementation Notes**

* Claude: use `mcp.context7.worker().sendImageJobs(...)`

* Use `R2` for final image URLs

* Requires `DALL_E_API_KEY` (TODO)

---

#### **User Story 3.6 — Integrate Firestore for Story Metadata**

**Title**  
 Save Story Metadata in Firestore

**Description**  
 As a developer, I want to store basic story metadata (title, user ID, path count, read time) in Firestore after generation so the library UI can later fetch it.

**Context**  
 Firestore stores story summary only, not full text (cached locally on iPad).

**Acceptance Criteria**

* `firestore.service.ts` writes a doc to `users/{uid}/stories/{storyId}`

* Doc includes:

  * `childId`, `storyId`, `createdAt`, `length`, `title`, `branchCount`

* Firestore key read from environment or secure binding

**Implementation Notes**

* Claude: use `mcp.context7.db().firestore().saveDocument(...)`

* Add test doc manually if needed

* Create Firestore emulator config if testing locally

---

#### **User Story 3.7 — Upload Image Blobs to R2 and Return Signed URLs**

**Title**  
 Upload Images to Cloudflare R2

**Description**  
 As a developer, I want to upload DALL·E-generated images to R2 and return signed URLs so the frontend can fetch them quickly.

**Context**  
 Signed URLs ensure secure access and allow for image caching.

**Acceptance Criteria**

* `r2.service.ts` uploads image blobs from DALL·E response

* Returns public signed URL per image

* Bucket/secret configured in `wrangler.toml`

**Implementation Notes**

* Claude: use `mcp.context7.file().uploadToR2(...)`

* Sign URLs with 7-day expiration

* Add fallback logic if upload fails

### **🧪 Feature 4: End-to-End Integration & Testing**

**Goal**: Ensure the full story generation flow works from iPad to Cloudflare Worker and back. Set up robust E2E tests using Puppeteer MCP to simulate user interactions and validate story content, latency, and branching behavior.

---

#### **User Story 4.1 — Connect Frontend Story Wizard to `/generateStory` Endpoint**

**Title**  
 Connect Story Wizard Form to Backend Worker Endpoint

**Description**  
 As a developer, I want to send structured input from the Story Setup Wizard to the `/generateStory` endpoint so a story can be generated when the user taps “Create Story.”

**Context**  
 We’ve already built the form and prompt assembly logic separately. This ties them together in one flow.

**Acceptance Criteria**

* Submit button triggers async POST request to `/generateStory`

* Body includes: character JSON, reading level, tone sliders, path count

* Loading indicator shown until first page arrives

* Response is stored and passed to reader screen

**Implementation Notes**

* Claude: use `mcp.context7.fetch().post('/generateStory')`

* Abstract network logic into `src/services/storyService.ts`

* Start with mock data if backend isn't ready

---

#### **User Story 4.2 — Display Progress and Load Story in Reader UI**

**Title**  
 Progressively Load and Display Story Pages in Reader

**Description**  
 As a developer, I want to show story pages one at a time as they arrive so the user can start reading without waiting for the full story to render.

**Context**  
 The backend streams story \+ image URLs using WebSocket. Frontend needs to handle that in real-time.

**Acceptance Criteria**

* WebSocket connection opens after submission

* First page renders as soon as it arrives

* Next pages are lazy-loaded as user swipes

* Branch choices appear after the last base page

**Implementation Notes**

* Claude: use `mcp.context7.realtime().connectWebSocket(...)`

* Consider fallback polling if WebSocket fails

* Save JSON response to local cache for offline mode

---

#### **User Story 4.3 — Add E2E Puppeteer Test for Story Creation Flow**

**Title**  
 Create Puppeteer E2E Test for Full Story Flow

**Description**  
 As a developer, I want an automated Puppeteer test that creates a story end-to-end so we can confirm the flow works across both frontend and backend.

**Context**  
 The test will open the Story Wizard, submit a story, wait for it to generate, and verify that a page with both text and image is shown.

**Acceptance Criteria**

* Puppeteer test opens Expo Web version or iPad simulator (web fallback OK)

* Fills out story wizard fields with test values

* Submits form → waits for 1st story page

* Confirms image \+ text are visible

* Confirms branch buttons render after last page

**Implementation Notes**

* Claude: use `mcp.puppeteer.step().runScenario(...)`

* Test can run in CI (`yarn test:e2e`)

* Use fake character and basic theme config

---

#### **User Story 4.4 — Add Latency Logging and Threshold Alarms**

**Title**  
 Log Story Generation Latency and Alert on Slow Runs

**Description**  
 As a developer, I want to log the generation time for each story and alert if it exceeds target latency so we can monitor system performance.

**Context**  
 Target: first page visible \<10s, subsequent images \<7s. If GPT or DALL·E slows down, we need visibility.

**Acceptance Criteria**

* Generation request logs total time (prompt ➝ last image)

* Time saved in Firestore or PostHog

* Alarm/console warning if first page takes \>10s

* Display `“Slow mode”` badge in dev UI if time exceeded

**Implementation Notes**

* Claude: use `mcp.context7.telemetry().logEvent('generation_time')`

* Also log image queue latency

* Add timeout cancel logic if any request exceeds 30s

---

#### **User Story 4.5 — Add Mock Server for Local Frontend Testing**

**Title**  
 Add Mock Server for Frontend Dev Without Live Backend

**Description**  
 As a developer, I want to use a local mock server that returns fake story data so I can test the frontend UI without needing the full backend deployed.

**Context**  
 Mock mode helps developers iterate UI without GPT/API costs.

**Acceptance Criteria**

* Toggle in `.env` enables mock mode

* When active, `storyService.ts` returns canned response

* Mock story includes multiple pages and 2 branches

* Mock images loaded from local `/assets/`

**Implementation Notes**

* Claude: use `mcp.context7.net().mockServer()`

* Store mock data in `src/mocks/story.json`

* Ensure toggle also works in Puppeteer tests

### **🔐 Epic 2: Account & Consent Flow**

**Goal**: Ensure that all user onboarding, authentication, and COPPA/GDPR-compliant consent steps are properly implemented before story creation becomes available. This includes child profile creation under a parent account and respecting platform-specific parental controls.

### **🔐 Feature 1: Authentication & Identity Setup**

**Goal**: Allow parents to log into the app using Firebase Auth via Apple, Google, or email. Ensure login is completed before any other features are accessible.

---

#### **User Story 2.1.1 — Show Welcome Screen with Login Options**

**Title**  
 Display Welcome Screen with Apple, Google, and Email Login Buttons

**Description**  
 As a user, I want to see a clear welcome screen that lets me log in with Apple, Google, or email so I can access the app securely.

**Context**  
 This is the first screen shown after app install. Firebase Auth is used for authentication, and no features are available before login.

**Acceptance Criteria**

* Welcome screen displays app logo, tagline, and three login buttons:

  * “Continue with Apple”

  * “Continue with Google”

  * “Sign in with Email”

* Tapping any button triggers appropriate Firebase login flow

* On success, user is taken to the COPPA/GDPR consent screen

* On failure, error message is shown

**Implementation Notes**

* Claude (Context7): Use `mcp.context7.auth().firebaseUI()` to scaffold logic

* Use `expo-auth-session` or `@react-native-firebase/auth` wrapper depending on platform support

* Place this component in `src/screens/WelcomeScreen.tsx`

* Add mock user login method for dev-only testing

* Later, this will link to `childProfile.service.ts` under parent UID

---

#### **User Story 2.1.2 — Configure Firebase Auth Providers in Dev and Prod**

**Title**  
 Enable and Test Apple, Google, and Email Auth in Firebase Console

**Description**  
 As a developer, I want to enable all three Firebase Auth providers and test them so users can log in from any platform.

**Context**  
 Correct configuration is required in both the Firebase console and the local app environment. Apple requires bundle ID \+ services file.

**Acceptance Criteria**

* Firebase project configured with:

  * Apple Sign-In (Services ID \+ private key added)

  * Google Sign-In (OAuth client ID added)

  * Email/password enabled

* Web and native environments both testable

* `.env.example` includes:

  * `FIREBASE_API_KEY`

  * `FIREBASE_AUTH_DOMAIN`

  * `FIREBASE_PROJECT_ID`

* Working login from Expo Go \+ TestFlight

**Implementation Notes**

* Claude: use `mcp.context7.secrets().configureFirebaseAuth()`

* For Apple, you’ll need to upload the `AuthKey_XXXX.p8` in Firebase

* Google Sign-In requires OAuth consent screen setup

* Add README step-by-step for how to test each method

---

#### **User Story 2.1.3 — Lock All App Routes Without Auth**

**Title**  
 Restrict App Navigation Until Parent Is Logged In

**Description**  
 As a developer, I want to ensure that no parts of the app are accessible unless the user is authenticated so we remain COPPA/GDPR compliant.

**Context**  
 This protects character data, story creation, and child info from being exposed prior to consent and login.

**Acceptance Criteria**

* All non-authenticated users see only:

  * Welcome screen

  * Auth flow

* Authenticated users see:

  * Consent screen

  * Then rest of app

* Auth guard works on deep links and reloads

**Implementation Notes**

* Claude: use `mcp.context7.routing().wrapNavigationGuard()`

* Create `AuthContext` in `src/context/` using Firebase listener

* Add HOC or hook: `useAuthGuard()`

* Write test for guard logic and fallback

---

#### **User Story 2.1.4 — Store Parent UID and Session Locally**

**Title**  
 Cache Firebase Session and UID Locally for App Restart

**Description**  
 As a developer, I want to store the parent’s UID and session token so I don’t need to re-login every time the app restarts.

**Context**  
 Firebase provides automatic session persistence but we want to ensure UID is available in `AuthContext`.

**Acceptance Criteria**

* `AuthContext` exposes `parentUID` after login

* App restores session after reload

* If expired, automatically redirects to login screen

**Implementation Notes**

* Claude: use `mcp.context7.state().createAuthContext()`

* Use `onAuthStateChanged` from Firebase to hydrate context

* Save UID to `AsyncStorage` for fallback if needed

* Show loading spinner while session is restored

### **📄 Feature 2: COPPA/GDPR Consent Enforcement**

**Goal**: Present a compliant consent flow on first app launch after login. Require parent consent before allowing child profile creation or story generation. Trigger Apple “Ask to Buy” / Google Family approval before image upload.

---

#### **User Story 2.2.1 — Show COPPA/GDPR Consent Screen After Login**

**Title**  
 Display COPPA/GDPR Consent Screen Immediately After Login

**Description**  
 As a user, I want to see a clear and legally compliant consent message explaining how my child’s data is used so I can approve or exit the app.

**Context**  
 This is required by law before creating profiles or uploading images. Must be shown only once per user account.

**Acceptance Criteria**

* Consent screen appears right after login

* Contains plain-language explanation and links to Privacy Policy and Terms (open in Safari)

* Has “Agree & Continue” and “Exit App” buttons

* Agreement stored in Firestore under `users/{uid}/consentGiven = true`

* Consent screen is skipped if already completed

**Implementation Notes**

* Claude: use `mcp.context7.state().gateWithFlag('consentGiven')`

* Design in `screens/ConsentScreen.tsx`

* Trigger navigation to onboarding only after consent confirmed

* Use test Firestore UID to simulate login in dev mode

---

#### **User Story 2.2.2 — Block App Usage Until Consent Is Granted**

**Title**  
 Restrict App Access Until Consent Is Recorded

**Description**  
 As a developer, I want to prevent access to story creation, profiles, or settings until the parent has agreed to the consent terms.

**Context**  
 We must guarantee that no child data is handled unless consent is given.

**Acceptance Criteria**

* All app routes except Welcome and Consent are gated

* If `consentGiven` is false or missing, redirect to ConsentScreen

* On logout, consent flow restarts on next login

**Implementation Notes**

* Claude: extend `AuthContext` to include `hasConsent` flag

* Write helper: `useConsentGuard()` similar to `useAuthGuard()`

* Add unit test and mock consent document in test Firestore emulator

---

#### **User Story 2.2.3 — Integrate “Ask to Buy” for Apple/Google on First Image Upload**

**Title**  
 Trigger Platform Parental Approval on Image Upload

**Description**  
 As a developer, I want to block image generation until Apple “Ask to Buy” or Google Family Approval has completed so we comply with App Store guidelines.

**Context**  
 This only needs to happen once per child account or image generation attempt.

**Acceptance Criteria**

* On first avatar image upload, call native platform hooks for parental approval

* Block image generation UI until approval is granted

* Approval flag stored locally and tied to child UID

* iOS: Uses StoreKit2 request purchase dialog (zero-cost) to simulate consent

**Implementation Notes**

* Claude: `mcp.context7.native().triggerAskToBuy()`

* Use `react-native-ask-to-buy` or custom Swift module if required

* For Android, use Google Play Family Library approval intent

* Test in TestFlight / Google Play Internal with child test account

---

#### **User Story 2.2.4 — Save Consent & Approval Flags to Firestore**

**Title**  
 Persist Consent and Approval States Securely in Firestore

**Description**  
 As a developer, I want to save whether the parent has granted consent and whether image approval has been confirmed so we can skip the flow next time.

**Context**  
 Data must be linked to the parent UID and optionally to each child profile.

**Acceptance Criteria**

* Consent flag stored at `users/{uid}/consentGiven = true`

* Image approval flag stored at `users/{uid}/approval.imageUpload = true`

* Flags are read on app start to skip flows if already completed

* If user logs out, app re-checks flags after re-authentication

**Implementation Notes**

* Claude: use `mcp.context7.db().firestore().setConsentFlags()`

* Include this check in root app wrapper or `AppInitializer`

* Test with both true and false values to verify gating

### **👶 Feature 3: Child Profile Management**

**Goal**: Let parents create child profiles (nickname \+ age) after consent. Profiles must be stored under the parent UID and used to organize stories, reading level, and preferences.

---

#### **User Story 2.3.1 — Create Child Profile Entry Screen**

**Title**  
 Add UI to Create a New Child Profile (Nickname \+ Age)

**Description**  
 As a user, I want to create a child profile by entering a nickname and age so the app can generate age-appropriate stories for them.

**Context**  
 Each profile is lightweight and must be linked to the logged-in parent UID.

**Acceptance Criteria**

* “Add Profile” screen includes:

  * Text input for nickname (max 20 characters)

  * Numeric input or dropdown for age (1–12)

  * “Create Profile” button (disabled until valid)

* Upon submission, profile is saved to Firestore:

  * `users/{uid}/children/{childId}` with `nickname`, `age`, `createdAt`

* Parent is returned to the Library screen or Profile List

**Implementation Notes**

* Claude: `mcp.context7.ui().createProfileForm()`

* Generate `childId` using UUID or Firestore auto-ID

* Create screen in `screens/CreateChildProfileScreen.tsx`

* Create `src/services/childProfileService.ts` for Firestore logic

---

#### **User Story 2.3.2 — List All Child Profiles in Parent Dashboard**

**Title**  
 Display All Saved Child Profiles on Home/Dashboard

**Description**  
 As a parent, I want to see a list of my saved child profiles so I can pick one before starting a story.

**Context**  
 This screen will appear after login and consent, and is used to drive story personalization.

**Acceptance Criteria**

* Grid or list of child profile cards (nickname \+ age)

* Option to “Add Profile” if less than 4 children exist

* Tapping a profile selects it as active and proceeds to library

* All data loaded from Firestore `users/{uid}/children/`

**Implementation Notes**

* Claude: `mcp.context7.ui().childProfileGrid()`

* Create reusable component: `components/ChildProfileCard.tsx`

* Store `activeChildId` in `ChildProfileContext`

* Limit max children to 4 per account for MVP

---

#### **User Story 2.3.3 — Edit or Delete an Existing Child Profile**

**Title**  
 Add Edit & Delete Options for Child Profiles

**Description**  
 As a parent, I want to edit or remove a child profile if something changes or I made a mistake.

**Context**  
 This should be protected by a confirmation dialog to avoid accidental deletes.

**Acceptance Criteria**

* On profile long-press or menu tap, show options:

  * “Edit Nickname”

  * “Change Age”

  * “Delete Profile”

* Changes saved immediately to Firestore

* Deleted profile and all related stories are purged from Firestore

* Cannot delete last remaining child profile (block)

**Implementation Notes**

* Claude: `mcp.context7.db().firestore().deleteChildAndStories()`

* Show confirmation alert before delete

* Backend may later enforce retention rules, but for now delete is hard

* Wrap Firestore ops in `try/catch` and show errors via Snackbar

---

#### **User Story 2.3.4 — Enforce Child Profile Creation Before Story Access**

**Title**  
 Gate Story Epics Behind Child Profile Requirement

**Description**  
 As a developer, I want to block access to the story wizard and reader until a child profile has been selected so we can personalize the experience correctly.

**Context**  
 At least one child profile must exist, and one must be selected as active.

**Acceptance Criteria**

* If `activeChildId` is not set:

  * Redirect to Profile Selection screen

  * Block access to Story Wizard, Character Builder, Reader

* Selecting a profile enables all features

* Changing profile resets personalization context

**Implementation Notes**

* Claude: use `mcp.context7.state().enforceChildContext()`

* Add hook: `useActiveChildGuard()`

* Store `activeChildId` in React Context and `AsyncStorage`

* Use wrapper HOC for protected routes

### **🔒 Feature 4: Secure Storage & Compliance Logging**

**Goal**: Ensure that all sensitive data (consent, child info) is stored securely, encrypted where applicable, and logged for compliance auditing. Orphaned or incomplete accounts must be automatically cleaned up.

---

#### **User Story 2.4.1 — Store Consent and Child Info Using Firebase Security Rules**

**Title**  
 Write Firebase Rules to Restrict Access to Consent and Child Data

**Description**  
 As a developer, I want to configure Firestore security rules so only authenticated parents can access their own consent flags and child profiles, ensuring no data leakage occurs.

**Context**  
 Firebase rules must prevent cross-user access and protect sensitive children’s data.

**Acceptance Criteria**

* Firestore rules deny all access unless:

  * User is authenticated

  * Document is under their own `uid` path

* Rules apply to:

  * `users/{uid}/consentGiven`

  * `users/{uid}/children/{childId}`

* Attempting cross-user access returns 403

**Implementation Notes**

* Claude: `mcp.context7.security().defineFirestoreRules()`

* Rules stored in `/firebase/firestore.rules`

* Use Firebase Emulator to test auth \+ unauthorized access

* Add CI test to verify permission boundaries

---

#### **User Story 2.4.2 — Encrypt Child Identifiers and Store in Device Keychain**

**Title**  
 Encrypt Child ID and Store in iOS/Android Keychain

**Description**  
 As a developer, I want to encrypt and store the selected child ID locally using the device’s secure keychain so it’s never exposed in plain text.

**Context**  
 This improves privacy and ensures that the child identity is protected on-device.

**Acceptance Criteria**

* `activeChildId` is encrypted before local storage

* Uses `expo-secure-store` or equivalent to persist value

* Value is retrieved and decrypted automatically on app start

* Value is only used in-memory by React Context

**Implementation Notes**

* Claude: `mcp.context7.crypto().encryptToSecureStore()`

* Wrap access in `childProfileStorage.ts` utility

* Store under key: `child_profile_active`

* Fallback to profile selection screen if decryption fails

---

#### **User Story 2.4.3 — Log Consent Timestamps for Auditing**

**Title**  
 Save Consent Timestamps and Source for Audit Logging

**Description**  
 As a developer, I want to log when and how a parent granted consent so we can produce a record for legal audits or future privacy reviews.

**Context**  
 This data helps us comply with COPPA/GDPR documentation requirements.

**Acceptance Criteria**

* On consent approval, store:

  * `timestamp` (ISO string)

  * `method`: “In-app”

  * `uid`

* Stored at `users/{uid}/consentLog`

* Cannot be overwritten once written

**Implementation Notes**

* Claude: `mcp.context7.audit().logConsentEvent()`

* Use Firestore document merge with `exists: false` guard

* Consider exposing this as read-only in internal admin UI later

---

#### **User Story 2.4.4 — Auto-Delete Orphaned Accounts Without Consent After 30 Days**

**Title**  
 Schedule Background Cleanup of Accounts Missing Consent

**Description**  
 As a developer, I want to automatically delete accounts that never completed consent within 30 days so we avoid holding unconsented user data.

**Context**  
 Applies to accounts that registered but never agreed to terms or created children.

**Acceptance Criteria**

* Cloud Function (or scheduled Worker) runs daily

* Queries for users with:

  * `consentGiven != true`

  * `createdAt` \> 30 days ago

* Deletes user record and all subcollections (children, stories)

* Logs deletion to `auditLogs/deletionEvents`

**Implementation Notes**

* Claude: `mcp.context7.jobs().scheduleOrphanCleanup()`

* Use Firestore `createdAt` and consent flag to filter

* Ensure this does **not** run in dev environment

* Add try/catch \+ exponential backoff for large batches

### **🚫 Feature 5: Consent-Gated UI Activation**

**Goal**: Prevent access to key app features (story creation, profile builder, reader) until both authentication and consent steps are fully completed. All navigation and screens should enforce this gate consistently.

---

#### **User Story 2.5.1 — Create Global Consent Guard Hook for App Navigation**

**Title**  
 Build React Hook to Block Access Without Consent

**Description**  
 As a developer, I want a reusable hook that blocks navigation to sensitive screens unless the user has completed consent so I can apply it consistently throughout the app.

**Context**  
 This logic ensures the app remains legally compliant even if screens are accessed via deep links or back navigation.

**Acceptance Criteria**

* Hook `useConsentGuard()` checks:

  * Firebase login session

  * Consent flag in `AuthContext`

* If consent is missing, redirects user to `ConsentScreen`

* Hook used in Story Wizard, Character Builder, and Reader

**Implementation Notes**

* Claude: `mcp.context7.routing().createGuardHook('useConsentGuard')`

* Wrap `Stack.Screen` definitions with this check

* Show fallback loader during async check

* Add unit test to simulate guard behavior with/without consent

---

#### **User Story 2.5.2 — Prevent Story Wizard and Reader From Mounting Without Consent**

**Title**  
 Hide Story UI If Consent Not Granted

**Description**  
 As a developer, I want to prevent the story wizard and reader from rendering any UI if consent has not been granted so I avoid potential data leakage or compliance issues.

**Context**  
 This is a last-resort fallback in case guard logic fails or state is out of sync.

**Acceptance Criteria**

* `StoryWizardScreen` and `ReaderScreen` return `null` if:

  * User not logged in OR

  * `hasConsent = false`

* Show optional banner/toast with message:

  * “You must accept terms before continuing.”

**Implementation Notes**

* Claude: `mcp.context7.ui().addConditionalScreenBlocker()`

* Apply check early in screen function component

* Track unblocked screen mounts using PostHog for dev audits

---

#### **User Story 2.5.3 — Add Developer Banner When Consent is Missing (Debug Mode Only)**

**Title**  
 Show Dev-Only Debug Banner for Missing Consent

**Description**  
 As a developer, I want to see a debug banner in development mode if a user attempts to reach a protected screen without giving consent so I can catch bugs early.

**Context**  
 This should never happen in production. Helps debug out-of-order flows.

**Acceptance Criteria**

* Banner or warning at top of screen in dev mode:

  * “⚠️ Consent missing — flow is broken”

* Shown only if `__DEV__ === true` and `hasConsent = false`

* Does not appear in release builds

**Implementation Notes**

* Claude: `mcp.context7.ui().showDebugBannerWhen()`

* Implement banner using `src/components/DebugBanner.tsx`

* Add PostHog tracking for frequency of banner appearances

### **🎭 Epic 3: Character Builder**

**Goal**: Let parents quickly or deeply customize a character avatar for each child, using photo-based AI generation or manual selections. Store selected avatars securely and make them available during story generation.

---

### **🎭 FEATURE 3 — Features**

**Feature 1: Quick Mode – Generate Avatar from Single Photo \+ Name**  
Enable parents to snap or upload a photo, enter the child’s name, and generate an avatar using a cloud-based image-to-character pipeline. Return two portrait options for the parent to select from.

**Feature 2: Medium Mode – Manual Avatar Construction with Photo Uploads**  
Let parents pick a hair style, eye type, role (e.g., pirate, scientist), and optionally upload up to 3 photos to influence the generated avatar. Used by parents who want moderate control without complexity.

**Feature 3: Advanced Mode – Add Backstory, Color Palette, and Tags**  
Offer power users full control to define detailed character attributes such as personality tags, mood, accessory preferences, or a short character backstory to influence generation prompts.

**Feature 4: Avatar Generation Flow & Selection**  
Orchestrate the prompt creation and API calls to generate 2 AI portraits, show them to the parent with a choice to regenerate, and persist the chosen image in Cloudflare R2. Also cache a thumbnail locally.

**Feature 5: Image Storage and Fallbacks**  
Securely store avatar images in Cloudflare R2 with signed URLs. Cache thumbnails locally with expiration logic. If generation fails, fallback to a default illustrated avatar from bundled assets.

### **🎭 Feature 1: Quick Mode – Generate Avatar from Single Photo \+ Name**

**Goal**: Let parents quickly create a child’s avatar by uploading a single photo and entering the child’s name. The app then generates 2 AI avatars for the parent to choose from.

---

#### **User Story 3.1.1 — Build Avatar Quick Mode UI Form**

**Title**  
 Create Quick Mode Avatar Form with Photo Upload and Name Entry

**Description**  
 As a parent, I want to upload a single photo and enter my child’s name so that the app can generate a custom avatar automatically.

**Context**  
 This is the fastest way to create a character. The name is used to label the image and optionally inform the generation prompt.

**Acceptance Criteria**

* Screen includes:

  * Image upload button (camera or file picker)

  * Text input: “Child’s First Name” (20 char max)

  * “Generate Avatar” button (disabled until valid input)

* After form is submitted, display loading state

**Implementation Notes**

* Claude (Context7): `mcp.context7.ui().createPhotoNameForm()`

* Use `expo-image-picker` or `react-native-image-crop-picker`

* Store form state in `AvatarContext`

* Component: `screens/AvatarQuickFormScreen.tsx`

---

#### **User Story 3.1.2 — Upload Photo to Cloudflare R2 and Trigger Worker**

**Title**  
 Send Uploaded Photo to Cloudflare R2 and Trigger Generation

**Description**  
 As a developer, I want to upload the user’s image to R2 and notify the backend Worker so it can start the avatar generation pipeline.

**Context**  
 The image is passed to an image-to-avatar prompt pipeline (DALL·E or similar) using a Cloudflare Worker.

**Acceptance Criteria**

* Photo is uploaded via signed R2 URL

* Metadata includes `parentUID` and `childName`

* Cloudflare Worker receives POST request with:

  * Public photo URL

  * Child name

  * Avatar mode \= “quick”

* Worker responds with job ID

**Implementation Notes**

* Claude: `mcp.context7.files().uploadToR2()` and `mcp.context7.api().callWorker()`

* Store photo metadata in Firestore under `users/{uid}/avatarJobs/`

* API: `POST /generate-avatar` → returns `{ jobId }`

* Add retry if upload fails

---

#### **User Story 3.1.3 — Poll Avatar Generation Status Using Job ID**

**Title**  
 Track Avatar Generation Job and Show Loading Progress

**Description**  
 As a parent, I want to see that my avatar is being generated so I know the app is working.

**Context**  
 The image generation pipeline is async and may take 10–20 seconds.

**Acceptance Criteria**

* App polls backend for job status every 3 seconds

* If complete, response includes 2 avatar image URLs

* If failed, show error toast and “Try Again” button

* Show animated loading spinner or progress bar

**Implementation Notes**

* Claude: `mcp.context7.api().pollJobStatus(jobId)`

* Add timeout after 60 seconds and show fallback

* Component: `components/AvatarGenerationStatus.tsx`

* Use WebSocket later (Feature 4), polling for now

---

#### **User Story 3.1.4 — Display Avatar Results and Let Parent Choose**

**Title**  
 Show Two Avatar Candidates and Allow Parent to Pick One

**Description**  
 As a parent, I want to choose the best-looking avatar from two options so I feel part of the creative process.

**Context**  
 Only one image will be saved and used for stories.

**Acceptance Criteria**

* Display both avatar images side-by-side

* Each image has “Select” and “Regenerate” buttons

* Selected avatar saved in Firestore and R2 with final tag

* Regenerate button resends original job to Worker

**Implementation Notes**

* Claude: `mcp.context7.ui().chooseAvatarOption()`

* Store selected image in `users/{uid}/children/{childId}/avatar`

* Save thumbnail to local cache using `react-native-fast-image`

* Limit regenerations to 3 per session

---

#### **User Story 3.1.5 — Save Selected Avatar to Firestore and R2**

**Title**  
 Persist Final Avatar Selection for Future Story Use

**Description**  
 As a developer, I want to store the chosen avatar in Firestore and Cloudflare R2 so it can be reused during story generation.

**Context**  
 The image must be available offline and via signed URL.

**Acceptance Criteria**

* Final avatar URL stored at:

  * Firestore: `users/{uid}/children/{childId}/avatar`

  * Cloudflare R2: image file tagged as “final”

* Thumbnail saved locally (LRU cache)

* Story wizard uses avatar as default character image

**Implementation Notes**

* Claude: `mcp.context7.db().saveSelectedAvatar()`

* Add fallback default in case avatar is unavailable

* Thumbnail generated at 120x120 and stored in `/avatars/` dir

### **🧩 Feature 2: Medium Mode – Manual Avatar Construction with Photo Uploads**

**Goal**: Allow parents to customize their child’s avatar by choosing hair, eyes, role (e.g., pirate, scientist), and uploading up to 3 photos to guide avatar generation — offering more control than quick mode, without full complexity.

---

#### **User Story 3.2.1 — Build Avatar Medium Mode UI with Customization Fields**

**Title**  
 Create Manual Avatar Form with Appearance Options and Photo Uploads

**Description**  
 As a parent, I want to choose some avatar traits and upload a few photos so that the generated character matches my child’s look and role more closely.

**Context**  
 This provides more intentional input while remaining easy to use. All options must be optional, except for at least 1 photo.

**Acceptance Criteria**

* UI form includes:

  * Dropdown for Hair Type (e.g., straight, curly, bald)

  * Dropdown for Eye Type (e.g., round, almond)

  * Dropdown for Role (pirate, princess, scientist, etc.)

  * Image upload (1–3 photos, with preview \+ delete)

  * “Generate Avatar” button (enabled if 1+ image and 1+ field selected)

* UX shows form as a stepper if needed

**Implementation Notes**

* Claude: `mcp.context7.ui().manualAvatarForm()`

* Options defined in `avatarTraits.ts` constants

* Store data in `AvatarContext` or react-hook-form

* Validate max file size (e.g., \<4MB per photo)

---

#### **User Story 3.2.2 — Build Trait-Based Prompt Generator and Submit to Worker**

**Title**  
 Assemble Prompt from Trait Choices and Upload to Worker

**Description**  
 As a developer, I want to turn the selected traits and uploaded photos into a structured prompt so the backend can generate an accurate character image.

**Context**  
 The goal is to generate a prompt that balances visual and descriptive inputs.

**Acceptance Criteria**

* Prompt includes:

  * Role description

  * Hair and eye traits

  * Personality-neutral tone

* Photos are uploaded to R2 and attached to job

* Cloudflare Worker called with `mode: manual`

**Implementation Notes**

* Claude: `mcp.context7.prompts().buildAvatarPrompt()`

* Use DALL·E reference image guidance API

* Photo URLs attached to generation job via signed R2 link

* Limit job to 2 portrait variants like Quick Mode

---

#### **User Story 3.2.3 — Display Avatar Candidates and Regeneration Flow**

**Title**  
 Preview Two Candidate Images and Let Parent Regenerate if Needed

**Description**  
 As a parent, I want to view the avatar results and regenerate if they don't look right.

**Context**  
 Same as quick mode, but regenerations should preserve trait inputs.

**Acceptance Criteria**

* Show 2 image results side-by-side

* Options: Select or Regenerate

* Regeneration preserves previously selected traits and reuses uploaded images

* Selection stores avatar to child profile

**Implementation Notes**

* Claude: `mcp.context7.ui().avatarReviewStep()`

* Store regenerations under same Firestore doc (`regenerationCount`)

* If regenerations \>3, show fallback: “Try a different role”

---

#### **User Story 3.2.4 — Save Selected Manual Avatar to Firestore & R2**

**Title**  
 Persist Manually Customized Avatar Selection

**Description**  
 As a developer, I want to save the final avatar image, generation inputs, and thumbnails so that the character is consistent across stories.

**Context**  
 Same flow as Quick Mode, but with more metadata.

**Acceptance Criteria**

* Store selected avatar in:

  * R2: image tagged `final`

  * Firestore:

    * `users/{uid}/children/{childId}/avatar.imageUrl`

    * `avatar.inputs.traits`

    * `avatar.inputs.imageCount`

* Thumbnail cached locally

**Implementation Notes**

* Claude: `mcp.context7.db().saveAvatarWithMetadata()`

* Add trait data to generation analytics (PostHog or Firestore log)

* Clear intermediate images if final is selected

### **🎨 Feature 3: Advanced Mode – Add Backstory, Color Palette, and Tags**

**Goal**: Allow power users to fully define a character through a short backstory, favorite colors, and personality tags. This data will influence avatar generation and narrative tone.

---

#### **User Story 3.3.1 — Build Advanced Avatar Form UI**

**Title**  
 Create Advanced Mode Avatar Form with Backstory, Color Palette, and Tags

**Description**  
 As a parent, I want to write a short backstory, select favorite colors, and pick personality traits for my child’s avatar so that the generated image and stories match my child's vibe.

**Context**  
 Advanced mode is collapsed by default and accessed via an “Advanced” toggle on the main avatar builder screen.

**Acceptance Criteria**

* UI contains:

  * Multiline input: “Character Backstory” (300 char limit)

  * Color picker (choose up to 3 preferred colors)

  * Personality tags (multi-select: “brave,” “curious,” “silly,” etc.)

* All fields optional but must validate max inputs

**Implementation Notes**

* Claude: `mcp.context7.ui().advancedAvatarForm()`

* Use `ColorPalettePicker`, `TagSelector`, and `TextArea` reusable components

* Save form values to `AvatarContext.advanced`

* Fieldset collapsed under a toggle for minimal UI impact

---

#### **User Story 3.3.2 — Generate Advanced Prompt with Traits and Tags**

**Title**  
 Convert Backstory and Traits into Avatar Prompt for Worker

**Description**  
 As a developer, I want to create a structured generation prompt that blends visual preferences and story traits so we produce an avatar that reflects the child’s personality.

**Context**  
 This prompt will be passed to the image generation backend.

**Acceptance Criteria**

* Prompt includes:

  * Backstory (1–2 sentence summary)

  * Top 3 colors

  * 2–5 personality tags

* Worker accepts input in schema `{ backstory, colors[], tags[] }`

* Prompt used in DALL·E or Stable Diffusion-style generation

**Implementation Notes**

* Claude: `mcp.context7.prompts().buildAdvancedAvatarPrompt()`

* Prompt templates live in `src/ai/prompts/avatar.ts`

* Merge with photo and role inputs if Medium Mode was used concurrently

* Add dev preview button to print prompt before submit

---

#### **User Story 3.3.3 — Validate and Submit Avatar Job with Advanced Context**

**Title**  
 Submit Avatar Generation Job with All Advanced Context Fields

**Description**  
 As a developer, I want to send a complete avatar generation request including appearance, photos, backstory, colors, and tags so the image pipeline can generate rich results.

**Context**  
 This is a unified step that uses inputs from Quick, Medium, and Advanced modes.

**Acceptance Criteria**

* POST to Cloudflare Worker includes:

  * Image references (if any)

  * Trait data

  * Backstory, color, and tags

  * `mode: advanced`

* Job is created and responds with Job ID

**Implementation Notes**

* Claude: `mcp.context7.api().submitAvatarJobAdvanced()`

* Endpoint: `POST /generate-avatar-advanced`

* Max request size: 1MB (including photos)

* Validate fields on client before submission

---

#### **User Story 3.3.4 — Persist All Advanced Inputs for Reuse and Regeneration**

**Title**  
 Save All Advanced Avatar Inputs in Firestore for Reuse

**Description**  
 As a developer, I want to store the advanced avatar creation metadata so it can be reused for regeneration or narrative influence.

**Context**  
 This data can also influence later story personalization.

**Acceptance Criteria**

* Store inputs under `users/{uid}/children/{childId}/avatar.inputs.advanced`

  * `backstory`

  * `colors[]`

  * `tags[]`

* Store `mode = 'advanced'` under avatar metadata

* Used later for story prompt customization

**Implementation Notes**

* Claude: `mcp.context7.db().persistAdvancedAvatarMetadata()`

* Use Firestore merge update

* Cache color \+ tag data locally to reduce load time

* In future, allow “Create New Avatar from Same Traits” button

### **🌀 Feature 4: Avatar Generation Flow & Selection**

**Goal**: Orchestrate the cloud-based avatar generation pipeline. Merge all inputs (photo, traits, backstory), call the Worker, poll for results, and allow parents to pick or regenerate one of two returned avatars.

---

#### **User Story 3.4.1 — Assemble Final Avatar Prompt from All Modes**

**Title**  
 Merge Quick, Medium, and Advanced Inputs into Final Prompt

**Description**  
 As a developer, I want to combine inputs from all avatar builder modes into a single generation payload so that the cloud worker receives a complete and rich set of instructions.

**Context**  
 Even if only one mode was used, this step ensures the prompt is standardized and complete.

**Acceptance Criteria**

Create merged object:

 ts  
CopyEdit  
`{`  
  `childName: string,`  
  `photoUrls?: string[],`  
  `traits?: { hair: string; eyes: string; role: string },`  
  `backstory?: string,`  
  `tags?: string[],`  
  `colors?: string[],`  
  `mode: 'quick' | 'manual' | 'advanced'`  
`}`

*   
* Store locally in memory and send to worker endpoint

**Implementation Notes**

* Claude: `mcp.context7.prompts().mergeAvatarPromptInputs()`

* Utility lives in `lib/avatar/promptBuilder.ts`

* Validate presence of required inputs per mode before submission

---

#### **User Story 3.4.2 — Call Cloudflare Worker and Start Generation Job**

**Title**  
 Send Prompt to Avatar Worker and Receive Job ID

**Description**  
 As a developer, I want to call the generation API with the assembled prompt so we can begin avatar creation in the background.

**Context**  
 This is the first external API step and requires a valid signed photo URL and structured prompt.

**Acceptance Criteria**

* API call to `POST /generate-avatar`

* Body includes prompt object and secure photo links

* Response includes `jobId` (string) and optional `estimatedWait`

**Implementation Notes**

* Claude: `mcp.context7.api().startAvatarGenerationJob()`

* Store jobId in Firestore under `avatarJobs/{jobId}`

* Handle request timeout and retry logic (max 3 attempts)

* Show UI spinner: “Creating your child’s character…”

---

#### **User Story 3.4.3 — Poll Worker for Image Generation Results**

**Title**  
 Poll Avatar Worker Every 3s Until Results Are Ready or Failed

**Description**  
 As a parent, I want to see the avatar appear once it’s ready so I can choose my favorite version.

**Context**  
 Polling is a temporary fallback until WebSocket streaming is added later.

**Acceptance Criteria**

* Poll every 3s to `/job-status/{jobId}`

* If `status: completed`, return 2 signed image URLs

* If `status: failed`, show retry prompt

* Polling stops after 60s or success

**Implementation Notes**

* Claude: `mcp.context7.api().pollAvatarJobStatus()`

* Use `react-query` or `useEffect + setInterval`

* If job fails, log to PostHog with mode and jobId

---

#### **User Story 3.4.4 — Display Avatars, Let Parent Pick, or Regenerate**

**Title**  
 Let Parent Choose Final Avatar or Request New Pair

**Description**  
 As a parent, I want to view the generated avatars and pick the one I like best — or regenerate if neither is quite right.

**Context**  
 This is the final confirmation step before saving the avatar.

**Acceptance Criteria**

* Display 2 avatar images with “Select” and “Try Again” buttons

* Selecting avatar saves it to Firestore \+ R2 (as final)

* “Try Again” resends same prompt to backend (up to 3 tries)

**Implementation Notes**

* Claude: `mcp.context7.ui().renderAvatarSelectionPanel()`

* Component: `AvatarResultScreen.tsx`

* Save final result to:

  * Firestore: `children/{childId}/avatar`

  * Cloudflare R2: tag \= `final`

* Regeneration counter added per session

---

#### **User Story 3.4.5 — Cache Selected Avatar Thumbnail for Local Display**

**Title**  
 Store Final Avatar Locally as Thumbnail for Fast Loading

**Description**  
 As a developer, I want to cache the chosen avatar so it displays instantly in the UI, even when offline.

**Context**  
 Thumbnails are used in child selectors, story wizard, and library grid.

**Acceptance Criteria**

* On avatar selection:

  * Download image

  * Resize to 120×120

  * Store in local LRU cache using `react-native-fast-image`

* Cache key: `avatar_{childId}`

**Implementation Notes**

* Claude: `mcp.context7.assets().cacheImageThumbnail()`

* Clear old thumbnails on logout or profile deletion

* Optional: Store low-res fallback in app bundle

### **🗂️ Feature 5: Image Storage and Fallbacks**

**Goal**: Ensure all avatar images are securely stored in Cloudflare R2 with proper access control and metadata. Support thumbnail caching, orphan cleanup, and graceful fallback in case generation fails.

---

#### **User Story 3.5.1 — Store Avatar Images in Cloudflare R2 with Signed URLs**

**Title**  
 Save Generated Avatars in Cloudflare R2 with Access Control

**Description**  
 As a developer, I want to save final and candidate avatar images in Cloudflare R2 using signed URLs so that images are secure and accessible only when needed.

**Context**  
 Images should never be publicly accessible. Only signed links are exposed to the app.

**Acceptance Criteria**

* Upload all generated images to R2 with:

  * Tags: `childId`, `jobId`, `final=true/false`

* On selection, mark one image as `final`

* Signed URL expires in 1 hour for previews; 30 days for finals

**Implementation Notes**

* Claude: `mcp.context7.files().uploadToR2WithTagging()`

* Directory structure: `/avatars/{uid}/{childId}/{jobId}/image1.png`

* Use R2 lifecycle rules to auto-delete non-final images in 7 days

---

#### **User Story 3.5.2 — Implement Local Avatar Thumbnail Caching and Purge**

**Title**  
 Cache Final Avatar Thumbnail Locally and Purge Old Entries

**Description**  
 As a developer, I want to store a small version of the final avatar image locally so the UI loads instantly even without internet.

**Context**  
 This improves perceived speed when switching between children or loading the story wizard.

**Acceptance Criteria**

* Final avatar resized to 120×120 and cached with key: `avatar_{childId}`

* Old thumbnails purged using LRU (max 20 children)

* If cache is empty, show generic silhouette icon

**Implementation Notes**

* Claude: `mcp.context7.assets().useImageLRUCache()`

* Library: `react-native-fast-image` or custom AsyncStorage-based cache

* Use placeholder: `/assets/avatar_default.png`

---

#### **User Story 3.5.3 — Handle Avatar Generation Failures with Fallback Image**

**Title**  
 Fallback to Default Avatar If Image Generation Fails

**Description**  
 As a parent, I want the app to fall back to a default illustrated avatar if something goes wrong so that I can still proceed with stories.

**Context**  
 We don’t want the avatar flow to block the entire story experience.

**Acceptance Criteria**

* If avatar generation fails or times out after retries:

  * Show prompt: “Use default character?”

  * Default avatar set and stored with flag `isFallback = true`

* Continue to story creation flow as normal

**Implementation Notes**

* Claude: `mcp.context7.avatar().fallbackToDefaultAvatar()`

* Fallbacks tagged in Firestore: `avatar.fallback = true`

* Bundle 3–5 defaults and randomize selection for variety

---

#### **User Story 3.5.4 — Automatically Clean Up Orphan Avatar Jobs and Images**

**Title**  
 Purge Expired or Unused Avatar Jobs and Images

**Description**  
 As a developer, I want to automatically delete avatar jobs and images that are never finalized so we reduce storage usage and comply with privacy rules.

**Context**  
 Applies to:

* Canceled flows

* Timed-out sessions

* Deleted child profiles

**Acceptance Criteria**

* Job records older than 30 days with no final avatar \= delete

* R2 folders without a `final=true` tag \= delete

* Firestore logs deleted jobId and childId

**Implementation Notes**

* Claude: `mcp.context7.jobs().purgeOldAvatarJobs()`

* Scheduled job: Cloudflare Cron Trigger or backend worker

* Audit logs stored to Firestore collection: `avatarCleanupLogs/`

### **🪄 Epic 4: Story Setup Wizard**

**Goal**: Provide a fast, flexible story configuration flow where parents can choose between quick-start defaults, medium-level theme/level tuning, or advanced sliders for fine-grained story control. All modes funnel into the same generation pipeline.

---

### **🪄 Epic 4 – Features**

**Feature 1: Story Setup Modes (Quick, Medium, Advanced)**  
 Allow users to toggle between quick-start, medium, and advanced configuration paths. Each level exposes more story customization options while preserving defaults.

**Feature 2: Theme & Tone Selection**  
 Let parents choose a story theme (e.g., adventure, comedy) via presets or sliders. Advanced mode enables fine-tuning with sliders for Romance, Moral, Comedy, Fantasy, and Danger.

**Feature 3: Reading Level Configuration**  
 Configure the child’s reading difficulty by age band, quiz, or advanced CEFR/grade selector.

**Feature 4: Timeframe & Structure Configuration**  
 Set story length (e.g., single-night or 1–30 day arc) and enable narrative structure features like flashbacks and epilogues.

**Feature 5: Branch Count and Bias Settings**  
 Set number of narrative branches (1–4), and choose bias toward success outcomes (e.g., “always win” vs. “realistic”).

**Feature 6: Prompt Assembly and Final Review**  
 Combine all selected inputs into a structured prompt for the generation pipeline. Review screen allows parents to confirm settings before triggering generation.

### **🪄 Feature 1: Story Setup Modes (Quick, Medium, Advanced)**

**Goal**: Support different parent interaction styles by allowing the story setup flow to operate in quick-start, medium-customization, or advanced-tweaking modes. Defaults should always be sensible and easy to override.

---

#### **User Story 4.1.1 — Build Setup Mode Toggle with Memory**

**Title**  
 Create Toggle Between Quick, Medium, and Advanced Setup Modes

**Description**  
 As a parent, I want to choose how much control I have over story setup (quick, medium, or advanced) so that I’m not overwhelmed when I just want to get started quickly.

**Context**  
 Each mode progressively reveals more configuration fields. Default \= “Quick.”

**Acceptance Criteria**

* Toggle selector visible at top of setup wizard

* Modes:

  * **Quick**: 1-click generate with defaults

  * **Medium**: Choose theme, level, duration

  * **Advanced**: Full control (tone sliders, CEFR level, structure)

* Last selected mode is remembered per parent account

**Implementation Notes**

* Claude: `mcp.context7.ui().buildSetupModeToggle()`

* Use `SegmentedControl` or custom tab component

* Store last mode under `users/{uid}/preferences/storySetupMode` in Firestore

* Component lives in `screens/StoryWizard/SetupModeToggle.tsx`

---

#### **User Story 4.1.2 — Render Form Dynamically Based on Setup Mode**

**Title**  
 Show/Hide Fields in Setup Wizard Based on Selected Mode

**Description**  
 As a parent, I want the setup form to dynamically adapt based on how much control I want so that I don’t feel overwhelmed or limited.

**Context**  
 Only one mode is active at a time. All inputs are compatible across modes and stored in a common config object.

**Acceptance Criteria**

* If mode \= “Quick”:

  * Show only “Start Story” button

* If mode \= “Medium”:

  * Show Theme Picker, Reading Level Quiz, Timeframe Picker

* If mode \= “Advanced”:

  * Show all medium fields \+ sliders for tone, CEFR selector, branching config

* All fields populate same shared config object

**Implementation Notes**

* Claude: `mcp.context7.forms().dynamicFieldVisibility()`

* Use conditional rendering and memoized `useStorySetup()` context

* Animate visibility for smooth transitions

* All form values stored in `storySetupConfig` state

---

#### **User Story 4.1.3 — Validate Shared Story Configuration Object**

**Title**  
 Build and Validate Unified Story Config from Any Mode

**Description**  
 As a developer, I want to ensure that all story setup inputs, regardless of mode, funnel into a consistent configuration object that is validated before generation.

**Context**  
 This object is passed to the generation pipeline, so it must be complete and coherent.

**Acceptance Criteria**

Final object includes:

 ts  
CopyEdit  
`{`  
  `theme: string,`  
  `readingLevel: string,`  
  `durationDays: number,`  
  `tone: { romance: number, moral: number, ... },`  
  `structure: { flashbacks: boolean, epilogue: boolean },`  
  `branches: number,`  
  `successBias: number`  
`}`

*   
* Defaults filled in for skipped fields

* Validation checks:

  * `branches ∈ [1, 4]`

  * `tone sliders ∈ [0–100]`

  * `duration ∈ [1–30]`

**Implementation Notes**

* Claude: `mcp.context7.forms().validateStoryConfig()`

* Schema: Zod or Yup (`schemas/storyConfig.ts`)

* Errors shown inline before progressing to review step

* Store config temporarily in `StorySetupContext`

### **🎭 Feature 2: Theme & Tone Selection**

**Goal**: Let parents define the emotional feel and genre of the story. Quick/Medium modes show simple themes, while Advanced mode allows fine-tuning using sliders.

---

#### **User Story 4.2.1 — Build Simple Theme Picker for Medium Mode**

**Title**  
 Let Parents Pick a Theme from 6 Presets

**Description**  
 As a parent, I want to pick a story theme like “Adventure” or “Funny” so the story feels appropriate for my child’s mood.

**Context**  
 Used in Medium mode; shows visual buttons or cards with theme names and icons.

**Acceptance Criteria**

* Themes include: Adventure, Comedy, Mystery, Magical, Moral, Random

* One theme selectable at a time

* Random is selected by default in Quick mode

**Implementation Notes**

* Claude: `mcp.context7.ui().themePickerSimple()`

* Store selected theme in `storySetupConfig.theme`

* Component: `ThemeSelector.tsx`

* Random theme generator: `utils/randomTheme.ts`

---

#### **User Story 4.2.2 — Render Advanced Tone Sliders in Expanded Mode**

**Title**  
 Display 0–100 Sliders for Story Mood Customization

**Description**  
 As a parent, I want to fine-tune the tone of the story so it can have just the right blend of emotions and lessons.

**Context**  
 This is only visible when advanced mode is selected.

**Acceptance Criteria**

* Sliders:

  * Romance

  * Moral

  * Comedy

  * Fantasy

  * Danger

* Each slider value stored as integer 0–100

* Default values are all 50 unless previously adjusted

**Implementation Notes**

* Claude: `mcp.context7.ui().toneSliderGroup()`

* Store slider values under `storySetupConfig.tone`

* Component: `ToneSliders.tsx`

* Use persistent form state so values aren’t lost when collapsing

---

#### **User Story 4.2.3 — Merge Theme and Tone into Prompt Configuration**

**Title**  
 Add Theme and Tone Settings to Final Generation Prompt

**Description**  
 As a developer, I want to merge the selected theme or slider values into the story prompt so the generation backend can use them.

**Context**  
 Tone values modify style and genre-related phrasing in the prompt template.

**Acceptance Criteria**

If tone sliders are used, include them:

 ts  
CopyEdit  
`tone: {`  
  `romance: 10,`  
  `moral: 70,`  
  `...`  
`}`

* 

Else, use simple theme:

 ts  
CopyEdit  
`theme: 'Adventure'`

*   
* Combined prompt config stored in `finalStorySetupObject`

**Implementation Notes**

* Claude: `mcp.context7.prompts().applyThemeAndTone()`

* Component: `buildStoryPrompt.ts`

* Add test cases to ensure both paths generate valid results

### **📚 Feature 3: Reading Level Configuration**

**Goal**: Let parents select their child’s reading level via age band, a quick word quiz, or manually selecting CEFR/grade level. This ensures story text is appropriate and engaging.

---

#### **User Story 4.3.1 — Provide Simple Reading Level by Age Band**

**Title**  
 Let Parents Select a Reading Level Based on Age Range

**Description**  
 As a parent, I want to choose my child’s age band to automatically set a matching reading level so the story isn't too easy or too hard.

**Context**  
 Default method used in Quick and Medium modes.

**Acceptance Criteria**

* Age band options:

  * 3–4

  * 5–6

  * 7–8

  * 9–10

  * 11+

* Each maps to internal CEFR or grade level

* Pre-selected based on child profile age (if known)

**Implementation Notes**

* Claude: `mcp.context7.ui().ageBandSelector()`

Config map in `readingLevels.ts`:

 ts  
CopyEdit  
`{ ageBand: '5–6', cefr: 'A1', grade: 1 }`

*   
* Store in `storySetupConfig.readingLevel`

---

#### **User Story 4.3.2 — Build Word Quiz to Auto-Detect Reading Level**

**Title**  
 Ask Kids to Pick Words They Know to Estimate Level

**Description**  
 As a parent, I want my child to take a 3-word quiz so the app can estimate their reading ability even if I’m unsure of their age band or grade.

**Context**  
 Offered as an alternative to age band in Medium mode.

**Acceptance Criteria**

* Show 3 sets of 4 words (12 total)

* Each word set labeled internally by level

* Parent/child taps known words

* System estimates CEFR/grade from results

**Implementation Notes**

* Claude: `mcp.context7.ui().wordQuizReadingLevel()`

* Quiz config: `readingQuizData.ts`

* Store result in `storySetupConfig.readingLevel.autoDetected = true`

---

#### **User Story 4.3.3 — Add Manual CEFR and Grade Level Selector**

**Title**  
 Let Parents Set CEFR Level or US Grade Directly

**Description**  
 As a parent, I want to directly choose the reading level by grade or CEFR so I can override the automatic settings.

**Context**  
 Visible only in Advanced mode.

**Acceptance Criteria**

* CEFR options: A1, A2, B1, B2, C1

* Grade levels: K, 1st–5th

* Dropdown menus

* Selecting one disables others (e.g., can't set both CEFR and Grade)

**Implementation Notes**

* Claude: `mcp.context7.ui().manualReadingLevelSelector()`

* Store in `storySetupConfig.readingLevel.manual`

* Validate conflict logic (e.g., if CEFR is set, ignore grade)

---

#### **User Story 4.3.4 — Finalize Reading Level in Prompt for Story Generation**

**Title**  
 Apply Reading Level to Generation Prompt

**Description**  
 As a developer, I want to add the selected or calculated reading level to the final story config so the AI uses vocabulary and sentence structures that match the child’s needs.

**Context**  
 Only one source of truth should be passed to the backend.

**Acceptance Criteria**

Prompt contains:

 ts  
CopyEdit  
`readingLevel: 'A2'`

*   
* Derived from:

  * Manual CEFR

  * OR manual grade (mapped to CEFR)

  * OR age band

  * OR quiz

**Implementation Notes**

* Claude: `mcp.context7.prompts().setReadingLevel()`

* Logic: `resolveReadingLevelFromSetupConfig()`

* Test edge cases (e.g., quiz result vs manual override)

### **⏳ Feature 4: Timeframe & Structure Configuration**

**Goal**: Let parents define how long the story lasts (in days) and whether it includes narrative devices like flashbacks and epilogues. These settings control pacing and complexity.

---

#### **User Story 4.4.1 — Add Duration Selector for Story Length (1–30 Days)**

**Title**  
 Let Parents Set Story Duration Using a Slider

**Description**  
 As a parent, I want to choose how many days the story spans so it fits our bedtime routine and attention span.

**Context**  
 Available in Medium and Advanced modes. Quick mode defaults to 1 night.

**Acceptance Criteria**

* Slider input (range: 1–30)

* Step \= 1 day

* Show preview: “This story will last for 7 nights.”

* Save value to `storySetupConfig.durationDays`

**Implementation Notes**

* Claude: `mcp.context7.ui().storyDurationSlider()`

* Component: `DurationSelector.tsx`

* Add tooltip or helper: “You can resume where you left off each night.”

---

#### **User Story 4.4.2 — Add Toggles for Flashback and Epilogue Inclusion**

**Title**  
 Let Parents Include Flashbacks and Epilogues in Story Arc

**Description**  
 As a parent, I want to enable or disable flashbacks and epilogues so the story has more depth or a simpler flow.

**Context**  
 Advanced mode only.

**Acceptance Criteria**

* Two toggles:

  * “Include flashbacks?”

  * “Add a final epilogue?”

* Defaults: both off

Save values to:

 ts  
CopyEdit  
`storySetupConfig.structure = {`  
  `flashbacks: boolean,`  
  `epilogue: boolean`  
`}`

* 

**Implementation Notes**

* Claude: `mcp.context7.ui().structureToggles()`

* Consider explaining what each structure element adds

* Animate story arc preview in UI when toggles are changed (optional)

---

#### **User Story 4.4.3 — Add Story Structure Settings to Prompt Assembly**

**Title**  
 Add Duration and Structure Settings to Final Generation Prompt

**Description**  
 As a developer, I want to include the selected story duration and structure settings in the generation prompt so the AI knows how much content to create and what style to use.

**Context**  
 This directly influences token budgeting and narrative pacing.

**Acceptance Criteria**

Prompt JSON contains:

 ts  
CopyEdit  
`{`  
  `durationDays: number,`  
  `structure: {`  
    `flashbacks: boolean,`  
    `epilogue: boolean`  
  `}`  
`}`

*   
* Estimated tokens calculated from duration:

  * 15 minutes per day → 10k tokens per branch per day

**Implementation Notes**

* Claude: `mcp.context7.prompts().addStructureToPrompt()`

* Add helper `calculateEstimatedTokens(duration)`

* Alert user if they exceed their credit tier during final review

### **🌿 Feature 5: Branch Count and Bias Settings**

**Goal**: Let parents define how many narrative paths are pre-generated (1–4), and how much the story favors positive outcomes using a “Success Bias” slider. These impact cost and tone.

---

#### **User Story 4.5.1 — Add Branch Count Slider with Tier Awareness**

**Title**  
 Let Parents Choose Number of Branches (1–4) with Credit Display

**Description**  
 As a parent, I want to set how many paths the story can take so my child can make choices during the adventure — and see how it affects cost.

**Context**  
 All modes show this in some form. Quick \= 1\. Medium \= 3\. Advanced \= adjustable slider.

**Acceptance Criteria**

* Slider: 1 to 4

* Label: “More choices \= more credits”

* Display how many credits it will cost in real-time

* Cap branch count based on subscription tier:

  * Starter: max 3

  * Family Pro: max 4

**Implementation Notes**

* Claude: `mcp.context7.ui().branchCountSlider()`

* Pull max allowed from `userEntitlements.maxBranches`

* Warn user if they try to exceed tier (but allow upgrade CTA)

* Cost \= 1 credit for up to 15 minutes, \+0.25 per extra branch

---

#### **User Story 4.5.2 — Add Success Bias Slider (0–100%)**

**Title**  
 Let Parents Adjust Story Outcome Positivity with a Bias Slider

**Description**  
 As a parent, I want to adjust how often my child’s character “wins” in the story so it feels either safe or more realistic.

**Context**  
 Advanced mode only.

**Acceptance Criteria**

* Slider: 0 (realistic) to 100 (always win)

* Default \= 70

* Tooltip: “Higher means more happy endings.”

* Save to `storySetupConfig.successBias`

**Implementation Notes**

* Claude: `mcp.context7.ui().successBiasSlider()`

* Optional: use emoji faces along slider for visual cue

* Value passed as modifier to generation tone logic

---

#### **User Story 4.5.3 — Apply Branch Count and Bias to Generation Prompt**

**Title**  
 Insert Branching Logic and Bias Weighting into Story Prompt

**Description**  
 As a developer, I want to ensure the story generation pipeline receives clear instructions about how many branches to generate and how optimistic the tone should be.

**Context**  
 This config affects how many versions of each major decision point are prewritten and their outcomes.

**Acceptance Criteria**

Prompt object contains:

 ts  
CopyEdit  
`{`  
  `branches: 3,`  
  `successBias: 70`  
`}`

*   
* Warn if branch count \> 3 on Starter tier

* Trigger credit cost preview before confirming

**Implementation Notes**

* Claude: `mcp.context7.prompts().insertBranchingConfig()`

* Validate final config before generation: `validateBranchConfig()`

* Add `calculateCreditCostFromConfig()` and unit test it

### **🧩 Feature 6: Prompt Assembly and Final Review**

**Goal**: Compile all configuration inputs into a well-structured prompt object that can be passed to the generation backend. Give parents a chance to review and confirm before triggering story generation.

---

#### **User Story 4.6.1 — Merge All Story Config Inputs into a Final Prompt Object**

**Title**  
 Compile Final Story Prompt from All Setup Inputs

**Description**  
 As a developer, I want to gather all selections from the setup flow into a unified prompt object so we can reliably pass it to the story generation backend.

**Context**  
 This object is the single source of truth for story generation.

**Acceptance Criteria**

Object contains:

 ts  
CopyEdit  
`{`  
  `theme?: string,`  
  `tone?: { romance: number, ... },`  
  `readingLevel: string,`  
  `durationDays: number,`  
  `structure: { flashbacks: boolean, epilogue: boolean },`  
  `branches: number,`  
  `successBias: number`  
`}`

*   
* All defaults filled if values were skipped

* Stored in `finalStorySetupConfig` context

**Implementation Notes**

* Claude: `mcp.context7.prompts().assembleStoryPrompt()`

* Utility: `utils/prompt/buildStoryPrompt.ts`

* Validate shape with Zod/Yup schema

* Log to PostHog: `"prompt_built"` with summary hash

---

#### **User Story 4.6.2 — Show Review Screen with Config Summary and Cost**

**Title**  
 Display Final Prompt Summary Before Generation Begins

**Description**  
 As a parent, I want to see all my story settings summarized before continuing, so I can make changes or confirm with confidence.

**Context**  
 This is the last step before the backend call begins.

**Acceptance Criteria**

* Show grouped summary:

  * Theme or tone breakdown

  * Reading level

  * Duration

  * Branch count

  * Success bias

  * Estimated cost in credits

* “Edit” buttons next to each config section

* Confirm button to proceed

**Implementation Notes**

* Claude: `mcp.context7.ui().renderStoryReviewScreen()`

* Component: `StoryReviewScreen.tsx`

* Use `calculateEstimatedCredits(promptConfig)`

* On submit, call `startStoryGeneration(promptConfig)`

---

#### **User Story 4.6.3 — Handle Prompt Submission to Worker and Track Result**

**Title**  
 Submit Final Prompt to Cloudflare Worker and Track Progress

**Description**  
 As a developer, I want to send the final prompt to the worker backend and show progress so the parent knows their story is on the way.

**Context**  
 This is the handoff from UI to async story generation pipeline.

**Acceptance Criteria**

* API `POST /start-story` with prompt payload

* Response: `jobId`

* Show progress UI: “Generating page 1 of 5…”

* Poll status every 3–5s until `status = complete`

* On failure, show error and allow retry

**Implementation Notes**

* Claude: `mcp.context7.api().startStoryGenerationJob()`

* Store jobId in Firestore under `storyJobs/{jobId}`

* Track job with `useStoryJobTracker(jobId)` hook

* Claude E2E: puppeteer.mcp.verifyStoryStartFromPrompt()

### **⚙️ Epic 5: Generation Pipeline**

**Goal**: Transform the final story setup prompt into a full illustrated, multi-path story using GPT-4o for text and DALL·E 3 for images. The pipeline runs in a Cloudflare Worker, queues image generation, streams progress to the client, and ensures the client can lazy-load story content while reading.

---

### **⚙️ Epic 5 – Features**

**Feature 1: Prompt Parsing and API Call Assembly**  
 Parse the final `storySetupConfig` into structured GPT \+ DALL·E prompt templates. Handle defaults, branch handling, and content formatting.

**Feature 2: Text Generation via GPT-4o (Multi-Branch)**  
 Send compiled prompts to GPT-4o to generate story text. Handle multiple branches, scene chunking, and estimated token cost management.

**Feature 3: Image Generation via DALL·E 3**  
 For each \~250-word page of story text, queue a DALL·E request and link the returned image to that story chunk.

**Feature 4: Cloudflare Worker Coordination & Progress Stream**  
 Manage prompt processing, OpenAI API calls, and DALL·E job queueing via a Worker. Send real-time WebSocket updates to the client.

**Feature 5: Client Prefetch, Lazy Loading, and Offline Save**  
 Ensure the app starts reading while assets are still loading, prefetches the next page and branch, and caches the full story for offline reading.

### **⚙️ Feature 1: Prompt Parsing and API Call Assembly**

**Goal**: Convert the unified `storySetupConfig` object into properly formatted prompts for GPT-4o (text) and DALL·E 3 (images). Handle branching, token budgeting, and defaults.

---

#### **User Story 5.1.1 — Convert Config into GPT Prompt Structure**

**Title**  
 Transform Story Setup Config into a Structured GPT Prompt

**Description**  
 As a developer, I want to transform the user’s story configuration into a rich, structured prompt so GPT-4o can generate high-quality, personalized story text.

**Context**  
 This prompt needs to match the narrative arc (duration, tone, success bias, etc.) and include child/avatar references.

**Acceptance Criteria**

Output format:

 ts  
CopyEdit  
`{`  
  `system: "You are a world-class children’s storyteller...",`  
  `user: "Generate a 15-minute bedtime story for a 5-year-old...",`  
  `metadata: {`  
    `durationDays: 3,`  
    `readingLevel: "A2",`  
    `theme: "Adventure",`  
    `tone: {...},`  
    `character: {...}`  
  `}`  
`}`

*   
* Supports 1–4 branches

* Each branch has a unique ID

* Prompt includes safety scaffolding (no violence, no fear, etc.)

**Implementation Notes**

* Claude: `mcp.context7.prompts().generateStructuredGptPrompt()`

* Template lives in: `prompts/gpt/storyTemplate.ts`

* Add unit test to check prompt format against spec

* Escape user input and enforce max token budget (10k tokens / 15 min)

---

#### **User Story 5.1.2 — Break Down Prompt into Chunks per Day & Branch**

**Title**  
 Split GPT Prompt into Daily Chunks per Branch for Generation

**Description**  
 As a developer, I want to break up the full prompt into smaller requests so the AI can generate story content one page (or day) at a time for each branch.

**Context**  
 Each chunk \~250 words (1 page), across days and branches.

**Acceptance Criteria**

* If 3-day, 3-branch story:

  * Generates 9 prompt chunks

Each chunk labeled:

 ts  
CopyEdit  
`{`  
  `branchId: "b1",`  
  `day: 2,`  
  `promptChunk: { ... }`  
`}`

*   
* Chunks passed to worker queue in order

**Implementation Notes**

* Claude: `mcp.context7.prompts().chunkGptPrompt()`

* Store in queue format: `storyJobs/{jobId}/chunks`

* Estimate tokens per chunk: \~700 per 250 words

* Use helper: `splitPromptByDayAndBranch()`

---

#### **User Story 5.1.3 — Generate Image Descriptions for DALL·E from Chunks**

**Title**  
 Generate Rich Visual Descriptions for Each Story Page

**Description**  
 As a developer, I want to generate image prompts from story text chunks so that each page has a relevant and beautiful DALL·E illustration.

**Context**  
 DALL·E takes \~80 tokens per image prompt. Max 1 image per \~250-word chunk.

**Acceptance Criteria**

Output: `imagePrompt` per chunk:

 ts  
CopyEdit  
`{`  
  `textChunk: "...",`  
  `imagePrompt: "A cheerful pirate child discovering a glowing map..."`  
`}`

*   
* Tone and theme matched from config

* Option to regenerate manually (not in MVP)

**Implementation Notes**

* Claude: `mcp.context7.prompts().generateImagePrompts()`

* Template lives in `prompts/image/scenePromptBuilder.ts`

* Use regex/keyword scan to infer visual scenes

* Log errors if generation fails (fallback to default background)

### **✍️ Feature 2: Text Generation via GPT-4o (Multi-Branch)**

**Goal**: Generate full story text for each day and each branch using GPT-4o. Handle prompt chunking, retries, content safety, and link text chunks back to the prompt and story config.

---

#### **User Story 5.2.1 — Submit Prompt Chunks to GPT-4o and Collect Responses**

**Title**  
 Send Each Chunk to GPT-4o and Save Returned Story Text

**Description**  
 As a developer, I want to send the prepared prompt chunks to GPT-4o and collect the returned story paragraphs so each page of the story is ready to read.

**Context**  
 Each branch and day has a separate request. Response must be mapped back to the branch/day.

**Acceptance Criteria**

* Input: array of prompt chunks from Feature 1

* Send each to GPT-4o via OpenAI API

On success, save to:

 ts  
CopyEdit  
`{`  
  `jobId: string,`  
  `branchId: string,`  
  `day: number,`  
  `text: string`  
`}`

*   
* Status: `complete`, `in_progress`, `error`

**Implementation Notes**

* Claude: `mcp.context7.api().sendChunksToGpt()`

* Backend Worker: `handlers/generateStoryChunk.ts`

* Retry on transient errors (e.g., 429 or timeout)

* Use Claude for async backoff \+ exponential retry strategy

---

#### **User Story 5.2.2 — Store Text Outputs in Firestore Under Job Node**

**Title**  
 Persist Story Text Outputs Per Chunk in Firestore

**Description**  
 As a developer, I want each GPT result to be saved in Firestore under a consistent schema so it can be streamed to the client incrementally.

**Context**  
 Fire-and-forget; frontend listens to updates via `onSnapshot`.

**Acceptance Criteria**

* Path: `storyJobs/{jobId}/branches/{branchId}/days/{n}`

Document fields:

 ts  
CopyEdit  
`{`  
  `status: 'complete',`  
  `text: string,`  
  `imagePrompt: string,`  
  `createdAt: timestamp`  
`}`

* 

**Implementation Notes**

* Claude: `mcp.context7.firestore().saveStoryChunkText()`

* Use Firestore batch writes where possible

* Add `createdAt` and `updatedAt` timestamps

* Set up basic Firestore security rule:

  * Only parent user with UID can read from their own jobs

---

#### **User Story 5.2.3 — Track Completion Progress per Job via Metadata**

**Title**  
 Update Overall Generation Progress for Story Job

**Description**  
 As a developer, I want to keep a running tally of how many story parts have finished so we can show parents a progress indicator during generation.

**Context**  
 Used for real-time status (e.g., “4 of 9 parts complete”).

**Acceptance Criteria**

Add/update a counter on job doc:

 ts  
CopyEdit  
`{`  
  `totalChunks: number,`  
  `completedChunks: number`  
`}`

*   
* Client subscribed via WebSocket or snapshot listener

* Update count after each successful GPT response

**Implementation Notes**

* Claude: `mcp.context7.firestore().updateJobProgress()`

* Function: `incrementJobProgress(jobId)`

* Worker updates `storyJobs/{jobId}` after each chunk

* Puppeteer E2E: verify counter increments on chunk arrival

### **🖼️ Feature 3: Image Generation via DALL·E 3**

**Goal**: For each \~250-word story chunk, send the generated image prompt to DALL·E 3, collect the resulting image, and associate it with the correct story page. Retry failures and ensure signed URL delivery.

---

#### **User Story 5.3.1 — Submit Image Prompts to DALL·E for Generation**

**Title**  
 Send Image Prompt to DALL·E 3 and Collect Image URL

**Description**  
 As a developer, I want to send each scene’s image prompt to DALL·E so we can illustrate the story with visually rich, AI-generated art.

**Context**  
 Runs in the Cloudflare Worker after the GPT text chunk is saved.

**Acceptance Criteria**

POST to OpenAI Image API with:

 ts  
CopyEdit  
`{`  
  `prompt: string,`  
  `model: "dall-e-3",`  
  `size: "1024x1024",`  
  `quality: "standard"`  
`}`

*   
* Receive back:

  * URL or base64 of image

  * Estimated image generation time

**Implementation Notes**

* Claude: `mcp.context7.api().generateImageWithDalle()`

* Store image temporarily in memory until persisted

* Retry up to 3 times on failure (respect 429s)

* Set up Claude-side retry queue if needed: `imageJobQueue()`

---

#### **User Story 5.3.2 — Upload Image to Cloudflare R2 and Store Signed URL**

**Title**  
 Persist Image in Cloudflare R2 and Save URL in Firestore

**Description**  
 As a developer, I want to store the generated image in R2 and generate a signed access URL so it can be safely rendered by the client.

**Context**  
 Every image must be persisted and linked to the correct story chunk.

**Acceptance Criteria**

* Store image as: `stories/{jobId}/{branchId}/{day}.png`

* Generate signed URL valid for 30 days

Save in Firestore under:

 ts  
CopyEdit  
`storyJobs/{jobId}/branches/{branchId}/days/{n}.imageUrl`

* 

**Implementation Notes**

* Claude: `mcp.context7.storage().uploadImageToR2()`

* Use signed URL helper: `getSignedR2Url()`

* Delete orphan images after 30 days (see Feature 5\)

---

#### **User Story 5.3.3 — Link DALL·E Image to Corresponding Story Chunk**

**Title**  
 Link Generated Image to Its Corresponding Text Chunk

**Description**  
 As a developer, I want to attach the generated image to the correct story page so the reader can view the illustration alongside the text.

**Context**  
 Ensures the frontend can lazy-load and display full illustrated content.

**Acceptance Criteria**

Image URL added to the correct Firestore document:

 ts  
CopyEdit  
`{`  
  `text: "Once upon a time...",`  
  `imageUrl: "https://r2.example.com/signed/..."`  
`}`

*   
* Update must happen after both image and text are complete

* No duplicate writes or mismatches

**Implementation Notes**

* Claude: `mcp.context7.firestore().linkImageToTextChunk()`

* Validate jobId, branchId, day match

* Test: assert that chunk has both text and imageUrl before marking `complete`

### **🧵 Feature 4: Cloudflare Worker Coordination & Progress Stream**

**Goal**: Orchestrate all AI tasks (GPT \+ DALL·E) from a Cloudflare Worker. Stream job progress to the client via WebSocket. Track chunk completions, errors, and estimated time remaining.

---

#### **User Story 5.4.1 — Accept Prompt Payload and Initialize Story Job**

**Title**  
 Start a New Story Job When Prompt Is Submitted

**Description**  
 As a developer, I want the Cloudflare Worker to accept the full prompt payload and set up the Firestore job node to begin processing.

**Context**  
 This is the first thing the backend does when a parent hits “Generate Story.”

**Acceptance Criteria**

* POST endpoint `/start-story` accepts full prompt config

* Validates structure and credit availability

Creates job metadata in Firestore:

 ts  
CopyEdit  
`{`  
  `jobId: string,`  
  `userId: string,`  
  `status: 'started',`  
  `createdAt: timestamp,`  
  `config: { ... },`  
  `totalChunks: number`  
`}`

* 

**Implementation Notes**

* Claude: `mcp.context7.api().startStoryJob()`

* Function: `worker/handlers/startStoryJob.ts`

* Add `generateJobId()` util

* Log job start to PostHog with feature breakdown

---

#### **User Story 5.4.2 — Queue GPT and DALL·E Tasks Per Chunk**

**Title**  
 Queue Story Generation and Image Tasks from Worker

**Description**  
 As a developer, I want the Worker to queue one GPT and one DALL·E task per story chunk so processing can happen in parallel.

**Context**  
 Each day/branch \= 1 chunk → 1 GPT call → 1 DALL·E call.

**Acceptance Criteria**

* For each chunk:

Add to `storyJobQueue()`:

 ts  
CopyEdit  
`{`  
  `jobId, branchId, day, promptChunk, imagePrompt`  
`}`

*   
* Worker processes queue items in batches

* Queue size stored on job document: `pendingChunks`

**Implementation Notes**

* Claude: `mcp.context7.queue().addStoryChunkToQueue()`

* Use Cloudflare Durable Objects or queue abstraction

* Allow parallelism: max 4 concurrent jobs

* Retry or fail individual chunks without killing the job

---

#### **User Story 5.4.3 — Stream Progress Updates to Client via WebSocket**

**Title**  
 Send Live Progress Updates Back to the Client

**Description**  
 As a parent, I want to see the generation progress (e.g., “3 of 9 pages ready”) so I know the app is working.

**Context**  
 This helps create a great user experience even during large story jobs.

**Acceptance Criteria**

* Open WebSocket from app on `/progress/{jobId}`

Server sends JSON:

 ts  
CopyEdit  
`{`  
  `type: "progress",`  
  `completed: 3,`  
  `total: 9`  
`}`

* 

On error:

 ts  
CopyEdit  
`{`  
  `type: "error",`  
  `message: "GPT failed on day 2"`  
`}`

* 

**Implementation Notes**

* Claude: `mcp.context7.ws().subscribeToJobProgress()`

* Client uses `useStoryProgressWebSocket(jobId)`

* Claude backend uses pub/sub or direct Firestore watch

* Optional: send estimated time remaining

---

#### **User Story 5.4.4 — Mark Job Complete When All Chunks Are Done**

**Title**  
 Update Job Status and Close Progress Stream on Completion

**Description**  
 As a developer, I want the Worker to mark the job as `complete` and notify the client when all chunks are successfully processed.

**Context**  
 Tells the app to preload the reader and show the first page.

**Acceptance Criteria**

* When `completedChunks === totalChunks`:

Update job:

 ts  
CopyEdit  
`status: "complete",`  
`finishedAt: timestamp`

* 

Send WebSocket message:

 ts  
CopyEdit  
`{ type: "done" }`

* 

**Implementation Notes**

* Claude: `mcp.context7.firestore().markJobComplete()`

* Frontend uses this to stop loading spinner

* PostHog log: `"story_generated"` with time delta

### **📲 Feature 5: Client Prefetch, Lazy Loading, and Offline Save**

**Goal**: The app should load the story gradually while reading, prefetch the next page and branch in the background, and save stories for offline reading with efficient cache management.

---

#### **User Story 5.5.1 — Lazy Load Story Pages as Reader Progresses**

**Title**  
 Load One Story Page at a Time as Reader Swipes

**Description**  
 As a reader, I want the app to load only the current page of the story so that the experience feels fast and responsive even during generation.

**Context**  
 Each page \= \~250 words \+ one image. Only fetch one at a time until near end.

**Acceptance Criteria**

* Current page text \+ image fetched first

* Prefetch page `n+1` in the background

* Loading spinner shown if prefetch not ready

* Avoid loading entire branch on first render

**Implementation Notes**

* Claude: `mcp.context7.reader().lazyLoadCurrentPage()`

* Hook: `useCurrentStoryPage({ branchId, pageNumber })`

* Use Firestore `onSnapshot` for text \+ image chunks

* Reader view: `StoryReader.tsx` — paginated scroll/swipe

---

#### **User Story 5.5.2 — Prefetch Upcoming Branches Ahead of Choices**

**Title**  
 Prefetch All Story Branches Before a Choice Page

**Description**  
 As a developer, I want to prefetch all available branches before the player reaches a choice so that the next path loads instantly when tapped.

**Context**  
 Story setup can include 1–4 prewritten branches. Branches should be fully generated before the choice moment.

**Acceptance Criteria**

* Detect when next page is a `branchSelector`

* Prefetch full content of each available branch path

* If 3 branches, store them in memory or cache

* Tapping choice loads from cache, not network

**Implementation Notes**

* Claude: `mcp.context7.reader().prefetchBranchesAhead()`

* Create hook: `useBranchPrefetcher()`

* Warn if any branch is still generating

* Test: simulate slow network and verify tap is instant

---

#### **User Story 5.5.3 — Save Stories to Disk for Offline Reading**

**Title**  
 Persist Completed Stories to Local Storage for Offline Use

**Description**  
 As a parent, I want to keep the last 20 stories available offline so we can read them even when we don’t have an internet connection.

**Context**  
 Max 200MB of story data — images and text — stored using LRU strategy.

**Acceptance Criteria**

* Save:

  * Story text (JSON)

  * Image thumbnails (compressed)

* Library view only shows offline-ready stories when offline

* Delete oldest stories when over cache limit

**Implementation Notes**

* Claude: `mcp.context7.storage().cacheStoryOffline()`

* Use `react-native-fast-image` and `react-native-mmkv`

* Helper: `OfflineStoryManager.save(jobId)`

* Background thread for cleanup: keep most recently read 20

---

#### **User Story 5.5.4 — Support Resume Playback from Last Page Read**

**Title**  
 Resume Reading From Where We Left Off, Even Offline

**Description**  
 As a reader, I want the story to continue from the last page we read so I don’t lose progress after a break or a reboot.

**Context**  
 Critical for multi-day stories or when bedtime is interrupted.

**Acceptance Criteria**

Store last visited page per story:

 ts  
CopyEdit  
`localProgress = {`  
  `jobId: "abc123",`  
  `branchId: "b1",`  
  `page: 4`  
`}`

*   
* On open, prompt “Resume from page 4?” or “Start over”

* Works offline and online

**Implementation Notes**

* Claude: `mcp.context7.reader().trackPageProgress()`

* Save to disk every 30 seconds or page change

* Component: `ResumePromptModal.tsx`

### **📖 Epic 6: Reader Experience**

**Goal**: Create a rich, intuitive reader UI for kids and parents to enjoy the story. It must support paginated reading, instant branch selection, estimated read time, and accessibility features.

---

### **📖 Epic 6 – Features**

**Feature 1: Paginated Swipe Reading Interface**  
 Create a swipeable reading interface with text and illustrations, optimized for bedtime Epic readability.

**Feature 2: Interactive Branch Page Selection**  
 Enable children to tap a choice on branch pages, triggering instant path selection and continuing the story.

**Feature 3: Estimated Read-Time Display**  
 Show parents an estimated total read-time for the current story and per page.

**Feature 4: Offline Read Support & Recovery**  
 Ensure reading works offline using previously cached data, with resume support and fallback handling.

**Feature 5: Accessibility: Dynamic Text & VoiceOver**  
 Support dynamic text resizing and VoiceOver labeling for inclusive access.

### **📖 Feature 1: Paginated Swipe Reading Interface**

**Goal**: Build a smooth, swipeable interface that shows one story page at a time, combining the illustrated image and text, optimized for bedtime reading on iPad.

---

#### **User Story 6.1.1 — Build Paginated Reader View with One Page at a Time**

**Title**  
 Display Story One Page at a Time in a Swipeable View

**Description**  
 As a reader, I want to swipe through the story one page at a time, seeing the image and text together, so I can enjoy the story in a natural bedtime flow.

**Context**  
 This is the main interface for consuming the story. It must be clean, calm, and intuitive.

**Acceptance Criteria**

* Show one page per screen

* Each page shows:

  * AI-generated image (fit width, rounded corners)

  * Story text below (large, legible font)

* Swipe horizontally to move to next/previous page

* Optional: vertical scroll if text exceeds height

**Implementation Notes**

* Claude: `mcp.context7.ui().renderStoryReaderPage()`

* Component: `StoryReader.tsx`

* Use `FlatList` with `pagingEnabled`

* Image: `react-native-fast-image`

* Page data from `useCurrentStoryBranch()` hook

* Style based on design tokens from Tamagui theme

---

#### **User Story 6.1.2 — Highlight Current Page and Show Progress**

**Title**  
 Display Which Page We're On and Progress Through the Story

**Description**  
 As a child or parent, I want to know how far along we are in the story so I understand how much is left.

**Context**  
 Progress bar adds a sense of pacing and completion.

**Acceptance Criteria**

* Fixed top progress bar (or dots) showing % completion

* Highlights current page (e.g., “Page 3 of 8”)

* Progress bar animates between pages

**Implementation Notes**

* Claude: `mcp.context7.reader().renderProgressBar()`

* Hook: `useStoryProgress()`

* Data from `storyJobs/{jobId}/branches/{branchId}/days.length`

* Component: `StoryProgressIndicator.tsx`

---

#### **User Story 6.1.3 — Animate Swipe Transitions for a Calm Bedtime Flow**

**Title**  
 Add Smooth Transitions Between Pages to Support Bedtime Mood

**Description**  
 As a parent, I want gentle page transitions so the experience feels relaxing and not too stimulating for bedtime.

**Context**  
 Sharp transitions or jank will break immersion.

**Acceptance Criteria**

* Use horizontal slide with fade-in animation

* Animate text and image together

* No hitches between pages on slow devices

**Implementation Notes**

* Claude: `mcp.context7.ui().animatePageSwipe()`

* Use `Animated.FlatList` with spring easing

* Use `react-native-reanimated` for smooth transitions

* Avoid loading delays by prefetching next page

### **🌿 Feature 2: Interactive Branch Page Selection**

**Goal**: On branch pages, let the child tap on a choice to instantly jump into that pre-generated story path. All branches are preloaded before the choice page is shown.

---

#### **User Story 6.2.1 — Render Branch Page with Interactive Choices**

**Title**  
 Display Story Branch Page with Tapable Choices

**Description**  
 As a child, I want to tap a choice on the branch page and immediately continue the story based on my decision.

**Context**  
 Branch pages offer decision points. Each choice represents a pre-generated narrative path.

**Acceptance Criteria**

* Show 2–4 choice buttons (depending on story setup)

* Each button displays:

  * Short choice label (e.g., “Follow the dragon”)

  * Optional emoji/icon

* Buttons styled large enough for child fingers

**Implementation Notes**

* Claude: `mcp.context7.reader().renderBranchSelector()`

* Component: `BranchChoicePage.tsx`

Choices pulled from:

 ts  
CopyEdit  
`storyJobs/{jobId}/branches/`

*   
* Use Tamagui button components (`<Button size="xl" />`)

* Add child-friendly touch feedback (scale bounce)

---

#### **User Story 6.2.2 — Switch to Selected Branch Immediately After Tap**

**Title**  
 Switch Story Path to Selected Branch When Choice Is Made

**Description**  
 As a reader, I want the app to instantly switch to the new story path I chose so I can continue the adventure without waiting.

**Context**  
 All branches are preloaded, so no backend call needed.

**Acceptance Criteria**

* On tap:

  * Switch active branch to `branchId`

  * Start on page 1 of selected branch

  * Progress resets (start of branch)

* No loading spinner shown

**Implementation Notes**

* Claude: `mcp.context7.reader().setActiveBranch()`

* Hook: `useStoryNavigation()`

* Method: `switchToBranch(branchId: string)`

* Prefetch branches before branch page (Feature 5.5)

---

#### **User Story 6.2.3 — Track Chosen Path in Firestore for Analytics**

**Title**  
 Log Which Branch Was Chosen for Metrics and Resume

**Description**  
 As a developer, I want to record which path the child selected so that we can resume later and understand reader decisions.

**Context**  
 Useful for personalization in the future and saving progress.

**Acceptance Criteria**

* On branch choice:

Update Firestore:

 ts  
CopyEdit  
`storyJobs/{jobId}.selectedBranchId = "b3"`

*   
  * Also log to PostHog:

    * Event: `branch_chosen`

    * Props: `{ jobId, branchId, userId }`

**Implementation Notes**

* Claude: `mcp.context7.analytics().trackBranchChoice()`

* Cloud function can infer remaining path length

* Used later in resume-from-last-page logic (Offline Save Feature)

### **⏱️ Feature 3: Estimated Read-Time Display**

**Goal**: Show parents a visual estimate of how long the story will take to read, based on page count and reading level. Help them choose an appropriate bedtime story duration.

---

#### **User Story 6.3.1 — Calculate Total Estimated Read Time for Story**

**Title**  
 Compute Total Estimated Read Time Based on Story Length and Level

**Description**  
 As a parent, I want to see how long the full story will take to read so I can choose one that fits into our bedtime routine.

**Context**  
 Calculation based on reading speed per age/level and number of story chunks.

**Acceptance Criteria**

* Estimate shown when generation completes:

  * e.g., “Estimated read time: 13 minutes”

Estimate stored in Firestore:

 ts  
CopyEdit  
`storyJobs/{jobId}.estimatedReadTime: number (in minutes)`

* 

**Implementation Notes**

* Claude: `mcp.context7.utils().estimateStoryReadTime()`

* Default reading speeds:

  * Ages 4–6: \~100 wpm

  * Ages 7–9: \~120 wpm

  * Ages 10–12: \~140 wpm

* Estimate \= (total word count) / (wpm), rounded up

* Add this field after story generation is complete

---

#### **User Story 6.3.2 — Display Read Time on Cover and Reader Header**

**Title**  
 Show Estimated Read Time in Story Library and Reader UI

**Description**  
 As a user, I want to see the read time both when browsing stories and while reading, so I know how much time I’m committing.

**Context**  
 Displayed in two locations: Library view and inside the Reader.

**Acceptance Criteria**

* In Library:

  * Each story card shows: “\~13 min”

* In Reader header:

  * Top-right corner displays remaining: “8 min left”

* Updates as pages are read

**Implementation Notes**

* Claude: `mcp.context7.ui().renderReadTimeEstimate()`

* Hook: `useRemainingReadTime(jobId)`

* Updates remaining time on each page swipe

* Use lightweight Tamagui badge (`<Badge variant="neutral" />`)

### **📶 Feature 4: Offline Read Support & Recovery**

**Goal**: Allow parents and children to read previously generated stories without needing an internet connection. Support resuming where they left off, even after rebooting the device or app.

---

#### **User Story 6.4.1 — Detect Offline Mode and Filter Library**

**Title**  
 Only Show Offline-Available Stories When Internet Is Unavailable

**Description**  
 As a user, I want to see which stories are available offline when I’m not connected to the internet so I don’t try to open something that won’t work.

**Context**  
 Story pages are cached after generation. Filter Library when offline.

**Acceptance Criteria**

* Detect device offline state

* In Library view:

  * Show only stories marked as `offlineAvailable: true`

* If trying to open a non-cached story while offline:

  * Show graceful fallback screen

**Implementation Notes**

* Claude: `mcp.context7.net().isOffline()`

* Hook: `useOfflineLibrary()`

Each cached story marked with:

 ts  
CopyEdit  
`offlineAvailable: true`

*   
* Story cache manager adds this flag when saved

---

#### **User Story 6.4.2 — Resume Reading from Last Page Offline**

**Title**  
 Restore Reading Progress on a Cached Story When Offline

**Description**  
 As a reader, I want to continue where I left off in a story even if I’m offline so I don’t lose track of the plot.

**Context**  
 Works with offline cache from Epic 5 and Reader state tracking.

**Acceptance Criteria**

Load progress from local storage:

 ts  
CopyEdit  
`localProgress[jobId] = {`  
  `branchId: "b1",`  
  `page: 3`  
`}`

*   
* Auto-navigate to saved page

* If no progress found, start from beginning

**Implementation Notes**

* Claude: `mcp.context7.reader().loadLocalProgress()`

* Hook: `useLastReadPage()`

* Trigger on mount in `StoryReader.tsx`

* Save progress during reading every 30s (already implemented in Feature 5.5)

---

#### **User Story 6.4.3 — Gracefully Handle Image Loading Errors Offline**

**Title**  
 Fallback to Placeholder Image When Offline Load Fails

**Description**  
 As a reader, I want the story to continue even if an image fails to load, so I’m not stuck on a broken page.

**Context**  
 Sometimes image cache is missing or corrupted.

**Acceptance Criteria**

* If image fails to load:

  * Show gentle illustration placeholder (e.g., book icon)

  * Keep story text visible

  * Log error to local log

**Implementation Notes**

* Claude: `mcp.context7.ui().fallbackToImagePlaceholder()`

* Component: `SafeImage.tsx`

  * Tries to load local cache

  * Falls back to bundled asset: `assets/fallback.png`

* Track error in local MMKV store: `offlineErrors[]`

### **♿ Feature 5: Accessibility — Dynamic Text & VoiceOver**

**Goal**: Ensure all story content, UI elements, and controls are accessible through iOS accessibility features such as dynamic text scaling and VoiceOver labels.

---

#### **User Story 6.5.1 — Enable Dynamic Text Scaling for Reader Content**

**Title**  
 Adapt Story Text Size to iOS Dynamic Type Settings

**Description**  
 As a reader with vision needs, I want the story text to scale based on my system font settings so I can read comfortably.

**Context**  
 Supports bedtime reading for low-vision users or smaller children.

**Acceptance Criteria**

* Story text resizes based on iOS system font scale

* Layout adjusts dynamically (no clipping or overflow)

* Works in all readers: Quick, Medium, Advanced stories

**Implementation Notes**

* Claude: `mcp.context7.ui().enableDynamicText()`

* Use `Text` with `adjustsFontSizeToFit`, `allowFontScaling`

* Tamagui theme tokens should reflect platform settings

* Test with smallest and largest iOS font sizes

---

#### **User Story 6.5.2 — Add VoiceOver Labels to All Interactive Elements**

**Title**  
 Label Buttons and Choices with VoiceOver Descriptions

**Description**  
 As a visually impaired user, I want to hear what each button or element does so I can navigate the story using VoiceOver.

**Context**  
 Critical for accessibility compliance and inclusive bedtime use.

**Acceptance Criteria**

* All tappable buttons have `accessibilityLabel`

  * E.g., “Next page,” “Choose follow the dragon”

* Progress bars, swipe instructions, and story metadata readable via VoiceOver

**Implementation Notes**

* Claude: `mcp.context7.ui().addVoiceOverLabels()`

* Use `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`

* Test in iOS simulator with VoiceOver enabled

* Optional: `accessibilityLiveRegion="polite"` for progress

---

#### **User Story 6.5.3 — Verify Accessibility on All Core Screens**

**Title**  
 Audit Reader Screens for Accessibility Compliance

**Description**  
 As a developer, I want to confirm that all major story UI elements are accessible and provide a good experience for VoiceOver and large text users.

**Context**  
 Ensure that quick win screens like the reader, branch selector, and library pass basic audits.

**Acceptance Criteria**

* Run iOS Accessibility Inspector and fix all warnings

* Confirm with simulated VoiceOver navigation:

  * Story text

  * Branch buttons

  * Resume prompts

  * Library cards

* No stuck focus traps or unlabeled regions

**Implementation Notes**

* Claude: `mcp.context7.devtools().runAccessibilityAudit()`

* Include output in `README-accessibility.md`

* Add checklist to CI: "Accessibility Smoke Check"

### **📚 Epic 7: Library**

**Goal**: Give parents a clean way to browse, manage, and relaunch previously generated stories. Includes filtering by child, deletion controls, and support for offline access (tied to other features).

---

### **📚 Epic 7 – Features**

**Feature 1: Story Library Grid View**  
 Display all saved stories in a tappable grid with cover art, read time, and child profile tags.

**Feature 2: Filter by Child Profile**  
 Allow parents to view only stories associated with a selected child.

**Feature 3: Story Deletion and Cleanup**  
 Enable hard deletes of individual stories, restricted to the parent user.

**Feature 4: Launch Story from Library**  
 Let users tap a story to reopen it at the beginning or resume from the last read page.

**Feature 5: Handle Offline-Only Story Visibility**  
 Ensure only cached stories appear when offline, consistent with Feature 6.4.

### **🧱 Feature 1: Story Library Grid View**

**Goal**: Display all saved stories in a responsive, tappable grid layout. Each card shows the story cover image, estimated read time, and associated child profile (avatar or initials).

---

#### **User Story 7.1.1 — Render Grid of Story Cards with Cover Art**

**Title**  
 Display a Grid of Story Cards with Covers

**Description**  
 As a parent, I want to browse my saved stories in a grid layout so I can quickly find the one I want to read.

**Context**  
 This is the main entry point to the Library. Each card should feel visually rich and easy to tap.

**Acceptance Criteria**

* Show 2–3 cards per row (responsive)

* Each card includes:

  * Cover image thumbnail

  * Story title or nickname (e.g., “Dragon Cave”)

  * Estimated read time (e.g., “12 min”)

* Tapping a card selects it (behavior covered in Feature 4\)

**Implementation Notes**

* Claude: `mcp.context7.library().renderStoryGrid()`

* Component: `StoryLibraryGrid.tsx`

* Use `FlatList` in grid mode (`numColumns=2` on iPad)

* Images from offline cache or Cloudflare R2 signed URLs

* Use `react-native-fast-image` for thumbnail display

* Source: Firestore collection: `userStories/{uid}/stories`

---

#### **User Story 7.1.2 — Show Associated Child on Each Card**

**Title**  
 Display Child Profile Tag on Each Story Card

**Description**  
 As a parent, I want to see which child each story is for so I don’t open the wrong one.

**Context**  
 Some households have multiple children and need clarity.

**Acceptance Criteria**

* Each story card shows:

  * Circular child avatar (if available)

  * Or fallback initials badge (e.g., “PA” for Paisley)

* Avatar shown in bottom-left corner of card

* Tap area remains story card, not avatar

**Implementation Notes**

* Claude: `mcp.context7.ui().renderChildBadge()`

* Hook: `useChildProfile(id)`

* Use `Avatar` or `InitialsBadge` component

* Fallback logic: check for `child.avatarUrl` or compute initials from name

---

#### **User Story 7.1.3 — Sort Stories by Most Recently Opened**

**Title**  
 Sort Story Grid by Last Opened Date Descending

**Description**  
 As a user, I want to see my most recently opened stories first so I can quickly get back to the latest ones.

**Context**  
 Supports common bedtime behavior: re-reading the last few stories.

**Acceptance Criteria**

* Default order: descending `lastOpenedAt`

* Tie-breaker: `createdAt`

Show timestamp in Firestore:

 ts  
CopyEdit  
`storyJobs/{jobId}.lastOpenedAt = timestamp`

* 

**Implementation Notes**

* Claude: `mcp.context7.library().sortStories()`

* Hook: `useSortedStories()`

* Update `lastOpenedAt` when a story is opened (Feature 4\)

### **🎛️ Feature 2: Filter by Child Profile**

**Goal**: Allow parents to filter their Library by child, showing only stories created for or associated with a specific child profile.

---

#### **User Story 7.2.1 — Add Horizontal Child Profile Selector**

**Title**  
 Let User Select a Child to Filter Library

**Description**  
 As a parent, I want to select one of my children from the top of the screen to filter stories that belong to them.

**Context**  
 This helps reduce visual noise and supports households with multiple kids.

**Acceptance Criteria**

* Display horizontal scrollable selector at the top of the Library:

  * Each option shows: avatar or initials, nickname

* Tap a profile to filter grid

* First option \= “All Children”

**Implementation Notes**

* Claude: `mcp.context7.library().renderChildSelector()`

* Component: `ChildFilterSelector.tsx`

* Hook: `useChildProfiles()`

* Highlight selected child with border or underline

* Use `FlatList horizontal` with `TouchableOpacity`

---

#### **User Story 7.2.2 — Filter Stories by Selected Child ID**

**Title**  
 Filter Library Grid by Selected Child Profile

**Description**  
 As a parent, I want to only see stories created for the selected child so I can easily find relevant ones.

**Context**  
 Each story is linked to a `childId`.

**Acceptance Criteria**

* On child tap:

  * Show only stories where `story.childId === selectedChild.id`

* If “All Children” is selected:

  * Show full story grid (Feature 7.1)

* No errors if child has no stories

**Implementation Notes**

* Claude: `mcp.context7.library().filterStoriesByChild()`

* Hook: `useFilteredStories(childId)`

* Memoize filtered list for perf

* Ensure fallback UI if no stories found

### **🗑️ Feature 3: Story Deletion and Cleanup**

**Goal**: Let parents permanently delete a story from their Library. Deletion should be secure, require confirmation, and remove both text and images from local storage and the cloud.

---

#### **User Story 7.3.1 — Add Delete Button to Each Story Card (Parent Only)**

**Title**  
 Let Parents See a Delete Icon on Each Story Card

**Description**  
 As a parent, I want to remove unwanted stories from the Library, so I can keep things tidy for my kids.

**Context**  
 Only visible to authenticated parent users.

**Acceptance Criteria**

* Show small “🗑️” or “×” icon in top-right of each card

* Visible only to parent-level users (not children)

* Tapping triggers confirmation modal (see next story)

**Implementation Notes**

* Claude: `mcp.context7.library().renderDeletableStoryCard()`

* Permission check: `user.role === 'parent'`

* Component: `StoryCard.tsx` → add optional `showDeleteIcon` prop

* Icon touch area should not block tap-to-read

---

#### **User Story 7.3.2 — Confirm Story Deletion with Modal**

**Title**  
 Ask Parent to Confirm Before Deleting a Story

**Description**  
 As a parent, I want to confirm before permanently deleting a story so I don’t accidentally remove it.

**Context**  
 Deletions are destructive and cannot be undone.

**Acceptance Criteria**

* Modal shows:

  * Story title

  * Read time

  * “Are you sure you want to delete this story?”

* Options:

  * ✅ Delete

  * ❌ Cancel

**Implementation Notes**

* Claude: `mcp.context7.ui().renderDeleteConfirmation()`

* Component: `ConfirmDeleteModal.tsx`

* Hook: `useModalState()`

* Style: centered alert with red Delete button

* Trigger `deleteStory(jobId)` on confirm

---

#### **User Story 7.3.3 — Remove Story from Firestore, Images, and Cache**

**Title**  
 Permanently Remove Story from Cloud, Local Cache, and Firestore

**Description**  
 As a developer, I want to remove all story data once deleted so no storage is wasted and it’s truly gone.

**Context**  
 Clean-up applies to:

* Firestore record

* Cloudflare R2 image(s)

* Local thumbnail cache

**Acceptance Criteria**

* Delete Firestore doc: `storyJobs/{jobId}`

* Delete associated R2 image via signed URL

* Remove from local cache (text \+ thumbnail)

* Emit event to PostHog: `story_deleted`

**Implementation Notes**

* Claude: `mcp.context7.storage().deleteStoryById(jobId)`

* Securely request signed delete from backend Worker

* MMKV: call `clearStoryFromLocal(jobId)`

* Use optimistic UI removal pattern

### **🚀 Feature 4: Launch Story from Library**

**Goal**: Allow users to tap a story card in the Library and begin reading immediately, either from the beginning or from the last saved page if progress exists.

---

#### **User Story 7.4.1 — Tap Story Card to Open Reader**

**Title**  
 Open Story Reader When Tapping a Story Card

**Description**  
 As a parent or child, I want to tap a saved story to begin reading so we can enjoy it again anytime.

**Context**  
 This is the main interaction for launching an existing story.

**Acceptance Criteria**

* Tapping a card opens the reader view

* Reader loads correct story content (text \+ images)

* Reader is read-only — no editing

**Implementation Notes**

* Claude: `mcp.context7.reader().openStory(jobId)`

* Navigation: `router.push("/read/" + jobId)`

* Use story data from Firestore path: `storyJobs/{jobId}`

* Reader page decides whether to resume (see next story)

---

#### **User Story 7.4.2 — Resume from Last Read Page if Progress Exists**

**Title**  
 Resume at Saved Page If Story Was Partially Read

**Description**  
 As a returning reader, I want the story to pick up where I left off so I don’t have to re-read old pages.

**Context**  
 Progress is stored in local cache.

**Acceptance Criteria**

* If local `progress[jobId]` exists:

  * Reader opens at that page

  * Progress bar updates accordingly

* If no progress exists:

  * Start at page 1

**Implementation Notes**

* Claude: `mcp.context7.reader().loadProgressIfAvailable()`

* Hook: `useLocalProgress(jobId)`

* Called on reader mount

* Same logic reused from Feature 6.4.2

---

#### **User Story 7.4.3 — Update Last Opened Timestamp for Sorting**

**Title**  
 Update Story's “Last Opened” Timestamp After Launch

**Description**  
 As a developer, I want to track the most recently opened stories so the Library can sort stories by usage.

**Context**  
 Used for sorting in Feature 7.1.3.

**Acceptance Criteria**

* On story open:

  * Update Firestore: `storyJobs/{jobId}.lastOpenedAt = serverTimestamp()`

  * Emit PostHog event: `story_opened`

**Implementation Notes**

* Claude: `mcp.context7.library().logOpenEvent()`

* Batched update with read preload

* Use `serverTimestamp()` from Firestore SDK

### **📴 Feature 5: Handle Offline-Only Story Visibility**

**Goal**: When the device is offline, show only stories that are locally cached and hide stories that require an internet connection. Ensure the UI is smooth and intuitive with fallbacks.

---

#### **User Story 7.5.1 — Detect Offline Mode and Adjust Library UI**

**Title**  
 Detect Offline Mode and Filter Library to Cached Stories

**Description**  
 As a user, I want to see only the stories that can be read offline when I have no internet so I don’t get frustrated.

**Context**  
 This ensures the app remains useful and responsive even when disconnected.

**Acceptance Criteria**

* On offline mode:

  * Library shows only `offlineAvailable: true` stories

* If no stories are cached:

  * Show empty state with illustration and message:

     "You're offline. Stories you've saved will appear here."

**Implementation Notes**

* Claude: `mcp.context7.net().isOffline()`

* Hook: `useOfflineFilteredLibrary()`

* Shared logic with Epic 6.4.1

* Component: `EmptyLibraryOffline.tsx`

---

#### **User Story 7.5.2 — Prevent Tapping Stories That Are Not Cached**

**Title**  
 Disable Launching of Non-Cached Stories While Offline

**Description**  
 As a user, I want to avoid tapping on a story that can't be opened offline so I don’t encounter broken experiences.

**Context**  
 Non-cached stories may still appear if not filtered correctly or preloaded.

**Acceptance Criteria**

* If a user somehow taps a story that isn't fully cached:

  * Block navigation

  * Show toast: “This story requires internet to read.”

**Implementation Notes**

* Claude: `mcp.context7.guard().preventOfflineStoryLaunch()`

* Reuse offline availability check from cache manager

* Component: `Toast.tsx` (`variant="error"`)

### **💳 Epic 8: Subscription & Credit Model**

**Goal**: Support tiered monetization via in-app purchases. Users can subscribe to different plans (Starter, Family Pro), gain monthly credits, and spend credits on stories and extra branches. Managed via RevenueCat.

---

### **💳 Epic 8 – Features**

**Feature 1: Subscription Plan Selection and Upgrade Flow**  
 Let users view available plans, select one, and initiate a subscription via RevenueCat.

**Feature 2: Monthly Credit Management & Display**  
 Track and display how many credits the user has, including rollovers and branch usage.

**Feature 3: Branch & Story Length Cost Calculation**  
 Deduct correct number of credits based on branch count and story duration.

**Feature 4: RevenueCat Entitlement Integration**  
 Connect RevenueCat SDK to fetch current entitlements, handle subscription status, and gate features.

**Feature 5: Upgrade Prompt and Locked Epic Indicators**  
 Gently upsell users when they attempt actions that require a higher tier or more credits.

### **🪙 Feature 1: Subscription Plan Selection and Upgrade Flow**

**Goal**: Allow users to view current plan options, compare benefits, and start or upgrade their subscription via RevenueCat.

---

#### **User Story 8.1.1 — Display Available Subscription Plans**

**Title**  
 Show Subscription Plan Options with Details

**Description**  
 As a parent, I want to view the different subscription plans so I can choose the one that fits our family's reading habits.

**Context**  
 Starter and Family Pro plans have different monthly prices, credits, and branching/story length limits.

**Acceptance Criteria**

* Display:

  * Plan name (Starter, Family Pro)

  * Monthly price

  * Credits/month

  * Max branches & story duration

  * Rollover rules

* Clearly highlight current plan (if subscribed)

**Implementation Notes**

* Claude: `mcp.context7.billing().renderPlanOptions()`

* Component: `SubscriptionPlans.tsx`

* Data pulled from `mcp.context7.billing().getPlanDefinitions()`

* Use styled cards or toggle list for selection

---

#### **User Story 8.1.2 — Subscribe to a Plan via RevenueCat**

**Title**  
 Trigger Plan Purchase Using RevenueCat

**Description**  
 As a user, I want to subscribe to a plan so I can unlock credits and advanced story features.

**Context**  
 Plan selection triggers platform-native purchase flow via RevenueCat SDK.

**Acceptance Criteria**

* Tapping "Subscribe" triggers in-app purchase

* On success:

  * Entitlements updated

  * Credits initialized

* Error states handled:

  * Failed transaction

  * Already subscribed

**Implementation Notes**

* Claude: `mcp.context7.billing().purchasePlan(planId)`

* Hook: `useRevenueCatSubscribe()`

* Use RevenueCat SDK for iOS (via Expo plugin or EAS)

* Emit `subscription_purchased` to PostHog

---

#### **User Story 8.1.3 — Switch or Upgrade Between Plans**

**Title**  
 Let Users Switch to a Different Subscription Plan

**Description**  
 As a parent, I want to upgrade to a better plan when I need more credits or features.

**Context**  
 Switching plans may be pro-rated or handled by platform billing.

**Acceptance Criteria**

* “Upgrade” or “Change Plan” button shown if already subscribed

* Triggers platform-specific subscription management (Apple)

**Implementation Notes**

* Claude: `mcp.context7.billing().redirectToManageSubscription()`

On iOS, opens:

 ts  
CopyEdit  
`Linking.openURL("itms-apps://subscriptions")`

*   
* Include warning that plan change is handled by App Store, not app

### **🧮 Feature 2: Monthly Credit Management & Display**

**Goal**: Track and display users’ monthly credit balances based on their subscription tier. Handle rollover, deductions, and show cost breakdowns before purchase.

---

#### **User Story 8.2.1 — Display Current Credit Balance on Dashboard**

**Title**  
 Show User’s Monthly Credit Balance in App Header or Dashboard

**Description**  
 As a user, I want to see how many credits I have remaining this month so I can plan how many stories I can generate.

**Context**  
 Credit balance reflects tier and is affected by time-based expiration or rollover.

**Acceptance Criteria**

* Show balance (e.g., `12.75 credits left`)

* Include note: "Rollover credits expire in 90 days"

* Real-time update after deduction or rollover

**Implementation Notes**

* Claude: `mcp.context7.billing().getCurrentCreditBalance()`

* Component: `CreditBalanceBadge.tsx`

Store response in:

 ts  
CopyEdit  
`{`  
  `totalCredits: number,`  
  `rolloverCredits: number,`  
  `expiresAt: timestamp`  
`}`

*   
* Poll or revalidate when returning to app

---

#### **User Story 8.2.2 — Show Cost of Story Generation Before Confirming**

**Title**  
 Display Cost Summary Before Generating Story

**Description**  
 As a user, I want to see how many credits will be deducted for a story so I can make informed choices about branches and length.

**Context**  
 Must show cost breakdown based on configuration.

**Acceptance Criteria**

* Cost shown before generation:

  * Base story: 1 or 2 credits

  * Extra branches: 0.25 credit each (beyond 3\)

* "Confirm & Spend X.XX Credits" button required

**Implementation Notes**

* Claude: `mcp.context7.billing().estimateCreditCost(settings)`

* Component: `StoryCostSummary.tsx`

Use `useStorySettings()` to calculate:

 ts  
CopyEdit  
`{`  
  `length: 15 | 30,`  
  `branches: number`  
`}`

* 

---

#### **User Story 8.2.3 — Deduct Credits After Successful Story Generation**

**Title**  
 Deduct Correct Number of Credits When Story Is Generated

**Description**  
 As a developer, I want credits to be deducted only after a successful story generation to avoid user frustration or mischarges.

**Context**  
 Deduction logic is critical to user trust.

**Acceptance Criteria**

* After successful story gen:

  * Deduct calculated amount from balance

Store transaction in Firestore:

 ts  
CopyEdit  
`userCredits/{uid}/transactions/{txId}`

*   
* Do **not** deduct if generation fails

**Implementation Notes**

* Claude: `mcp.context7.billing().deductCredits(userId, amount)`

* Worker call should be part of final pipeline step

* Emit PostHog event: `credits_deducted`

### **🧾 Feature 3: Branch & Story Length Cost Calculation**

**Goal**: Ensure the system calculates and displays the correct credit cost based on the story’s configured length and number of branches.

---

#### **User Story 8.3.1 — Calculate Base Cost from Story Length**

**Title**  
 Determine Credit Cost Based on Story Duration

**Description**  
 As a developer, I want to calculate the cost of a story based on its length so users are billed fairly.

**Context**

* ≤15 min \= 1 credit

* 15 and ≤30 min \= 2 credits

**Acceptance Criteria**

* Returns correct base credit amount

* Supports future extensibility (e.g. 45-min tier)

**Implementation Notes**

* Claude: `mcp.context7.billing().calculateBaseCost(durationMin)`

Logic example:

 ts  
CopyEdit  
`if (duration <= 15) return 1;`  
`if (duration <= 30) return 2;`

*   
* Unit tested in `credit-cost.spec.ts`

---

#### **User Story 8.3.2 — Calculate Additional Branch Credit Cost**

**Title**  
 Add Extra Credit Cost for Branches Beyond Limit

**Description**  
 As a developer, I want to add a surcharge for more than 3 branches so the credit system scales fairly.

**Context**

* Starter tier: max 3 branches

* Each extra branch costs 0.25 credit

* Family Pro unlocks 4th branch

**Acceptance Criteria**

* 1–3 branches \= no surcharge

* 4 branches (Starter) \= 0.25 credit added

* Tier-based logic respected

**Implementation Notes**

* Claude: `mcp.context7.billing().calculateBranchCost(settings)`

* Use user tier from `useRevenueCatEntitlement()`

* Total cost \= base cost \+ branch surcharge

---

#### **User Story 8.3.3 — Combine Costs and Return Final Credit Total**

**Title**  
 Compute Final Credit Total for Story Generation

**Description**  
 As a developer, I want to get a single number representing the total cost of a story so it can be shown to the user before confirmation.

**Context**  
 Builds on prior calculations.

**Acceptance Criteria**

* Returns total cost:

  * Base \+ branch surcharge

* Inputs:

  * Story settings (duration, branches)

  * User tier (from entitlement)

**Implementation Notes**

* Claude: `mcp.context7.billing().calculateTotalCost(settings, userTier)`

* Pure function, unit tested

* Used in confirmation modal and generation logic

### **🧷 Feature 4: RevenueCat Entitlement Integration**

**Goal**: Connect to RevenueCat to retrieve the user’s active subscription tier, manage entitlements, and use this info to gate features and credit logic.

---

#### **User Story 8.4.1 — Fetch and Store RevenueCat Entitlement Info**

**Title**  
 Get User’s Current Subscription Tier from RevenueCat

**Description**  
 As a developer, I want to retrieve the user’s active plan so we can unlock features and calculate credit logic correctly.

**Context**  
 RevenueCat SDK will return `entitlements.active` with metadata about the tier.

**Acceptance Criteria**

* On app load:

  * Fetch user entitlement status

  * Store result in app context or cache

* Supported values:

  * `starter`, `family_pro`, `none`

**Implementation Notes**

* Claude: `mcp.context7.billing().getEntitlementStatus()`

* Hook: `useEntitlement()`

RevenueCat SDK call:

 ts  
CopyEdit  
`const customerInfo = await Purchases.getCustomerInfo();`  
`const plan = customerInfo.entitlements.active["story_plan"]?.identifier;`

* 

---

#### **User Story 8.4.2 — Lock Epics Based on Entitlement Tier**

**Title**  
 Restrict Access to Epics That Require Higher Tier

**Description**  
 As a developer, I want to disable or hide features that require Family Pro if the user has the Starter tier.

**Context**  
 Branching, story length, and avatar options may be gated.

**Acceptance Criteria**

* Starter tier:

  * Max 3 branches

  * Max 15-min story

* Family Pro:

  * 4 branches allowed

  * Max 30-min story

* Lock UI shows padlock icon \+ upgrade CTA

**Implementation Notes**

* Claude: `mcp.context7.ui().lockIfRestricted(entitlement)`

* UI components receive `disabledReason` prop

* Component: `EpicLockOverlay.tsx`

* Entitlement tier pulled from `useEntitlement()`

---

#### **User Story 8.4.3 — React to Entitlement Changes in Real-Time**

**Title**  
 Update Available Epics Immediately After Subscription Change

**Description**  
 As a user, I want the app to reflect my upgraded plan right after subscribing without restarting.

**Context**  
 Entitlements should re-check after purchase is completed.

**Acceptance Criteria**

* When subscription purchased:

  * Re-fetch entitlements

  * Unlock features in wizard/reader UI

**Implementation Notes**

* Claude: `mcp.context7.billing().refreshEntitlements()`

* Triggered after `purchasePlan()` success

* Hook: `useEffect(() => refreshEntitlements(), [purchaseStatus])`

### **🔒 Feature 5: Upgrade Prompt and Locked Epic Indicators**

**Goal**: When users attempt to use a premium feature, gently show them what’s locked and encourage them to upgrade. Ensure the UX is clear and informative, not pushy.

---

#### **User Story 8.5.1 — Display Lock Icon on Restricted Epics**

**Title**  
 Show Padlock Icon on Epics That Require Upgrade

**Description**  
 As a user, I want to visually see which features I can’t access yet so I understand what’s included in my plan.

**Context**  
 Important for transparency and reducing surprise at limits.

**Acceptance Criteria**

* Show lock icon on:

  * 4th branch option (Starter tier)

  * 30-minute story duration (Starter tier)

  * Advanced character builder options

* Tooltip or subtitle: “Unlock with Family Pro”

**Implementation Notes**

* Claude: `mcp.context7.ui().renderEpicLockOverlay()`

* Component: `EpicLockOverlay.tsx`

* Pass `entitlementTier` into each gated feature renderer

* Add `aria-disabled` for accessibility

---

#### **User Story 8.5.2 — Show Modal Prompt When Tapping Locked Epic**

**Title**  
 Open Upgrade Prompt When Locked Epic Is Tapped

**Description**  
 As a user, I want to understand how to upgrade when I try to use a premium feature so I can take action right away.

**Context**  
 The modal should explain benefits clearly, not interrupt flow harshly.

**Acceptance Criteria**

* Tapping locked feature opens modal:

  * Plan comparison table

  * CTA: “Upgrade to Family Pro”

  * Option to dismiss

* Modal is accessible and styled consistently

**Implementation Notes**

* Claude: `mcp.context7.ui().showUpgradeModal()`

* Component: `UpgradePromptModal.tsx`

* Use `react-native-modal` with swipe-to-dismiss

* Track PostHog: `upgrade_prompt_shown`

---

#### **User Story 8.5.3 — Deep Link to Subscription Settings from Prompt**

**Title**  
 Route Users to Subscription Screen from Upgrade Modal

**Description**  
 As a user, I want to go straight to the subscription upgrade screen from the modal so I can take action without extra steps.

**Context**  
 Connects Feature 5 back to Feature 1’s subscription flow.

**Acceptance Criteria**

* “Upgrade Now” button in modal takes user to:

  * Plan comparison page, if not yet subscribed

  * Native App Store subscription page, if already on Starter

* Must dismiss modal on navigation

**Implementation Notes**

* Claude: `mcp.context7.billing().startUpgradeFromPrompt()`

Use router:

 ts  
CopyEdit  
`router.push("/subscribe")`

*  or open App Store with `Linking.openURL(...)`

### **💳 Epic 9: Placeholder**

### **📊 Epic 10: Analytics & Monitoring**

---

#### **🐞 Feature 10.1 — Sentry Integration (App & Worker)**

##### **User Story 10.1 — Add Sentry to React-Native App**

**Description**  
 As a mobile developer, I want crashes and JS exceptions automatically sent to Sentry so we can diagnose issues in production.

**Context**  
 Use `@sentry/react-native` with source-map upload via EAS.

**Acceptance Criteria**

* `SENTRY_DSN` and env `release` configured.

* Global error boundary wraps root navigation.

* Breadcrumbs include `screen_name` changes.

* Test crash shows in Sentry dashboard within 5 minutes.

**Implementation Notes**

* Enable offline buffering.

* Exclude data classified as COPPA PII.

##### **User Story 10.2 — Add Sentry to Cloudflare Worker**

**Description**  
 As a backend developer, I want unhandled promise rejections and thrown errors in the Worker to appear in Sentry with request context.

**Acceptance Criteria**

* `@sentry/bun` (Sentry Edge SDK) initialised in `src/index.ts`.

* Captures URL, CF colo, uid header, and requestId.

* Test route `/throw` generates event.

**Implementation Notes**

* Filter out `404` noise.

* Add sampleRate 0.2 to control cost.

---

#### **📈 Feature 10.2 — PostHog Telemetry**

##### **User Story 10.3 — Track Core Funnel Events**

**Description**  
 As a product analyst, I want to track the journey from signup to first story so we understand onboarding effectiveness.

**Acceptance Criteria**

* Events: `signup_complete`, `wizard_started`, `story_generated`, `story_read_complete`.

* Properties include `plan`, `child_age_band`, `branch_count`.

* Events appear on self-hosted EU PostHog instance within 1 min.

**Implementation Notes**

* Use `posthog-react-native` with autocapture disabled.

* Batch size 10 to reduce network chatter.

##### **User Story 10.4 — Log 30-Day Retention & Cohort Flags**

**Description**  
 As an analyst, I want to calculate 30-day retention automatically so we can track stickiness over releases.

**Acceptance Criteria**

* Cron Worker sends cohort update to PostHog every midnight UTC.

* Event `retention_ping` for users active that day.

* PostHog retention chart reflects data for latest cohort.

**Implementation Notes**

* Use PostHog `groups` to segment by plan.

---

#### **📉 Feature 10.3 — Success Metric Dashboards**

##### **User Story 10.5 — Create Story Completion vs. Signup Dashboard**

**Description**  
 As a PM, I want a dashboard showing percent of sign-ups that complete at least one story so I can set targets.

**Acceptance Criteria**

* Dashboard tile with KPI “% users with ≥1 story”.

* Auto-refresh every hour.

* Shared read-only link created and posted in Slack \#product.

**Implementation Notes**

* Build in PostHog Insights UI, save as `dashboardId=Onboarding`.

* Add annotation when new wizard version ships.

##### **User Story 10.6 — Add Crash-Free Sessions & Latency Widgets**

**Description**  
 As an engineering lead, I want live widgets for crash-free sessions and average story generation time so we can detect regressions.

**Acceptance Criteria**

* Sentry metric `sessions.crash_free` plotted over 7 days.

* PostHog metric `generation_time_ms` 95th percentile plotted.

* Alert email if crash-free \< 98 % or p95 \> 25 s.

**Implementation Notes**

* Use Sentry Alert Rules.

* Store dashboard URL in Notion runbook.

### **🔒 Epic 11: Security & Privacy Compliance**

---

#### **🛡️ Feature 11.1 — Data Encryption & Secure Storage**

##### **User Story 11.1 — Encrypt Sensitive Firestore Fields**

**Description**  
 As a security engineer, I want child profile attributes encrypted at rest in Firestore so unauthorized access won’t expose personal data.

**Context**  
 Only nickname and age are stored, but we still encrypt to exceed COPPA minimums.

**Acceptance Criteria**

* AES-GCM encryption implemented in Worker using `crypto.subtle`.

* `nickname` and `age` encrypted before write; decrypted on read.

* Key stored in Cloudflare KV `encryption_key` with rotation placeholder.

**Implementation Notes**

* Add unit test verifying deterministic encryption disabled (random IV).

##### **User Story 11.2 — Store Credentials in Device Keychain/SecureStore**

**Description**  
 As a mobile dev, I want Firebase auth tokens and refresh tokens stored in the OS keychain so they are protected from rootless file inspection.

**Acceptance Criteria**

* Uses `expo-secure-store` in production builds.

* Tokens auto-refresh silently on app reopen.

* If SecureStore unavailable (expo-web), fallback to memory only.

**Implementation Notes**

* Provide migration script from AsyncStorage to SecureStore.

---

#### **🗑️ Feature 11.2 — Data Minimization & Deletion Policy**

##### **User Story 11.3 — Enforce Minimal Profile Schema**

**Description**  
 As a compliance officer, I want to ensure we never collect unnecessary PII so audits are simple.

**Acceptance Criteria**

* Firestore security rules reject any extra fields beyond `nickname`, `age`, `createdAt`.

* Unit tests attempt to write disallowed field and receive `PERMISSION_DENIED`.

**Implementation Notes**

* CI step runs `firebase emulators:exec` to validate rules.

##### **User Story 11.4 — Schedule Job to Delete Orphan Assets**

**Description**  
 As an ops engineer, I want a daily job that deletes avatar or image files not referenced in Firestore for 30 days so we control storage costs and comply with data retention.

**Acceptance Criteria**

* Cron Worker lists R2 objects with prefix `/avatars/`.

* Cross-checks against Firestore `avatars` collection.

* Deletes objects with `lastAccessed > 30 days` and no DB reference.

* Outputs summary log to Slack.

**Implementation Notes**

* Use R2 listing pagination (1 k objects/page).

* Dry-run mode flag for QA.

##### **User Story 11.5 — Implement “Delete My Data” GDPR Request Flow**

**Description**  
 As a parent, I want to request full deletion of my account and my child’s data so I can exercise my GDPR rights.

**Acceptance Criteria**

* Settings screen has “Request Data Deletion” button with 2-step confirm.

* Generates Firestore doc `deletionRequests/{requestId}` with UID and timestamp.

* Ops runbook describes manual verification \+ 30-day completion SLA.

* User receives in-app and email confirmation.

**Implementation Notes**

* Future: automate full wipe when legal review complete.

---

#### **📜 Feature 11.3 — Privacy Policy Access & Updates**

##### **User Story 11.6 — Link to Privacy Policy in Settings**

**Description**  
 As a user, I want to read the latest privacy policy inside the app so I understand how my data is handled.

**Acceptance Criteria**

* Settings menu item opens in-app WebView pointing to `https://example.com/privacy`.

* WebView has share & close controls.

* Version/hash of policy displayed at bottom.

**Implementation Notes**

* Cache policy URL in remote config for hot updates.

##### **User Story 11.7 — Build Consent Revocation UI**

**Description**  
 As a parent, I want to revoke my previously given parental consent so my child can no longer use the service.

**Acceptance Criteria**

* Toggle “Revoke Consent” disabled until user types **REVOKE** to confirm.

* On confirmation:

  * Flag `consent.revokedAt` in Firestore.

  * Sign user out and block login until consent re-granted.

* Warning modal explains impact.

**Implementation Notes**

* Backend checks `consent.revokedAt` on each protected call and returns `403`.

