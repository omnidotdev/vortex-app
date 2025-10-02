# load environment variables
load("ext://dotenv", "dotenv")

dotenv(fn=".env.local")

project_name = "vortex-app"

local_resource(
    "install-deps-%s" % project_name,
    cmd="bun i",
    deps=["package.json"],
    labels=[project_name],
)

local_resource(
    "dev-%s" % project_name,
    serve_cmd="bun dev",
    labels=[project_name],
)

docker_compose('docker-compose.yml')

local_resource(
    'temporal-worker',
    serve_cmd='bun worker:dev',
    deps=['src/temporal'],
    resource_deps=['temporal', 'install']
)
