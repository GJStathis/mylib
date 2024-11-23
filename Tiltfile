allow_k8s_contexts('beehive')

k8s_yaml('./manifests/pg_configmap.yaml')
k8s_yaml('./manifests/pg_deployment.yaml')
k8s_yaml('./manifests/pg_service.yaml')

k8s_yaml('./manifests/backend_configmap.yaml')
k8s_yaml('./manifests/backend_deployment.yaml')
k8s_yaml('./manifests/backend_service.yaml')


k8s_yaml('./manifests/frontend_configmap.yaml')
k8s_yaml('./manifests/frontend_deployment.yaml')
k8s_yaml('./manifests/frontend_service.yaml')


docker_build("gjstathis/mylib-backend", "./mylib-backend")
docker_build("gjstathis/mylib-frontend", "./mylib-frontend")