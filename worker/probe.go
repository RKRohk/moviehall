package main

import (
	"encoding/json"
	"log"

	ffmpeg "github.com/u2takey/ffmpeg-go"
)

type VideoQuality string

type ProbeResult struct {
	Streams interface{} `json:"streams"`
	Format  interface{} `json:"format"`
}

func Probe(filepath string) {
	probeString, err := ffmpeg.Probe(filepath, ffmpeg.KwArgs{})
	if err != nil {
		log.Panicf("error occurred while probing %v", err)
	}

	var proberesult ProbeResult
	err = json.Unmarshal([]byte(probeString), &proberesult)
	if err != nil {
		log.Panicf("error unmarshalling json %v", err)
	}
	log.Println(proberesult)

}
