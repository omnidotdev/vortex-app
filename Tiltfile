# Simple Tiltfile for Vortex App with Temporal

# Start Temporal services using docker-compose
docker_compose('docker-compose.yml')

# Install dependencies
local_resource(
    'install',
    cmd='bun install',
    deps=['package.json']
)

# Run the main app
local_resource(
    'app',
    serve_cmd='bun dev',
    deps=['src', 'package.json'],
    resource_deps=['install']
)

# Run the Temporal worker
local_resource(
    'worker',
    serve_cmd='bun worker:dev',
    deps=['src/temporal'],
    resource_deps=['temporal', 'install']
)
