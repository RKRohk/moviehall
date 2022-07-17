package utils

import (
	"bytes"
	"context"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/rkrohk/moviehall/graph/model"
)

func TestFileUploadWhenUserNotAuthenticated(t *testing.T) {

	request := httptest.NewRequest("POST", "/", nil)

	control := gomock.NewController(t)
	defer control.Finish()

	publisher := NewMockPublisher(control)

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(UploadHandler(publisher))

	handler.ServeHTTP(recorder, request)

	t.Logf("Status code 403 must be returned")

	if http.StatusUnauthorized != recorder.Code {
		t.Errorf("expected status code %v, received %v", http.StatusUnauthorized, recorder.Code)
	} else {
		t.Logf("expected status code %v, received %v", http.StatusUnauthorized, recorder.Code)
	}
}

func TestFileUploadWhenNoFileGiven(t *testing.T) {

	requestDraft := httptest.NewRequest("POST", "/", nil)

	ctx := context.WithValue(requestDraft.Context(), userCtxKey, &model.User{})
	request := requestDraft.WithContext(ctx)

	control := gomock.NewController(t)
	defer control.Finish()

	publisher := NewMockPublisher(control)

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(UploadHandler(publisher))

	handler.ServeHTTP(recorder, request)

	t.Logf("Status code 400 must be returned")

	if http.StatusBadRequest != recorder.Code {
		t.Errorf("expected status code %v, received %v", http.StatusBadRequest, recorder.Code)
	} else {
		t.Logf("expected status code %v, received %v", http.StatusBadRequest, recorder.Code)
	}
}

func TestFileUploadWhenFileGiven(t *testing.T) {

	file, err := os.Open("test_file.txt")
	if err != nil {
		t.Errorf("Error reding file %v", err)
		t.Fail()
	}
	defer file.Close()
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("file", filepath.Base("test_file.txt"))
	if err != nil {
		t.Errorf("Error creating formfile %v", err)
		t.Fail()
	}
	_, err = io.Copy(part, file)
	if err != nil {
		t.Errorf("Error copying file %v", err)
		t.Fail()
	}

	err = writer.Close()
	if err != nil {
		t.Errorf("Error closing writer %v", err)
		t.Fail()
	}

	requestDraft := httptest.NewRequest("POST", "/", nil)

	ctx := context.WithValue(requestDraft.Context(), userCtxKey, &model.User{})
	request := requestDraft.WithContext(ctx)

	request.Header.Set("Content-Type", writer.FormDataContentType())
	control := gomock.NewController(t)
	defer control.Finish()

	publisher := NewMockPublisher(control)

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(UploadHandler(publisher))

	handler.ServeHTTP(recorder, request)

	t.Logf("Status code 201 must be returned")

	if http.StatusCreated != recorder.Code {
		t.Errorf("expected status code %v, received %v", http.StatusCreated, recorder.Code)
	} else {
		t.Logf("expected status code %v, received %v", http.StatusCreated, recorder.Code)
	}
}
