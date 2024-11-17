import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { arrayUnion } from 'firebase/firestore';
import { map, Observable, finalize } from 'rxjs';
@Injectable()
export class FirebaseService {
  private firestore: Firestore;
  constructor(
    private firestoreService: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.firestore = getFirestore();
  }

  async savePost(bd: string, body: any):Promise<any> {
    try {
      const colRef = collection(this.firestore, bd);
     return await addDoc(colRef, body);
    } catch (e) {
      console.log(e)
    }
  }
  getDataWithDateFilterGastos(
    startDate: Date,
    endDate: Date
  ): Observable<any[]> {
    // Referência à coleção no Firestore
    const collectionRef = this.firestoreService.collection(
      'custo',
      (ref) =>
        ref
          .where('date', '>=', startDate) // Filtro de data de início
          .where('date', '<=', endDate)
          // Filtro de data de fim
          .orderBy('date', 'asc') // Ordenando pela data
    );
    return collectionRef.snapshotChanges().pipe(
      map((actions: any[]) =>
        actions.map((action) => {
          const data = action.payload.doc.data(); // Pega os dados do documento
          const id = action.payload.doc.id; // Pega o id do documento
          return { id, ...data }; // Retorna o objeto com o id
        })
      )
    );
  }

  getCustos(): Observable<any[]> {
    // Referência à coleção no Firestore
    const collectionRef = this.firestoreService.collection(
      'custo',
      (ref) => ref.where('empresa', '==', 'Salsicha3D') // Ordenando pela data
    );
    return collectionRef.snapshotChanges().pipe(
      map((actions: any[]) =>
        actions.map((action) => {
          const data = action.payload.doc.data(); // Pega os dados do documento
          const id = action.payload.doc.id; // Pega o id do documento
          return { id, ...data }; // Retorna o objeto com o id
        })
      )
    );
  }
  getProjetos(): Observable<any[]> {
    // Referência à coleção no Firestore
    const collectionRef = this.firestoreService.collection(
      'projeto',
    );
    return collectionRef.snapshotChanges().pipe(
      map((actions: any[]) =>
        actions.map((action) => {
          const data = action.payload.doc.data(); // Pega os dados do documento
          const id = action.payload.doc.id; // Pega o id do documento
          return { id, ...data }; // Retorna o objeto com o id
        })
      )
    );
  }
  getDataWithDateFilterVenda(
    startDate: Date,
    endDate: Date
  ): Observable<any[]> {
    // Referência à coleção no Firestore
    const collectionRef = this.firestoreService.collection(
      'vendas',
      (ref) =>
        ref
          .where('dataVenda', '>=', startDate) // Filtro de data de início
          .where('dataVenda', '<=', endDate)
          .orderBy('dataVenda', 'asc') // Ordenando pela data
    );
    return collectionRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as { [key: string]: any }; // Aqui estamos garantindo que `data` seja um objeto
          const id = action.payload.doc.id; // Pega o id do documento
          return { id, ...data }; // Usando spread para incluir o id nos dados
        })
      )
    );
  }
  addGastoToEmpresa(body:any,id:string): Promise<void> {
    return this.firestoreService.collection('projeto').doc(id).update({
      gastos:arrayUnion(body)
    });
  }
  addImagensProjetos(body:any,id:string): Promise<void> {
    return this.firestoreService.collection('projeto').doc(id).update({
      photos:body
    });
  }
  getDetailProject(id:string) {
    return this.firestoreService.collection('projeto').doc(id).snapshotChanges().pipe(
      map((action: any) => {
        const data = action.payload.data() as { [key: string]: any }; // Obtendo os dados do documento
        const id = action.payload.id; // Obtendo o id do documento
        return { id, ...data }; // Adicionando o id aos dados
      })
    )
  }

  editDocument(
    collection: string,
    docId: string,
    updatedData: any
  ): Promise<void> {
    return this.firestoreService
      .collection(collection)
      .doc(docId)
      .update(updatedData); // Atualiza o documento
  }
  deleteDocument(collection: string, docId: string): Promise<void> {
    return this.firestoreService
      .collection(collection)
      .doc(docId)
      .delete()
      .then(() => {
        console.log('Documento deletado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao deletar documento: ', error);
      });
  }
  // Método para fazer upload de imagens para o Firebase Storage
  uploadImage(file: File, path: string):Promise<string>{
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Retorna um Observable com a URL do arquivo após o upload
    return new Promise<string>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          // Quando o upload for finalizado, pega a URL de download da imagem
          fileRef.getDownloadURL().subscribe({
            next: (downloadURL) => resolve(downloadURL), // Resolve a URL da imagem
            error: (err) => reject(err) // Rejeita o erro se ocorrer
          });
        })
      ).subscribe();
    });
  }
  // Método para salvar os dados do projeto no Firestore
  saveProjeto(projetoData: any): Promise<any> {
    return this.savePost('projetos',projetoData)
  }
}
