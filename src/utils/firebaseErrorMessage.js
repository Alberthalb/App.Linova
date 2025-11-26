const MESSAGES = {
  "auth/email-already-in-use": "Este email já está em uso.",
  "auth/invalid-email": "Email inválido.",
  "auth/invalid-credential": "Credenciais inválidas.",
  "auth/invalid-login-credentials": "E-mail ou senha inválidos.",
  "auth/invalid-credential": "E-mail ou senha inválidos.",
  "auth/user-not-found": "E-mail ou senha inválidos.",
  "auth/wrong-password": "E-mail ou senha inválidos.",
  "auth/weak-password": "Sua senha deve ter pelo menos 6 caracteres.",
  "auth/too-many-requests": "Muitas tentativas. Tente novamente em instantes.",
  "auth/network-request-failed": "Sem conexão. Verifique sua internet.",
};

export const getFirebaseAuthErrorMessage = (error) => {
  if (!error) return "Ocorreu um erro inesperado.";
  const message = error?.code ? MESSAGES[error.code] : null;
  if (message) return message;
  return error?.message || "Não foi possível completar a operação.";
};
