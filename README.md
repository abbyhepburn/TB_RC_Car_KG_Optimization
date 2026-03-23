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
