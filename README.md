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

## Local development model (Docker-first)

The intended default workflow is to run everything via `docker-compose.yml` using the `Makefile` commands.
At this stage the repo is scaffolded with descriptive placeholders (no working application logic yet), so you can safely start filling in modules team-by-team.

## Where to edit

Treat the folder boundaries below as the “contract” between teams:
- Raw electrical input: `electrical_dropoff/raw_runs/`
- Data processing + graph loading: `data_team/`
- Chat API: `backend/`
- Chat UI: `frontend/`

## File structure

```text
.
├── README.md
├── LICENSE
├── Makefile
├── docker-compose.yml
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── api/routes/
│       │   ├── chat.py
│       │   └── health.py
│       ├── core/
│       │   ├── config.py
│       │   └── logging_config.py
│       ├── models/
│       │   └── schemas.py
│       └── services/
│           ├── chat_service.py
│           ├── graph_client.py
│           ├── query_templates.py
│           └── answer_formatter.py
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── lib/api.ts
│       ├── types/chat.ts
│       └── components/
│           ├── ChatLayout.tsx
│           ├── ChatInput.tsx
│           └── MessageList.tsx
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
│   ├── architecture/
│   │   ├── system_overview.md
│   │   └── graph_schema_notes.md
│   ├── repo_design/
│   │   └── RC_Car_Repo_Design_Document.md
│   └── team_handoffs/
│       ├── data_team_workflow.md
│       └── electrical_team_workflow.md
├── infra/
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
└── scripts/
    ├── bootstrap.sh
    ├── run_backend.sh
    ├── run_frontend.sh
    ├── run_data_pipeline.sh
    └── load_graph.sh
```
