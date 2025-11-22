const MESSAGES = {
  "auth/email-already-in-use": "Este email já está em uso.",
  "auth/invalid-email": "Email inválido.",
  "auth/invalid-credential": "Credenciais inválidas.",
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/weak-password": "Sua senha deve ter pelo menos 6 caracteres.",
};

export const getFirebaseAuthErrorMessage = (error) => {
  if (!error) return "Ocorreu um erro inesperado.";
  const message = MESSAGES[error.code];
  if (message) return message;
  return error.message || "Não foi possível completar a operação.";
};
