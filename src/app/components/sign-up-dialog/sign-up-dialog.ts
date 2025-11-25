import { Component, Directive, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { signUpParams } from '../../models/user';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    // MatSuffix,
    MatPrefix,
    MatButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">sign Up</h2>
          <p class="text-sm text-gray-500 ">Join us and start shopping today</p>
        </div>
        <button tabindex="1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon> close </mat-icon>
        </button>
      </div>

      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="Enter Your Name" />
          <mat-icon matPrefix> person </mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="email" placeholder="Enter Your Email" />
          <mat-icon matPrefix> email </mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input
            formControlName="name"
            matInput
            type="password"
            placeholder="Enter Your Password"
          />
          <mat-icon matPrefix> lock </mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input
            formControlName="name"
            matInput
            type="password"
            placeholder="Confirm Your Password"
          />
          <mat-icon matPrefix> lock </mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Create Account</button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In </a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name: ['Abdulwadud', Validators.required],
    email: ['abdulwadud@test.com', Validators.required],
    password: ['abdulwadud@test.com', Validators.required],
    confirmPassword: ['abdulwadud@test.com', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as signUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}

