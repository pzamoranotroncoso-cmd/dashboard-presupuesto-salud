import React from 'react';
import { ShieldCheck, Lock, Building2, AlertCircle, HelpCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  isLoggingIn: boolean;
  loginError?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  isLoggingIn,
  loginError
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header / Branding */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0369a1] text-white flex items-center justify-center font-black text-sm shadow-md">
            UDP
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
              Facultad de Salud y Odontología
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Universidad Diego Portales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
          <Lock className="w-3.5 h-3.5 text-sky-700" />
          <span>Acceso Institucional Restringido</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-sky-950/5 border border-slate-200/80 p-7 sm:p-9 relative overflow-hidden">
          {/* Top Blue Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0369a1]" />

          {/* Icon / Shield */}
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 text-[#0369a1] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Building2 className="w-8 h-8" />
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Ejecución Presupuestaria
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Plataforma oficial de control de presupuestos, gastos y saldos por Centro de Costo (CECO).
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800">No se pudo iniciar sesión con Google</p>
                <p className="mt-0.5 leading-relaxed">{loginError}</p>
              </div>
            </div>
          )}

          {/* Google Sign-In Button (Opens real Google OAuth popup) */}
          <button
            id="btn-login-screen-google"
            onClick={onLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border-2 border-slate-200 hover:border-slate-300 font-bold text-sm py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-70 cursor-pointer active:scale-[0.99] group"
          >
            {isLoggingIn ? (
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                <span>Conectando con Google...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="text-slate-800 group-hover:text-slate-900">
                  Iniciar Sesión con Google
                </span>
              </>
            )}
          </button>

          {/* Institutional Note */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                Acceso exclusivo para autoridades, directores de escuela y secretarias mediante correo institucional (<strong>@mail.udp.cl</strong> o <strong>@udp.cl</strong>).
              </span>
            </div>

            <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Cada usuario visualizará únicamente la información autorizada para su Centro de Costo (CECO).
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center py-3 text-xs text-slate-400 font-medium">
        <p>Facultad de Salud y Odontología — Dirección de Gestión y Finanzas 2026</p>
        <p className="text-[11px] text-slate-400/80 mt-0.5">Universidad Diego Portales</p>
      </footer>
    </div>
  );
};
