import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { UploadService } from '../../services/upload';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Menu, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private uploadService = inject(UploadService);
  private cdr = inject(ChangeDetectorRef)

  // Estados da Interface
  isUploading = false;
  progress = 0;
  isDragOver = false; 
  selectedFile: File | null = null;

  // 1. Quando o arquivo é arrastado sobre a zona
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  // 2. Quando o arquivo sai da zona ou o drag é cancelado
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  // 3. Quando o arquivo é solto (Drop)
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // 4. Quando o arquivo é selecionado via clique (Input File)
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  // 5. Lógica central de validação e início de upload
  private handleFile(file: File) {
    // Validação simples: verificar se é vídeo
    if (!file.type.startsWith('video/')) {
      alert('Por favor, selecione apenas arquivos de vídeo.');
      return;
    }

    this.selectedFile = file;
    this.startUpload(file);
  }

  private startUpload(file: File) {
    this.isUploading = true;
    this.progress = 0;

    this.uploadService.uploadVideo(file).subscribe({
      next: (event: any) => {
        console.log('Evento recebido:', event); // Verifique isso no console (F12)

        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / (event.total || 100));
          this.cdr.detectChanges();
          console.log('Progresso atual:', this.progress);
        } else if (event.type === HttpEventType.Response) {
          this.isUploading = false;
        }
      },
    });
  }
}
