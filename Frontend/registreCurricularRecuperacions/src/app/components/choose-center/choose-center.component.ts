import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-center',
  standalone: true,
  template: '',
})
export class ChooseCenterComponent implements OnInit {
  centers: any[] = [];
  userUUID = '';
  errorMessage = '';

  ngOnInit(): void {
    const tempUUID = localStorage.getItem('tempUserUUID');
    const tempCenters = localStorage.getItem('tempCenters');
    if (!tempUUID || !tempCenters) {
      this.errorMessage = 'No center data.';
      return;
    }
    this.userUUID = tempUUID;
    this.centers = JSON.parse(tempCenters);
  }
}
