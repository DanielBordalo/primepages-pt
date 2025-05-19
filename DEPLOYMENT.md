# Guia de Deployment do PrimePages PT

Este documento fornece instruções detalhadas para fazer o deployment da aplicação PrimePages PT utilizando a Vercel, a plataforma recomendada para aplicações Next.js.

## Pré-requisitos

1. Uma conta na [Vercel](https://vercel.com) (pode criar uma gratuitamente)
2. Uma conta no [GitHub](https://github.com), [GitLab](https://gitlab.com) ou [Bitbucket](https://bitbucket.org)
3. As credenciais do Supabase (URL e chave anónima)

## Passo 1: Preparar o Repositório Git

1. Crie um novo repositório no GitHub, GitLab ou Bitbucket
2. Clone o repositório para o seu computador local:
   ```bash
   git clone [URL_DO_SEU_REPOSITORIO]
   ```
3. Copie todos os ficheiros do projeto PrimePages PT para a pasta do repositório
4. Adicione, faça commit e push dos ficheiros para o repositório:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

## Passo 2: Configurar o Projeto na Vercel

1. Aceda a [vercel.com](https://vercel.com) e faça login na sua conta
2. Clique em "Add New..." e selecione "Project"
3. Importe o repositório Git que contém o código do PrimePages PT
4. Na página de configuração do projeto:
   - O framework preset deve ser automaticamente detetado como "Next.js"
   - Mantenha as configurações padrão para Build and Output Settings

## Passo 3: Configurar Variáveis de Ambiente

Na página de configuração do projeto, adicione as seguintes variáveis de ambiente:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anónima do seu projeto Supabase |
| `NEXT_PUBLIC_BASE_URL` | URL da sua aplicação na Vercel (pode adicionar após o primeiro deployment) |

## Passo 4: Fazer o Deployment

1. Clique em "Deploy" para iniciar o processo de deployment
2. A Vercel irá construir e fazer o deployment da aplicação automaticamente
3. Após a conclusão, será fornecido um URL para aceder à aplicação (por exemplo, `primepages-pt.vercel.app`)

## Passo 5: Configurar o Domínio Personalizado (Opcional)

1. Na dashboard da Vercel, aceda ao seu projeto
2. Vá para a aba "Settings" e depois "Domains"
3. Adicione o seu domínio personalizado e siga as instruções para configurar os registos DNS

## Passo 6: Atualizar a Variável de Ambiente BASE_URL

Após o primeiro deployment, atualize a variável de ambiente `NEXT_PUBLIC_BASE_URL` com o URL da sua aplicação:

1. Vá para a aba "Settings" e depois "Environment Variables"
2. Edite a variável `NEXT_PUBLIC_BASE_URL` com o URL da sua aplicação (por exemplo, `https://primepages-pt.vercel.app` ou o seu domínio personalizado)
3. Clique em "Save" e depois em "Redeploy" para aplicar as alterações

## Passo 7: Testar a Aplicação

1. Aceda ao URL fornecido pela Vercel
2. Teste todas as funcionalidades da aplicação:
   - Registo e login de utilizadores
   - Criação de landing pages
   - Upload de imagens e vídeos
   - Visualização pública das landing pages
   - Formulário de contacto
   - Descrição falada com melhoria por IA
   - Personalização visual

## Solução de Problemas

Se encontrar algum problema durante o deployment:

1. Verifique os logs de build na Vercel para identificar erros específicos
2. Confirme se todas as variáveis de ambiente estão corretamente configuradas
3. Verifique se as políticas de segurança (RLS) no Supabase estão corretamente configuradas
4. Certifique-se de que o bucket `landingpageassets` no Supabase Storage está configurado para acesso público

## Deployment Alternativo: Netlify

Se preferir utilizar o Netlify em vez da Vercel, siga estes passos:

1. Crie uma conta no [Netlify](https://netlify.com)
2. Clique em "New site from Git" e selecione o seu repositório
3. Na página de configuração:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Adicione as mesmas variáveis de ambiente que na Vercel
5. Clique em "Deploy site"

## Notas Importantes

- A Vercel oferece um plano gratuito que é adequado para a maioria dos casos de uso iniciais
- Para funcionalidades avançadas ou tráfego elevado, pode ser necessário atualizar para um plano pago
- Certifique-se de que o Supabase também está configurado corretamente, incluindo as políticas de RLS e as configurações de armazenamento
- Recomenda-se fazer backups regulares da base de dados e dos ficheiros armazenados no Supabase

Para qualquer dúvida ou problema durante o processo de deployment, não hesite em contactar-nos.
