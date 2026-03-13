import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

// Interface para tipar o retorno da listagem
export interface VideoStatus {
  id: string;
  userId: string;
  fileName: string;
  size: number;
  extension: string;
  status: string;
  zipUrl: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly baseUrl = 'https://video-hackathon-fiap.azure-api.net/v1/video/v1/video-processors';
  private readonly subscriptionKey = '94c8c9593701408fa7b18106dda8a3f5';

  /**
   * Helper para gerar os headers padrões da API
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.subscriptionKey
    });
  }

  /**
   * Realiza o Upload do vídeo com acompanhamento de progresso
   */
  uploadVideo(file: File): Observable<HttpEvent<any>> {
    const userData = this.authService.getUserInfo();

    const formData = new FormData();
    formData.append('userId', userData['userId']);
    formData.append('file', file); // 'file' em minúsculo para bater com o backend

    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: this.getHeaders(),
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * Busca a lista de vídeos de um usuário específico
   */
  getVideosStatus(userId: string): Observable<VideoStatus[]> {
    return this.http.get<VideoStatus[]>(`${this.baseUrl}/status/${userId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Faz o download do arquivo processado
   * Retorna um Blob para que o Angular possa manipular o arquivo binário
   */
  downloadVideo(videoId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${videoId}/download`, {
      headers: this.getHeaders(),
      responseType: 'blob' 
    });
  }
}