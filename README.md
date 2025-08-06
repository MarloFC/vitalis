# Vitalis - Seu Guia Pessoal de Bem-Estar

Aplicativo móvel desenvolvido em React Native para promover hábitos saudáveis e bem-estar integral.

## 🎯 Objetivos

- Promover a adoção de hábitos saudáveis e sustentáveis
- Facilitar a criação de rotinas simples e personalizadas
- Oferecer suporte visual e prático com exercícios físicos acessíveis
- Integrar saúde física, mental e emocional
- Ser uma ferramenta acolhedora e acessível

## 🚀 Funcionalidades

### Rotina de Saúde Personalizável
- Agendamento de atividades físicas leves/moderadas
- Lembretes para hidratação, exposição solar e meditação
- Check-ins diários de humor e nível de energia

### Lembretes Interativos
- Animações leves e sons suaves
- Mensagens motivacionais adaptáveis ao tom escolhido pelo usuário
- 4 tons disponíveis: motivacional, divertido, técnico, gentil

### Gamificação
- Sistema de pontos e recompensas
- Conquistas (badges) por consistência
- Avatares personalizáveis com progressão visual

### Biblioteca de Exercícios
- Treinos de até 10 minutos para iniciantes
- Alongamentos e meditações guiadas
- Exercícios de mobilidade e força funcional

### Painel de Progresso
- Gráficos claros sobre frequência de atividades
- Acompanhamento de hidratação e humor
- Visualização de metas alcançadas

## 🛠️ Tecnologias

### Frontend (Mobile)
- **React Native** com Expo
- **TypeScript** para tipagem estática
- **Redux Toolkit** para gerenciamento de estado
- **React Navigation** para navegação
- **React Native Paper** para componentes UI
- **Expo Notifications** para notificações push
- **Lottie** para animações

### Backend (Planejado)
- **Node.js** com Express.js
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **Firebase Cloud Messaging** para notificações

## 📱 Instalação e Execução

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Expo CLI
- Dispositivo móvel ou emulador

### Passos para execução

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd vitalis-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Inicie o projeto**
```bash
npm start
# ou
yarn start
```

4. **Execute no dispositivo**
- Escaneie o QR code com o app Expo Go (Android/iOS)
- Ou use um emulador: `npm run android` ou `npm run ios`

## 📋 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no emulador Android
- `npm run ios` - Executa no simulador iOS
- `npm test` - Executa os testes
- `npm run lint` - Verifica código com ESLint
- `npm run type-check` - Verifica tipos TypeScript

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── screens/            # Telas do aplicativo
├── navigation/         # Configuração de navegação
├── store/             # Redux store e slices
├── services/          # Serviços (APIs, notificações)
├── utils/             # Utilitários e configurações
└── types/             # Definições de tipos TypeScript
```

## 🎨 Design System

### Cores Principais
- **Primary**: #6B9BD2 (Azul sereno)
- **Secondary**: #A8D5BA (Verde suave)
- **Accent**: #F4A261 (Laranja acolhedor)
- **Background**: #F8F9FA (Branco suave)

### Tipografia
- Fonte: Inter (Regular, Medium, Light, Thin)
- Tamanhos hierárquicos para boa legibilidade

### Componentes
- Cards com bordas arredondadas
- Botões com feedback visual
- Ícones consistentes do Material Icons

## 📊 Estado da Aplicação

O aplicativo usa Redux Toolkit para gerenciar:

- **User**: Informações do usuário e preferências
- **Activities**: Atividades realizadas e progresso
- **Goals**: Metas definidas pelo usuário
- **Achievements**: Conquistas desbloqueadas
- **Content**: Exercícios e desafios semanais

## 🔔 Notificações

Sistema inteligente de lembretes:
- Horários personalizáveis
- Tons de mensagem adaptáveis
- Integração com sistema nativo
- Cancelamento individual ou em lote

## 🎯 Público-Alvo

- Homens e mulheres acima de 30 anos
- Pessoas sedentárias ou com baixa adesão a exercícios
- Indivíduos focados em prevenção e longevidade
- Iniciantes em atividades físicas

## 🌟 Diferenciais

- Abordagem holística (física + mental + emocional)
- Foco em iniciar e manter hábitos, sem pressão estética
- Lembretes humanizados e adaptáveis
- Interface acessível para todas as idades
- Linguagem acolhedora e não intimidante

## 🚧 Próximos Passos

1. Implementação do backend com Node.js
2. Integração com APIs de saúde (Google Fit, Apple Health)
3. Sistema de desafios semanais
4. Modo offline com sincronização
5. Comunidade de usuários
6. Integração com wearables

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Faça push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através de:
- Email: suporte@vitalis.app
- Issues no GitHub

---

Desenvolvido com ❤️ para promover bem-estar e qualidade de vida.
