import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Sesuaikan dengan nama file environment Anda

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lampIcon = 'wifi'; // Ikon wifi
  lampColor = 'gray';
  statusText = 'Tidak ada internet'; // Status awal
  apiUrl = environment.apiRepl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLampStatus();
  }

  getLampStatus() {
    this.http.get<{ status: string, data: { command: string }[] }>(this.apiUrl)
      .subscribe(response => {
        if (response.status === 'success' && response.data.length > 0) {
          const command = response.data[0].command;
          this.updateLampColor(command);
        }
      });
  }

  updateLampColor(command: string) {
    switch (command) {
      case 'Nyalakan Lampu Merah':
        this.lampColor = 'red';
        this.statusText = 'Internet Lemah';
        break;
      case 'Nyalakan Lampu Hijau':
        this.lampColor = 'green';
        this.statusText = 'Internet Sangat Cepat';
        break;
      case 'Nyalakan Lampu Biru':
        this.lampColor = 'blue';
        this.statusText = 'Internet Stabil';
        break;
      case 'Matikan Lampu':
      default:
        this.lampColor = 'gray';
        this.statusText = 'Tidak ada internet';
        break;
    }
  }
}
