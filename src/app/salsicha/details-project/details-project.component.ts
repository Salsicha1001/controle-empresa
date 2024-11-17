import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormArray, FormBuilder } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { SpinnerService } from 'src/app/components/load/load.service';
@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css'],
})
export class DetailsProjectComponent {
  objeto: any;
  displayedColumns: string[] = ['tempoImpressao', 'material', 'quantidade'];
  displayedColumnsGastos: string[] = [
    'categoria',
    'date',
    'empresa',
    'gasto',
    'quantidade',
    'preco',
    'total',
  ];
  dataSource!: MatTableDataSource<any>;
  currentIndex: number = 0;
  isLoad = true;
  photosPreviews: string[] = [];
  selectedFiles: File[] = []; // Agora é um array de arquivos
  uploadPercent: number[] = []; // Array para armazenar o progresso de cada arquivo
  downloadURLs: string[] = []; // URLs de download das imagens

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private fireService:FirebaseService,
    private load: SpinnerService
  ) {}

  ngOnInit() {
    // Recupera os dados do 'state' do navegador
    this.objeto = history.state.detail;
    console.log(this.objeto); // Exibe o objeto passado
    if (this.objeto) {
      this.fireService.getDetailProject(this.objeto.id).subscribe((res)=>{
        if(res){
          this.objeto = res
        }
      })
      this.dataSource = new MatTableDataSource(this.objeto.material);
      this.isLoad = false;
    } else {
      this.router.navigateByUrl('/salsicha3d');
    }
  }
  ngAfterViewInit() {
    // Após a view ser inicializada, define o paginator para o MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }

  nextImage() {
    if (this.currentIndex < this.objeto.photos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // volta para a primeira imagem
    }
    this.isLoading = true;
  }
  setActiveImage(): void {
    // Remover a classe 'active' de todas as imagens
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((image: any) => {
      image.classList.remove('active');
    });

    // Adicionar a classe 'active' na imagem atual
    const currentImage = document.querySelectorAll('.carousel-image')[this.currentIndex];
    if (currentImage) {
      currentImage.classList.add('active');
    }
  }
  isLoading = true;
  onImageLoad(): void {
    this.isLoading = false;
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.objeto.photos.length - 1; // vai para a última imagem
    }
    this.isLoading = true;
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.files); // Convertendo para array
  }

  // Função para realizar o upload de todos os arquivos
  uploadFiles(): void {
    if (this.selectedFiles.length > 0) {
      this.load.show()
      const photos$ = this.selectedFiles.map((file: File) =>
        this.fireService.uploadImage(file, 'photos')  // Upload das imagens
      );
  
      // Espera que todas as imagens sejam enviadas e pega as URLs de download
      Promise.all(photos$)
        .then(photoUrls => {
          this.objeto.photos.push(...photoUrls);  // Substitui os arquivos de foto com as URLs no Firestore
          // Agora, salva o projeto no Firestore com as URLs das imagens
          this.fireService.addImagensProjetos(this.objeto.photos, this.objeto.id)
          this.load.hide()
        })
        .catch(error => {
          console.error('Erro ao fazer upload das imagens:', error);
        });
  }
}
}
