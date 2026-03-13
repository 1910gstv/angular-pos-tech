// pages/my-videos/my-videos.ts
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu } from '../../components/menu/menu';
import { UploadService, VideoStatus } from '../../services/upload';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-my-videos',
  standalone: true,
  imports: [Menu, CommonModule],
  templateUrl: './my-videos.html',
  styleUrl: './my-videos.css',
})
export class MyVideos implements OnInit {
  private uploadService = inject(UploadService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef)
  hasError = false
  returnedError = ''

  videos: VideoStatus[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    const userData = this.authService.getUserInfo();
    const userId = userData['userId'];

    console.log('Iniciando busca para o usuário:', userId);

    if (!userId) {
      console.error('UserId não encontrado no AuthService');
      this.isLoading = false;
      this.hasError = true;
      this.returnedError = 'Usuário não identificado.';
      return;
    }

    this.uploadService.getVideosStatus(userId).subscribe({
      next: (data) => {
        this.videos = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // Força a atualização da tela
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.returnedError = 'Falha ao carregar lista de vídeos.';
        this.cdr.detectChanges();
      },
    });
  }

  download(video: VideoStatus) {
    this.uploadService.downloadVideo(video.id).subscribe({
      next: (blob) => {
        // Cria um link temporário para forçar o download no navegador
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `processado_${video.fileName}.zip`; // Nome do arquivo
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => alert('Erro ao baixar o arquivo.'),
    });
  }

  formatSize(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
