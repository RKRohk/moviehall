package utils

import (
	"io/ioutil"
	"log"
	"net/http"
	"path"

	"github.com/rkrohk/moviehall/pkg/model"
	"github.com/rkrohk/moviehall/pkg/queue"
)

func UploadHandler(publisher queue.Publisher) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		r.ParseMultipartForm(8200)

		user := UserFromContext(r.Context())
		if user == nil {
			rw.WriteHeader(http.StatusUnauthorized) //403 not authorized
			rw.Write([]byte("user is not authenticated"))
			return
		}

		if r.MultipartForm == nil {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("upload file not provided"))
			return
		}
		files := r.MultipartForm.File
		fileHeader := files["file"]
		file := fileHeader[0]

		multipartFile, err := file.Open()

		if err == nil {
			rw.WriteHeader(502)
			rw.Write([]byte("server encountered an issue, please have a look at the logs"))
			log.Printf("error saving file: %v\n", err)
			return
		}

		fileBytes, err := ioutil.ReadAll(multipartFile)
		if err != nil {
			rw.WriteHeader(401)
			rw.Write([]byte("server encountered an issue, please send a valid file"))
			log.Printf("error saving file: %v\n", err)
			return
		}

		filePath := path.Join("..", "video", file.Filename)
		if err = ioutil.WriteFile(filePath, fileBytes, 0644); err != nil {
			rw.WriteHeader(502)
			rw.Write([]byte("server encountered an issue, please have a look at the logs"))
			log.Printf("error saving file: %v\n", err)
			return

		}
		payload := &model.MediaAddedEvent{
			UserID:    user.ID,
			MediaPath: filePath,
			Title:     file.Filename,
		}

		if err = publisher.Publish(payload, "media_added"); err != nil {
			log.Printf("error sending message to queue media_added %v\n", err)
			rw.WriteHeader(502)
			rw.Write([]byte("server encountered an issue, please have a look at the logs"))
			log.Printf("error saving file: %v\n", err)
			return
		}

		rw.WriteHeader(http.StatusCreated)

	}
}
