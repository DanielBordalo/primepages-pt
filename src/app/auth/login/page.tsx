"use client";

import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/dashboard"); // Redirecionar para o painel após login
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar Sessão</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Endereço de e-mail",
                password_label: "Palavra-passe",
                email_input_placeholder: "O seu endereço de e-mail",
                password_input_placeholder: "A sua palavra-passe",
                button_label: "Iniciar Sessão",
                loading_button_label: "A iniciar sessão...",
                social_provider_text: "Iniciar sessão com {{provider}}",
                link_text: "Já tem uma conta? Inicie sessão",
                confirmation_text: "Verifique o seu e-mail para o link de confirmação."
              },
              sign_up: {
                email_label: "Endereço de e-mail",
                password_label: "Palavra-passe",
                email_input_placeholder: "O seu endereço de e-mail",
                password_input_placeholder: "Crie uma palavra-passe",
                button_label: "Criar Conta",
                loading_button_label: "A criar conta...",
                social_provider_text: "Registar com {{provider}}",
                link_text: "Não tem uma conta? Crie uma",
                confirmation_text: "Verifique o seu e-mail para o link de confirmação.",
                password_strength_feedback: "A palavra-passe deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número."
              },
              forgotten_password: {
                email_label: "Endereço de e-mail",
                email_input_placeholder: "O seu endereço de e-mail",
                button_label: "Enviar instruções de recuperação",
                loading_button_label: "A enviar instruções...",
                link_text: "Esqueceu-se da palavra-passe?",
                confirmation_text: "Verifique o seu e-mail para o link de recuperação."
              },
              update_password: {
                password_label: "Nova palavra-passe",
                password_input_placeholder: "A sua nova palavra-passe",
                button_label: "Atualizar palavra-passe",
                loading_button_label: "A atualizar...",
                confirmation_text: "A sua palavra-passe foi atualizada."
              }
            }
          }}
          redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
          onlyThirdPartyProviders={false}
          // Configurar regras de password aqui, se a Auth UI suportar diretamente
          // ou implementar validação customizada no lado do cliente/servidor
        />
      </div>
    </div>
  );
}
