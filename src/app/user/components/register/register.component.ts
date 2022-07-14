import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Declarando formulário de cadastro de usuario
  usuarioForm = this.fb.group({
    nomeUsuario: ['', [Validators.required]],
    sobrenomeUsuario: ['', Validators.required],
    dtNascimentoUsuario: ['', [Validators.required]],
    cpfUsuario: ['', [Validators.minLength(11), Validators.required]],
    telefoneUsuario: ['', [Validators.minLength(11), Validators.required]],
    emailUsuario: ['', [Validators.email, Validators.required]],
    senhaUsuario: ['', Validators.required],
    confirmarSenhaUsuario: ['', Validators.required],
    cepUsuario: ['', [Validators.minLength(8), Validators.required]],
    logradouroUsuario: ['', Validators.required],
    numeroUsuario: ['', Validators.required],
    complementoUsuario: [''],
    bairroUsuario: ['', Validators.required],
    cidadeUsuario: ['', Validators.required]
  });

  // Variavel para checar se os campos de senha e confirmacao de senha estao coincidindo
  checkSenhasCoincidem: boolean = true

  constructor(private fb: FormBuilder,
    private viacepService: ViacepService) { }

  ngOnInit(): void {
  }

  getDadosCep() {
    this.viacepService.getDadosViaCep(this.usuarioForm.controls['cepUsuario'].value).subscribe((ret: any) => {

      // Enviando os valores vindos da API do viacep para os campos do formulario
      this.usuarioForm.controls['logradouroUsuario'].setValue(ret.logradouro);
      this.usuarioForm.controls['bairroUsuario'].setValue(ret.bairro);
      this.usuarioForm.controls['cidadeUsuario'].setValue(ret.localidade);

      // Setando a data de nascimento como touched caso nesse ponto o usuario ainda nao tenha preenchido
      this.usuarioForm.controls['dtNascimentoUsuario'].markAsTouched();

    }, (err: any) => {
      // Zerando os campos de logradouro, bairro e cidade no formulario.
      this.usuarioForm.controls['logradouroUsuario'].setValue('');
      this.usuarioForm.controls['bairroUsuario'].setValue('');
      this.usuarioForm.controls['cidadeUsuario'].setValue('');

      // Setando o campo logradouro como touched para o hasError do CEP funcionar corretamente caso der erro
      this.usuarioForm.controls['logradouroUsuario'].markAsTouched();

      // Exibo o erro no console
      console.error(err)
    })
  }

  cadastrarUsuario() {

    if (this.usuarioForm.controls['senhaUsuario'].value == this.usuarioForm.controls['confirmarSenhaUsuario'].value) {
      // Aqui seria enviado os valores do formulario (this.usuarioForm.value) a um service de usuario para
      // realizar a requisicao do tipo post para a API do sistema.
      console.log(this.usuarioForm.value)

      // Seto como true a variavel que checa se as senhas coincidem
      this.checkSenhasCoincidem = true
    } else {
      // Seto como false a variavel que checa se as senhas coincidem caso elas nao se coincidirem
      this.checkSenhasCoincidem = false
    }
  }

  validaCPF() {
    let cpf: any = this.usuarioForm.controls['cpfUsuario'].value

    if (typeof cpf !== "string") this.usuarioForm.controls['cpfUsuario'].setValue('');
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      this.usuarioForm.controls['cpfUsuario'].setValue('')
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) this.usuarioForm.controls['cpfUsuario'].setValue('')
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) this.usuarioForm.controls['cpfUsuario'].setValue('')
  }

}
