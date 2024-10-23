# Docker

- Build image

```bash
docker build --platform linux/amd64 -t ensenas-ui -f docker/dockerfile.app.yaml .
```

Tag image

```bash
docker tag ensenas-ui:latest alejol2019/ensenas-ui:latest
```

```bash
docker push alejol2019/ensenas-ui:tagname
```

- Run

```bash
# Run the Docker container
docker run -p 3000:3000 nextjs-app
```
