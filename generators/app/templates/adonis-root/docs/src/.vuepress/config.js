const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Documentação <%= project_name %>',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  // porta utilizada para desenvolvimento
  port: <%= development_port %>,

  // caminho base que deve ser servido localhost:4444/docs
  base: '<%= base_path %>',

  // onde deve ser salvo os compilados da documentação
  dest: '<%= build_path %>',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3e67af' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '@ks-labs/<%= main_project_git_url %>',
    editLinks: false,
    docsDir: '',
    editLinkText: 'Edit esta pagina no GitHub',
    lastUpdated: false,
    nav: [
      {
        text: 'Guia',
        link: '/guide/'
      },
      {
        text: 'Configurando',
        link: '/config/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guia',
          collapsable: false,
          children: ['', 'using-vue']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
}
