module github.com/rkrohk/moviehall

go 1.16

require (
	github.com/99designs/gqlgen v0.14.0
	github.com/vektah/gqlparser/v2 v2.3.1
)

require (
	github.com/agnivade/levenshtein v1.1.1 // indirect
	github.com/go-chi/chi/v5 v5.0.7
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/gorilla/websocket v1.5.0
	github.com/hashicorp/golang-lru v0.5.4 // indirect
	github.com/mitchellh/mapstructure v1.4.3 // indirect
	github.com/stretchr/testify v1.7.0
)

require (
	firebase.google.com/go/v4 v4.8.0
	github.com/go-chi/chi v1.5.4
	github.com/google/wire v0.5.0
	github.com/rkrohk/moviehall/pkg v0.0.0-00010101000000-000000000000
	gopkg.in/yaml.v2 v2.4.0 // indirect
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b // indirect
)

replace github.com/rkrohk/moviehall/pkg => ../pkg
