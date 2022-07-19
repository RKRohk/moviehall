module github.com/rkrohk/moviehall/worker

go 1.16

replace github.com/rkrohk/moviehall/pkg => ../pkg

require (
	github.com/aws/aws-sdk-go v1.44.47 // indirect
	github.com/google/wire v0.5.0
	github.com/rkrohk/moviehall/pkg v0.0.0 // indirect
	github.com/u2takey/ffmpeg-go v0.4.1 // indirect
)
