# RC Car Graph Chatbot + Data Pipeline

This repository is organized around a simple end-to-end workflow:
`electrical_dropoff (raw telemetry) -> data_team (clean/transform) -> Neo4j (graph) -> backend (chat API) -> frontend (chat UI)`

## Teams and responsibilities

### Electrical team
- Drops raw telemetry files into `electrical_dropoff/raw_runs/`
- Follows the file naming + payload conventions described in `electrical_dropoff/README.md`
- Does not modify pipeline/graph-loading scripts

### Data team
- Copies raw files into `data_team/incoming/` when ready
- Validates and cleans raw telemetry in `data_team/processing/`
- Builds graph-ready CSVs in `data_team/processing/`
- Loads graph-ready data into Neo4j in `data_team/graph/`

### Software team
- Builds the chatbot UI in `frontend/`
- Builds the FastAPI backend API in `backend/`
- Queries Neo4j via the backend graph client

## Technologies

**Docker** — Makes sure the app runs the same way on every computer, no matter what operating system you're using.

**Backend (Python):**

| Package | What it does |
|---|---|
| **fastapi** | Creates the API that the frontend talks to (handles `/health` and `/chat` requests) |
| **uvicorn[standard]** | The server that runs FastAPI and listens for incoming requests |
| **pydantic** | Validates incoming data so bad requests get rejected automatically |
| **pydantic-settings** | Loads settings from the `.env` file into Python so you don't hardcode secrets |
| **neo4j** | Connects Python to the Neo4j graph database so you can run Cypher queries |
| **python-dotenv** | Reads the `.env` file and makes its values available as environment variables |
| **google-generativeai** | Talks to Google's Gemini AI to turn plain English questions into Cypher queries |

**Frontend (TypeScript):**

| Package | What it does |
|---|---|
| **React** | Builds the chat UI from reusable pieces (components) |
| **Vite** | Runs the frontend locally and refreshes the browser when you save changes |
| **TypeScript** | JavaScript but with types, so you catch mistakes early |

## Local development model (Docker-first)

Stack definitions and Dockerfiles live under `infra/`:

- **`infra/docker/docker-compose.yml`** — canonical Compose file (`frontend`, `backend`, `neo4j`)
- **`docker-compose.yml`** (repo root) — includes the file above so you can run `docker compose` from the project root
- **`infra/Dockerfile.backend`** / **`infra/Dockerfile.frontend`** — dev images for the API and UI

**Full command reference (ports, logs, troubleshooting, optional compose path):** see [`infra/docker/README.md`](infra/docker/README.md).

### Quick start

From the **repository root** (where this `README.md` is):

1. Copy environment defaults from `.env.example` to `.env`.

   **Windows**

   ```powershell
   Copy-Item .env.example .env
   ```

   **Mac and Linux**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add a **Google Gemini** API key (free tier) from [Google AI Studio](https://aistudio.google.com/apikey) as `GEMINI_API_KEY`. The chat backend uses Gemini to turn questions into read-only Cypher queries against Neo4j.

2. Start the stack:

   ```bash
   docker compose up --build
   ```

3. Stop when finished:

   ```bash
   docker compose down
   ```

Optional: use **`Makefile`** targets (`make up`, `make down`, …) if you have `make` installed (common on Mac and Linux).

**System architecture diagram:** see [docs/architecture/system_overview.md](docs/architecture/system_overview.md) for a visual walkthrough of the offline data pipeline and the online chat path.

## Where to edit

Treat the folder boundaries below as the "contract" between teams:
- Raw electrical input: `electrical_dropoff/raw_runs/`
- Data processing + graph loading: `data_team/`
- Chat API: `backend/`
- Chat UI: `frontend/`

## Student TODOs

Every file that students need to implement contains numbered `TODO` comments with step-by-step instructions. Search for `TODO-` in your editor to find them all.

**Backend — 11 TODOs across 7 files:**

| File | TODOs | What you implement |
|---|---|---|
| `backend/app/models/schemas.py` | TODO-1, 2, 3 | Define Pydantic fields for request/response models |
| `backend/app/main.py` | TODO-1, 2 | Add CORS middleware, register route files |
| `backend/app/api/routes/health.py` | TODO-1 | Check Neo4j connectivity, return health status |
| `backend/app/api/routes/chat.py` | TODO-1 | Add error handling with proper HTTP status codes |
| `backend/app/services/graph_client.py` | TODO-1 | Execute Cypher queries against Neo4j |
| `backend/app/services/answer_formatter.py` | TODO-1 | Format Neo4j results into readable text |
| `backend/app/services/chat_service.py` | TODO-1, 2 | Write the Gemini prompt, call the API, extract Cypher |

**Frontend — 11 TODOs across 7 files:**

| File | TODOs | What you implement |
|---|---|---|
| `frontend/src/types/chat.ts` | TODO-1 | Define TypeScript types matching backend schemas |
| `frontend/src/lib/api.ts` | TODO-1, 2 | `sendChat()` POST to `/chat`, optional `getHealth()` |
| `frontend/src/main.tsx` | TODO-1 | Mount the React app into the page |
| `frontend/src/App.tsx` | TODO-1 | Import and render the ChatLayout component |
| `frontend/src/components/ChatInput.tsx` | TODO-1, 2 | Controlled input state, form submit handler |
| `frontend/src/components/MessageList.tsx` | TODO-1 | Render messages with user/bot styling |
| `frontend/src/components/ChatLayout.tsx` | TODO-1, 2 | State management, wire API to child components |

**Instructor-owned files (do not modify):** `backend/app/core/config.py`, all Docker/infra files, `Makefile`, `scripts/*.sh`.

## File structure

```text
.
├── README.md
├── LICENSE
├── Makefile
├── docker-compose.yml            # includes infra/docker/docker-compose.yml
├── .env.example
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py               # TODO-1, 2
│       ├── api/routes/
│       │   ├── chat.py           # TODO-1
│       │   └── health.py         # TODO-1
│       ├── core/
│       │   └── config.py         # instructor-owned
│       ├── models/
│       │   └── schemas.py        # TODO-1, 2, 3
│       └── services/
│           ├── chat_service.py   # TODO-1, 2
│           ├── graph_client.py   # TODO-1
│           └── answer_formatter.py # TODO-1
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.tsx              # TODO-1
│       ├── App.tsx               # TODO-1
│       ├── lib/api.ts            # TODO-1, 2
│       ├── types/chat.ts         # TODO-1
│       └── components/
│           ├── ChatLayout.tsx    # TODO-1, 2
│           ├── ChatInput.tsx     # TODO-1, 2
│           └── MessageList.tsx   # TODO-1
├── data_team/
│   ├── README.md
│   ├── incoming/
│   │   └── .gitkeep
│   ├── processing/
│   │   ├── validate_raw_telemetry.py
│   │   ├── clean_raw_telemetry.py
│   │   ├── build_sessions_csv.py
│   │   └── build_states_csv.py
│   └── graph/
│       ├── load_to_neo4j.py
│       └── cypher/
│           ├── constraints.cypher
│           └── load_queries.cypher
├── electrical_dropoff/
│   ├── README.md
│   └── raw_runs/
│       └── .gitkeep
├── docs/
│   └── architecture/
│       └── system_overview.md
├── infra/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   └── README.md
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
└── scripts/
    ├── bootstrap.sh
    ├── run_backend.sh
    ├── run_frontend.sh
    ├── run_data_pipeline.sh
    └── load_graph.sh
```
