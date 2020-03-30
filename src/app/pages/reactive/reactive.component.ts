import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get departamentoNoValido() {
    return this.forma.get('direccion.departamento').invalid && this.forma.get('direccion.departamento').touched;
  }
  get municipioNoValido() {
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched;
  }
  
  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }


  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noTello]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario  : ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion  : this.formBuilder.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([]),
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      console.log('Cambio de valor', valor);
    });

    this.forma.statusChanges.subscribe( status => {
        console.log('status', status);
    });

    this.forma.get('apellido').valueChanges.subscribe( valor => {
      console.log('Cambio de apellido', valor);
    });
  }

  cargarDataAFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Edwin',
      apellido: 'Tello',
      correo: 'edtello@mail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
       departamento: 'Quetzaltenango',
       municipio: 'Quetzaltenango'
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiemo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          Object.values(control.controls).forEach( controls => controls.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }

    // POSTEO DE INFORMACIÓN
    this.forma.reset({
      nombre: 'Sin nombre'
    });
  }
}
