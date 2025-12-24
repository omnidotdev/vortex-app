v1alpha1.extension_repo(name='omni', url='https://github.com/omnidotdev/tilt-extensions')
v1alpha1.extension(name='dotenv_values', repo_name='omni', repo_path='dotenv_values')
load('ext://dotenv_values', 'dotenv_values')

env_local = dotenv_values(".env.local")
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
    env=env_local,
)

docker_compose('docker-compose.yml')

# TODO move all below to metarepo
# Hatchet dashboard available at http://localhost:8080
dc_resource('hatchet', labels=['hatchet'])
dc_resource('hatchet-db', labels=['hatchet'])

local_resource(
    'install-deps-vortex-worker',
    cmd='bun i',
    dir='../vortex-worker',
    deps=['../vortex-worker/package.json'],
    labels=['worker'],
)

worker_env = dotenv_values("../vortex-worker/.env.local")

local_resource(
    'vortex-worker',
    serve_cmd='bun run dev',
    serve_dir='../vortex-worker',
    deps=['../vortex-worker/src'],
    resource_deps=['hatchet', 'install-deps-vortex-worker'],
    labels=['worker'],
    env=worker_env,
)
