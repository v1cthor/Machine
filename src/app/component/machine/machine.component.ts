import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  providers: [MessageService]
})
export class MachineComponent {
  showName: boolean = true;
  showProductoSelected: boolean = false;
  showtipos: boolean = false;
  errorName: boolean = false;
  showIcon: boolean = false;
  showCambio: boolean = false;
  showIngresado: boolean = false;
  name: string = '';
  costo: number = 0;
  tipo: string = '';
  Moneda_1: number = 10;
  Moneda_2: number = 50;
  Moneda_3: number = 100;
  coinI: number = 0;
  cambioIcon: number = 0;

  constructor(
    private messageService: MessageService
  ) { }

  validaName() {
    if (this.name.length > 1) {
      this.showName = false;
      this.showtipos = true;
      this.errorName = false;
    } else { this.errorName = true; }

  }

  productoSelected(producto: string) {
    if (producto === 'A') { this.tipo = 'A'; this.costo = 270 }
    else if (producto === 'B') { this.tipo = 'B'; this.costo = 340 }
    else if (producto === 'C') { this.tipo = 'C'; this.costo = 390 }
    this.showtipos = false;
    this.showProductoSelected = true;
    this.showIcon = true;
  }

  entercoin(coin: number) {
    this.showIngresado = true;
    this.messageService.add({ key: 'tl',severity: 'info', summary: '', detail: '$'+coin });

    this.coinI += coin;
    if (this.coinI >= this.costo) {
      this.showIcon = false;
      this.cambio();
    }

    if (this.coinI === this.costo) {
      this.showCambio = true;
      this.messageService.add({key: 'tls',  severity: 'success', summary: '', detail: '$0, Ingresaste la cantidad exacta' });
    }
  }

  cambio() {
    if (this.coinI > this.costo) {
      this.cambioIcon = this.coinI - this.costo;
      while (this.cambioIcon > 0) {

        if (this, this.cambioIcon >= 50) {
          this.showCambio = true;
          this.cambioCoin(50);
          this.cambioIcon = this.cambioIcon - 50;

        }
        else if (this.cambioIcon < 50) {
          this.showCambio = true;
          this.cambioCoin(10);
          this.cambioIcon = this.cambioIcon - 10;
        }
      }
    }
  }

  cambioCoin(numero: number) {
    this.messageService.add({key: 'tls', severity: 'success', summary: '', detail: '$' + numero });
  }

  refresh(): void {
    window.location.reload();
  }
}
