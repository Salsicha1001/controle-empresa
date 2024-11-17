import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Para autenticação
import { MaterialModule } from './shared/module/material.module';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FirebaseService } from './shared/service/firebase.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadComponent } from './components/load/load.component';
import { VendasComponent } from './components/vendas/vendas.component';
import { ChartModule } from 'primeng/chart';
import { HorizontalVerticalComponent } from './components/grafico/horizontal-vertical/horizontal-vertical.component';
import { PizzaComponent } from './components/grafico/pizza/pizza.component';
import { PizzaCategoriaComponent } from './components/grafico/pizza-categoria/pizza-categoria.component';
import { LucroTableComponent } from './components/tables/lucro-table/lucro-table.component';
import { SalsichaHomeComponent } from './pages/salsicha-home/salsicha-home.component';
import { AddProjetoComponent } from './salsicha/add-projeto/add-projeto.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DetailsProjectComponent } from './salsicha/details-project/details-project.component';
import { GastoProjetoComponent } from './salsicha/gasto-projeto/gasto-projeto.component';
const components = [
  AppComponent,
  LoginComponent,
  NavbarComponent,
  HomeComponent,
  GastosComponent,
  LoadComponent,
  VendasComponent,
  HorizontalVerticalComponent,
  PizzaComponent,
  PizzaCategoriaComponent,
  LucroTableComponent,
  SalsichaHomeComponent,
  AddProjetoComponent,
  DetailsProjectComponent,
  GastoProjetoComponent
];
@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule, // Para usar o Firestore
    AngularFireAuthModule,
    AngularFirestoreModule, // for firestore
    AngularFireStorageModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    FirebaseService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
