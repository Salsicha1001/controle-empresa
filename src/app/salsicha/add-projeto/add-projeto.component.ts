import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { IGastos } from 'src/app/interfaces/gastos.interface';
import { IGain } from 'src/app/interfaces/gain.interface';
import { SpinnerService } from 'src/app/components/load/load.service';

@Component({
  selector: 'app-add-projeto',
  templateUrl: './add-projeto.component.html',
  styleUrls: ['./add-projeto.component.css'],
})
export class AddProjetoComponent implements OnInit {
  projetoForm: FormGroup;
  photosPreviews: string[] = [];
  gastosList: IGain[] = []; // Lista de gastos (dados para a tabela)
  gains: IGain[] = [];
  displayedColumns: string[] = ['select', 'descricao', 'valor']; // Colunas da tabela
  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private dialogRef: MatDialogRef<AddProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private load: SpinnerService

  ) {
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      photos: this.fb.array([]),
      material: this.fb.array([]),
      gastos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addItensList();
  }
  addItensList(){
    this.fireService.getCustos().subscribe((res) => {
      if (res) {
        this.gastosList = res;
      } 
    });
  }

  get photos(): FormArray {
    return this.projetoForm.get('photos') as FormArray;
  }

  addPhoto() {
    this.photos.push(this.fb.control(''));
  }

  get material(): FormArray {
    return this.projetoForm.get('material') as FormArray;
  }

  addMaterial() {
    const materialGroup = this.fb.group({
      material: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      tempoImpressao: [0, [Validators.required, Validators.min(1)]],
    });
    this.material.push(materialGroup);
  }

  // Processar a imagem selecionada e gerar o preview
  onFileChange(event: any, index: number) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          // Se for um campo de foto no array, adiciona o arquivo à posição correta
          this.photosPreviews[index] = reader.result as string;
          this.photos.at(index).setValue(file);
      };
      reader.readAsDataURL(file); // Lê a imagem como URL base64
    }
  }
  onSubmit() {
    if (this.projetoForm.valid) {
      this.load.show();
      const projetoData = this.projetoForm.value;
  
      // Faz o upload das imagens e espera as URLs de cada imagem
      const photos$ = projetoData.photos.map((file: File) =>
        this.fireService.uploadImage(file, 'photos')  // Upload das imagens
      );
  
      // Espera que todas as imagens sejam enviadas e pega as URLs de download
      Promise.all(photos$)
        .then(photoUrls => {
          projetoData.photos = photoUrls;  // Substitui os arquivos de foto com as URLs no Firestore
  
          // Agora, salva o projeto no Firestore com as URLs das imagens
          this.fireService.savePost('projeto', projetoData)
            .then(() => {
      this.load.hide()
              console.log('Projeto salvo com sucesso!');
              this.dialogRef.close(projetoData);  // Fecha o diálogo após salvar
            })
            .catch(error => {
              console.error('Erro ao salvar projeto no Firestore:', error);
              this.load.hide(); // Esconde o carregamento caso haja erro
            });
        })
        .catch(error => {
          console.error('Erro ao fazer upload das imagens:', error);
          this.load.hide(); // Esconde o carregamento caso haja erro
        });
    } else {
      console.log('Formulário inválido');
    }
  }
  // Fechar o diálogo sem salvar
  onCancel() {
    this.dialogRef.close();
  }
  addGasto(gasto: IGain) {
    this.gains.push(gasto);
    this.gastos.push(this.fb.control(gasto)); // Adiciona o ganho no FormArray
  }
  get gastos(): FormArray {
    return this.projetoForm.get('gastos') as FormArray;
  }
}
