# Linova - MVP de Aprendizado de Inglês

Aplicativo mobile construído com Expo + React Native para treinar inglês com aulas em vídeo, legendas, transcrições e quizzes. Este repositório reúne todas as telas do MVP (onboarding, login, trilha de aulas e área do aluno).

## Destaques
- Onboarding com quiz de nivelamento que recomenda onde o aluno deve iniciar.
- Player de vídeo com legendas sincronizadas e transcrição completa da aula.
- Quiz por aula com persistência local e em nuvem para acompanhar progresso.
- Tema claro/escuro e navegação por abas com gesto de swipe personalizado.
- Integração completa com Firebase (Auth, Firestore e Storage).

## Stack principal
- Expo 54 / React Native 0.81
- React Navigation 7 (stack + tabs)
- Firebase JS SDK 12 (Auth, Firestore, Storage)
- Expo AV, Expo SecureStore e AsyncStorage
- Google Fonts (Poppins, Inter, Manrope)

## Estrutura resumida
```
src/
  components/        # Botões e UI compartilhada
  screens/           # Fluxos (Splash, Auth, Onboarding, Home, Lessons, Account, Settings)
  navigation/        # AppNavigator com deep linking
  services/          # firebase.js, authService, userService
  styles/            # Tema global (cores, tipografia, espaços)
  utils/             # Helpers (erros do Firebase, swipe state, display name)
```

## Como rodar
1. `npm install`
2. Copie `.env.example` para `.env` e preencha `EXPO_PUBLIC_FIREBASE_*` com os dados do seu projeto Firebase.
3. `npm start` para abrir o Expo Dev Tools. Use `npm run android`, `npm run ios` ou `npm run web` para destinos específicos.

O `app.config.js` lê automaticamente o `.env` e injeta as credenciais em `expo.extra.firebase`, evitando versionar chaves sensíveis.

## Fluxo do produto
1. Splash + Welcome: decide entre onboarding ou área logada conforme o usuário.
2. Quiz de nível: sugere um perfil (Discoverer até Storyteller) e salva o resultado no Firestore.
3. Home: dashboard com boas-vindas, estatísticas e atalhos para a trilha.
4. Lista de aulas: consome `lessons` do Firestore em tempo real, com filtro por nível e busca textual. O aluno pode rever aulas de níveis anteriores, mas conteúdos de níveis superiores ficam bloqueados.
5. Aula: player com vídeo do Storage, legendas `.vtt`, transcrição e botão para o quiz (liberado apenas para níveis já desbloqueados).
6. Quiz da aula: normaliza qualquer estrutura enviada pelo Firestore, salva progresso (SecureStore + Firestore) e mostra pontuação final. Ao completar todas as aulas do nível atual com >=70% de acerto, o app promove automaticamente o aluno para o próximo nível.
7. Conta e configurações: atualiza perfil, troca senha, exclui conta e alterna tema.

## Práticas de segurança
- Apenas deep links confiáveis (domínios Linova ou scheme `linova`) podem abrir o fluxo de redefinição de senha.
- Progresso do quiz é criptografado via `expo-secure-store` com fallback controlado para AsyncStorage.
- `npm audit` roda limpo e força `glob` >= 10.5.0 via `overrides`.

## Roadmap pessoal
- Adicionar capturas das principais telas para enriquecer a apresentação.
- Explorar gravações curtas demonstrando o player com legendas e o quiz.
- Disponibilizar um mock de dados para quem quiser testar sem Firebase.

