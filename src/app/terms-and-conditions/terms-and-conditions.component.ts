import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent {

  conditionList: string[] = [];

  constructor(private dialogRef: MatDialogRef<TermsAndConditionsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.conditionList = data;
  }
 
  submit(): void {
    this.dialogRef.close({});
  }
}
