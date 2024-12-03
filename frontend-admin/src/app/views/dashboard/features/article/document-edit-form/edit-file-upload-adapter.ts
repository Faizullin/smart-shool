import { HttpClient } from "@angular/common/http";
import { lastValueFrom, Observable } from "rxjs";
import { Article } from "../article";

export class EditFileUploadAdapter {
  constructor(private loader: any, private articleInstance: Article, protected http: HttpClient) { }


  private _sendRequest(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'attach');

    console.log('Sending file via HttpClient:', formData);

    return this.http.post<any>(`/api/s/articles/${this.articleInstance!.id}/files/`, formData)
  }
  upload() {
    // return this.loader.file.then((file: File) => {
    //   console.log(this.articleInstance)
    //   const formData = new FormData();
      // formData.append('file', file);
      // formData.append('type', 'attach');
    //   return this.http
    //     .post<any>(`/api/s/articles/${this.articleInstance!.id}/files/`, formData)
    //     .pipe(
    //       map((data: any) => {
    //         return {
    //           ...data.data,
    //         } as FileContent;
    //       }),
    //     ).subscribe();
    // });
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        // Prepare the upload request
        const upload$ = this._sendRequest(file);

        // Process the response
        lastValueFrom(upload$)
          .then((response: any) => {
            console.log('Upload response:', response);

            if (response && response.url) {
              resolve({ default: response.url });
            } else {
              reject('Unexpected response structure.');
            }
          })
          .catch((error) => {
            console.error('Upload failed:', error);
            reject(error);
          });
      });
    });
  }
  abort() {
    console.error('aborted');
  }
}