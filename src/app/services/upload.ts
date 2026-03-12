import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class UploadService {

  private http = inject(HttpClient);
  private authService = inject(AuthService)

  uploadVideo(file: File): Observable<HttpEvent<any>> {

    const userData = this.authService.getUserInfo()

    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '94c8c9593701408fa7b18106dda8a3f5',
      'userId': userData['userId']
    });

    return this.http.post(
      'https://video-hackathon-fiap.azure-api.net/upload',
      formData,
      {
        headers,
        reportProgress: true,
        observe: 'events'
      }
    );

  }
}