import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
@Injectable()
export class FirebaseService {
  private firestore: Firestore;
  constructor(private firestoreService: AngularFirestore) {
    this.firestore = getFirestore();
  }

  async savePost(bd: string, body: any) {
    try {
      const colRef = collection(this.firestore, bd);
      await addDoc(colRef, body);
    } catch (e) {}
  }
  getDataWithDateFilterGastos(
    startDate: Date,
    endDate: Date,
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
        actions.map(action => {
          const data = action.payload.doc.data();  // Pega os dados do documento
          const id = action.payload.doc.id;  // Pega o id do documento
          return { id, ...data };  // Retorna o objeto com o id
        })
      )
    );
  
  }
  getDataWithDateFilterVenda(
    startDate: Date,
    endDate: Date,
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

  editDocument(collection: string, docId: string, updatedData: any): Promise<void> {
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
}
