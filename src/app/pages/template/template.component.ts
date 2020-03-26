import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: '',
    correo: '',
    apellido: ''
  }
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
                    .subscribe(data => {
                      console.log(data);
    });
  }

  guardar(f: NgForm) {
    if (f.invalid) {
      Object.values(f.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
  }

}
