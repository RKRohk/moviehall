package main

import ffmpeg "github.com/u2takey/ffmpeg-go"

func convert(input string) {
	err := ffmpeg.Input(input).Output("output/output.mp4", ffmpeg.KwArgs{
		"-map_metadata":     -1,
		"-map_chapters":     -1,
		"-threads":          0,
		"-map":              "0:0",
		"-filter_complex":   "[0:v]yadif",
		"-codec:v:0":        "libx264",
		"-pixel_format":     "yuv420p",
		"-preset":           "faster",
		"-crf":              "24",
		"-profile:v":        "high",
		"-maxrate":          "4360000",
		"-bufsize":          "8720000",
		"-x264opts:0":       "subme=0:me_range=4:rc_lookahead=10:me=dia:no_chroma_me:8x8dct=0:partitions=none",
		"-force_key_frames": "expr:gte(t,4356+n_forced*3)",
	}).ErrorToStdOut().Run()
	if err != nil { // Error handling
		panic(err)
	}

}

//-map_metadata -1 -map_chapters -1 -threads 0 -map 0:0 -map 0:1 -filter_complex '[0:v]yadif' -codec:v:0 libx264 -pix_fmt yuv420p -preset faster -crf 24 -maxrate 4360000 -bufsize 8720000 -profile:v:0 high
// -level 41 -x264opts:0 subme=0:me_range=4:rc_lookahead=10:me=dia:no_chroma_me:8x8dct=0:partitions=none  -force_key_frames:0 "expr:gte(t,4356+n_forced*3)"
