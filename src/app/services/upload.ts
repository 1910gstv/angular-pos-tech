import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, interval, map, takeWhile, concat, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  // private http = inject(HttpClient); // Comentado para o teste

  uploadVideo(file: File): Observable<HttpEvent<any>> {
    return interval(200).pipe(
      map((tick) => {
        const currentProgress = (tick + 1) * 5; // Aumenta de 5 em 5%

        if (currentProgress <= 100) {
          return {
            type: HttpEventType.UploadProgress,
            loaded: currentProgress,
            total: 100,
          } as HttpProgressEvent;
        } else {
          return new HttpResponse({ body: { success: true }, status: 200 });
        }
      }),
      takeWhile((event) => event instanceof HttpResponse === false, true),
    );
  }
}
