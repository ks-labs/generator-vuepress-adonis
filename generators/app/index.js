'use strict'

const Generator = require('yeoman-generator')
const chalk = require('chalk')
const OptionOrPrompt = require('yeoman-option-or-prompt')
const yosay = require('yosay')
const extend = require('deep-extend')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.optionOrPrompt = OptionOrPrompt
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Bem vindo ao desestressante ${chalk.red('generator-vuepress-adonis')} !`))

    const prompts = [
      {
        type: 'text',
        name: 'main_project_git_url',
        message: 'GIT URL do projeto principal ? (será adicionado -docs no final)',
        required: true,
        default: 'projeto-batata'
      },
      {
        type: 'text',
        name: 'project_name',
        message: 'Nome do Projeto ?',
        required: true,
        default: 'Batata'
      },
      {
        type: 'text',
        name: 'project_description',
        message: 'Descrição do Projeto ? (Utilizado na pagina inicial)',
        required: true,
        default: 'Documentação técnica e não-técnica do '
      },
      {
        type: 'text',
        name: 'development_port',
        message: 'Porta utilizada em desenvolvimento ?',
        required: true,
        default: '4445'
      },
      {
        type: 'text',
        name: 'base_path',
        message: 'Prefixo utilizado para requisições ? (http://localhost:4444/docs/assets...)',
        required: true,
        default: '/docs/'
      },
      {
        type: 'text',
        name: 'build_path',
        message:
          'Caminho para arquivos de build ? (por padrão pasta publica da api onde serão servidos staticamente)',
        required: true,
        default: '../public/docs'
      }
    ]

    return this.optionOrPrompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('adonis-root/**'),
      this.destinationPath(this.destinationRoot()),
      this.props,
      null,
      {
        globOptions: {
          dot: true
        }
      }
    )

    // Adiciona scripts ao package.json do projeto raiz
    const originalPkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    const generatorGeneratorPkg = require('../package.json')

    extend(originalPkg, {
      scripts: {
        'docs:dev': generatorGeneratorPkg.scripts['docs:dev'],
        'docs:build': generatorGeneratorPkg.scripts['docs:build']
      }
    })

    this.fs.writeJSON(this.destinationPath('package.json'), originalPkg)
  }

  install() {
    this.spawnCommand('npm', ['install'], {
      cwd: this.destinationPath(this.destinationRoot('docs'))
    })

    console.log(
      yosay(
        `Na pasta raiz do projeto, para executar durante desenvolvimento ${chalk.blue(
          'npm run docs:dev'
        )} \n para fazer o build  ${chalk.blue('npm run docs:build')}`
      )
    )
    console.log(
      yosay(
        chalk.green(
          'Agora está sendo executado ' + chalk.blue('npm install') + ' em  ' + chalk.blue('./docs')
        )
      )
    )
  }
}
