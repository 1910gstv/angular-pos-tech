import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {

  private http = inject(HttpClient);

  uploadVideo(file: File): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('userId', '6eab67bc-24ca-4d33-804e-22a3def9875f');
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '94c8c9593701408fa7b18106dda8a3f5',
      'userId': '6eab67bc-24ca-4d33-804e-22a3def9875f'
    });

    return this.http.post(
      'https://video-hackathon-fiap.azure-api.net/upload',
      formData,
      {
        headers,
        reportProgress: true,
        observe: 'events' // necessário para receber progresso
      }
    );

  }
}