import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu'; // Importando MatMenuModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FileUploadModule } from 'primeng/fileupload';
const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  CurrencyPipe,
  MatMenuModule,
  MatSidenavModule,
  BrowserAnimationsModule,
  MatTabsModule,
  MatGridListModule,
  MatCheckboxModule,
  GalleriaModule,
  CarouselModule,
  FileUploadModule
  
];
@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
